**附录：参考文档**

* 官方：

    https://kubernetes.io/docs/concepts/services-networking/network-policies/
* jimmysong：

    https://jimmysong.io/kubernetes-handbook/concepts/network-policy.html
    
* Calico官网：
    
    https://docs.projectcalico.org/v3.10/getting-started/kubernetes/installation/flannel

**1.应用场景**

* 多租户隔离（名称空间级别、Pod级别）
* 精准的流控


    flannel本身不支持Network Policy，需要使用calico、istio等service mesh，可参考附录中的最后一篇文档进行flannel+calcio结合
    Network Policy 的作用对象是 Pod，也可以应用到 Namespace 和集群的 Ingress、Egress 流量。
    Network Policy 是作用在 L3/4 层的，即限制的是对 IP 地址和端口的访问，如果需要对应用层做访问限制需要使用如 Istio 这类 Service Mesh。

**2.核心参数讲解**

![networkploicy](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/20.Network-Policy/networkpolicy.png)


```text
Ingress（类似安全组的内外网入）：
    能接受哪些客户端的访问（-from，ports：自己端口）
        
egress（类似安全组的内外网出）：
    能访问哪些目标（-to，ports：目标端口）
    
备注：
    当对应区域有多条规则时，满足其一即可
```

**3.Installing Calico for policy and flannel for networking**
   
   参考文档见附录
   
1) 因为我们初始化集群配置flannel的时候用的是10.244.0.0/16，所以不需要调整calico的配置文件，直接下载下来，apply就好
```bash
curl https://docs.projectcalico.org/v3.10/manifests/canal.yaml -O
    
kubectl apply -f canal.yaml
```
2) 等相关pod运行成功之后，我们就可以编辑网络策略进行测试
```bash
[root@centos-1 chapter11]# kubectl get pod -n kube-system
NAME                                      READY   STATUS            RESTARTS   AGE
canal-5jp8z                               2/2     Running           0          22m
canal-85l9r                               2/2     Running           0          22m
canal-mgfzd                               2/2     Running           0          22m
```

**4.Newwork Policy**

1) 帮助命令
```bash
[root@centos-1 chapter11]# kubectl explain netpol
KIND:     NetworkPolicy
VERSION:  networking.k8s.io/v1
```



2) 创建两个namespace，并分别运行pod，其中dev运行服务端，prod中运行客户端进行测试
```bash
#创建namespace
[root@centos-1 chapter11]# kubectl create ns dev
namespace/dev created
[root@centos-1 chapter11]# kubectl create ns prod
namespace/prod created
    
#部署服务端pod
[root@centos-1 chapter11]# kubectl create deployment myapp --image=ikubernetes/myapp:v1 -n dev
deployment.apps/myapp created

#部署客户端pod,pod.yaml，并apply
kubectl apply -f pod.yaml -n prod
```
3) 观察pod情况，并进客户端的交互式接口进行测试，发现pod通信是成功的
```bash
[root@centos-1 chapter11]# kubectl get pod -n dev -o wide
NAME                     READY   STATUS    RESTARTS   AGE     IP           NODE              NOMINATED NODE   READINESS GATES
myapp-5c6976696c-fhn9q   1/1     Running   0          4m31s   10.244.2.2   centos-3.shared   <none>           <none>
    
[root@centos-1 chapter11]# kubectl get pod -n prod -o wide
NAME         READY   STATUS    RESTARTS   AGE   IP           NODE              NOMINATED NODE   READINESS GATES
client-pod   1/1     Running   0          31s   10.244.2.3   centos-3.shared   <none>           <none>
    
    
#测试
[root@centos-1 chapter11]# kubectl exec -it client-pod -n prod -- /bin/sh
/ # ping 10.244.2.2
PING 10.244.2.2 (10.244.2.2): 56 data bytes
64 bytes from 10.244.2.2: seq=0 ttl=63 time=0.265 ms
64 bytes from 10.244.2.2: seq=1 ttl=63 time=0.137 ms

```

