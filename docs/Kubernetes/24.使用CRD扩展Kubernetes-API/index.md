# 使用CRD扩展Kubernetes API

有些场景，`kubernetes`内建的资源类型往往不能满足我们的需求，如`redis`集群初始化、扩容、缩容、备份等操作（类似于`operator`）。
这时候就需要我们考虑如何去扩展`kubernetes的API`。
 
- 扩展方式
- 扩展架构图
- 使用CRD扩展Kubernetes API
- 高级主题
- 其他高级功能demo
- 参考文档


## 1.扩展方式

- 修改`kubenetes`的`apiserver`源码，难度最大、版本兼容性也很困难
- 自定义`API server`（`Custom API server`）并聚合到`API`中，难度较大，需要开发能力
- `1.7`以下版本编写`TPR`，`kubernetes1.7`及以上版本用`CRD`，常用方式

## 2.扩展架构图


![扩展架构图](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/CRD.png)



如图所示，用户对集群的请求首先到`apiserver`内部的`Aggregator`（聚合器），然后再到实际的`apiserver`模块。
上面提到的三种扩展方式，可以在图中清晰看到

特别注意：
```text
对于三种扩展方式的访问如何分配，这是基于kube-aggregator（APIservice）进行筛选的，可以理解成路由表、
或者是nginx动静分离的效果。

```

## 3.使用CRD扩展Kubernetes API

1) 创建自定义资源类型：编辑`resourcedefinition.yaml`
```yaml
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  # 名称必须符合下面的格式：<plural>.<group>
  name: crontabs.stable.example.com
spec:
  # REST API使用的组名称：/apis/<group>/<version>
  group: stable.example.com
  # REST API使用的版本号：/apis/<group>/<version>
  version: v1
  # 定义哪个级别的资源类型：Namespaced或Cluster
  scope: Namespaced
  names:
    # URL中使用的复数名称: /apis/<group>/<version>/<plural>
    plural: crontabs
    # CLI中使用的单数名称
    singular: crontab
    # CamelCased格式的单数类型。在清单文件中使用
    kind: CronTab
    # CLI中使用的资源简称
    shortNames:
    - ct
```
2) `apply`配置文件
```bash
[root@centos-1 chapter13]# kubectl apply -f resourcedefinition.yaml 
customresourcedefinition.apiextensions.k8s.io/crontabs.stable.example.com created
```

3) 创建自定义资源的对象：`my-new-cron-object.yaml`，其中`kind`引用上面自定义的资源类型：`CronTab`，并`apply`
```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * /5"
  image: my-awesome-cron-image

```
4) 查看自定义资源类型上的`pod`资源
```bash
[root@centos-1 chapter13]# kubectl get CronTab
NAME                 AGE
my-new-cron-object   23s
    
        
[root@centos-1 chapter13]# kubectl describe CronTab my-new-cron-object
Name:         my-new-cron-object
Namespace:    default
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"stable.example.com/v1","kind":"CronTab","metadata":{"annotations":{},"name":"my-new-cron-object","namespace":"default"},"sp...
API Version:  stable.example.com/v1
Kind:         CronTab
Metadata:
  Creation Timestamp:  2019-12-13T09:40:26Z
  Generation:          1
  Resource Version:    151136
  Self Link:           /apis/stable.example.com/v1/namespaces/default/crontabs/my-new-cron-object
  UID:                 778d9359-bdb8-4f07-a07b-8a20b95f1398
Spec:
  Cron Spec:  * * * * /5
  Image:      my-awesome-cron-image
Events:       <none>

```

## 4.高级主题

### 1.Validation（验证）

功能状态： Kubernetes v1.12 beta

可以通过 [OpenAPI v3 schema](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#schemaObject)验证自定义对象是否符合标准 。

1) 在自定义资源类型`CronTab`中，定义`crontabs-crd-with-validation.yaml`，新增`Validation`（验证）功能
```yaml
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  version: v1
  names:
    kind: CronTab
    plural: crontabs
    singular: crontab
    shortNames: 
    - ct 
  scope: Namespaced
  validation:
    openAPIV3Schema:
      properties:
        spec:
          properties:
            userID:
              type: integer
              minimum: 1
              maximum: 65535
            groups:
              type: array
            email:
              type: string
            password:
              type: string
              format: password
          required: ["userID","groups"]
```

2) 编辑`crontabs-with-invalid-field.yaml`，引用`kind: CronTab`，并设置非法`userID`，验证`Validation`（验证）功能是否`work`，并`apply`
```yaml
apiVersion: stable.example.com/v1      #定义规范：  <group>/<version>
kind: CronTab 
metadata:
  name: tony
  namespace: default
spec:
  userID: 999999
```

3) 这时候发现`Validation`（验证）已经生效，拦截了`pod`初始化和运行
```bash
[root@centos-1 chapter13]# kubectl apply -f users-with-invalid-field.yaml 
The CronTab "tony" is invalid: 
* spec.userID: Invalid value: 65535: spec.userID in body should be less than or equal to 65535
* spec.groups: Required value

```

### 2.Category（分类）
类别是自定义资源所属的分组资源的列表（例如`all`）。您可以使用`kubectl get <category-name> `列出属于该类别的资源。此功能是`beta`，可用于`v1.10` 中的自定义资源。

以下示例将`CustomResourceDefinition`添加至`all`的类别列表，并说明如何使用 `kubectl get all`输出自定义资源 。

1) 编辑`resourcedefinition-with-category.yaml`，并`apply`
```yaml
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
    # categories is a list of grouped resources the custom resource belongs to.
    categories:
    - all

```
2) 编辑`my-crontab.yaml`，并`apply`
```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
```
3) 使用`kubectl get all`，这时候就可以看到我们自定义的`Crontab`类型资源了
```bash
[root@centos-1 ~]# kubectl get all
NAME                         READY   STATUS    RESTARTS   AGE
pod/ngx-new-cb79d555-2c7qq   1/1     Running   0          3d

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   18d

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/ngx-new   1/1     1            1           17d

NAME                               DESIRED   CURRENT   READY   AGE
replicaset.apps/ngx-new-cb79d555   1         1         1       3d4h

NAME                                            AGE
crontab.stable.example.com/my-new-cron-object   1s
```
 
## 5.其他高级功能demo

[其他高级功能demo](https://github.com/Aaron1989/CloudNativeNotes/tree/master/docs/Kubernetes/24.%E4%BD%BF%E7%94%A8CRD%E6%89%A9%E5%B1%95Kubernetes-API/%E5%85%B6%E4%BB%96%E9%AB%98%E7%BA%A7%E5%8A%9F%E8%83%BDdemo)


## 6.参考文档

* 官方文档：

    https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/    
    
* jimmysong.io:
    
    https://jimmysong.io/kubernetes-handbook/concepts/crd.html

* [如何从零开始编写一个Kubernetes CRD](https://www.servicemesher.com/blog/kubernetes-crd-quick-start/)

* [使用自定义资源扩展API](https://jimmysong.io/kubernetes-handbook/concepts/custom-resource.html)