# 二进制部署高可用k8s集群

本次采用二进制文件方式部署https高可用k8s集群，集群规模可支撑254个节点。
如果需要调整，请修改/etc/kubernetes/controller-manager中的"--node-cidr-mask-size=24"字段


- 高可用设计原则
- 高可用架构
- 环境准备
- etcd集群部署
- Docker环境准备
- K8S-Master配置

### 高可用设计原则
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

组件 | 版本 
---- | ----- 
kubernetes | v1.13.4
etcd | 3.3.11
dockerce | 19.03.5 

主机名 | ip | 组件 | 角色 | 操作系统
---- | ----- | ----- | ----- | -----
k8s-etcd-mater01.shared | 192.168.0.111 | etcd:3.3.11 | Master | Centos6.2
k8s-etcd-mater02.shared | 192.168.0.112 | etcd:3.3.11 | Master | Centos6.2
k8s-etcd-mater03.shared | 192.168.0.113 | etcd:3.3.11 | Master | Centos6.2



hosts信息和时间同步（略）:
```bash
192.168.0.111   k8s-etcd-mater01.shared   k8s-master01 etcd01 etcd01.ilinux.io k8s-master01.ilinux.io
192.168.0.112   k8s-etcd-mater02.shared   k8s-master02 etcd02 etcd02.ilinux.io k8s-master02.ilinux.io
192.168.0.113   k8s-etcd-mater03.shared   k8s-master03 etcd03 etcd03.ilinux.io k8s-master03.ilinux.io
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
更新nss curl libcurl（否则git clone会报错）
```bash
yum update -y nss curl libcurl
```
### etcd集群部署

文件 | 路径 | 说明
---- | ----- | ----- 
etcd.conf | /etc/etcd/ | 配置文件 
pki/* | /etc/etcd/ | 证书文件
k8s.etcd | /var/lib/etcd/ | 数据文件，需定期备份 

Tips：
```text
下面展示如何从0->http集群->https集群的建设全过程，如果打算https一步到位，可跳过4和5两个步骤进行配置。
```

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
systemctl enable etcd
```

5) 此时高可用etcd集群已经部署完成（但是内部通信是http，非安全协议）
```bash
[root@k8s-etcd-mater02 /]# etcdctl --endpoints='http://etcd01:2379' member list
b3504381e8ba3cb: name=etcd02 peerURLs=http://etcd02:2380 clientURLs=http://etcd02:2379 isLeader=false
b8b747c74aaea686: name=etcd01 peerURLs=http://etcd01:2380 clientURLs=http://etcd01:2379 isLeader=false
f572fdfc5cb68406: name=etcd03 peerURLs=http://etcd03:2380 clientURLs=http://etcd03:2379 isLeader=true
```

6) 将cert-generator目录git clone到本地，然后使用bash gencerts.sh etcd生成etcd证书，默认域名是ilinux.io，可自行填写，然后回车
```bash
[root@k8s-etcd-mater01 cert-generator]# bash gencerts.sh etcd
Enter Domain Name [ilinux.io]: 

```

7) 证书生成并归档结果如下：
```bash
[root@k8s-etcd-mater01 k8s-certs-generator]# tree etcd
etcd
├── patches
│   └── etcd-client-cert.patch        
└── pki
    ├── apiserver-etcd-client.crt     #让apiserver作为客户端与etcd集群通信的证书     
    ├── apiserver-etcd-client.key     #让apiserver作为客户端与etcd集群通信的证书
    ├── ca.crt                        #etcd https测试功能是否成功的证书
    ├── ca.key                        #etcd https测试功能是否成功的证书
    ├── client.crt               #客户端证书,apiserver也可以用这一个
    ├── client.key               #客户端私钥,apiserver也可以用这一个
    ├── peer.crt                 #etcd集群对等通信证书  
    ├── peer.key                 #etcd集群对等通信私钥  
    ├── server.crt               #服务端证书
    └── server.key               #服务端私钥

```

