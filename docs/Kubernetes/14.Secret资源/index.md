## 1.应用场景定义

* ConfigMap：保存非敏感配置
    
    https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/
* Secret：保存敏感配置信息

    https://kubernetes.io/docs/concepts/configuration/secret/

## 2.Secret类型

*   docker-registry：创建一个给 Docker registry 使用的 secret
*   generic：从本地 file, directory 或者 literal value 创建一个 secret
*   tls：创建一个 TLS secret

## 3.以环境变量方式载入secrets

1) 创建所需的文件`username.txt`和`password.txt`
```bash
echo -n 'admin' > ./username.txt
echo -n '1f2d1e2e67df' > ./password.txt
```
2) 创建`generic`类型的`secret`
```bash
kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt
```

3) 观察`secret`情况
```bash
[root@centos-1 mainfasts]# kubectl get secrets/db-user-pass -o yaml
apiVersion: v1
data:
  password.txt: MWYyZDFlMmU2N2Rm
  username.txt: YWRtaW4=
kind: Secret
metadata:
  creationTimestamp: "2019-12-05T07:39:02Z"
  name: db-user-pass
  namespace: default
  resourceVersion: "10014"
  selfLink: /api/v1/namespaces/default/secrets/db-user-pass
  uid: 6b15c821-5975-405f-9144-0c1fbaa1e341
type: Opaque
```

4) 使用`base64`解码配置文件中的对应信息，发现信息一致
```bash
[root@centos-1 mainfasts]# echo YWRtaW4=|base64 -d
admin
[root@centos-1 mainfasts]# echo MWYyZDFlMmU2N2Rm|base64 -d
1f2d1e2e67df
```

5) 编辑`redis-secretenv-demo.yaml`，并apply
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-env-pod
spec:
  containers:
  - name: mycontainer
    image: redis
    env:
      - name: SECRET_USERNAME
        valueFrom:
          secretKeyRef:
            name: db-user-pass
            key: username.txt
      - name: SECRET_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-user-pass
            key: password.txt
  restartPolicy: Never
```

6) 进入`Pod`交互式模式，观察`secret`变量载入情况
```bash
[root@centos-1 secret]# kubectl exec -it secret-env-pod -- /bin/sh
# printenv
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_SERVICE_PORT=443
HOSTNAME=secret-env-pod
REDIS_DOWNLOAD_SHA=61db74eabf6801f057fd24b590232f2f337d422280fd19486eca03be87d3a82b
HOME=/root
SECRET_PASSWORD=1f2d1e2e67df
TERM=xterm
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
KUBERNETES_PORT_443_TCP_PORT=443
KUBERNETES_PORT_443_TCP_PROTO=tcp
SECRET_USERNAME=admin
REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-5.0.7.tar.gz
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
REDIS_VERSION=5.0.7
GOSU_VERSION=1.11
KUBERNETES_SERVICE_HOST=10.96.0.1
PWD=/data

```

## 4.以存储卷方式载入secrets

1) 编辑`redis-secretfiles-volumes`，并`apply`
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-dotfiles-pod
spec:
  volumes:
  - name: secret-volume
    secret:
      secretName: db-user-pass
      items:
      - key: username.txt                  #secrets中key的名字
        path: username                     #希望映射在Pod中的名字
      - key: password.txt
        path: password
  containers:
  - name: dotfile-test-container
    image: redis
    volumeMounts:
    - name: secret-volume
      readOnly: true
      mountPath: "/etc/secret-volume"

```

2) 进入`pod`交互式模式，发现`/etc/secret-volume`中已经生成对应的配置文件
```bash
[root@centos-1 secret]# kubectl exec -it secret-dotfiles-pod -- /bin/sh
# cd /etc/secret-volume
# ls
password  username
# cat password
1f2d1e2e67df
# cat username
admin# 

```