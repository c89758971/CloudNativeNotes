# 简介
所有 Ceph 存储集群的部署都始于部署一个个 Ceph 节点、网络和 Ceph 存储集群。 Ceph 存储集群至少需要一个 Ceph Monitor 和两个 OSD 守护进程。而运行 Ceph 文件系统客户端时，则必须要有元数据服务器（ Metadata Server ）

- 名词定义
- 部署工具
- 参考文档

## 1.名词定义

### Ceph OSDs

    Ceph OSD守护进程（Ceph OSD的功能是存储数据，处理数据的复制、恢复、回填、再均衡，并通过检查其他OSD守护进程的心跳来向Ceph Monitors提供一些监控信息。
    当Ceph存储集群设定为有2个副本时，至少需要2个OSD守护进程，集群才能达到active+clean状态（Ceph默认有3个副本，但你可以调整副本数）。

### Monitors

    Ceph Monitor维护着展示集群状态的各种图表，包括监视器图、OSD 图、归置组（PG）图、和CRUSH图。
    Ceph保存着发生在Monitors、OSD和PG上的每一次状态变更的历史信息（称为epoch ）。

### MDSs
    Ceph元数据服务器（MDS）为Ceph文件系统存储元数据（也就是说，Ceph 块设备和Ceph对象存储不使用MDS）。
    元数据服务器使得POSIX文件系统的用户们，可以在不对Ceph存储集群造成负担的前提下，执行诸如ls、find 等基本命令。

## 2.部署工具

- [ceph-deploy](http://docs.ceph.org.cn/start/quick-start-preflight/)
- [ceph-ansible](https://github.com/ceph/ceph-ansible)
- [ceph-chef](https://github.com/ceph/ceph-chef)

## 3.参考文档

官方文档：
    https://docs.ceph.com/docs/master/start/intro/

官方文档（中文）：
    http://docs.ceph.org.cn/start/intro/