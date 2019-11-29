
####1.系统级别的pod资源清单
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

####2.分类
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
    
####3.Deployment
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
    
####4.ReplicaSet
```text
   在给定的任何时间，保证一个明确的pod运行数量
   管理底层Pod
   不应该人为介入进行调整、管理
```

####5.Pod观察命令
```bash
#实时观察Pod：
kubectl get pod -w
```