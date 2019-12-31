## 1.查询命令
```bash
[root@centos-1 mainfasts]# kubectl explain pods.spec.volumes
KIND:     Pod
VERSION:  v1
RESOURCE: volumes <[]Object>
      
[root@centos-1 dingqishi]# kubectl explain pods.spec.volumes.persistentVolumeClaim
KIND:     Pod
VERSION:  v1
RESOURCE: persistentVolumeClaim <Object>
    
    
    
[root@centos-1 dingqishi]#kubectl get pv -A

```
## 2.Volume分类

### 1.云存储
```text
云存储：
    awsElasticBlockStore
    azureDisk
    azureFile
    gcePersistentDisk
    vsphereVolume
```

### 2.分布式存储
```text
分布式存储：
    cephfs
    glusterfs
    rbd

```
        
### 3.网络存储
```text
网络存储:
    nfs
    fc
    iscsi 
```
       
### 4.临时存储
```text
临时存储:
    emptyDir
    gitRepo（已废弃）
```

### 5.本地存储
```text
本地存储：
    hostPath  

```

### 6.特殊存储
```text
特殊存储：
    configMap
    downwardAPI
    secret

```     

### 7.自定义存储  
```text
自定义存储：
    csi
    
持久卷申请：
    persistentVolumeClaim

```


## 3.PV的生命周期
```text 
    Provisioning：            申明
    Binding：                 绑定
    using：                   使用
    Reclaiming：              回收
```

## 4.pv的回收策略
```text
    Delete：     数据和pv都会删除
    Recyle：     （已废弃）
    Retain：     数据和pv都不动
```


## 5.pv的申明类型
```text
PV的申明（建立在SC（StorageClasses）上）：
    
Static：
        静态，管理员分配
Dynamic：
        动态，API server需要增加一个参数配置。--enable-admission-plugins，具体类型参考:
        https://kubernetes.io/docs/concepts/storage/storage-classes/
```

## 6.额外补充
```text
1.Pv没有namespace,Pvc有namespace
2.SC（存储类）：
    kubectl explain sc
```

## 7.官方文档

https://kubernetes.io/docs/concepts/storage/volumes/

https://kubernetes.io/docs/concepts/storage/persistent-volumes/






