**1.应用场景定义**

* ConfigMap：保存非敏感配置
* Secret：保存敏感配置信息

**2.根据CMD创建 ConfigMap**

1) 在config的namespace中，创建一个名为filebeat-cfg的configmap，具体如下
```bash
kubectl create cm filebeat-cfg -n config --from-literal=redis_host="redis.test.com" --from-literal=log_level=“info”

```

2) 检查CM（configmap简称）配置情况
```bash
[root@centos-1 chapter8]# kubectl get cm filebeat-cfg -n config -o yaml
apiVersion: v1
data:
  log_level: info
  redis_host: redis.test.com
kind: ConfigMap
metadata:
  creationTimestamp: "2019-12-04T08:17:32Z"
  name: filebeat-cfg
  namespace: config
  resourceVersion: "70462"
  selfLink: /api/v1/namespaces/config/configmaps/filebeat-cfg
  uid: 2cc00197-60b6-4850-9c24-ef4f385ae058
```

3) 编辑pod-configmap.yaml,并加载我们的配置
```yaml
apiVersion: v1
kind: Pod
metadata:
 name: nginx
 namespace: config
spec:
 containers:
 - name: nginx
   image: nginx
   env:
   -  name: nginx_host
      valueFrom:
        configMapKeyRef:                 #从configmap中读取
          key: redis_host
          name: filebeat-cfg
   -  name: nginx_log_level
      valueFrom:
        configMapKeyRef:
          key: log_level
          name: filebeat-cfg
   -  name: nginx_static_value            #静态配置
      value: "123123"
```

4) apply启动Pod，并检查变量加载情况，发现能成功加载到变量（nginx_host、nginx_log_level和nginx_static_value）
```bash
[root@centos-1 mainfasts]# kubectl exec -it nginx -n config -- /bin/sh
# printenv
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_SERVICE_PORT=443
nginx_host=redis.test.com
nginx_log_level=info
HOSTNAME=nginx
HOME=/root
PKG_RELEASE=1~buster
TERM=xterm
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
NGINX_VERSION=1.17.6
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
nginx_static_value=123123
KUBERNETES_PORT_443_TCP_PORT=443
NJS_VERSION=0.3.7
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_SERVICE_HOST=10.96.0.1
PWD=/
```

5) 编辑配置文件，修改对应变量
```yaml
[root@centos-1 dingqishi]# kubectl get cm filebeat-cfg -n config -o yaml
apiVersion: v1
data:
  log_level: warning
  redis_host: www.baidu.com
kind: ConfigMap
metadata:
  creationTimestamp: "2019-12-04T08:17:32Z"
  name: filebeat-cfg
  namespace: config
  resourceVersion: "76435"
  selfLink: /api/v1/namespaces/config/configmaps/filebeat-cfg
  uid: 2cc00197-60b6-4850-9c24-ef4f385ae058

```

6) 继续观察Pod内变量，发现没有改变
```yaml
# printenv
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_SERVICE_PORT=443
nginx_host=redis.test.com
nginx_log_level=info
HOSTNAME=nginx
HOME=/root
PKG_RELEASE=1~buster
TERM=xterm
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
NGINX_VERSION=1.17.6
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
nginx_static_value=123123
KUBERNETES_PORT_443_TCP_PORT=443
NJS_VERSION=0.3.7
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_SERVICE_HOST=10.96.0.1
PWD=/

```

7) 删除Pod，重新apply，发现配置才会更新
```yaml
[root@centos-1 mainfasts]# kubectl delete -f pod-cfg.yaml 
pod "nginx" deleted
[root@centos-1 mainfasts]# kubectl apply -f pod-cfg.yaml 
pod/nginx created
    
[root@centos-1 mainfasts]# kubectl exec -it nginx -n config -- /bin/sh
# printenv
KUBERNETES_SERVICE_PORT=443
KUBERNETES_PORT=tcp://10.96.0.1:443
nginx_host=www.baidu.com
nginx_log_level=warning
HOSTNAME=nginx
HOME=/root
PKG_RELEASE=1~buster
TERM=xterm
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
NGINX_VERSION=1.17.6
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
nginx_static_value=123123
    
```

8) 结论：

    环境变量只会在Pod生成时加载，修改configMap，并不会被热加载到Pod中，需要重新生成Pod才行

