## 1.高级调度说明

![高级调度](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/podaffinity.png)


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-pod-affinity
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: failure-domain.beta.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: security
              operator: In
              values:
              - S2
          topologyKey: failure-domain.beta.kubernetes.io/zone
  containers:
  - name: with-pod-affinity
    image: k8s.gcr.io/pause:2.0
```

以上是官方的`demo`和我画的调度图，说明如下：

- 首先`podAffinity`期望必须调度至运行标签是`security=s1`的`pod`的节点上，且颗粒度是`zone`。所以图中`zone=foo`或者`zone=bar都`可以。
    
    特别注意：要么都调度至`zone=foo`，要么都调度至`zone=bar`中，混合调度就不成立了
    
- 然后`podAntiAffinity`，期望最好不要调度至运行了标签为`security=S2`的的`node`节点上（颗粒度为主机）

- 综上所述，只会调度在`node-3`或者`node-7`上面！

- 补充说明：
  ```text
  pod affinity and anti-affinity的逻辑表达式分为：In, NotIn, Exists, DoesNotExist
    ```

## 2.PodAffinity实战


1) 环境准备：有一个`pod`运行在`centos-2.shared`上，且标签为`app=ngx-new`
```bash
[root@centos-1 chapter12]# kubectl  get pod -o wide --show-labels
NAME                                      READY   STATUS    RESTARTS   AGE     IP           NODE              NOMINATED NODE   READINESS GATES   LABELS
ngx-new-cb79d555-2c7qq                    1/1     Running   0          44h     10.244.1.7   centos-2.shared   <none>           <none>            app=ngx-new,pod-template-hash=cb79d555
```

2) 编辑`deploy-with-required-podAffinity.yaml`,我们希望这些`pod`可以调度至有`app<in>ngx-new`标签的pod的节点上，并且颗粒度是`zone`的那些节点
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-with-pod-affinity
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      name: myapp
      labels:
        app: myapp
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:          #硬亲和，表示希望调度到有app<in>ngx-new标签的pod的节点上，并且颗粒度是zone
          - labelSelector:
              matchExpressions:
              - {key: app, operator: In, values: ["ngx-new"]}
            topologyKey: zone
      containers:
      - name: myapp
        image: ikubernetes/myapp:v1
```

3) 给2个节点打标签，并且划分不通的`zone`,预期新`pod`只会调度至`centos-2.shared`上

    注意：如果`centos-3.shared`也是`zone=foo`，新`pod`也会调度到上面
```bash
kubectl label nodes centos-2.shared zone=foo
kubectl label nodes centos-3.shared zone=bar
```

4) `apply`上面的`deploy-with-required-podAffinity.yaml`，发现新`pod`都调度至`centos-2.shared`上了
```bash
[root@centos-1 chapter12]# kubectl  get pod -o wide --show-labels
NAME                                      READY   STATUS    RESTARTS   AGE   IP           NODE              NOMINATED NODE   READINESS GATES   LABELS
myapp-with-pod-affinity-778f46bf4-92fxq   1/1     Running   0          16m   10.244.1.2   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
myapp-with-pod-affinity-778f46bf4-gwv6z   1/1     Running   0          16m   10.244.1.3   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
myapp-with-pod-affinity-778f46bf4-lcvz5   1/1     Running   0          16m   10.244.1.4   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
ngx-new-cb79d555-2c7qq                    1/1     Running   0          44h   10.244.1.7   centos-2.shared   <none>           <none>            app=ngx-new,pod-template-hash=cb79d555
```

5) 将`centos-3.shared`的标签也修改为`zone=bar`，这时候我们`delete-f`，并重新`apply`.
发现`centos-2.shared`和`centos-3.shared`都会被调度到，和预期一样
```bash
#修改 centos-3.shared标签
[root@centos-1 chapter12]# kubectl label nodes centos-3.shared zone=foo   --overwrite
node/centos-3.shared labeled
[root@centos-1 chapter12]# kubectl get node --show-labels
NAME              STATUS   ROLES    AGE   VERSION   LABELS
centos-1.shared   Ready    master   16d   v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-1.shared,kubernetes.io/os=linux,node-role.kubernetes.io/master=
centos-2.shared   Ready    <none>   16d   v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-2.shared,kubernetes.io/os=linux,zone=foo
centos-3.shared   Ready    <none>   16d   v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-3.shared,kubernetes.io/os=linux,zone=foo
    
        
#重新apply
[root@centos-1 chapter12]# kubectl apply -f deploy-with-required-podAffinity.yaml 
deployment.apps/myapp-with-pod-affinity created
    
        
#观察pod部署情况       
[root@centos-1 chapter12]# kubectl  get pod -o wide --show-labels
NAME                                      READY   STATUS    RESTARTS   AGE   IP           NODE              NOMINATED NODE   READINESS GATES   LABELS
myapp-with-pod-affinity-778f46bf4-2rqnj   1/1     Running   0          34s   10.244.2.8   centos-3.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
myapp-with-pod-affinity-778f46bf4-fjfpr   1/1     Running   0          34s   10.244.2.7   centos-3.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
myapp-with-pod-affinity-778f46bf4-tb8v7   1/1     Running   0          34s   10.244.1.5   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
ngx-new-cb79d555-2c7qq                    1/1     Running   0          44h   10.244.1.7   centos-2.shared   <none>           <none>            app=ngx-new,pod-template-hash=cb79d555
```

## 3.参考文档

* 官方：

    https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
