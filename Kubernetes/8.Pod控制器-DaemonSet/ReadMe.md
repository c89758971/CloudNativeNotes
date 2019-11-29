**1.概要**
```text
    运行数量=node节点数量
    每个符合条件的node节点上有且只有一个Pod
```

**2.命令**
```bash
#查看DaemonSet
[root@centos-1 mainfasts]#        kubectl get ds -A
NAMESPACE     NAME                      DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                 AGE
kube-system   kube-flannel-ds-amd64     3         3         3       3            3           <none>                        4d1h
kube-system   kube-flannel-ds-arm       0         0         0       0            0           <none>                        4d1h
kube-system   kube-flannel-ds-arm64     0         0         0       0            0           <none>                        4d1h
kube-system   kube-flannel-ds-ppc64le   0         0         0       0            0           <none>                        4d1h
kube-system   kube-flannel-ds-s390x     0         0         0       0            0           <none>                        4d1h
kube-system   kube-proxy                3         3         3       3            3           beta.kubernetes.io/os=linux   4d1h

```

**3.实验**
1) 编辑filebeat-daemonset.yaml
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
      nodeSelector:                       #节点选择器
        logcollecting: "on"               #自定义标签          
```

2) 载入yaml，并观察。发现由于自定义标签的定义，没有符合的node节点，所有pod没有生成
```bash
[root@centos-1 mainfasts]# kubectl apply -f filebeat-daemonset.yaml  
daemonset.apps/filebeat-ds created
    
[root@centos-1 mainfasts]# kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
ngx-new-cb79d555-gqwf8   1/1     Running   0          29h
ngx-new-cb79d555-hcdr9   1/1     Running   0          30h
    
[root@centos-1 mainfasts]# kubectl get ds
NAME          DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR      AGE
filebeat-ds   0         0         0       0            0           logcollecting=on   8s

```
3) 给node01节点打标签，并发现pod已经开始调度至对应节点
```bash
[root@centos-1 mainfasts]# kubectl label node centos-2.shared logcollecting="on" --overwrite
node/centos-2.shared labeled
    
[root@centos-1 mainfasts]# kubectl get pod
NAME                     READY   STATUS             RESTARTS   AGE
filebeat-ds-dlxwn        0/1     CrashLoopBackOff   1          5s
ngx-new-cb79d555-gqwf8   1/1     Running            0          29h
ngx-new-cb79d555-hcdr9   1/1     Running            0          30h
    
[root@centos-1 mainfasts]# kubectl get node --show-labels
NAME              STATUS   ROLES    AGE   VERSION   LABELS
centos-1.shared   Ready    master   4d    v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-1.shared,kubernetes.io/os=linux,node-role.kubernetes.io/master=
centos-2.shared   Ready    <none>   4d    v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-2.shared,kubernetes.io/os=linux,logcollceting=true,logcollecting=on
centos-3.shared   Ready    <none>   4d    v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-3.shared,kubernetes.io/os=linux

```

4) 去除标签
```bash
 kubectl label node centos-2.shared logcollceting-
``` 

**4.知识点补充**
```bash
[root@centos-1 mainfasts]# kubectl describe node centos-1.shared
Name:               centos-1.shared
Roles:              master
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=centos-1.shared
                    kubernetes.io/os=linux
                    node-role.kubernetes.io/master=
Annotations:        flannel.alpha.coreos.com/backend-data: {"VtepMAC":"6a:82:c9:37:15:dd"}
                    flannel.alpha.coreos.com/backend-type: vxlan
                    flannel.alpha.coreos.com/kube-subnet-manager: true
                    flannel.alpha.coreos.com/public-ip: 192.168.0.104
                    kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                    node.alpha.kubernetes.io/ttl: 0
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Mon, 25 Nov 2019 17:00:45 +0800
Taints:             node-role.kubernetes.io/master:NoSchedule.          #污点，pod调度的高级功能，容忍度：不允许调度至master节点
```
