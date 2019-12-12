**附录：参考文档**

* 官方：

    https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
    
**1.高级调度说明**

![高级调度](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/22.%E9%AB%98%E7%BA%A7%E8%B0%83%E5%BA%A6%E6%9C%BA%E5%88%B6/pod-affinity-demo.png)


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

以上是官方的demo和我画的调度图，说明如下：

- 首先podAffinity期望必须调度至运行标签是security=s1的pod的节点上，且颗粒度是zone。所以图中zone=foo或者zone=bar都可以。
    
    特别注意：要么都调度至zone=foo，要么都调度至zone=bar中，混合调度就不成立了
    
- 然后podAntiAffinity，期望最好不要调度至运行了标签为security=S2的的node节点上（颗粒度为主机）

- 综上所述，只会调度在node-3或者node-7上面！

- 补充说明：
  ```text
  pod affinity and anti-affinity的逻辑表达式分为：In, NotIn, Exists, DoesNotExist
    ```

**2.PodAffinity实战**


1) 环境准备：有一个pod运行在centos-2.shared上，且标签为app=ngx-new
```bash
[root@centos-1 chapter12]# kubectl  get pod -o wide --show-labels
NAME                                      READY   STATUS    RESTARTS   AGE     IP           NODE              NOMINATED NODE   READINESS GATES   LABELS
ngx-new-cb79d555-2c7qq                    1/1     Running   0          44h     10.244.1.7   centos-2.shared   <none>           <none>            app=ngx-new,pod-template-hash=cb79d555
```

2) 编辑deploy-with-required-podAffinity.yaml,我们希望这些pod可以调度至有app<in>ngx-new标签的pod的节点上，并且颗粒度是zone的那些节点
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

3) 给2个节点打标签，并且划分不通的zone,预期新pod只会调度至centos-2.shared上

    注意：如果centos-3.shared也是zone=foo，新pod也会调度到上面
```bash
kubectl label nodes centos-2.shared zone=foo
kubectl label nodes centos-3.shared zone=bar
```

4) apply上面的deploy-with-required-podAffinity.yaml，发现新pod都调度至centos-2.shared上了
```bash
[root@centos-1 chapter12]# kubectl  get pod -o wide --show-labels
NAME                                      READY   STATUS    RESTARTS   AGE   IP           NODE              NOMINATED NODE   READINESS GATES   LABELS
myapp-with-pod-affinity-778f46bf4-92fxq   1/1     Running   0          16m   10.244.1.2   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
myapp-with-pod-affinity-778f46bf4-gwv6z   1/1     Running   0          16m   10.244.1.3   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
myapp-with-pod-affinity-778f46bf4-lcvz5   1/1     Running   0          16m   10.244.1.4   centos-2.shared   <none>           <none>            app=myapp,pod-template-hash=778f46bf4
ngx-new-cb79d555-2c7qq                    1/1     Running   0          44h   10.244.1.7   centos-2.shared   <none>           <none>            app=ngx-new,pod-template-hash=cb79d555
```

5) 将centos-3.shared的标签也修改为zone=bar，这时候我们delete-f，并重新apply.
发现centos-2.shared和centos-3.shared都会被调度到，和预期一样
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