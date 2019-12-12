# Taints and Tolerations（污点和容忍度）

Taint（污点）和Toleration（容忍）可以作用于node和pod上，其目的是优化pod在集群间的调度，这跟节点亲和性类似，
只不过它们作用的方式相反，用作确保pod不会被调度在指定的节点上
 
- 概念引入
- Taints Effect
- How to match?
- Taint based Evictions

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
effect：Noschedule | 1.不允许非法pod调度上来。2.taints变更，不会驱离非法的pod
effect：PreferNoSchedule | 1.最好不要把非法pod调度上来。2.taints变更，不会驱离非法的pod
effect：NoExecute | 1.不允许非法pod调度上来。2.taints变更，会驱离非法的pod，驱离时间为tolerationSeconds


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


 
 
 
 
### 附录：参考文档

* 官方文档：

    https://v1-16.docs.kubernetes.io/docs/concepts/configuration/taint-and-toleration/
    