8) 证书分发至各Master节点的/etc/etcd/目录下
```bash
cd etcd
#本机
cp -rp pki/ /etc/etcd/ -a
    
#各节点
scp -rp pki/ etcd02:/etc/etcd/
scp -rp pki/ etcd03:/etc/etcd/
```
9) 修改各Master节点的/etc/etcd/etcd.conf配置文件中的Security段落
```yaml
#[Security]
ETCD_CERT_FILE="/etc/etcd/pki/server.crt"
ETCD_KEY_FILE="/etc/etcd/pki/server.key"
ETCD_CLIENT_CERT_AUTH="true"                        #服务端必须验证客户端证书 
ETCD_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"
#ETCD_AUTO_TLS="false"
ETCD_PEER_CERT_FILE="/etc/etcd/pki/peer.crt"
ETCD_PEER_KEY_FILE="/etc/etcd/pki/peer.key"
ETCD_PEER_CLIENT_CERT_AUTH="true"                    #集群间必须相互验证证书
ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"
#ETCD_PEER_AUTO_TLS="false"
```
10) 将第三步修改的http全改成https，ETCD_DATA_DIR修改成新地址，ETCD_NAME="etcd03.ilinux.io"修改成和ca域名设置时的Domain Name保持一致，最后修改ETCD_INITIAL_CLUSTER_TOKEN="k8s-etcd-cluster",完成配置文件可参阅etcd/etcd.conf
```yaml
[Member]
ETCD_DATA_DIR="/var/lib/etcd/k8s.etcd"
ETCD_LISTEN_PEER_URLS="https://192.168.0.113:2380"
ETCD_LISTEN_CLIENT_URLS="https://192.168.0.113:2379"
ETCD_NAME="etcd03.ilinux.io"
  
#[Clustering]
ETCD_INITIAL_ADVERTISE_PEER_URLS="https://etcd03.ilinux.io:2380"
ETCD_ADVERTISE_CLIENT_URLS="https://etcd03.ilinux.io:2379"
ETCD_INITIAL_CLUSTER="etcd01.ilinux.io=https://etcd01.ilinux.io:2380,etcd02.ilinux.io=https://etcd02.ilinux.io:2380,etcd03.ilinux.io=https://etcd03.ilinux.io:2380"
ETCD_INITIAL_CLUSTER_TOKEN="k8s-etcd-cluster"
  
#[Security]
ETCD_CERT_FILE="/etc/etcd/pki/server.crt"
ETCD_KEY_FILE="/etc/etcd/pki/server.key"
ETCD_CLIENT_CERT_AUTH="true"                 #服务端必须验证客户端证书
ETCD_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"
ETCD_PEER_CERT_FILE="/etc/etcd/pki/peer.crt"
ETCD_PEER_KEY_FILE="/etc/etcd/pki/peer.key"
ETCD_PEER_CLIENT_CERT_AUTH="true"             #集群间必须相互验证证书
ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"

```

11) 全部停止并重启etcd，并用之前生成功能测试的ca客户端证书进行访问，至此etcd https集群已经部署完成
```bash
#全停止
systemctl stop etcd
    
#全启动
systemctl start etcd
    
#使用证书查看集群状态    
[root@k8s-etcd-mater01 etcd]# etcdctl --endpoints='https://etcd01.ilinux.io:2379' --cert-file=/etc/etcd/pki/client.crt --key-file=/etc/etcd/pki/client.key --ca-file=/etc/etcd/pki/ca.crt cluster-health
member 1f22dc5568642e6f is healthy: got healthy result from https://etcd03.ilinux.io:2379
member 433f227ff9ad65cd is healthy: got healthy result from https://etcd02.ilinux.io:2379
member c4eb31a06cd36dd7 is healthy: got healthy result from https://etcd01.ilinux.io:2379
cluster is healthy

```
### Docker环境准备

