# Kubernetes快速入门
通过本章节的学习，你可以充分了解到一个https的kubernetes集群中所需的证书及其作用，以及kubernetes语境内的api资源类型，最后我还补充了几个基础的GET命令，此时你可以登录到上一章节我们使用kubeadm创建的集群，进行一些查询操作了。

- 证书管理
- API资源模型
- API资源类型
- 命令补充

### 证书管理

![k8s证书](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s_ca.png)

k8s于生产环境运行时，我强烈建议大家运行在https的安全环境下，其证书可分为以下三大类：

root CA：
- apiserver：apiserver自己的证书
- apiserver-kubelet-client：kubelet客户端连接apiserver时的客户端证书

etcd CA：
- etcd-server：etcd服务端证书
- etcd-peer：etcd对等证书，用于etcd集群间https通信
- etcd-healthcheck-client：etcd健康检查的客户端证书
- apiserver-etcd-client：apiserver连接etcd的客户端证书

front-proxy CA：
- front-proxyserver-client：apiserver（中的聚合器aggregator）于前端的客户端证书

你需要注意的是：
1) k8s集群证书默认有效期是90天，你有2个办法去调整（修改go源文件或者证书签名请求生成时声明，如何修改我后面章节会说）
2) 证书的过期时间，你可以到/etc/kubernetes/pki目录下，使用以下命令进行查看：
```bash
openssl x509 -in front-proxy-client.crt   -noout -text  |grep Not
            Not Before: Nov 28 09:07:02 2018 GMT
            Not After : Nov 25 09:07:03 2028 GMT
    
openssl x509 -in apiserver.crt   -noout -text  |grep Not
            Not Before: Nov 28 09:07:04 2018 GMT
            Not After : Nov 25 09:07:04 2028 GMT
```
    

### API资源模型

RESTfulAPI的核心组件是“资源（resource）”，不同类别的事物会被抽象会不同“类型（type）”的资源。
k8s中的资源也类似于对象式编程语言中的“类"（class），但它仅支持有限的方法，而且通常是标准的HTTP方法，例如：GET、PUT、POST和DELETE；此时，你应该可以联想到常用的基础命令kubelet：
```bash
kubectl get pod
kubectl delete node
...
```

- 为了便于独立进行版本演进，Kubernetes将API划分为了称为“API群组”的逻辑集合，每个群组的REST路径为“/apis/$GROUP_NAME/$VERSION”，例如/apis/apps/v1；
- 核心群组core使用简化的REST路径/api/v1；
- 同时，每个群组可同时存在多个不同级别的版本，主要包括alpha、beta和stable三个，使用的级别标识如v1alpha1、v1beta2和v1等。

你可以通过api-versions命令查询当前所支持的API版本：
```bash
[root@k8s-etcd-mater01 cds-filesystem]# kubectl api-versions
admissionregistration.k8s.io/v1beta1
apiextensions.k8s.io/v1beta1
apiregistration.k8s.io/v1
apiregistration.k8s.io/v1beta1
apps/v1
apps/v1beta1
apps/v1beta2
authentication.k8s.io/v1
authentication.k8s.io/v1beta1
authorization.k8s.io/v1
authorization.k8s.io/v1beta1
autoscaling/v1
autoscaling/v2beta1
autoscaling/v2beta2
batch/v1
batch/v1beta1
certificates.k8s.io/v1beta1
coordination.k8s.io/v1beta1
events.k8s.io/v1beta1
extensions/v1beta1
networking.k8s.io/v1
policy/v1beta1
rbac.authorization.k8s.io/v1
rbac.authorization.k8s.io/v1beta1
scheduling.k8s.io/v1beta1
storage.k8s.io/v1
storage.k8s.io/v1beta1
v1
```
 
### API资源类型

![API资源类型](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/API%E8%B5%84%E6%BA%90%E7%B1%BB%E5%9E%8B.png)

如图所示，Kubernetes系统把管理的绝大多数事物都抽象成了资源，它们分别代表着不同的事物类型，例如：Node、Service、Pod、Controller等等
- 每种类型均可通过“属性赋值”进行实例化，从而构建出“对象（object）；
- 对象主要用于描述要在集群中运行的“应用程序（Pod）”，以及应用程序相关的控制（controllers）、配置（ConfigMap和Secret）、服务暴露（Service和Ingress）、存储（Volume）等；
- 用户使用这些对象来规划、部署、配置、维护和监控应用程序并记录运行日志；
- 每种类型的资源对象都支持相应的一组方法（管理操作），它们可用标准的HTTP Verb进行表示，例如：GET、PUT、DELETE和POST等。
    
    
### 命令补充    
```bash
    获取集群资源列表：
        kubectl  api-resources
            
    获取命名空间：
        kubectl  get ns
        
    创建deployment： 
        kubectl create deployment ngx-new --image=nginx
                 
    查看service信息：
         kubectl describe svc ngx-new
    ...
```
     
