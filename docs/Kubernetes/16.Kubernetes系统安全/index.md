## 1.实际演练:新证书、新用户和新集群

1) 生成私钥`ilinux.crt`
    ```bash
    openssl genrsa -out ilinux.crt 2048
    ```
    
2) 生成证书签名请求文件`ilinux.csr`
    ```bash
    openssl req -new -key ilinux.key -out ilinux.csr -subj "/CN=ilinux/O=kubeusers"
    ```
    
3) 使用`k8s`的`ca.crt`和`ca.key`进行签名生成证书`ilinux.crt`，有效期为`365`天
    ```bash
    [root@centos-1 pki]# openssl x509 -req -in ilinux.csr -CA ./ca.crt -CAkey ./ca.key -CAcreateserial -out ilinux.crt -days 365
    Signature ok
    subject=/CN=ilinux/O=kubeusers
    Getting CA Private Key
    ```
4) 设置新集群（`mykube`），指明`apiserver`地址，`k8s`证书路径和隐藏证书，并保存在（`/tmp/ilinux.kubeconfig`）
    ```bash
    kubectl config set-cluster mykube --server="https://192.168.0.104:6443" --certificate-authority=/etc/kubernetes/pki/ca.crt --embed-certs=true --kubeconfig=/tmp/ilinux.kubeconfig
    ```

5) 查看集群,新集群已经创建成功
    ```bash
    [root@centos-1 ~]# kubectl config get-clusters 
    NAME
    mykube
    kubernetes
    ```
6) 配置新集群权限，自定义权限名为`ilinux`，其中`username`需要和`ilinux.csr`的`CN`保持一致，`--embed-certs=true`表示需要打包存放
    ```bash
    kubectl config set-credentials ilinux --client-certificate=/etc/kubernetes/pki/ilinux.crt --client-key=/etc/kubernetes/pki/ilinux.key --username=ilinux --embed-certs=true  --kubeconfig=/tmp/ilinux.kubeconfig
    ```
7) 配置`context`，并绑定上面设置的新集群名、用户名和自定义权限名，并保存在`/tmp/ilinux.kubeconfig`
    ```bash
    kubectl config set-context ilinux@mykube --cluster=mykube --user=ilinux  --kubeconfig=/tmp/ilinux.kubeconfig
    ```
8) 查询当前集群配置信息，发现新集群已经载入，但没有使用，当前读取的配置是`current-context: kubernetes-admin@kubernetes`
    ```bash
    [root@centos-1 ~]# kubectl config view
    apiVersion: v1
    clusters:
    - cluster:
        certificate-authority-data: DATA+OMITTED
        server: https://192.168.0.104:6443
      name: kubernetes
    - cluster:
        certificate-authority-data: DATA+OMITTED
        server: https://192.168.0.104:6443
      name: mykube
    contexts:
    - context:
        cluster: mykube
        user: ilinux
      name: ilinux@mykube
    - context:
        cluster: kubernetes
        user: kubernetes-admin
      name: kubernetes-admin@kubernetes
    current-context: kubernetes-admin@kubernetes
    kind: Config
    preferences: {}
    users:
    - name: ilinux
      user:
        client-certificate-data: REDACTED
        client-key-data: REDACTED
        username: ilinux
    - name: kubernetes-admin
      user:
        client-certificate-data: REDACTED
        client-key-data: REDACTED

    ```


9) 切换`use-context ilinux@mykube`，发现已经没有查询`pod`的权限了
    ```bash
    [root@centos-1 tmp]# kubectl get pods
    NAME                     READY   STATUS    RESTARTS   AGE
    ngx-new-cb79d555-hfc7h   1/1     Running   0          9d
       
    [root@centos-1 tmp]# kubectl config use-context ilinux@mykube
    Switched to context "ilinux@mykube".
    [root@centos-1 tmp]# kubectl get pods
    Error from server (Forbidden): pods is forbidden: User "ilinux" cannot list resource "pods" in API group "" in the namespace "default"

    ```

