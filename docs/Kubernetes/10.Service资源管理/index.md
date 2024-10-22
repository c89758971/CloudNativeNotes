## 1.为什么需要Service资源?

`Pod`对象的动态性会给客户端带来困扰

## 2.Service资源如何管理Pod

* `service`通过标签选择器关联至拥有相关标签的`Pod`对象
* 客户端想`Service`进行请求，而非直接请求`Pod`对象

1) 查看命令
```bash
kubectl explain svc
```

2) `Service`默认类型为`ClusterIP`，还有`ExternalName`,  `NodePort`和`LoadBalancer`，共四种类型
### 1.ClusterIP

![ClusterIP](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/clusterip.png)
只能在集群内部被访问    

### 2.NodePort

![NodePort](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/NodePort.png)

可以被集群外部访问到，节点的请求会DNAT到Serviceip，然后再调度至PodIP
    
### 3.LoadBalancer
    
![LoadBalancer](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/externalclients.png)

需要结合公有云的LBAAS（需要付费），支持动态接入   

 
### 4.ExternalName

![ExternalName](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/externalname.png)


将集群外部Serice引入集群内部供各客户端使用，需要设置标签选择器，而需要手动定义一个endpoint资源，指向外部的资源地址
    
## 3.Endpoints

1) 查看命令
```bash
kubectl explain endpoints
    
kubectl get endpoints -A
```
2) 注意：自定义`endpoints`时，需要与`service`同名
```bash
[root@centos-1 chapter5]#  kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP   4d23h
ngx-new      ClusterIP   10.96.232.218   <none>        80/TCP    2d5h
    
[root@centos-1 chapter5]# kubectl get endpoints
NAME         ENDPOINTS                     AGE
kubernetes   192.168.0.104:6443            4d23h
ngx-new      10.244.2.8:80,10.244.2.9:80   2d5h
```
    
