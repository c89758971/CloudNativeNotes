**1.基础知识**
```text
iptables和ipvs：4层
ingress：7层 
    
Ingress Controller：
    将ingress配置信息转换为自身配置的应用程序
        
Ingress：
    只定义流量转发和调度的通用格式的配置信息

```

**2.同类技术选型对比**

TBD


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
    - port: 80     #Pod端口
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


**4.相关文档**

Ingress-nginx:
https://github.com/kubernetes/ingress-nginx

部署文档：https://kubernetes.github.io/ingress-nginx/deploy/

K8s官方例子：https://kubernetes.io/docs/concepts/services-networking/ingress/
