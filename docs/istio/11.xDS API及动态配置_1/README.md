# xDS API及动态配置_1

本章节首先介绍了xDS API的定义，接着引出envoy动态配置的应用场景和配置源，最后给出了详尽的配置资源和资源类型对比图和对应的官网文档链接，让你可以一目了然知道如何申明一种URL类型。

 
- xDS API概述
- Envoy动态配置
- 配置源
- Resource Types


### xDS API概述

![Envoy架构图](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/enovy.png)

Envoy对xDS API的管理由后端服务器实现，包括LDS、CDS、RDS、EDS、SDS、 HDS(Health Discovery Service)、RLS(Rate Limit Service)和MS（Metric Service）等，此时envoy是客户端。
- 所有这些API都提供了最终的一致性，并且彼此间不存在相互影响；
- 当一个管理服务器提供多类API时还需要使用聚合发现服务（ADS）API，确保高级别的操作（例如执行服务的A/B部署）可以进行排序以防止流量被丢弃；

### Envoy动态配置

- Envoy支持基于文件系统或通过查询一到多个管理服务器（Management Server） 来发现各种动态资源（配置信息），这些发现服务及其相应的API联合起来称为 xDS API；

- xDS API为Envoy提供了资源的动态配置机制，它也被称为Data Plane API；

### 配置源

![Envoy配置源](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/envoy%E9%85%8D%E7%BD%AE%E6%BA%90.png)

配置源（ConfigSource）用于指定资源配置数据的来源，用于为Listener、Cluster、 Route、Endpoint、Secret和VirtualHost等资源提供配置信息；
目前，Envoy支持的资源配置源只能是path、api_config_source或ads其中之一；

注意：
```text
Delta GRPC是envoy自1.12.0版本依赖的一个新功能，支持增量added/changed/removed，你可以在https://www.envoyproxy.io/docs/envoy/latest/api-docs/xds_protocol#xds-protocol-delta找到相关详细的描述
```

### Resource Types

每个xDS API都与某特定的资源类型相关，xDS API和资源类型之间是1:1 的关系，其对应关系如下：

配置资源 | 资源类型
---- | ----- 
LDS | [envoy.api.v2.Listener](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/lds.proto#envoy-api-msg-listener)
RDS | [envoy.api.v2.RouteConfiguration](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/rds.proto#envoy-api-msg-routeconfiguration)
ScopedRouteConfiguration | [envoy.api.v2.ScopedRouteConfiguration](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/srds.proto#envoy-api-msg-scopedrouteconfiguration)
route.VirtualHost | [envoy.api.v2.route.VirtualHost](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/route/route.proto#envoy-api-msg-route-virtualhost)
CDS | [envoy.api.v2.Cluster](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/cds.proto#envoy-api-msg-cluster)
EDS | [envoy.api.v2.ClusterLoadAssignment](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/eds.proto#envoy-api-msg-clusterloadassignment)
SDS | [envoy.api.v2.Auth.Secret](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/auth/cert.proto#envoy-api-msg-auth-secret)
RTDS | [envoy.service.discovery.v2.Runtime](https://www.envoyproxy.io/docs/envoy/latest/api-v2/service/discovery/v2/rtds.proto#envoy-api-msg-service-discovery-v2-runtime)

URL类型采用type.googleapis.com/<resource type>形式，例如EDS对应于:
```text
type.googleapis.com/envoy.api.v2.ClusterLoadAssignment
```