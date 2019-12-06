**1.实际演练**

1) 生成私钥ilinux.crt
    ```bash
    openssl genrsa -out ilinux.crt 2048
    ```
    
2) 生成证书签名请求文件ilinux.csr
    ```bash
    openssl req -new -key ilinux.key -out ilinux.csr -subj "/CN=ilinux/O=kubeusers"
    ```
    
3) 使用k8s 的ca.crt和ca.key进行签名生成证书ilinux.crt，有效期为365天
    ```bash
    [root@centos-1 pki]# openssl x509 -req -in ilinux.csr -CA ./ca.crt -CAkey ./ca.key -CAcreateserial -out ilinux.crt -days 365
    Signature ok
    subject=/CN=ilinux/O=kubeusers
    Getting CA Private Key
    ```
4) 设置新集群（mykube），指明apiserver地址，k8s证书路径和隐藏证书，并保存在（/tmp/ilinux.kubeconfig）
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
6) 配置新集群权限，自定义权限名为ilinux，其中username需要和ilinux.csr的CN保持一致， --embed-certs=true表示需要打包存放
    ```bash
    kubectl config set-credentials ilinux --client-certificate=/etc/kubernetes/pki/ilinux.crt --client-key=/etc/kubernetes/pki/ilinux.key --username=ilinux --embed-certs=true  --kubeconfig=/tmp/ilinux.kubeconfig
    ```
7) 配置context，并绑定上面设置的新集群名、用户名和自定义权限名，并保存在/tmp/ilinux.kubeconfig
    ```bash
    kubectl config set-context ilinux@mykube --cluster=mykube --user=ilinux  --kubeconfig=/tmp/ilinux.kubeconfig
    ```
8) 查询当前集群配置信息，发现新集群已经载入，但没有使用，当前读取的配置是current-context: kubernetes-admin@kubernetes
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


9) 切换use-context ilinux@mykube，发现已经没有查询pod的权限了
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
