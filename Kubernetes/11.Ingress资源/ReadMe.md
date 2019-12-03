**1.基础知识**
```text
iptables和ipvs：4层
ingress：7层 
    
Ingress Controller：
    将ingress配置信息转换为自身配置的应用程序
        
Ingress：
    只定义流量转发和调度的通用格式的配置信息

```

**2.Ingress代理逻辑**

![ingress架构图](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/11.Ingress%E8%B5%84%E6%BA%90/ingress-congroller-nodeport.png)


**3.Ingress-Nginx部署和简单测试**

1) 下载配置清单，修改images地址（被墙）：lizhenliang/nginx-ingress-controller:0.20.0
```bash
 wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

2) 启动配置清单，并查看Pod是否运行
```bash
[root@centos-1 chapter6]# kubectl get pods -n ingress-nginx
NAME                                       READY   STATUS    RESTARTS   AGE
nginx-ingress-controller-dc55d4998-zxnrd   1/1     Running   0          20m
```

3) 编辑nginx-ingress-service.yaml配置文件，如下
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-ingress-controller
  namespace: ingress-nginx
spec:
  type: NodePort
  ports:
    - port: 80     #Service端口
      name: http
      nodePort: 30080    #本机端口
    - port: 443
      name: https
      nodePort: 30443
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
```

4) apply配置文件，并观察
```bash
[root@centos-1 chapter6]# kubectl get svc -n ingress-nginx
NAME                       TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
nginx-ingress-controller   NodePort   10.108.188.111   <none>        80:30080/TCP,443:30443/TCP   12m
```

5) 访问任意一台虚拟机的30080端口，便能够访问到Nginx404页面

6) 编辑myapp-svc.yaml和myapp-ingress.yaml，并apply -f创建
```yaml
#myapp-svc.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myns
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
      rel: beta
  template:
    metadata:
      namespace: myns
      labels:
        app: myapp
        rel: beta
    spec:
      containers:
      - name: myapp
        image: ikubernetes/myapp:v1

---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: myns
spec:
  selector:
    app: myapp
    rel: beta
  ports:
  - name: http
    port: 80
    targetPort: 80
```

```yaml
#myapp-ingress.yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: myapp
  namespace: myns
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    kubernetes.io/ingress.class: "nginx"            #当有多种ingress-controller的时候，用这个参数区分使用哪个controller
spec:
  rules:
  - host: foo.bar.com
    http:
      paths:
      - path: /
        backend:
          serviceName: myapp
          servicePort: 80

```

7) 修改MAC本机hosts并访问foo.bar.com:30080,可以成功
```text
192.168.0.104 foo.bar.com
```

**4.tomcat实战部署**

1) 编辑tomcat-svc-ingress.yaml，并apply -f
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: eshop
  
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tomcat
  namespace: eshop
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tomcat
      rel: beta
  template:
    metadata:
      namespace: eshop
      labels:
        app: tomcat
        rel: beta
    spec:
      containers:
      - name: tomcat
        image: tomcat:alpine
  
---
apiVersion: v1
kind: Service
metadata:
  name: tomcat
  namespace: eshop
spec:
  selector:
    app: tomcat
    rel: beta
  ports:
  - name: http
    port: 8080
    targetPort: 8080     #tomcat(Pod)端口
  - name: ajp
    port: 8009
    targetPort: 8009     #tomcat(Pod)端口
  
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: tomcat
  namespace: eshop
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    kubernetes.io/ingress.class: "nginx"            #当有多种ingress-controller的时候，用这个参数区分使用哪个controller
spec:
  rules:
  - host: eshop.foo.com
    http:
      paths:
      - path: /
        backend:
          serviceName: tomcat
          servicePort: 8080

```  

2) 观察集群资源生成情况
```bash
[root@centos-1 chapter6]# kubectl get all -n eshop
NAME                          READY   STATUS    RESTARTS   AGE
pod/tomcat-6b6fb9c8f6-jq9w2   1/1     Running   0          4m33s
pod/tomcat-6b6fb9c8f6-qz8z6   1/1     Running   0          4m33s
    
NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
service/tomcat   ClusterIP   10.110.148.61   <none>        8080/TCP,8009/TCP   4m33s
    
NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/tomcat   2/2     2            2           4m33s
    
NAME                                DESIRED   CURRENT   READY   AGE
replicaset.apps/tomcat-6b6fb9c8f6   2         2         2       4m33s
    
```

3) 观察ingress条目生成情况
```bash
[root@centos-1 chapter6]# kubectl get ingress -n eshop
NAME     HOSTS           ADDRESS   PORTS   AGE
tomcat   eshop.foo.com             80      5m23s
    
[root@centos-1 chapter6]#kubectl describe ingress tomcat -n eshop
Name:             tomcat
Namespace:        eshop
Address:          
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host           Path  Backends
  ----           ----  --------
  eshop.foo.com  
                 /   tomcat:8080 (10.244.1.51:8080,10.244.2.34:8080)
```

4) 进入ingress-nginx，查看配置文件生成情况
```bash
kubectl exec -it pod/nginx-ingress-controller-dc55d4998 -zxnrd -n ingress-nginx -- /bin/sh
    
more /etc/nginx/nginx.conf
	## start server eshop.foo.com
 	server {
 		server_name eshop.foo.com ;
 		
 		listen 80;
	        set $proxy_upstream_name "-";
 		
 		location / {
 			
 			set $namespace      "eshop";
 			set $ingress_name   "tomcat";
 			set $service_name   "tomcat";
 			set $service_port   "8080";
 			set $location_path  "/";
 			
 			rewrite_by_lua_block {
 				
 				balancer.rewrite()
 				
 			}

```

5) 新增Mac本机Hosts文件，并测试，至此部署已经完成
```bash
192.168.0.104 eshop.foo.com
    
dingqishideMacBook-Pro:~ dingqishi$ curl -I eshop.foo.com:30080
HTTP/1.1 200 
Server: nginx/1.15.5
Date: Tue, 03 Dec 2019 10:47:23 GMT
Content-Type: text/html;charset=UTF-8
Connection: keep-alive
Vary: Accept-Encoding


```

**4.相关文档**

Ingress-nginx:
https://github.com/kubernetes/ingress-nginx

部署文档：https://kubernetes.github.io/ingress-nginx/deploy/

K8s官方例子：https://kubernetes.io/docs/concepts/services-networking/ingress/
