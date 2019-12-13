# Taints and Tolerations（污点和容忍度）

Taint（污点）和Toleration（容忍）可以作用于node和pod上，其目的是优化pod在集群间的调度，这跟节点亲和性类似，
只不过它们作用的方式相反，用作确保pod不会被调度在指定的节点上
 
- 概念引入
- Taints Effect
- How to match?
- Taint based Evictions
- 常用命令
- 实际操作
- 附录：参考文档

### 概念引入 

![taints](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/23.%E6%B1%A1%E7%82%B9%E5%92%8C%E5%AE%B9%E5%BF%8D%E5%BA%A6/taintsandtolerations.png)
 

如图所示，node节点上分别有云、五角星、十字架这三个污点；Pod-A上有云和五角星的污点容忍度，Pod—B上则没有
容忍度。

调度结果：
```text
Pod-A：调度至node-1和node-3
Pod-B: 只会调度至node-3
注意：Taints存在于node，Tolerations存在于pod
```
 
###  Taints Effect

参数  | 描述  
---- | ----- 
key  | string类型，最大长度253个字符，必须小写或数字开头
value  | string类型，最大长度63个字符，必须小写或数字开头
effect:Noschedule | 1.不允许非法pod调度上来。2.taints变更，不会驱离非法的pod
effect:PreferNoSchedule | 1.最好不要把非法pod调度上来。2.taints变更，不会驱离非法的pod
effect:NoExecute | 1.不允许非法pod调度上来。2.taints变更，会驱离非法的pod，驱离时间为tolerationSeconds


### How to match?
无论是Taints还是Tolerations（污点和容忍度），都有三个字段：key、value和effect，具体匹配规则如下：

operator | 描述
---- | ----- 
Equal | key、value和effect必须都相同
Exists | key和effect必须相同

需要注意operator没指定的话，默认是Equal
```text
Note:
有两个特殊用法:
#Exists：空字段key，会匹配所有的keys, values and effects，意味着容忍所有
tolerations:
- operator: "Exists"
    
    
#Exists：空effect，会匹配所有的key: "key"的effect
tolerations:
- key: "key"
  operator: "Exists"

```

### Taint based Evictions
从K8S1.6开始支持了很多封装好的驱离式effect，node controller会根据实际情况，自动给node节点打上对应污点，从而保证了
Pod调度的合理性和安全性，具体如下所示：

taint effect | 描述
---- | ----- 
node.kubernetes.io/not-ready | 节点未就绪
node.kubernetes.io/unreachable | 节点不可达
node.kubernetes.io/out-of-disk | 节点地盘耗尽 
node.kubernetes.io/memory-pressure | 内存存在压力
node.kubernetes.io/disk-pressure | 磁盘存在压力
node.kubernetes.io/network-unavailable | 网络不可达
node.kubernetes.io/unschedulable | Node is unschedulable
node.cloudprovider.kubernetes.io/uninitialized | 节点未初始化，不可用


### 常用命令
 
命令 | 说明
---- | ----- 
kubectl taint -h | taint的帮助命令
kubectl taint nodes foo dedicated=special-user:NoSchedule | 给node打污点，修改需要使用--overwrite=true
kubectl taint nodes foo dedicated:NoSchedule- | 移除taint污点

### 实际操作

1) 首先给centos-3这个节点打上污点,effect为NoSchedule
```bash
kubectl taint nodes centos-3.shared department=ops:NoSchedule

```

2) 编辑filebeat-ds,并apply 
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: filebeat-ds
  labels:
    app: filebeat
spec:
  selector:
    matchLabels:
      app: filebeat
  template:
    metadata:
      labels:
        app: filebeat
    spec:
      containers:
      - name: filebeat
        image:  prima/filebeat:6.4.2
        env:
        - name: REDIS_HOST
          value: db.ikubernetes.is:6379
        - name: LOG_LEVEL
          value: info

```
3) 发现ds并没有部署到centos-3节点，污点生效，且和预期符合一致
```bash
[root@centos-1 chapter12]# kubectl get pod -o wide
NAME                     READY   STATUS              RESTARTS   AGE    IP           NODE              NOMINATED NODE   READINESS GATES
filebeat-ds-tg7gf        0/1     ContainerCreating   0          3m2s   <none>       centos-2.shared   <none>           <none>
ngx-new-cb79d555-2c7qq   1/1     Running             0          2d1h   10.244.1.7   centos-2.shared   <none>           <none>

```

4) delete之前的yaml，我们重新编辑file-ds-tolerations.yaml（增加容忍度），并apply
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: filebeat-ds
  labels:
    app: filebeat
spec:
  selector:
    matchLabels:
      app: filebeat
  template:
    metadata:
      labels:
        app: filebeat
    spec:
      containers:
      - name: filebeat
        image:  prima/filebeat:6.4.2
        env:
        - name: REDIS_HOST
          value: db.ikubernetes.is:6379
        - name: LOG_LEVEL
          value: info
      tolerations:
      - key: "department"
        operator: "Equal"
        value: "ops"
        effect: "NoSchedule"
```

5) 观察pod，发现centos-3.shared已经运行pod，新增的容忍度功能成功
```bash
[root@centos-1 chapter12]# kubectl get pod -o wide
NAME                     READY   STATUS              RESTARTS   AGE     IP           NODE              NOMINATED NODE   READINESS GATES
filebeat-ds-l2png        0/1     ContainerCreating   0          2m43s   <none>       centos-2.shared   <none>           <none>
filebeat-ds-qq2nc        0/1     ContainerCreating   0          2m43s   <none>       centos-3.shared   <none>           <none>
```

6) 接下来我们修改node3污点，测试Noschedule策略是否如期一致
```bash
kubectl taint nodes centos-3.shared department=test:NoSchedule --overwrite=true
```
7) 我们发现pod还是在运行，并不会驱离，和预期一致
```bash
[root@centos-1 chapter12]# kubectl get pod -o wide
NAME                     READY   STATUS              RESTARTS   AGE     IP           NODE              NOMINATED NODE   READINESS GATES
filebeat-ds-l2png        0/1     ContainerCreating   0          5m18s   <none>       centos-2.shared   <none>           <none>
filebeat-ds-qq2nc        0/1     ContainerCreating   0          5m18s   <none>       centos-3.shared   <none>           <none>

```

8) 最后，我们将node3的污点effect修改为NoExecute，观察pod是否被驱离（如果没指定tolerationSeconds，就马上驱离）
```bash
kubectl taint nodes centos-3.shared department=test:NoExecute --overwrite=true
```

9) 发现centos-3.shared上已经没有pod了，和预期一致
```bash
[root@centos-1 chapter12]# kubectl get pod -o wide
NAME                     READY   STATUS             RESTARTS   AGE     IP           NODE              NOMINATED NODE   READINESS GATES
filebeat-ds-l2png        0/1     ImagePullBackOff   0          7m37s   10.244.1.7   centos-2.shared   <none>           <none>

```

### 附录：参考文档

* 官方文档：

    https://v1-16.docs.kubernetes.io/docs/concepts/configuration/taint-and-toleration/
    
