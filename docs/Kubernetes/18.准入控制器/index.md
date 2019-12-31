## 1.介绍

准入控制器（`Admission Controller`）位于`API Server`中，在对象被持久化之前，准入控制器拦截对`API Server`的请求，一般用来做身份验证和授权。其中包含两个特殊的控制器：`MutatingAdmissionWebhook`和`ValidatingAdmissionWebhook`

### 1.变更（Mutating）准入控制

修改请求的对象

### 2.验证（Validating）准入控制

验证请求的对象

例如我会默认开启如下的准入控制器。
```bash
--admission-control=ServiceAccount,NamespaceLifecycle,NamespaceExists,LimitRanger,ResourceQuota,MutatingAdmissionWebhook,ValidatingAdmissionWebhook
```

## 2.常用控制器

### 1.AlwaysPullImages

总是拉取远端镜像；

好处：可以避免本地镜像被恶意入侵而篡改

### 2.LimitRanger

此准入控制器将确保所有资源请求不会超过`namespace`的`LimitRange`（定义Pod级别的资源限额，如cpu、mem）

### 3.ResourceQuota

此准入控制器将观察传入请求并确保它不违反命名空间的`ResourceQuota`对象中列举的任何约束
（定义名称空间级别的配额，如`pod`数量）

### 4.PodSecurityPolicy

此准入控制器用于创建和修改`pod`，
并根据请求的安全上下文和可用的`Pod`安全策略确定是否应该允许它。
 
## 3.配置参考

### 1.LimitRanger

1) 编辑`limitrange-demo.yaml`，并`apply`
```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-limit-range
  namespace: myns
spec:
  limits:
  - default:            #默认上限
      cpu: 1000m
    defaultRequest:
      cpu: 1000m
    min:
      cpu: 500m
    max:
      cpu: 2000m
    maxLimitRequestRatio:       #定义最大值是最小值的几倍，当前为4倍
      cpu: 4
    type: Container
```

2) 查看配置
```bash
[root@centos-1 chapter10]# kubectl get LimitRange cpu-limit-range -n myns
NAME              CREATED AT
cpu-limit-range   2019-12-10T07:38:29Z
    
[root@centos-1 chapter10]# kubectl describe LimitRange cpu-limit-range -n myns
Name:       cpu-limit-range
Namespace:  myns
Type        Resource  Min   Max  Default Request  Default Limit  Max Limit/Request Ratio
----        --------  ---   ---  ---------------  -------------  -----------------------
Container   cpu       500m  2    1                1              4

```

### 2.ResourceQuota

1) 编辑配置文件`resoucequota-demo.yaml`，并`apply`
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: quota-example
  namespace: myns
spec:
  hard:
    pods: "5"
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi
    count/deployments.apps: "2"
    count/deployments.extensions: "2"
    persistentvolumeclaims: "2"
```

2) 查看配置
```bash
[root@centos-1 chapter10]# kubectl get ResourceQuota -n myns
NAME            CREATED AT
quota-example   2019-12-10T08:23:54Z
    
[root@centos-1 chapter10]# kubectl describe ResourceQuota quota-example -n myns
Name:                         quota-example
Namespace:                    myns
Resource                      Used  Hard
--------                      ----  ----
count/deployments.apps        0     2
count/deployments.extensions  0     2
limits.cpu                    0     2
limits.memory                 0     2Gi
persistentvolumeclaims        0     2
pods                          0     5
requests.cpu                  0     1
requests.memory               0     1Gi

```

### 3.PodSecurityPolicy

查看相关psp配置文件，仅供参考（已提供，未实测）

## 4.参考文档

* https://jimmysong.io/kubernetes-handbook/concepts/admission-controller.html