安装步骤请参考[使用Kubeadm部署k8s集群]('https://github.com/Aaron1989/CloudNativeNotes/tree/master/Kubernetes/3.%E4%BD%BF%E7%94%A8Kubeadm%E9%83%A8%E7%BD%B2k8s%E9%9B%86%E7%BE%A4')中的前五步即可


### K8S-Master配置

1) 生成必要的证书和密钥，包括访问etcd集群时用到的客户端证书和私钥
```bash
#生成证书
cd /root/cert-generator
    
#生成k8s相关证书
[root@k8s-etcd-mater01 k8s-certs-generator]# bash gencerts.sh k8s
Enter Domain Name [ilinux.io]:                    #不需要动，需要和etcd配置时保持一致
Enter Kubernetes Cluster Name [kubernetes]:       #可自定义
Enter the IP Address in default namespace 
  of the Kubernetes API Server[10.96.0.1]:        #不需要改
Enter Master servers name[master01 master02 master03]: k8s-master01 k8s-master02 k8s-master03      
                                                  #master名，与Domain Name拼接

```

2) 所需证书已经全部生成并归档
```bash
[root@k8s-etcd-mater01 k8s-certs-generator]# tree kubernetes/
kubernetes/
├── CA
│   ├── ca.crt
│   └── ca.key
├── front-proxy
│   ├── front-proxy-ca.crt
│   ├── front-proxy-ca.key
│   ├── front-proxy-client.crt
│   └── front-proxy-client.key
├── ingress
│   ├── ingress-server.crt
│   ├── ingress-server.key
│   └── patches
│       └── ingress-tls.patch
├── k8s-master01
│   ├── auth
│   │   ├── admin.conf
│   │   ├── controller-manager.conf
│   │   └── scheduler.conf
│   ├── pki
│   │   ├── apiserver.crt
│   │   ├── apiserver-etcd-client.crt
│   │   ├── apiserver-etcd-client.key
│   │   ├── apiserver.key
│   │   ├── apiserver-kubelet-client.crt
│   │   ├── apiserver-kubelet-client.key
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── front-proxy-ca.crt
│   │   ├── front-proxy-ca.key
│   │   ├── front-proxy-client.crt
│   │   ├── front-proxy-client.key
│   │   ├── kube-controller-manager.crt
│   │   ├── kube-controller-manager.key
│   │   ├── kube-scheduler.crt
│   │   ├── kube-scheduler.key
│   │   ├── sa.key
│   │   └── sa.pub
│   └── token.csv
├── k8s-master02
│   ├── auth
│   │   ├── admin.conf
│   │   ├── controller-manager.conf
│   │   └── scheduler.conf
│   ├── pki
│   │   ├── apiserver.crt
│   │   ├── apiserver-etcd-client.crt
│   │   ├── apiserver-etcd-client.key
│   │   ├── apiserver.key
│   │   ├── apiserver-kubelet-client.crt
│   │   ├── apiserver-kubelet-client.key
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── front-proxy-ca.crt
│   │   ├── front-proxy-ca.key
│   │   ├── front-proxy-client.crt
│   │   ├── front-proxy-client.key
│   │   ├── kube-controller-manager.crt
│   │   ├── kube-controller-manager.key
│   │   ├── kube-scheduler.crt
│   │   ├── kube-scheduler.key
│   │   ├── sa.key
│   │   └── sa.pub
│   └── token.csv
├── k8s-master03
│   ├── auth
│   │   ├── admin.conf
│   │   ├── controller-manager.conf
│   │   └── scheduler.conf
│   ├── pki
│   │   ├── apiserver.crt
│   │   ├── apiserver-etcd-client.crt
│   │   ├── apiserver-etcd-client.key
│   │   ├── apiserver.key
│   │   ├── apiserver-kubelet-client.crt
│   │   ├── apiserver-kubelet-client.key
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── front-proxy-ca.crt
│   │   ├── front-proxy-ca.key
│   │   ├── front-proxy-client.crt
│   │   ├── front-proxy-client.key
│   │   ├── kube-controller-manager.crt
│   │   ├── kube-controller-manager.key
│   │   ├── kube-scheduler.crt
│   │   ├── kube-scheduler.key
│   │   ├── sa.key
│   │   └── sa.pub
│   └── token.csv
└── kubelet
    ├── auth
    │   ├── bootstrap.conf
    │   └── kube-proxy.conf
    └── pki
        ├── ca.crt
        ├── kube-proxy.crt
        └── kube-proxy.key

```

