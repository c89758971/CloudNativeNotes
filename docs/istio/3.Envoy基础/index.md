# Envoy
核心功能在于数据平面，于2016年由`Lyft`公司创建并开源，目标是成为通用的数据平面。
云原生应用，既可用作前端代理，亦可实现`Service Mesh`中的服务间通信。
常被用于实现`API Gateway`（如`Ambassador`）以及`Kubernetes`的`Ingress Controller`（例如 `gloo`等），不过，基于`Envoy`实现的`Service Mesh`产品`Istio`有着更广泛的用户基础

- what is Envoy？
- Envoy架构图
- Envoy常用术语
- 参考文档

## 1.what is Envoy？

`Envoy`是专为大型现代`SOA`（面向服务架构）架构设计的`L7`代理和通信总线。


## 2.Envoy架构图

![Envoy架构图](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/enovy.png)

为了方便理解，我会给出于`nginx`的名词进行对比
```text
Listener：类似于Nginx的listen，用于区分最初始的网络流量
Filter chains：过滤链；有一个或多个过滤器组成，他们是层级关系，类似于多个location
Cluster：集群，envoy定义逻辑相同的服务器组概念，类似upstream
Endpoint：网络端点
```
图中展示的是`enovy`组件于`Hostproxy`模式下的组件协作图（如果工作与`SiderCar`会有些许不同），
其中所有组件都可以静态配置，或者通过控制平面/管理服务器/xDS进行动态服务发现。

## 3.Envoy常用术语

- 集群（Cluster）：集群是Envoy连接到的一组逻辑上相似的端点；
在v2中，RDS通过路由指向集群，CDS提供集群配置，而Envoy通过EDS（Endpoint Discovery Server）发现集群成员，即端点；
- 下游（Downstream）：下游主机连接到Envoy，发送请求并接收响应，它们是Envoy的客户端； 
- 上游（Upstream）：上游主机接收来自Envoy的连接和请求并返回响应，它们是Envoy代理的后端服务器；
- 端点（Endpoint）：端点即上游主机，是一个或多个集群的成员，可通过EDS（Endpoint Discovery Server）发现； 
- 侦听器（Listener）：侦听器是能够由下游客户端连接的命名网络位置，例如端口或unix域套接字等； 
- 位置（Locality）：上游端点运行的区域拓扑，包括地域、区域和子区域等； 
- 管理服务器（Management Server）：实现v2API的服务器，它支持复制和分片，并且能够在不同的物理机器上实现针对不同xDS API的API服务； 
- 地域（Region）：区域所属地理位置； 
- 区域（Zone）：AWS中的可用区（AZ）或GCP中的区域等；
- 子区域：Envoy实例或端点运行的区域内的位置，用于支持区域内的多个负载均衡目标； 
- xDS：CDS 、EDS、HDS 、LDS、RLS(Rate Limit)、 RDS 、 SDS、VHDS和RTDS等API的统称；

## 4.参考文档

Envoy 官方文档：https://www.envoyproxy.io/docs/envoy/latest/

Envoy 官方文档中文版：https://www.servicemesher.com/envoy/