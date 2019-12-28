### Kubernetes基础和部署说明
本章节首先就基础组件、集群基础对象和控制器进行了详细的介绍和说明，然后辨析了集群网络中的三种网络和专有名词，最后关于新手部署测试和生产环境的部署要点进行了归纳说明。

- 基础组件
- 基础对象（Objects）
- 控制器
- 集群网络
- 部署要点

### 基础组件

![基础组件](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/kubernetes_components.png)


如图所示，kubernetes集群中主要分为三个组件：
#### Master Components
- kube-apiserver：作为k8s控制平面的前端，也是所有请求接收的入口
- etcd：k8s集群后端所有集群数据的高可用k/v存储数据库
- kube-scheduler：监听变更请求，然后通过一系列filtering、scoring策略，调度pod运行
- kube-controller-manager：一个独立的进程，通过合解循环，将期望态和运行态保持一致
- cloud-controller-manager：kubernetes与云厂商提供的服务能力对接的关键组件。又称kubernetes cloudprovider。 通过这个组件，可以让用户在创建k8s LoadBalancer 类型的service的时候自动的为用户创建一个阿里云SLB，同时动态的绑定与解绑SLB后端，并且提供了丰富的配置允许用户自定义生成的LoadBalancer。

#### Node Components
- kubelet：每个node节点的k8s客户端，用于确保pod的运行
- kube-proxy：确保k8s服务间连接和转发的组件
- Container Runtime：运行容器的软件，常见的有：Docker, rkt等

#### Addons(附加组件)
- DNS： 常用的有CoreDNS
- CNI (flannel, calico, ...)     #网络插件接口，我们后面会讲
- Web UI (Dashboard) 
- Container Resource Monitoring
- Cluster-level Logging
- ...

### 基础对象（Objects）

![集群对象](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s-basicobjects.png)

除了上面提到的基础组件之外，kubernetes还提供了丰富的基础对象（Objects），如：
```text
Pod、service、NameSpace和Volume
```

### 控制器

![控制器](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s-controllers.png)

另外，kubernetes还包含了更高一层的抽象，称之为控制器（Controllers）。
控制器建立在基础对象之上，并提供了额外、丰富且方便的功能，他们包括：
```text
ReplicaSet、Deployment、DaemonSet、StatefulSet、Job等
```

### 集群网络

如图所示，kubernetes集群可分为三种网络：节点网络、Pod网络和Service网路。
```text
node ip：
    配置在节点的网卡上
    
pod ip：
    配置在容器的虚拟网卡上
    
service ip（cluster ip）：
    不进行配置，只存在于iptables和DNS的解析记录中
```    

### 部署要点
```text
测试环境：
    可以使用单Master节点，单etcd实例
    Node节点按需配置
    Nfs或glusterfs
    
生产环境：
    高可用etcd集群（需定期备份），建立3、5或7个节点
    高可用Master：
        kube-apiserver无状态，可多实例部署：
            借助于Haproxy、nginx或keepalived进行vip流量实现多实例冗余    
        kuber-scheduler和kuber-controller-manager：
            只能有一个活动实例，但可以有多个备用（主备模式）
            
    多Node主机，数量越多，冗余能力越强；
    Ceph、glusterfs、iSCSI、FC SAN及各种云存储等。

```
