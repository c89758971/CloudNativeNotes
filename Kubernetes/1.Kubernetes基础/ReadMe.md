**官网：https://kubernetes.io**

**1.架构图：**


* Master节点：（又称为控制平面：control plane）
    
  包括kube-apiserver、kube-scheduler、kube-controller-manager和etcd四个组件。
```text
kube-apiserver：
    是一个将Kubernetes控制平面中的API暴露出来的API服务，这服务是Kubernetes控制平面的前端。
    用户可以运行多个kube-apiserver组件的实例，用于平衡实例的请求流量。
    
kube-scheduler：
    用于watch监听apiserver的资源变动（增删改查），并调度合适的后端node节点来创建Pod资源。
    

kube-controller-manager：
    每个控制器都是独立的二进制进程，包括：Node Controller、Replication Controller、Endpoints Controller和Service Account & Token Controllers。
    
etcd：
    高可用、KV结构的kubernetes的后端数据存储组件。
    备份方案：https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster
    官方文档：https://etcd.io/docs/v3.4.0/
```

* Node节点：（又称为数据平面：data plane）

    包括kubelet、kube-proxy和Container Runtime三个组件。
```text
kubelet:
    运行在集群每个节点的客户端，需要确保相关容器运行在pod中；
    通过PodSpecs标签，描述容器的运行状态；
    最后，kubelet不管理，没有通过kubernetes创建的容器。
    
kube-proxy：
    是一个运行在集群每个节点的网络代理组件。
    
Container Runtime：
    支持运行容器底层环境的软件；
    支持： Docker, containerd, cri-o, rktlet and any implementation of the Kubernetes CRI (Container Runtime Interface)。
    
```

* Addons(附加组件) 

    使用Kubernetes resources (DaemonSet, Deployment, etc)增加集群功能；
    其中附加组件的namespace属于kube-system。  
    可用Addons文档：https://kubernetes.io/docs/concepts/cluster-administration/addons/
```text
DNS：
    将Service资源的A记录，实时且自动的添加进来。
Web UI (Dashboard)、Container Resource Monitoring和Cluster-level Logging
```

**2.流程概述：** 

Master： 

    用户通过（API、WebUI、CLI）向APIserver发送请求，Scheduler组件watch APIserver的资源变动，同时从Node中选取最合适的Node节点开始调度，并把结果保存到Etcd中。
Node：

    kubelet也会watch APIserver的资源变动，并在符合的Node上，会通过kuberlet调用相关的docker引擎进行后续构建操作。
