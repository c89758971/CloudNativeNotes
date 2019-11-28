**K8s安装：https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/**

**1.使用kubeadm部署k8s集群：**

* Docker-CE环境安装

1) 关闭系统默认防火墙和SELINUX
```bash
setenforce 0
sed -i -r "/^SELINUX=/c SELINUX=disabled" /etc/selinux/config
which systemctl && systemctl stop firewalld
which systemctl && systemctl disable firewalld
which systemctl && systemctl stop iptables || service iptables stop
which systemctl && systemctl disable iptables || chkconfig iptables off
```

2) 卸载旧版本Docker
```bash
yum remove docker \
            docker-client \
            docker-client-latest \
            docker-common \
            docker-latest \
            docker-latest-logrotate \
            docker-logrotate \
            docker-selinux \
            docker-engine-selinux \
            docker-engine \
            docker \
            docker-ce \
            docker-ee
```

3) 安装DockerCE
```bash
# 1.安装所需的包
# yum-utils 提供了 yum-config-manager 实用程
# 并且 devicemapper 存储驱动需要 device-mapper-persistent-data 和 lvm2
yum install -y yum-utils device-mapper-persistent-data lvm2
 
# 2.使用以下命令设置稳定存储库。
yum-config-manager \
--add-repo \
https://download.docker.com/linux/centos/docker-ce.repo
 
# 3.安装Docker CE
yum install -y docker-ce    
 
#或者安装指定版本
yum list docker-ce --showduplicates | sort -r
yum install -y docker-ce-17.12.1.ce-1.el7.centos
```

4) 启动Docker并设置开机运行
```bash
systemctl start docker
systemctl enable docker
systemctl status docker
```
5) 常见问题
```bash
WARINING提示：
WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled
 
#解决方案   
cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
 
sysctl --system
```
 
* Hosts维护
```bash
[root@centos-1 dingqishi]#  cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.0.104 centos-1.shared master
192.168.0.108 centos-2.shared node01
192.168.0.109 centos-3.shared node02
```


* 关闭防火墙
```bash
systemctl stop firewalld.service
systemctl stop iptables.service
systemctl disable firewalld.service
systemctl disable iptables.service
```

* 禁用SELINUX
```bash
#临时关闭：
setenforce 0            
   
#永久关闭：
vim /etc/selinux/config
SELINUX=disabled
```

* 禁用swap设备（影响性能，k8s集群初始化会报错）
```bash
#临时禁用
swapoff  -a
    
#永久禁用
Vim  /etc/fstab 
注释 /dev/mapper/VolGroup-lv_swap swap 所在的行
```

* 启用ipvs内核模块(略，用到再配置)

* docker文件配置（docker unit file： /usr/lib/systemd/system/docker.service）
```bash
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStartPost=/usr/sbin/iptables -P FPRWARD ACCEPT
ExecReload=/bin/kill -s HUP $MAINPID
TimeoutSe=0
RestartSec=2
Restart=always
    
systemctl daemon-reload
systemctl restart docker
    
#变量查看
docker info
```

* 安装k8s相关包

1) 阿里云镜像仓库(https://mirrors.aliyun.com/)配置： 
```bash
cd /etc/yum.repos.d/
vi k8s.repo
    
[kubernetes]
name=Kubernetes Repository
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
      https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
```            

2) 仓库载入情况检查
```bash
yum repolist
    
[root@centos-1 yum.repos.d]# yum list all |grep "^kube"
kubeadm.x86_64                              1.16.3-0                   kubernetes
kubectl.x86_64                              1.16.3-0                   kubernetes
kubelet.x86_64                              1.16.3-0                   kubernetes
kubernetes.x86_64                           1.5.2-0.7.git269f928.el7   extras   
kubernetes-client.x86_64                    1.5.2-0.7.git269f928.el7   extras   
kubernetes-cni.x86_64                       0.7.5-0                    kubernetes
kubernetes-master.x86_64                    1.5.2-0.7.git269f928.el7   extras   
kubernetes-node.x86_64                      1.5.2-0.7.git269f928.el7   extras 
```

  
3) 包安装
```bash
    yum install kubeadm  kubectl kubelet

```

4) 包检查
```bash
[root@centos-1 yum.repos.d]# rpm -ql kubelet
/etc/kubernetes/manifests
/etc/sysconfig/kubelet
/usr/bin/kubelet
/usr/lib/systemd/system/kubelet.service
```
5) 配置kubelet,swap处于启用状态时，不要报错
```bash
     vim /etc/sysconfig/kubelet
     KUBELET_EXTRA_ARG="--fail-swap-on=false”

```
    
6) 初始化集群(Master节点)
```bash
#集群镜像获取
https://www.jianshu.com/p/8bc61078bded
    
kubeadm config print init-defaults --kubeconfig ClusterConfiguration > kubeadm.yml
kubeadm config images pull
    
#方式一:命令行(--dry-run：试运行，不会有改动)
kubeadm init --kubernetes-version=v1.16.0 --pod-network-cidr="10.244.0.0/16"  --dry-run
    
#方式二：Yml配置文件，使用—config string


#集群初始化完毕后，创建用户（最好用普通账号创建）：
mkdir -p $HOME/.kube
    
#切换至Root用户操作：
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config(主配置文件，至关重要，不能泄露)
sudo chown $(id -u):$(id -g) $HOME/.kube/config
    
#集成flannel插件，并观察
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
    
#Pod情况查看：
kubectl get pods -n kube-system
    
#集群初始化完毕
kubectl get nodes
```
7) Node节点
* 从主节点复制repo配置到对应node节点上：
```bash
scp k8s.repo node01:/etc/yum.repos.d/
scp /etc/sysconfig/kubelet  node01:/etc/sysconfig
scp k8s.repo node02:/etc/yum.repos.d/
scp /etc/sysconfig/kubelet  node02:/etc/sysconfig
scp  /run/flannel/subnet.env node01: /run/flannel/subnet.env
scp  /run/flannel/subnet.env node02: /run/flannel/subnet.env
```
             
* 在主节点打包Node所需镜像，并scp
```bash
docker save -o k8s-node.tar k8s.gcr.io/coredns quay.io/coreos/flannel k8s.gcr.io/pause
scp k8s-node.tar node01:/
scp k8s-node.tar node02:/
```
         
* Node节点：
    * 加载镜像( coredns、 flannel、 pause)：
   ```bash
    cd / && docker load —input k8s-node.tar
    yum install kubelet kubeadm    
    ``` 
    * 添加集群
    ```bash
    kubeadm join 192.168.0.104:6443 --token z9kmma.p8ak2ffytr7gjnsv \
    --discovery-token-ca-cert-hash sha256:82ee3a673e99fa8f46a8f515fa430819b595d532f3fcb21d9c3114f3394b4b0d 
    ```
         
8) 部署完毕，并检查集群状态（Master）
```bash
kubectl get nodes
NAME              STATUS   ROLES    AGE   VERSION    
centos-1.shared   Ready    master   41m   v1.16.3
centos-2.shared   Ready    <none>   19m   v1.16.3
centos-3.shared   Ready    <none>   18m   v1.16.3
```
     
        
