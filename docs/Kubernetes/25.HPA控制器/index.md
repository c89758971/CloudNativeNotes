# Horizontal Pod Autoscaler（HPA控制器）

应用的资源使用率通常都有高峰和低谷的时候，如何削峰填谷，如何提高集群的整体资源利用率，如何让`service`中的`Pod`个数自动调整呢？
这就有赖于`Horizontal Pod Autoscaling`（`HPA`控制器）了！

- 自动伸缩
- HPA简介
- HPA组件交互图
- Before you begin
- 实战-autoscaling/v1
- 介绍-autoscaling/v2beta2
- 附录：参考文档


## 1.自动伸缩

自动伸缩分为两种：水平伸缩和垂直伸缩。

### 1.水平伸缩

水平伸缩
```text
K8S基础资源级别的水平伸缩：
HPA（Horizontal Pod Autoscaling）：
    autoscaling/v1：仅支持cpu采样
    autoscaling/v2beta1：额外增加支持custom metrics（kubernetes1.6+）
    autoscaling/v2beta2：额外增加支持external metrics，multiple metrics和metrics APIs（kubernetes1.6）
```
```text
K8S集群级别的水平伸缩：
CA（Cluster Autoscaler）：通过集成云计算的相关资源申请接口，达到集群级别的动态弹性伸缩效果。

```
### 2.垂直伸缩

- [垂直伸缩](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/autoscaling/vertical-pod-autoscaler.md)
```text
    VPA（Vertical Pod AutoScaler）-垂直伸缩：提升单个Pod的request处理能力（还不成熟）
    AR（Addon Resizer：垂直伸缩工具）：根据实际状态，弹性调整pod的request和limit

```    

## 2.HPA简介

根据对应的`autoscaling/API`版本，`HPA`可以获得监控指标并结合`replication controller`, `deployment`, `replica set `或者`stateful set`自动扩展`Pod`，需要注意的是`DaemonSets`对象是不支持的。


## 3.HPA组件交互图

![HPA组件交互图-1](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/HPA.png)

用户可以通过`CMD`，显示申明一个`HPA`控制器,然后`HPA`控制器根据指标自动调整`RS/Deployment`控制器指标，从而达到自动扩缩容`Pod`的效果。
```bash
kubectl autoscale deployment foo --min=2 --max=5 --cpu-percent=80

```

## 4.Before you begin
使用前，需要`make sure`以下几点：

- `K8S`集群`version 1.2` or `later`
- [metrics-server](https://github.com/kubernetes-sigs/metrics-server)/[Prometheus](https://github.com/coreos/prometheus-operator)

`metrics-server`部署的时候需要注意修改`~/deploy/`对应版本下的`/metrics-server-deployment.yaml`,新增`command`
```yaml
containers:
      - name: metrics-server
        image: k8s.gcr.io/metrics-server-amd64:v0.3.3
        imagePullPolicy: Always
        volumeMounts:
        - name: tmp-dir
          mountPath: /tmp
        command:
                - /metrics-server
                - --kubelet-preferred-address-types=InternalIP
                - --kubelet-insecure-tls
```

否则会碰到如下报错信息：
```bash
unable to fully collect metrics: [unable to fully scrape metrics from source kubelet_summary:mywork: unable to fetch metrics from Kubelet mywork (mywork): Get https://mywork:10250/stats/summary/: dial tcp: i/o timeout, unable to fully scrape metrics from source kubelet_summary:marktest: unable to fetch metrics from Kubelet marktest (marktest): Get https://marktest:10250/stats/summary/: dial tcp: i/o timeout]
```
相应的，如果想集成`prometheus`的`SD`，需要在`K8S`基础资源中进行声明：
```yaml
      annotations:
        # based on your Prometheus config above, this tells prometheus
        # to scrape this pod for metrics on port 80 at "/metrics"
        prometheus.io/scrape: "true"     #允许prometheus自动发现，并抓取数据
        prometheus.io/port: "80"         #数据端口
        prometheus.io/path: "/metrics"   #数据uri

```
## 5.实战-autoscaling/v1

1) 创建压测服务`myapp.yaml`，并`apply`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: default
  labels:
    app: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      name: myapp-pod
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: ikubernetes/myapp:v1
        resources:
          requests:
            cpu: 50m
            memory: 64Mi
          limits:
            cpu: 50m
            memory: 64Mi
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
  labels:
    app: myapp
  namespace: default
spec:
  selector:
    app: myapp
  ports:
  - name: http
    port: 80
    targetPort: 80
  type: NodePort
```
2) 创建`HPA`控制器，并检查
```bash
[root@centos-1 chapter14]# kubectl autoscale deployment myapp --min=1 --max=5 --cpu-percent=1
horizontalpodautoscaler.autoscaling/myapp autoscaled
    
[root@centos-1 chapter14]# kubectl get hpa
NAME    REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
myapp   Deployment/myapp   0%/1%     1         5         2          3s
```

3) 由于`CPU利`用率不足1%，`pod`已经进行了缩容
```bash
[root@centos-1 chapter14]# kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
myapp-d48f86cd4-d8nt5    1/1     Running   0          21m

```
4) 这时，我们需要达到扩容的展示效果，需要在客户端启动压测命令
```bash
while true; do curl http://192.168.0.104:30502;sleep ...1.;done
```

5) 我们发现`pod`已经进行了扩容，虽然`cpu`利用率还是大于`10`，但是我们定义最大pod数量是`5`，所以就不会再扩容了，
和预期效果一致。
```bash
[root@centos-1 chapter14]# kubectl top pod
NAME                     CPU(cores)   MEMORY(bytes)   
myapp-d48f86cd4-d8nt5    24m          2Mi             
ngx-new-cb79d555-x822n   0m           3Mi  
               
[root@centos-1 chapter14]# kubectl top pod
NAME                     CPU(cores)   MEMORY(bytes)   
myapp-d48f86cd4-8xdts    5m           2Mi             
myapp-d48f86cd4-bdlr2    5m           2Mi             
myapp-d48f86cd4-d8nt5    5m           2Mi             
myapp-d48f86cd4-mll6m    5m           2Mi             
myapp-d48f86cd4-rlszf    5m           2Mi             
ngx-new-cb79d555-x822n   0m           3Mi 
                
[root@centos-1 chapter14]# kubectl get hpa
NAME    REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
myapp   Deployment/myapp   10%/1%    1         5         5          4m8s
```

## 6.介绍-autoscaling/v2beta2

`autoscaling/v2beta2`接口中提供了丰富的[custom metrics](https://v1-16.docs.kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)，如`Pod`级别内建指标以及第三发可集成的指标。
也可以参阅本页相关`yaml`附件，


## 7.参考文档

* 官方文档：

    https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/

    https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/
    

* jimmysong.io：

    https://jimmysong.io/kubernetes-handbook/concepts/horizontal-pod-autoscaling.html