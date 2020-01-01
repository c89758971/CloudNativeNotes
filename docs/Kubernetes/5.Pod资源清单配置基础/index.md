# Pod资源清单配置基础
`Docker`中我们都说容器、`docker`，大家耳熟能详。但到了`kubernetes`中，这个专有名词仿佛就被"取而代之"了。`kubernetes`的语境中，我们将一个容器集合称之为`Pod`

- What is Pod?
- Pod的特征
- Pod对象的配置格式
- Pod对象的申明类型
- 命令补充
- 三种网络代理方式
- 参考文档

## 1.What is Pod?

![What is Pod](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/pod.png)
那什么是Pod？如图所示，Pod中有一个pause容器，和一堆业务容器，他们有各自的`PID`、`MOUNT`和`USER`，但他们共享`IPC`、`UTS`和`NETWORK`。对于这六个专属名词的描述，可以看下面的表格：

简称 | 描述 
---- | ----- 
UTS |主机名
IPC |进程间通信
PID |"chroot"进程树
MOUNT |挂载点
NETWORK |网络访问，包括接口
USER |将本地的虚拟user-id映射到真实的user-id

## 2.Pod的特征

- 通过使用"各自"的IPC，使得可以在一个Pod中通信
- 容器可以通过localhost相互访问
- 每个容器继承Pod的名称
- 每个Pod有一个平滑共享网络名称空间的ip地址
- Pod内部的存储卷是共享的

## 3.Pod对象的配置格式

    kind：定义资源类型，例如deployment、service等
    apiVersion：定义调用的api版本，所支持的版本可以通过kubectl  api-resources查看 
    metadata：资源提供源数据信息，如名称、隶属的名称空间和标签等
    spec：用于定义用户期望的状态，不同的资源类型
    Status：记录活动对象的当前状态信息，由k8s系统自行维护，对用户来说为只读字段

## 4.Pod对象的申明类型
```text
陈述式：
    kubectl create -f xx.yaml
        
申明式：
    kubectl apply -f xx.yaml
```

## 5.命令补充
```bash
#相关资源的命令查询：
kubectl explain pods(.spec.tolerations….)
    
#导出pod对应的yaml模版：
kubectl  get pod ngx-new-cb79d555-gqwf8 -o yaml --export > ngx-new-demo.yaml
  
#Docker 策略    
Docker:
    imagePullPolicy:
        Always:无论本地有没有镜像，都要去互联网拖(常用于拉取latest的镜像)
        IfNotPresent：如果本地没有镜像，就不启动（常用于拉取指定版本的镜像）
        Nerver:本地有就直接用，没有再去拖

```

## 6.三种网络代理方式

    Service：申明NodePort类型，可以通过任意节点访问
    hostPort：直接将容器的端口与所调度的节点上的端口路由，这样用户就可以通过宿主机的IP加上来访问Pod了
    hostNetwork：共享宿主机的网络名称空间

## 7.参考文档

reference文档：https://kubernetes.io/docs/reference/using-api/api-overview/

API文档：https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/



