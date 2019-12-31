# Helm使用进阶

`Helm`是一种管理`Charts`的工具，而`charts`则是打包预配置`Kubernetes`基础资源的配置

- 自定义chart制作
- release迭代
- release回滚
- 自定义chart打包并发布
- 命令补全



## 1.自定义chart制作

1) 首先我们先创建我们的`myapp`的`chart`项目
```bash
#进入local仓库的目录
[root@centos-1 local]# cd /root/.helm/repository/local
    
#创myapp项目    
$ helm create mongodb
[root@centos-1 local]# tree
.
├── index.yaml
└── myapp
    ├── charts
    ├── Chart.yaml
    ├── templates
    │   ├── deployment.yaml
    │   ├── _helpers.tpl
    │   ├── ingress.yaml
    │   ├── NOTES.txt
    │   └── service.yaml
    └── values.yaml
```

2) 按需修改`Chart.yaml`、`values.yaml`
```yaml
#Chart.yaml
apiVersion: v1
appVersion: "1.3"                 #pod版本
description: myapp web service
name: myapp
version: 0.1.0          #release版本
    
    
    
#values.yaml
# Default values for myapp.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: ikubernetes/myapp
  tag: v1
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: 
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}    
```

3) 使用`lint`进行项目的语法检查
```bash
[root@centos-1 local]# helm  lint myapp
==> Linting myapp
[INFO] Chart.yaml: icon is recommended
1 chart(s) linted, no failures
```

4) 本地`myapp`项目发布，可以使用`--dry-run`进行检测,也可以使用`set`命令进行临时传参
```bash
[root@centos-1 local]# helm install -n myapp ./myapp/ --set service.type=NodePort --dry-run
NAME:   myapp
    
[root@centos-1 local]# helm install -n myapp ./myapp/ --set service.type=NodePort 
NAME:   myapp
LAST DEPLOYED: Tue Dec 17 17:35:10 2019
NAMESPACE: default
STATUS: DEPLOYED
    
RESOURCES:
==> v1/Deployment
NAME   READY  UP-TO-DATE  AVAILABLE  AGE
myapp  0/1    1           0          <invalid>
    
==> v1/Pod(related)
NAME                    READY  STATUS             RESTARTS  AGE
myapp-78cfb4645b-2q65q  0/1    ContainerCreating  0         <invalid>
    
==> v1/Service
NAME   TYPE      CLUSTER-IP      EXTERNAL-IP  PORT(S)       AGE
myapp  NodePort  10.103.135.152  <none>       80:32441/TCP  <invalid>
    
    
NOTES:
1. Get the application URL by running these commands:
  export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services myapp)
  export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT
```

5) 查看`release`发布情况，发现发布成功了
```bash
[root@centos-1 local]# helm list
NAME 	REVISION	UPDATED                 	STATUS  	CHART      	NAMESPACE
myapp	1       	Tue Dec 17 17:35:10 2019	DEPLOYED	myapp-0.1.0	default  

```

## 2.release迭代

1) 修改`Chart.yaml`和`values.yaml`
```bash
#Chart.yaml
apiVersion: v1
appVersion: "1.4"                 #pod版本
description: myapp web service
name: myapp
version: 0.1.1          #release版本
    
        
#values.yaml
replicaCount: 1

image:
  repository: ikubernetes/myapp
  tag: v4                    #修改镜像tag
  pullPolicy: IfNotPresent

```

2) 使用`upgrade`命令升级`release`
```bash
[root@centos-1 local]# helm upgrade myapp ./myapp --set service.type=NodePort
Release "myapp" has been upgraded. Happy Helming!
LAST DEPLOYED: Tue Dec 17 17:41:29 2019
NAMESPACE: default
STATUS: DEPLOYED
    
RESOURCES:
==> v1/Deployment
NAME   READY  UP-TO-DATE  AVAILABLE  AGE
myapp  1/1    0           1          6m15s
    
==> v1/Pod(related)
NAME                    READY  STATUS             RESTARTS  AGE
myapp-5c8b9d645f-jjp6c  0/1    ContainerCreating  0         0s
myapp-78cfb4645b-2q65q  1/1    Running            0         6m15s
    
==> v1/Service
NAME   TYPE      CLUSTER-IP      EXTERNAL-IP  PORT(S)       AGE
myapp  NodePort  10.103.135.152  <none>       80:32441/TCP  6m15s
    
    
NOTES:
1. Get the application URL by running these commands:
  export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services myapp)
  export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT

```

3) 发现`CHART`已经成功更新至`myapp-0.1.1`版本，同时`REVISION=2`
```bash
[root@centos-1 local]# helm list 
NAME 	REVISION	UPDATED                 	STATUS  	CHART      	NAMESPACE
myapp	2       	Tue Dec 17 17:41:29 2019	DEPLOYED	myapp-0.1.1	default  

```

## 3.release回滚

1) 使用`rollback`命令进行回滚，回滚到版本1。

    注意：rollback命令需要两个位置参数：release name, revision number
```bash
[root@centos-1 local]# helm rollback myapp 1
Rollback was a success! Happy Helming!

```

2) 回滚成功，`CHART`为`myapp-0.1.0`，此时`REVISION=3`（递增的版本号）
```bash
[root@centos-1 local]# helm list 
NAME 	REVISION	UPDATED                 	STATUS  	CHART      	NAMESPACE
myapp	3       	Tue Dec 17 17:46:12 2019	DEPLOYED	myapp-0.1.0	default  

```

3) 查看项目情况
```bash
[root@centos-1 local]# helm status myapp
LAST DEPLOYED: Tue Dec 17 17:46:12 2019
NAMESPACE: default
STATUS: DEPLOYED
    
RESOURCES:
==> v1/Deployment
NAME   READY  UP-TO-DATE  AVAILABLE  AGE
myapp  1/1    1           1          14m
    
==> v1/Pod(related)
NAME                    READY  STATUS   RESTARTS  AGE
myapp-78cfb4645b-zj9pv  1/1    Running  0         3m34s
    
==> v1/Service
NAME   TYPE      CLUSTER-IP      EXTERNAL-IP  PORT(S)       AGE
myapp  NodePort  10.103.135.152  <none>       80:32441/TCP  14m
    
    
NOTES:
1. Get the application URL by running these commands:
  export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services myapp)
  export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT

```

## 4.自定义chart打包并发布

1) 使用`package`打包`myapp`项目
```bash
[root@centos-1 local]# helm package ./myapp/
Successfully packaged chart and saved it to: /root/.helm/repository/local/myapp-0.1.1.tgz

```

2) 创建项目存放路径，并把打包好的项目丢过去
```bash
mkdir -p /data/repo
mv myapp /data/repo
```

3) 使用`serve`启动`local`仓库
```bash
[root@centos-1 local]# helm serve --repo-path /data/repo --url /charts
Regenerating index. This may take a moment.
Now serving you on 127.0.0.1:8879
```

4) 这时，我们就可以在`local`仓库找到我们打包的项目了
```bash
[root@centos-1 ~]# helm search local 
NAME                   	CHART VERSION	APP VERSION	DESCRIPTION                                       
local/myapp            	0.1.1        	1.4        	myapp web service                                 
stable/magic-ip-address	0.1.0        	0.9.0      	A Helm chart to assign static IP addresses for ...

```

## 5.命令补全

注意：
`helm`命令自动补全功能设置，可使用以下命令:
```bash
source <(helm completion bash)

```