10) 这时候，再切换成管理员账号，发现一切正常
    ```bash
    [root@centos-1 tmp]# kubectl config use-context         kubernetes-admin@kubernetes
    Switched to context "kubernetes-admin@kubernetes".
    [root@centos-1 tmp]# kubectl get pods
    NAME                     READY   STATUS    RESTARTS   AGE
    ngx-new-cb79d555-hfc7h   1/1     Running   0          9d

    ```
11) 我们还可以使用，位置参数的方式，使用自定义配置文件进行用户权限的切换
    ```bash
    [root@centos-1 tmp]# kubectl config view --kubeconfig=/tmp/ilinux.kubeconfig
    apiVersion: v1
    clusters:
    - cluster:
        certificate-authority-data: DATA+OMITTED
        server: https://192.168.0.104:6443
      name: mykube
    contexts:
    - context:
        cluster: mykube
        user: ilinux
      name: ilinux@mykube
    current-context: ""
    kind: Config
    preferences: {}
    users:
    - name: ilinux
      user:
        client-certificate-data: REDACTED
        client-key-data: REDACTED
        username: ilinux
        
    [root@centos-1 tmp]# kubectl config use-context ilinux@mykube --kubeconfig=/tmp/ilinux.kubeconfig
    Switched to context "ilinux@mykube".
        
    [root@centos-1 tmp]# kubectl get pods --kubeconfig=/tmp/ilinux.kubeconfig
    Error from server (Forbidden): pods is forbidden: User "ilinux" cannot list resource "pods" in API group "" in the namespace "default"
    [root@centos-1 tmp]# kubectl get pods 
    NAME                     READY   STATUS    RESTARTS   AGE
    ngx-new-cb79d555-hfc7h   1/1     Running   0          9d

    ```

## 2.RBAC

官方文档：

https://kubernetes.io/docs/reference/access-authn-authz/rbac/


1)  授权模型
    ```text
    基于节点：
        Node：专用的授权插件，根据Pod对象调度的结果为Node进行授权
        
    基于用户：
        ABAC：1.17之前的策略，新版本已经默认使用RBAC
        RBAC：赋予某个角色对于某个资源进行某种操作，其中角色可以是人也可以是组
    其他：
        Webhook
    ```
    
2) 当前`K8s`集群采用的集群策略查看(`Node+RBAC`)
    ```bash
    [root@centos-1 chapter10]# cat /etc/kubernetes/manifests/kube-apiserver.yaml 
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        component: kube-apiserver
        tier: control-plane
      name: kube-apiserver
      namespace: kube-system
    spec:
      containers:
      - command:
        - kube-apiserver
        - --advertise-address=192.168.0.104
        - --allow-privileged=true
        - --authorization-mode=Node,RBAC

    ```
    
3) 相关命令
    ```bash
    #名称空间级别权限和绑定
    kubectl explain role  
    kubectl explain rolebinding
       
    #集群级别权限和绑定
    kubectl explain ClusterRole  
    kubectl explain ClusterRoleBinding
       
    #策略详情查看
    kubectl get role  view -o yaml
    kubectl get clusterrole  view -o yaml
    ```
    
## 3.常用策略

（以下所有操作都基于上面创建的`ilinux`用户进行，并且每个操作之前需要删除之前配置过的权限
，否则会相互影响）

### 1.Role+RoleBinding
  
正常使用：某个名称空间级别的权限授权
    
* 编辑`role：res-reader.yaml`
```yaml
kind: Role             #名称空间权限
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: default         #只能读取default名称空间下的对应规则
  name: res-reader
rules:
- apiGroups: [""]   # "" 表示核心群组：core API group
  resources: ["pods", "pods/log", "services"]
  verbs: ["get", "list", "watch"]
```

