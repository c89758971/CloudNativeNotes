# Envoy部署类型
Envoy通常用于以容器编排系统为底层环境的服务网格中，并以sidecar的形式与主程序容器运行为单个Pod；
非编排系统环境中测试时，可以将主程序与Envoy运行于同一容器，或手动组织主程序容器与Envoy容器共享同一网络名称空间
 
- 部署类型
- 部署类型：仅服务间
- 部署类型：仅服务间外加前端代理
- 部署类型：双向代理


### 部署类型

![部署类型](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/deploymenttypes.png)

图中展示了Envoy常见的部署类型，其中：
```text
Front Proxy:
    用于接受南北流量，并将流量代理至服务网格中的Ingress Listener
    
Ingress Listener：
    以SideCar模式运行于pod中，监听pod中的本地地址，作为服务端接收网络请求，并将请求反向代理至pod中的微服务server上
    
Egress Listener：
    以SideCar模式运行于pod中，监听pod中的本地地址，作为客户端，接收pod请求，并以正想代理的模式，向外部发送请求。
    注意：外部请求可以是集群内的东西网络，也可以是集群外的服务器（组）
         
```

### 部署类型：仅服务间

仅服务间的部署类型主要解决envoy中东西流量的情况，主要分为Ingress和Egress

#### Ingress

![Ingress](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/ingress.png)

#### Egress

![Egress](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/Egress.png)

注意：
业务本身并不直接向外部发送请求，他并不关心集群外的网络拓扑情况，而是直接将请求发送至Sidecar模式的Egress组件


### 部署类型：仅服务间外加前端代理

![frontproxy](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/frontproxy.png)
上面已经提到过，最外部增加frontproxy，用于解决集群南北流量问题


### 部署类型：双向代理

![doubleproxy](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/doubleproxy.png)

双向代理尽可能接近用户地终止TLS和客户端连接（TLS握手的更短往返时间，更小几率的数据包丢失等）会更高效。