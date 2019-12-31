## 1.资源对象的配置格式

    kind：定义资源类型，例如deployment、service等
    apiVersion：定义调用的api版本，所支持的版本可以通过kubectl  api-resources查看 
    metadata：资源提供源数据信息，如名称、隶属的名称空间和标签等
    spec：用于定义用户期望的状态，不同的资源类型
    Status：记录活动对象的当前状态信息，由k8s系统自行维护，对用户来说为只读字段

## 2.资源对象的类型
```text
陈述式：
    kubectl create -f xx.yaml
        
申明式：
    kubectl apply -f xx.yaml
```

## 3.命令补充
```bash
#相关资源的命令查询：
kubectl explain pods(.spec.tolerations….)
    
#导出pod对应的yaml模版：
kubectl  get pod ngx-new-cb79d555-gqwf8 -o yaml --export > ngx-new-demo.yaml
    
Docker:
    imagePullPolicy:
        Always:无论本地有没有镜像，都要去互联网拖(常用于拉取latest的镜像)
        IfNotPresent：如果本地没有镜像，就不启动（常用于拉取指定版本的镜像）
        Nerver:本地有就直接用，没有再去拖

```

## 4.三种网络代理方式

    Service，申明NodePort类型
    hostPort
    hostNetwork：共享宿主机的网络名称空间

## 5.参考文档

reference文档：https://kubernetes.io/docs/reference/using-api/api-overview/

API文档：https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/



