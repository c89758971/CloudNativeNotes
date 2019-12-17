# Helm基础

Helm是一种管理Charts的工具，而charts则是打包预配置Kubernetes基础资源的配置。

- 概念介绍
- 安装
- 常用命令
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

### 安装

1) 根据自己平台，下载对应的[安装包](https://github.com/helm/helm/releases)
2) 解压压缩包
3) 把helm二进制文件cp到系统目录即可
```bash
cp helm /usr/local/bin/
```
4) 检查是否成功：helm help
5) 创建SA,并通过clusterrolebinding绑定到内建的role(cluster-admin)上
```bash
#创建sa
kubectl create serviceaccount --namespace kube-system tiller
    
#权限绑定        
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

```

6) 初始化helm(安装服务端tiller)
```bash
#K8s>1.16
helm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.3 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account tiller --override spec.selector.matchLabels.'name'='tiller',spec.selector.matchLabels.'app'='helm' --output yaml | sed 's@apiVersion: extensions/v1beta1@apiVersion: apps/v1@' | kubectl apply -f -
    
#K8s<1.16
helm init --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.12.2 --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts

```

7) 检查helm初始化是否成功
```bash
#版本查看
[root@centos-1 linux-amd64]# helm version
Client: &version.Version{SemVer:"v2.9.1", GitCommit:"20adb27c7c5868466912eebdf6664e7390ebe710", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.14.3", GitCommit:"0e7f3b6637f7af8fcfddb3d2941fcc7cbebb0085", GitTreeState:"clean"}
    
#远程稳定版仓库stable和本地仓库local
[root@centos-1 linux-amd64]# helm repo list
NAME  	URL                                             
stable	https://kubernetes-charts.storage.googleapis.com
local 	http://127.0.0.1:8879/charts    
```

### 常用命令

CMD | description
---- | ----- 
helm repo list | helm仓库展示
helm repo update | helm仓库更新
helm inspect readme stable/jenkins | charts使用说明
helm install stable/redis | charts部署，可配合--dry-run
helm list release | release 版本查看
helm delete  <charts-name> | 卸载charts
### 附录：参考文档

* helm
    
    https://helm.sh/docs/intro/quickstart/
    
    https://github.com/helm/helm

* helm-hub

    https://hub.helm.sh/

* jimmysong.io

    https://jimmysong.io/kubernetes-handbook/practice/helm.html