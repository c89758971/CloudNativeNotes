# Helm基础

Helm是一种管理Charts的工具，而charts则是打包预配置Kubernetes基础资源的配置。

- 概念介绍
- 安装
- 附录：参考文档

### 概念介绍

![helm](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/26.Helm%E5%9F%BA%E7%A1%80/helm.png)


各组件说明：
* helm：负责本地开发，作为命令行客户端，通过grpc协议，向tiller发送请求
* tiller：接受helm请求，合并charts、发布、卸载和回滚release，并向API server发送相应请求
* charts：基础资源的配置模版集合
* config：charts配置参数，用于渲染charts
* charts repo：charts仓库，有远程和本地两种
* chart release：通过charts发布的应用，称之为release


### 附录：参考文档

* helm
    
    https://helm.sh/docs/intro/quickstart/
    
    https://github.com/helm/helm

* jimmysong.io

    https://jimmysong.io/kubernetes-handbook/practice/helm.html