* 编辑`rolebinding：ilinux-res-reader.yaml`
```yaml
kind: RoleBinding                 #名称空间级别权限绑定;ClusterRoleBinding为集群级别的权限绑定
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: ilinux-res-reader                   #增加可读性，命名规则：<用户>-<权限>
  namespace: default
subjects:
- kind: User
  name: ilinux
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: res-reader
  apiGroup: rbac.authorization.k8s.io
```
* 依次`apply`配置文件，发现`ilinux`用户至在`default`名称空间下有对应`pods`, `pods/log`, `services`的对应权限，和预期一样
```bash
[root@centos-1 RBAC]# kubectl get pod --kubeconfig=/tmp/ilinux.kubeconfig 
NAME                     READY   STATUS    RESTARTS   AGE
ngx-new-cb79d555-hfc7h   1/1     Running   0          10d
  
[root@centos-1 RBAC]# kubectl get service --kubeconfig=/tmp/ilinux.kubeconfig
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   11d
  
[root@centos-1 RBAC]# kubectl get service --kubeconfig=/tmp/ilinux.kubeconfig -n ingress-nginx
Error from server (Forbidden): services is forbidden: User "ilinux" cannot list resource "services" in API group "" in the namespace "ingress-nginx"
```
  
### 2.ClusterRole+ClusterRoleBinding

正常使用：k8s集群级别的权限授权

* 编辑`ClusterRole：cluster-res-reader.yaml`
```yaml
kind: ClusterRole             #集群范围权限
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cluster-res-reader
rules:
- apiGroups: [""]   # "" 表示核心群组：core API group
  resources: ["pods", "pods/log", "services"]
  verbs: ["get", "list", "watch"]

```

* 编辑`ClusterRoleBinding：cluster-ilinux-res-reader.yaml`
```yaml
kind: ClusterRoleBinding                  #ClusterRoleBinding为集群级别的权限绑定
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cluster-ilinux-res-reader                   #增加可读性，命名规则：<用户>-<权限>
subjects:
- kind: User
  name: ilinux
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-res-reader
  apiGroup: rbac.authorization.k8s.io
```

* 依次`apply`配置文件，并通过以下命令观察权限生成情况
```bash
[root@centos-1 RBAC]# kubectl get clusterrole
[root@centos-1 RBAC]# kubectl get clusterrolebinding
```

* 这时，我们发现`ilinux`用户已经具有集群级别（所有名称空间）的对应权限
```bash
[root@centos-1 RBAC]# kubectl get service --kubeconfig=/tmp/ilinux.kubeconfig -n ingress-nginx
NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
nginx-ingress-controller   NodePort   10.99.160.254   <none>        80:30080/TCP,443:30443/TCP   26h
  
[root@centos-1 RBAC]# kubectl get service --kubeconfig=/tmp/ilinux.kubeconfig 
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   11d
```
     
### 3.ClusterRole+RoleBinding

交叉使用：其中`ClusterRole`策略会降级成`rolebinding`名称空间的策略，效果和`role+rolebinding`一样，
好处就是在名称空间很多的时候，重复权限的配置文件会少一半，而且更灵活

* 使用上面的`ClusterRole`（`cluster-res-reader.yaml`），并`apply-f`

* 编辑`rolebinding`：`cluster-default-ilinux-res-reader.yaml`
```yaml
kind: RoleBinding                 #名称空间级别权限绑定;ClusterRoleBinding为集群级别的权限绑定
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cluster-default-ilinux-res-reader                   #增加可读性，命名规则：<用户>-<权限>
  namespace: default
subjects:
- kind: User
  name: ilinux
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-res-reader
  apiGroup: rbac.authorization.k8s.io    
```

* 测试和预期一样，`ClusterRole`降级成`default`名称空间的权限了
```yaml
[root@centos-1 RBAC]# kubectl get service --kubeconfig=/tmp/ilinux.kubeconfig 
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   11d
    
[root@centos-1 RBAC]# kubectl get service --kubeconfig=/tmp/ilinux.kubeconfig  -n ingress-nginx
Error from server (Forbidden): services is forbidden: User "ilinux" cannot list resource "services" in API group "" in the namespace "ingress-nginx"
```