4) 这时候，我们编辑deny-all-ingress.yaml（拒绝所有入站流量，且dev内pod不能相互通信）,并apply
```yaml
apiVersion: networking.k8s.io/v1             #dev名称空间下的所有pod，不允许相互访问也不允许被外部访问
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: dev
spec:
  podSelector: {}                         #没指定 就是该名称空间下所有的Pod
#  ingress:                              #补充:注释的这两行表示放行所有入站流量
#  - {}
  policyTypes:
  - Ingress                               #只控制入站流量，没具体定义，就表示一个都不放行
```

5) 查看对应的netpol生成情况
```bash
[root@centos-1 chapter11]# kubectl get netpol -n dev
NAME               POD-SELECTOR   AGE
deny-all-ingress   <none>         6s
    
        
[root@centos-1 chapter11]# kubectl describe netpol -n dev
Name:         deny-all-ingress
Namespace:    dev
Created on:   2019-12-11 14:04:23 +0800 CST
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"annotations":{},"name":"deny-all-ingress","namespace":"dev"},"spe...
Spec:
  PodSelector:     <none> (Allowing the specific traffic to all pods in this namespace)
  Allowing ingress traffic:
    <none> (Selected pods are isolated for ingress connectivity)
  Allowing egress traffic:
    <none> (Selected pods are isolated for egress connectivity)
  Policy Types: Ingress

```

6) 返回我们直接的交互式接口，测试发现，现在已经访问不到dev名称空间下面的资源了，和预期隔离配置一致
（同理：dev内的pod也不能相互访问）
```bash
/ # wget -o - -q 10.244.2.2
^C
    
/ # ping 10.244.2.2
PING 10.244.2.2 (10.244.2.2): 56 data bytes

```
7) 接下来我们需要开放ingress规则，使得他们能够访问,首先给prod的名称空间打标签，以便network policy能够用选择器选中
```bash
[root@centos-1 chapter11]# kubectl label ns prod name=prod
namespace/prod labeled
    
[root@centos-1 chapter11]#  kubectl get ns --show-labels
NAME                   STATUS   AGE     LABELS
default                Active   15d     <none>
dev                    Active   23m     <none>
ingress-nginx          Active   5d23h   app.kubernetes.io/name=ingress-nginx,app.kubernetes.io/part-of=ingress-nginx
kube-node-lease        Active   15d     <none>
kube-public            Active   15d     <none>
kube-system            Active   15d     <none>
kubernetes-dashboard   Active   25h     <none>
prod                   Active   19m     name=prod
```

8) 新增dev-allow-prod-ingress配置文件，并apply
```yaml
apiVersion: networking.k8s.io/v1             #dev名称空间下的所有pod，不允许相互访问也不允许被外部访问
kind: NetworkPolicy
metadata:
  name: dev-allow-prod-ingress
  namespace: dev
spec:
  podSelector: {}                         #没指定 就是该名称空间下所有的Pod
  ingress:
  - from:
    - namespceSelector:
      matchLabels:
        name: prod                 #指定prod名称空间下的pod可以进行访问
  policyTypes:
  - Ingress                               #只控制入站流量，没具体定义，就表示一个都不放行
```

9) 观察配置
```bash
[root@centos-1 chapter11]# kubectl describe netpol dev-allow-prod-ingress -n dev
Name:         dev-allow-prod-ingress
Namespace:    dev
Created on:   2019-12-11 14:58:06 +0800 CST
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"annotations":{},"name":"dev-allow-prod-ingress","namespace":"dev"...
Spec:
  PodSelector:     <none> (Allowing the specific traffic to all pods in this namespace)
  Allowing ingress traffic:
    To Port: <any> (traffic allowed to all ports)
    From:
      NamespaceSelector: name=prod
  Allowing egress traffic:
    <none> (Selected pods are isolated for egress connectivity)
  Policy Types: Ingress

```

10) 继续进程测试，发现此时已可以访问dev下的pod资源
```bash
[root@centos-1 chapter11]# kubectl exec -it client-pod -n prod -- /bin/sh
/ # ping 10.244.2.2
PING 10.244.2.2 (10.244.2.2): 56 data bytes
64 bytes from 10.244.2.2: seq=0 ttl=63 time=0.166 ms
64 bytes from 10.244.2.2: seq=1 ttl=63 time=0.091 ms

```