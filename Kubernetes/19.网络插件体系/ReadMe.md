**1.常用插件对比**

* Flannel（简单、使用居多）：基于Vxlan技术（叠加网络+二层隧道），不支持网络策略
* Calico（较复杂，使用率少于Flannel）：也可以支持隧道网络，但是是三层隧道（IPIP），支持网络策略

**2.Flannel架构图**



说明：

* 配置清单：

    https://github.com/coreos/flannel/blob/master/Documentation/configuration.md
* flannel的网络地址是10.244.0.0/16,默认每个子网的掩码长度为24，如图所示
* K8s节点之间（Node）通过Vxlan技术进行通信，根据node情况，
会把flannel的16位网络地址拆分成多个24位网络地址，供各Node进行分配
* 每个Node节点按序占用一个C类地址，对应节点上面的Podip是在该C类地址中按规则分配的。

* 配置实例：
    
    SubnetLen：
    
    定义每个子网的掩码长度，默认为24，那么10.244.0.0/16就会被分成255个子网，就说明此时K8s集群
  最大支持255个节点（Node），其中每个Node节点都有使用一个子网，每个子网可以分配多少个主机位，
    就代表每个Node节点可以运行的Pod数量（255）   
    
    SubnetMin：
     
    定义Pod网络的起始，默认是从10.244.0.0/24开始，也可以定义从10.244.10.0/24开始，也不一定要使用10开始的网络
    
    SubnetMax：
    
    与上面相反，定义Pod网络的结束

* 配置样例
```json
{
	"Network": "10.0.0.0/8",
	"SubnetLen": 20,
	"SubnetMin": "10.10.0.0",
	"SubnetMax": "10.99.0.0",
	"Backend": {
		"Type": "udp",
		"Port": 7890
	}
}

```