# 二进制部署高可用k8s集群

本次采用二进制文件方式部署高可用k8s集群

- 高可用原则
- 高可用架构
- 环境准备
- etcd集群部署

### 高可用原则
```text
生产环境：
    高可用etcd集群（需定期备份），建立3、5或7个节点（奇数个节点）
    高可用Master：
        kube-apiserver无状态，可多实例部署：
            借助于Haproxy、nginx或keepalived进行vip流量实现多实例冗余，用户和集群客户端通过vip访问    
        kuber-scheduler和kuber-controller-manager：
            只能有一个活动实例，但可以有多个备用（主备模式）
```

### 高可用架构

![高可用架构-1](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/28.%E4%BA%8C%E8%BF%9B%E5%88%B6%E9%83%A8%E7%BD%B2%E9%AB%98%E5%8F%AF%E7%94%A8k8s%E9%9B%86%E7%BE%A4/k8s-ha.png)

### 环境准备

主机名 | ip | 组件 | 角色
---- | ----- | ----- | -----
k8s-etcd-mater01.shared | 192.168.0.111 | etcd:3.3.11 | Master
k8s-etcd-mater02.shared | 192.168.0.112 | etcd:3.3.11 | Master
k8s-etcd-mater03.shared | 192.168.0.113 | etcd:3.3.11 | Master

hosts信息和时间同步（略）:
```bash
192.168.0.111   k8s-etcd-mater01.shared   master01 etcd01 etcd01.ilinux.io
192.168.0.112   k8s-etcd-mater02.shared   master02 etcd02 etcd02.ilinux.io
192.168.0.113   k8s-etcd-mater03.shared   master03 etcd03 etcd03.ilinux.io
```
关闭防火墙：
```bash
systemctl stop firewalld.service
systemctl stop iptables.service
systemctl disable firewalld.service
systemctl disable iptables.service
```
关闭SELINUX：
```bash
#临时关闭：
setenforce 0
    
    
#永久关闭
vi /etc/selinux/config
将SELINUX=enforcing改为SELINUX=disabled 
设置后需要重启才能生效
```
禁用swap设备
```bash
临时禁用： swapoff  -a
    
永久禁用：
vim  /etc/fstab 
注释 /dev/mapper/VolGroup-lv_swap swap 行
```
### etcd集群部署

Master端：
1) 安装3.3.11的etcd
```bash
yum install -y etcd-3.3.11-2.el7.centos
```

2) 可以通过以下命令检查install是否成功
```bash
rpm -ql etcd
```

3) 三台对应修改/etc/etcd/etcd.conf配置文件，其中ETCD_LISTEN_PEER_URLS
、ETCD_LISTEN_CLIENT_URLS、ETCD_NAME、ETCD_INITIAL_ADVERTISE_PEER_URLS和
ETCD_ADVERTISE_CLIENT_URLS需要改成自己对应的信息
```bash
#[Member]
#ETCD_CORS=""
ETCD_DATA_DIR="/var/lib/etcd/default.etcd"
#ETCD_WAL_DIR=""
ETCD_LISTEN_PEER_URLS="http://192.168.0.111:2380"  #集群内相互通信地址
ETCD_LISTEN_CLIENT_URLS="http://192.168.0.111:2379" #客户端访问地址
#ETCD_MAX_SNAPSHOTS="5"
#ETCD_MAX_WALS="5"
ETCD_NAME="etcd01"           #本节点etcd名
#ETCD_SNAPSHOT_COUNT="100000"
#ETCD_HEARTBEAT_INTERVAL="100"
#ETCD_ELECTION_TIMEOUT="1000"
#ETCD_QUOTA_BACKEND_BYTES="0"
#ETCD_MAX_REQUEST_BYTES="1572864"
#ETCD_GRPC_KEEPALIVE_MIN_TIME="5s"
#ETCD_GRPC_KEEPALIVE_INTERVAL="2h0m0s"
#ETCD_GRPC_KEEPALIVE_TIMEOUT="20s"
#
#[Clustering]
ETCD_INITIAL_ADVERTISE_PEER_URLS="http://etcd01:2380"  #集群初始化监听在哪个地址，可用主机名
ETCD_ADVERTISE_CLIENT_URLS="http://etcd01:2379"      #监听在哪个地址，可用主机名 
#ETCD_DISCOVERY=""
#ETCD_DISCOVERY_FALLBACK="proxy"
#ETCD_DISCOVERY_PROXY=""
#ETCD_DISCOVERY_SRV=""
ETCD_INITIAL_CLUSTER="etcd01=http://etcd01:2380,etcd02=http://etcd02:2380,etcd03=http://etcd03:2380"    #静态初始化集群
#ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster"
#ETCD_INITIAL_CLUSTER_STATE="new"
```
4) 逆序依次启动etcd
```bash
systemctl start etcd
```

5) 此时高可用etcd集群已经部署完成（但是内部通信是http，非安全协议）
```bash
[root@k8s-etcd-mater02 /]# etcdctl --endpoints='http://etcd01:2379' member list
b3504381e8ba3cb: name=etcd02 peerURLs=http://etcd02:2380 clientURLs=http://etcd02:2379 isLeader=false
b8b747c74aaea686: name=etcd01 peerURLs=http://etcd01:2380 clientURLs=http://etcd01:2379 isLeader=false
f572fdfc5cb68406: name=etcd03 peerURLs=http://etcd03:2380 clientURLs=http://etcd03:2379 isLeader=true
```