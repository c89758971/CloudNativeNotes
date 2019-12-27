# Prometheus
云原生体系下，你可以使用operator、helm、kube三种方式进行更好的管理prometheus。
本章节仅使用了最简单的yaml的方式进行部署，为了支撑Istio章节的演示说明所需。
你也可以把这些yaml封装成helm的charts进行管理。
 
- Prometheus、Grafana部署
- Grafana配置


### Prometheus、Grafana部署

组件 |  访问地址
---- | ----- 
prometheus | 192.168.0.114:30003
grafana | 192.168.0.114:31759/login
grafana-ingress | k8s.grafana:31759/login


本小节除了提供常规的NodePort访问类型外，还提供了ingress配置，如果想使用ingress访问，你需要提前集成好ingress-controllers，
具体配置详见：[Kubernetes/11.ingress资源](https://github.com/Aaron1989/CloudNativeNotes/tree/master/Kubernetes/11.Ingress%E8%B5%84%E6%BA%90)

1) 部署方式，请按照本章节提供的配置文件，按一下顺序apply就行，默认配置的ns在kube-system
```bash
#安装node-exporter
kubectl apply -f  node-exporter.yaml 
    
#安装prometheus组件
kubectl apply -f  prometheus/rbac-setup.yaml
kubectl apply -f  prometheus/configmap.yaml 
kubectl apply -f  prometheus/prometheus.deploy.yml 
kubectl apply -f  prometheus/prometheus.svc.yml 
    
#安装 grafana 组件
kubectl apply -f   grafana/grafana-deploy.yaml
kubectl apply -f   grafana/grafana-svc.yaml
kubectl apply -f   grafana/grafana-ingress.yaml
```

2) 此时你可以看到相关信息，如下所示
```bash
[root@k8s-etcd-mater01 grafana]# kubectl get svc -n kube-system
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                  AGE
grafana         NodePort    10.96.134.177   <none>        3000:31759/TCP           46m
kube-dns        ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP,9153/TCP   3d23h
node-exporter   NodePort    10.109.54.128   <none>        9100:31672/TCP           51m
prometheus      NodePort    10.98.188.149   <none>        9090:30003/TCP           49m
    
[root@k8s-etcd-mater01 grafana]# kubectl get ingress -n kube-system
NAME      HOSTS         ADDRESS   PORTS   AGE
grafana   k8s.grafana             80      46m

```

3) 此时你已经可以访问相关页面了
```bash
#prometheus
http://192.168.0.114:30003
    
#grafana（默认用户密码 admin admin）
http://192.168.0.114:31759/login
    
#grafana-ingress（默认用户密码 admin admin），你需要自行配置好hosts文件或者DNS解析    
http://k8s.grafana:31759/login    
```

### Grafana配置

1) 配置prometheus数据源，并设置成default（略）
2) 导入dashboard面板，配置模版的序号为315
![grafana-dashboard-import](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/grafana-dashboard-import.png)
3) 此时一个基础且较完善的k8s集群监控图也已经出来了
![grafana-dashboard](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/grafana-dashboard.png)
