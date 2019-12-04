**1.应用场景定义**

* ConfigMap：保存非敏感配置
    
    https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/
* Secret：保存敏感配置信息

**2.根据CMD创建ConfigMap(Pod配置不会热加载)**

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

3) 编辑nginx-cmcmd.yaml,并加载我们的配置
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

9) 如何解决Pod中配置热加载的问题呢？请看下面的例子

**3.根据目录创建ConfigMap，并挂载(Pod配置可以热加载)**

1) 创建nginx所需目录和虚拟主机配置
```bash
[root@centos-1 conf.d]# pwd
/root/mainfasts/conf.d
    
[root@centos-1 conf.d]# cat server1.conf 
server {
    listen       80;
    server_name  www.baidu.com;

    location / {
        root   /server1.html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
    
[root@centos-1 conf.d]# cat server2.conf 
server {
    listen       80;
    server_name  www.nginx.com;

    location / {
        root   /server2.html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
2) 导入至configmap
```bash
kubectl create configmap nginx-cfg -n config --from-file=/root/mainfasts/conf.d/
```

3) 检查configmap配置载入情况
```bash
[root@centos-1 conf.d]# kubectl get cm -n config -o yaml
apiVersion: v1
items:
- apiVersion: v1
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
- apiVersion: v1
  data:
    server1.conf: |
      server {
          listen       80;
          server_name  www.baidu.com;

          location / {
              root   /server1.html;
              index  index.html index.htm;
          }

          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   /usr/share/nginx/html;
          }
      }
    server2.conf: |
      server {
          listen       80;
          server_name  www.nginx.com;

          location / {
              root   /server2.html;
              index  index.html index.htm;
          }

          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   /usr/share/nginx/html;
          }
      }
  kind: ConfigMap
  metadata:
    creationTimestamp: "2019-12-04T10:11:23Z"
    name: nginx-cfg
    namespace: config
    resourceVersion: "81456"
    selfLink: /api/v1/namespaces/config/configmaps/nginx-cfg
    uid: 86374cc1-605c-4b4a-abfa-769df0a4a94d
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
```

4) 编辑nginx-cmfiles-volumes.yaml
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
    volumeMounts:
    - name: nginx-conf               #自定义volumes的名字
      mountPath: /etc/nginx/conf.d/    #挂载到Pod中的路径
  volumes:
  - name: nginx-conf                 #自定义volumes的名字
    configMap:
      defaultMode: 0644
      name: nginx-cfg                 #configMap名
      items:
      - key: server1.conf                   #configMap中的变量名
        path: server1_new.conf                #期望以什么名字保存在Pod目录中
      - key: server2.conf
        path: server2_new.conf


```

5) apply配置文件，并进入Pod查看配置读取和挂载情况
```bash
[root@centos-1 mainfasts]# kubectl exec -it  nginx -n config -- /bin/sh
# cd /etc/nginx/conf.d
# ls
server1_new.conf  server2_new.conf
# cat server1_new.conf
server {
    listen       80;
    server_name  www.baidu.com;

    location / {
        root   /server1.html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
# cat server2_new.conf
server {
    listen       80;
    server_name  www.nginx.com;

    location / {
        root   /server2.html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

```
6) 修改configmap参数(分别将server_name修改成taobao和jingdong)
```bash
[root@centos-1 conf.d]# kubectl get cm nginx-cfg -n config -o yaml
apiVersion: v1
data:
  server1.conf: |
    server {
        listen       80;
        server_name  www.taobao.com;

        location / {
            root   /server1.html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
  server2.conf: |
    server {
        listen       80;
        server_name  www.jingdong.com;

        location / {
            root   /server2.html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
kind: ConfigMap
metadata:
  creationTimestamp: "2019-12-04T10:11:23Z"
  name: nginx-cfg
  namespace: config
  resourceVersion: "87316"
  selfLink: /api/v1/namespaces/config/configmaps/nginx-cfg
  uid: 86374cc1-605c-4b4a-abfa-769df0a4a94d
[root@centos-1 conf.d]# 

```

7) 几秒后Pod的配置文件也自动的进行了热更新
```bash
# cat server1_new.conf
server {
    listen       80;
    server_name  www.baidu.com;

    location / {
        root   /server1.html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
# cat server1_new.conf
server {
    listen       80;
    server_name  www.taobao.com;

    location / {
        root   /server1.html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
# 
```