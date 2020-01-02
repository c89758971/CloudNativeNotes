# Kubernetes基础和部署说明
通过上一章节的学习，想必你对kubernetes已经有了一个较初步的了解，接着本章节将首先就基础组件、集群基础对象和控制器进行详细的介绍和说明，然后辨析集群网络中的三种网络和专有名词，最后关于新手部署测试和生产环境的部署要点进行一些归纳和说明

- 基础组件
- 基础对象（Objects）
- 控制器
- 集群网络
- 部署要点

## 1.基础组件

![基础组件](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/kubernetes_components.png)


如图所示，kubernetes集群中主要分为三个组件：
### 1.Master Components
- kube-apiserver：作为k8s控制平面的前端，也是所有请求接收的入口
- etcd：k8s集群后端所有集群数据的高可用k/v存储数据库
- kube-scheduler：监听变更请求，然后通过一系列`filtering`、`scoring`策略，调度pod运行
- kube-controller-manager：一个独立的进程，通过合解循环，将期望态和运行态保持一致
- cloud-controller-manager：`kubernetes`与云厂商提供的服务能力对接的关键组件。又称`kubernetes cloudprovider`。 通过这个组件，可以让用户在创建`k8s LoadBalancer` 类型的`service`的时候自动的为用户创建一个阿里云`SLB`，同时动态的绑定与解绑SLB后端，并且提供了丰富的配置允许用户自定义生成的`LoadBalancer`。

### 2.Node Components
- kubelet：每个`node`节点的`k8s`客户端，用于确保`pod`的运行
- kube-proxy：确保`k8s`服务间连接和转发的组件
- Container Runtime：运行容器的软件，常见的有：`Docker`, `rkt`等

### 3.Addons(附加组件)
- DNS： 常用的有CoreDNS
- CNI (flannel, calico, ...)     #网络插件接口，我们后面会讲
- Web UI (Dashboard) 
- Container Resource Monitoring
- Cluster-level Logging
- ...

## 2.基础对象（Objects）

除了上面提到的基础组件之外，`kubernetes`还提供了丰富的基础对象（`Objects`），如：
```text
Pod、service、NameSpace和Volume
```

![集群对象](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s-basicobjects.png)

这是一张传统架构tomcat请求redis集群于kubernetes集群中的新架构。
如图可知，
> 外部流量首先访问tomcat service，tomcat service再将流量分发至相关的tomcat pod上面，接着，tomcat pod也不是直接访问相关redis pod，而是同理，只访问redis server，redis server负责后续流量的转发。如果你了解eureka，想必你对这张图的理解是很快的。

接着，我们来看一下几个基础对象组件：

- Pod：你可以理解为一组docker容器的集合，如redis pod、tomcat pod
- service：类似于eureka，负责下游服务的动态发现、注册和续约
- volume：就是个存储卷，其支持很多类型的存储系统
- pod controller：负责pod数量的变更通知和执行，和service相互协作，达到动态的特性



## 3.控制器

![控制器](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s-controllers.png)

另外，`kubernetes`还包含了更高一层的抽象，称之为控制器（`Controllers`）。
控制器建立在基础对象之上，并提供了额外、丰富且方便的功能，他们包括：
```text
ReplicaSet、Deployment、DaemonSet、StatefulSet、Job等
```
注意：
> 这里你只需要先有一个基础概念的了解，对于每个控制器的区别和应用场景，我们后续的章节会逐个讲解。

## 4.集群网络

如上图所示，`kubernetes`集群可分为三种网络：节点网络、Pod网络和`Service`网路。
```text
node ip：
    配置在节点的网卡上
    
pod ip：
    配置在容器的虚拟网卡上
    
service ip（cluster ip）：
    不进行配置，只存在于iptables和DNS的解析记录中
```    

## 5.部署要点
测试环境：

> 可以使用单Master节点，单etcd实例；Node节点按需配置；存储直接使用Nfs或glusterfs

生产环境：
> 1.高可用etcd集群（需定期备份etcd数据文件），建立3、5或7个节点，保证一定的冗余能力；

> 2.Master节点要保证高可用：kube-apiserver是无状态的，可多实例部署，并借助于Haproxy、nginx或keepalived进行vip流量实现多实例冗余；

> 3.Master节点要保证高可用：kuber-scheduler和kuber-controller-manager组件只能有一个活动实例，但可以有多个备用（主备模式）；

> 4.Node节点：数量越多，冗余和负载能力就越强;

> 5.集群存储建议采用Ceph、glusterfs、iSCSI、FC SAN及各种云存储等。
