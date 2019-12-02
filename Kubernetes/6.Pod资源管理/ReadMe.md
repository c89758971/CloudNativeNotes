**1.标签**
```bash
#帮助命令
kubectl label -h
    
    
#相关查询命令
[root@centos-1 dingqishi]#    kubectl get pod --show-labels
NAME                     READY   STATUS    RESTARTS   AGE     LABELS
ngx-new-cb79d555-gqwf8   1/1     Running   0          4h57m   app=ngx-new,pod-template-hash=cb79d555
ngx-new-cb79d555-hcdr9   1/1     Running   0          5h9m    app=ngx-new,pod-template-hash=cb79d555
    
[root@centos-1 dingqishi]#    kubectl get pod --show-labels -A -l app=flannel
NAMESPACE     NAME                          READY   STATUS    RESTARTS   AGE     LABELS
kube-system   kube-flannel-ds-amd64-bc56m   1/1     Running   7          2d23h   app=flannel,controller-revision-hash=67f65bfbc7,pod-template-generation=1,tier=node
kube-system   kube-flannel-ds-amd64-ltp9p   1/1     Running   0          2d23h   app=flannel,controller-revision-hash=67f65bfbc7,pod-template-generation=1,tier=node
kube-system   kube-flannel-ds-amd64-v9gmq   1/1     Running   10         2d23h   app=flannel,controller-revision-hash=67f65bfbc7,pod-template-generation=1,tier=node
    
[root@centos-1 dingqishi]#    kubectl get pod  -A -l app=flannel -L app
NAMESPACE     NAME                          READY   STATUS    RESTARTS   AGE     APP
kube-system   kube-flannel-ds-amd64-bc56m   1/1     Running   7          2d23h   flannel
kube-system   kube-flannel-ds-amd64-ltp9p   1/1     Running   0          2d23h   flannel
kube-system   kube-flannel-ds-amd64-v9gmq   1/1     Running   10         2d23h   flannel
```

**2.资源注解（annotation）**
    
不受字符数量的限制，但不用用于标签的筛选，仅用于为资源提供“元数据”信息
```bash
#帮助命令
kubectl annotate -h

```
    
**3.探针**

* liveness：
    
    健康状态检查，用于检测Pod的健康性，后续的动作会重启Pod
    
1) 帮助文档
```bash
kubectl explain pods.spec.containers.livenessProbe
```

2) 编辑liveness-exec.yaml，并apply -f生成pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness-exec
  name: liveness-exec
spec:
  containers:
  - name: liveness-demo
    image: busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - test
        - -e
        - /tmp/healthy
```
3) 观察pod情况，发现30秒后，pod探测不到/tmp/healthy文件，并进行了重启操作，RESTARTS为1
```bash
[root@centos-1 chapter4]# kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
liveness-exec            1/1     Running   1          2m39s
ngx-new-cb79d555-gqwf8   1/1     Running   0          2d2h
ngx-new-cb79d555-hcdr9   1/1     Running   0          2d2h
    
describe pod liveness-exec
    State:          Running
      Started:      Sat, 30 Nov 2019 14:17:31 +0800
    Last State:     Terminated
      Reason:       Error
      Exit Code:    137
      Started:      Sat, 30 Nov 2019 14:16:03 +0800
      Finished:     Sat, 30 Nov 2019 14:17:25 +0800
    Ready:          True
    Restart Count:  1
    Liveness:       exec [test -e /tmp/healthy] delay=0s timeout=1s period=10s #success=1 #failure=3

```

4) 同理可使用本页的liveness-http.yaml进行学习和实践

* readiness：

    就绪状态检查，没有重启Pod权利，用于为Service流量分发作为依据

1) 帮助文档
```bash
kubectl explain pods.spec.containers.readinessProbe
```

2) 编辑readiness-exec.yaml，并apply -f生成pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: readiness-exec
  name: readiness-exec
spec:
  containers:
  - name: readiness-demo
    image: busybox
    args: ["/bin/sh", "-c", "while true; do rm -f /tmp/ready; sleep 30; touch /tmp/ready; sleep 300; done"]
    readinessProbe:
      exec:
        command: ["test", "-e", "/tmp/ready"]
      initialDelaySeconds: 5
      periodSeconds: 5
```

