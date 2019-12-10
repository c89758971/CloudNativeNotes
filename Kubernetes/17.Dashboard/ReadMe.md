**1.Dashboard部署(K8s:v1.16.3)**

1) 创建证书
```text
mkdir dashboard-certs
cd dashboard-certs/
    
#创建命名空间
kubectl create namespace kubernetes-dashboard
    
# 创建key文件
openssl genrsa -out dashboard.key 2048
    
#证书请求
openssl req -days 36000 -new -out dashboard.csr -key dashboard.key -subj '/CN=dashboard-cert'
    
#自签证书
openssl x509 -req -in dashboard.csr -signkey dashboard.key -out dashboard.crt
    
#创建kubernetes-dashboard-certs对象
kubectl create secret generic kubernetes-dashboard-certs --from-file=dashboard.key --from-file=dashboard.crt -n kubernetes-dashboard

```

2) 下载并修改recommended.yaml
```bash
wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta5/aio/deploy/recommended.yaml
```

```yaml
#增加直接访问端口
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort #增加
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 30008 #增加
  selector:
    k8s-app: kubernetes-dashboard

---
#因为自动生成的证书很多浏览器无法使用，所以我们自己创建，注释掉kubernetes-dashboard-certs对象声明
#apiVersion: v1
#kind: Secret
#metadata:
#  labels:
#    k8s-app: kubernetes-dashboard
#  name: kubernetes-dashboard-certs
#  namespace: kubernetes-dashboard
#type: Opaque
```

3) 安装Dashboard
```bash
#安装
kubectl apply -f  ~/recommended.yaml
    
#检查结果
kubectl get pods -A  -o wide
kubectl get service -n kubernetes-dashboard  -o wide

```

4) 创建Dashboard管理员账号dashboard-admin.yaml，并apply
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: dashboard-admin
  namespace: kubernetes-dashboard

```
5) 赋权dashboard-admin-bind-cluster-role.yaml，并apply
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: dashboard-admin-bind-cluster-role
  labels:
    k8s-app: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: dashboard-admin
  namespace: kubernetes-dashboard
```

6) 复制token，并登录https://192.168.0.104:30008
```bash
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep dashboard-admin | awk '{print $1}')
```