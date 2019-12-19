# 二进制部署高可用k8s集群

本次采用二进制文件方式部署高可用k8s集群

- 高可用原则
- 高可用架构
- 环境准备

### 高可用原则
```text
生产环境：
    高可用etcd集群（需定期备份），建立3、5或7个节点（奇数个节点）
    高可用Master：
        kube-apiserver无状态，可多实例部署：
            借助于Haproxy、nginx或keepalived进行vip流量实现多实例冗余，用户和集群客户端通过vip访问    
        kuber-scheduler和kuber-controller-manager：
            只能有一个活动实例，但可以有多个备用（主备模式）
```

### 高可用架构

![高可用架构-2](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/28.%E4%BA%8C%E8%BF%9B%E5%88%B6%E9%83%A8%E7%BD%B2%E9%AB%98%E5%8F%AF%E7%94%A8k8s%E9%9B%86%E7%BE%A4/k8s-ha.png)