3) 观察发现，readiness-exec启动后并没有直接进入就绪状态，而是探测到有/tmp/ready文件后，才变成1/1
```bash
readiness-exec           0/1     Pending             0          0s      <none>        <none>            <none>           <none>
readiness-exec           0/1     Pending             0          0s      <none>        centos-2.shared   <none>           <none>
readiness-exec           0/1     ContainerCreating   0          0s      <none>        centos-2.shared   <none>           <none>
readiness-exec           0/1     Running             0          11s     10.244.1.34   centos-2.shared   <none>           <none>
readiness-exec           1/1     Running             0          43s     10.244.1.34   centos-2.shared   <none>           <none>
```

**4.Pod对象的相位**

   Pod一共有5个状态，分为Pending、Running、Succeeded、Failed和Unknown，其中：
```text
Pending：
    Pod未完成调度，通常由于没有符合调度需求的node节点
Running：
    Pod已经调度成功，且已经被kubelet创建完成
Succeeded：
    Pod中的所有容器已经成功且不会被重启
Failed：
    Pod中至少有一个容器终止失败
Unknown：
    Apiserver无法获取Pod对象的状态信息，通常由于其无法与所在工作节点的kubelet通信导致

```

**5.Pod Security(十分重要)**
    
Pod对象的安全上下文用于设定Pod或容器的权限和访问控制功能，其支持设置的常用属性包括以下几个方面：
```text
1）基于用户ID（UID）和组ID（GID）控制访问对象（如文件）时的权限
2）以特权或非特权的方式运行
3）通过Linux Capabilities为其提供部分特权
4）基于Seccomp过滤进程的系统调用
5）基于SELinux的安全标签
6）是否能够进行权限升级
```

其中包括2个安全级别：

    两个级别：
         kubectl explain pod.spec.securityContext
         kubectl explain pod.spec.containers.[].securityContext.capabilities
 

最后，看一个配置清单：以uid为1000的非特权用户运行busybox容器，并禁止权限升级
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-securitycontext
spec:
  containers:
  - name: busybox
    image: busybox
    command: ["/bin/sh","-c","sleep 86400"]
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      allowPrivilegeEscalation: false
```
测试如下：
```bash
[root@centos-1 ~]# kubectl exec -it   pod-with-securitycontext -- /bin/sh
/ $ ps -ef|grep busy
   25 1000      0:00 grep busy
/ $ mkdir 1
mkdir: can't create directory '1': Permission denied
```

**6.资源配额**

1) 查看文档
```bash
kubectl explain pod.spec.containers.resources
```

2) 参数说明
```text
limits：
    上限配额，最多吃的资源量
requests：
    下限要求，低于下限，pod会启动失败

```

3) OOM系统级别常出现的情况
```text
    节点内存太少
    limits限制的太小
```

4) 资源配额demo
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: stress-pod
spec:
  containers:
  - name: stress
    image: ikubernetes/stress-ng
    command: ["/usr/bin/stress-ng", "-c 1", "-m 1", "--metrics-brief"]
    resources:
      requests:
        memory: "128Mi"
        cpu: "200m"
      limits:
        memory: "512Mi"
        cpu: "400m"
```

**7.Pod服务质量类别（ QoS Class）**

kubectl describe pod可查看对应的服务质量类别,共有以下三类：
```text
Guaranteed: 必须保证,requests和limits都有，且都相等，最高优先级
Burstable: 尽量满足，requests或limits有一个，中等优先级
BestEffort: 未设置requests或limits属性的pod资源，优先级最低

```

**8.Pod中断预算**

PDB（PodDisruptionBudget）中断预算由k8s1.4版本引入，用于为那些自愿的中断做好预算方案，
限制可自愿中断的最大Pod副本数量或确保最少可用的Pod副本数，以确保服务的高可用性。
1) 分类
```text
非自愿中断：
    由不可控的外界因素所导致的Pod中断退出操作，例如：硬件或系统故障、网络故障、节点故障等
    
        
自愿中断：
    由用户特地执行的管理操作导致的Pod中断，例如：排空节点、人为删除Pod对象等
```