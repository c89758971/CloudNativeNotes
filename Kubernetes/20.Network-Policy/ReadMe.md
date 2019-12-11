**附录：参考文档**

* https://jimmysong.io/kubernetes-handbook/concepts/network-policy.html
* https://docs.projectcalico.org/v3.10/getting-started/kubernetes/installation/flannel

**1.应用场景**

* 多租户隔离（名称空间级别、Pod级别）
* 精准的流控


    flannel本身不支持Network Policy，需要使用calico、istio等service mesh，可参考附录中的第二篇文档进行flannel+calcio结合
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
