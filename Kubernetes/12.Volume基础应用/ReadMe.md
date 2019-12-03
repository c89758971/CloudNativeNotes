**1.查询命令**
```bash
[root@centos-1 mainfasts]# kubectl explain pods.spec.volumes
KIND:     Pod
VERSION:  v1
RESOURCE: volumes <[]Object>
```

**2.官方文档**

https://kubernetes.io/docs/concepts/storage/volumes/

**3.分类**
```text
云存储：
    awsElasticBlockStore
    azureDisk
    azureFile
    gcePersistentDisk
    vsphereVolume
    
分布式存储：
    cephfs
    glusterfs
    rbd
        
网络存储：
    nfs
    fc
    iscsi 
       
临时存储：
    emptyDir
    gitRepo（已废弃）
 
本地存储：
    hostPath  
      
特殊存储：
    configMap
    downwardAPI
    secret
    
自定义存储：
    csi
    
持久卷申请：
    persistentVolumeClaim
```