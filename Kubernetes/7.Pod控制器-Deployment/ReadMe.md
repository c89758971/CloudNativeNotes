![deployment拓扑-1](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/7.Pod%E6%8E%A7%E5%88%B6%E5%99%A8-Deployment/deployment.png)
**1.系统级别的pod资源清单**

系统默认的这四个pod，修改后不需要手动重载，k8s集群会自动热加载（数分钟内）
```bash
cd /etc/kubernetes/manifests/
    
[root@centos-1 manifests]# ll
总用量 16
-rw-------. 1 root root 1773 11月 25 17:00 etcd.yaml
-rw-------. 1 root root 2606 11月 25 17:00 kube-apiserver.yaml
-rw-------. 1 root root 2303 11月 25 17:00 kube-controller-manager.yaml
-rw-------. 1 root root 1119 11月 25 17:00 kube-scheduler.yaml

```

**2.分类**
```text
守护进程型：
    无状态应用：
        非系统级（Nginx等）：Deployment，ReplicaSet
        系统级（日志、监控收集客户端：场景就是每个node节点需要且只需要运行1个）：DaemonSet
        
    有状态应用（mysql、redis集群等）：statefulSet
    
    
非守护进程型：
    Job：一次性任务
    Cronjob：定时任务
```
    
**3.Deployment**
```text
用来管理ReplicaSet以及它的历史版本（支持回滚）,实现支持各种发布策略：滚动、蓝绿、金丝雀发布（金丝雀可以分特定流量到不同版本，但这个功能需要服务网格的支持）
   
#使用命令查看rs控制器的历史版本    
[root@centos-1 mainfasts]# kubectl get rs -o wide
NAME               DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES       SELECTOR
myapp-67f698f887   0         0         0       53m     myapp        nginx:1.16   app=myapp,pod-template-hash=67f698f887,rel=stable
myapp-7c488c6f44   5         5         5       48m     myapp        nginx:1.17   app=myapp,pod-template-hash=7c488c6f44,rel=stable
myapp-98f644994    0         0         0       46m     myapp        nginx:1.15   app=myapp,pod-template-hash=98f644994,rel=stable
ngx-new-cb79d555   2         2         2       2d22h   nginx        nginx        app=ngx-new,pod-template-hash=cb79d555

```   

* 滚动发布和回滚

1) 发布nginx1.10版本，并限制滚动策略：最多新增1个(maxSurge)最少下线1个(maxUnavailable)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deploy-nginx
spec:
  replicas: 3
  minReadySeconds: 10
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.10-alpine
        ports:
        - containerPort: 80
          name: http
        readinessProbe:
          periodSeconds: 1
          httpGet:
            path: /
            port: http
```
2) 修改yaml的nginx版本为1.13，发布并观察。可以发现deployment对应的rs控制器逐步应用至deploy-nginx-567c45c74（ nginx:1.13-alpine）
```bash
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   2         2         0       51s     nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   2         2         2       7m2s    nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       5m51s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6
    
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   2         2         0       52s     nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   2         2         2       7m3s    nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       5m52s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6
    
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   3         3         2       2m40s   nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   0         0         0       8m51s   nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       7m40s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6

```
3) 查看历史版本,第4条是我们最新的版本
```bash
[root@centos-1 chapter5]# kubectl rollout history deployment/deploy-nginx
deployment.apps/deploy-nginx 
REVISION  CHANGE-CAUSE
2         <none>
3         <none>
4         kubectl apply --filename=deploy-nginx.yaml --record=true

```

4) 回滚至上个版本，并观察rs变化,发现已经全部切换至1.10的nginx,至此滚动发布的策略和回滚已经演示完毕
```bash
[root@centos-1 chapter5]# kubectl rollout undo deployment/deploy-nginx --to-revision=0
deployment.apps/deploy-nginx rolled back
    
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   2         2         2       4m58s   nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   2         2         2       11m     nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       9m58s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6
    
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE    CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   0         0         0       5m6s   nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   3         3         3       11m    nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       10m    nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6

```
**4.ReplicaSet**
```text
   在给定的任何时间，保证一个明确的pod运行数量
   管理底层Pod
   不应该人为介入进行调整、管理
```

**5.Pod观察命令**
```bash
#实时观察Pod：
kubectl get pod -w
```

**6.deployment-demo**

https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/7.Pod%E6%8E%A7%E5%88%B6%E5%99%A8-Deployment/depolyment-nginx.yaml