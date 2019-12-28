# xDS API及动态配置_1

 
- xDS API概述
- Envoy动态配置
- 配置源


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
