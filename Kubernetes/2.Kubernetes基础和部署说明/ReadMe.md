**1. ip辨析：**
```text
node ip：
    配置在节点的网卡上
    
pod ip：
    配置在容器的虚拟网卡上
    
service ip（cluster ip）：
    不进行配置，只存在于iptables和DNS的解析记录中

```    

**2. 部署要点：**
```text
测试环境：
    可以使用单Master节点，单etcd实例
    Node节点按需配置
    Nfs或glusterfs
    
生产环境：
    高可用etcd集群（需定期备份），建立3、5或7个节点
    高可用Master：
        kube-apiserver无状态，可多实例部署：
            借助于Haproxy、nginx或keepalived进行vip流量实现多实例冗余    
        kuber-scheduler和kuber-controller-manager：
            只能有一个活动实例，但可以有多个备用（主备模式）
            
    多Node主机，数量越多，冗余能力越强；
    Ceph、glusterfs、iSCSI、FC SAN及各种云存储等。

```
