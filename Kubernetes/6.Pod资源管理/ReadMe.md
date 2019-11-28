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