3) 将证书分发至各节点
```bash
#各节点
mkdir /etc/kubernetes
    
#本节点操作
cp -r kubernetes/k8s-master01/* /etc/kubernetes/
    
#其他节点
scp -rp kubernetes/k8s-master02/* k8s-master02:/etc/kubernetes/
scp -rp kubernetes/k8s-master03/* k8s-master03:/etc/kubernetes/        
```

4) 获取v1.13.4二进制k8s文件，并解压缩至/usr/local
```bash
#获取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/aaron89/k8s_bin:v1.13.4
    
#解压二进制文件    
docker run --rm -d --name temp registry.cn-hangzhou.aliyuncs.com/aaron89/k8s_bin:v1.13.4 sleep 10
docker cp temp:/kubernetes-server-linux-amd64.tar.gz .
tar xf kubernetes-server-linux-amd64.tar.gz  -C /usr/local/
```

5) 将我提供的配置文件cp到对应路径
```bash
cp etc/kubernetes/* /etc/kubernetes/
cp usr/lib/systemd/system/* /usr/lib/systemd/system
```

6) 修改apiserver配置文件中的KUBE_ETCD_SERVERS，另外config文件中的日志级别是0(Debug)，先不动,为了测试
```bash
KUBE_ETCD_SERVERS="--etcd-servers=https://etcd01.ilinux.io:2379,https://etcd02.ilinux.io:2379,https://etcd03.ilinux.io:2379"

```
7) 创建kube用户、kubernetes运行目录和权限
```bash
useradd -r kube
mkdir /var/run/kubernetes
chown kube.kube /var/run/kubernetes/
```

8) 启动apiserver，并查看status是否正常.至此apiserver已经成功启动，连接etcd集群和相关证书
```bash
systemctl daemon-reload
systemctl start kube-apiserver
systemctl enable kube-apiserver
systemctl status kube-apiserver
```

9) 配置kubectl，并使用kubectl config view查看配置是否正常
```bash
mkdir ~/.kube
ln -sv /usr/local/kubernetes/server/bin/kubectl /usr/bin/
cp /etc/kubernetes/auth/admin.conf ~/.kube/config
    
#kubectl config view   
[root@k8s-etcd-mater01 auth]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://k8s-master01.ilinux.io:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: k8s-admin
  name: k8s-admin@kubernetes
current-context: k8s-admin@kubernetes
kind: Config
preferences: {}
users:
- name: k8s-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

10) 使用get nodes命令，如果没error就说明一切正常！
```bash
[root@k8s-etcd-mater01 auth]# kubectl get nodes
No resources found.

```

11) 创建ClusterRoleBinding，将/etc/kubernetes/token.csv(引导token)中创建用户或者用户组（二选一即可）绑定至内建的
允许引导令牌功能的clusterrole：system:node-bootstrapper上。这里我使用的是system:bootstrapper用户。
```bash
# token.csv说明：用户（system:bootstrapper），组（system:bootstrappers）
b21f94.fbff38f94cfd0713,"system:bootstrapper",10001,"system:bootstrappers"
    
#授权        
kubectl create clusterrolebinding system:bootstrapper --user=system:bootstrapper --clusterrole=system:node-bootstrapper
```
12) 启动kube-controller-manager和kube-scheduler
```bash
#controller-manager
systemctl start kube-controller-manager
systemctl enable kube-controller-manager
systemctl status kube-controller-manager
    
#scheduler    
systemctl start kube-scheduler
systemctl enable kube-scheduler    
systemctl status kube-scheduler
```