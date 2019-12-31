# Envoy配置方式
Envoy的架构支持非常灵活的配置方式：简单部署场景可以使用纯静态配置，
而更复杂的部署场景则可以逐步添加需要的动态配置机制。
 
- 基础概念
- Upstream clusters

### 基础概念

Bootstrap配置中几个重要的基础概念：
```json
{
	"node": "{...}",
	"static_resources": "{...}",
	"dynamic_resources": "{...}",
	"cluster_manager": "{...}",
	"hds_config": "{...}",
	"flags_path": "...",
	"stats_sinks": [],
	"stats_config": "{...}",
	"stats_flush_interval": "{...}",
	"watchdog": "{...}",
	"tracing": "{...}",
	"runtime": "{...}",
	"layered_runtime": "{...}",
	"admin": "{...}",
	"overload_manager": "{...}",
	"enable_dispatcher_stats": "...",
	"header_prefix": "..."
}
```
- node：节点标识，以呈现给管理服务器并且例如用于标识目的；
- static_resources：静态配置的资源，用于配置静态的listener、cluster
和secret；
- dynamic_resources：动态配置的资源，用于配置基于xDS API获取
listener、cluster和secret配置的lds_config、cds_config和ads_config；
- admin：Envoy内置的管理接口；
- tracing：分布式跟踪；
- layered_runtime：层级化的运行时，支持使用RTDS从管理服务器
动态加载；
- hds_config：使用HDS从管理服务器加载上游主机健康状态检测相关的配置；
- overload_manager：过载管理器；
- stats_sinks：统计信息接收器；

一般来说，侦听器和集群是最为常用基础配置，无论是以静态 或者是动态方式提供

### Upstream clusters

Envoy可配置任意数量的上游集群，并使用Cluster Manager进行管理；
- 由集群管理器负责管理的各集群可以由用户静态配置，也可借助于CDS API动 态获取；
- 集群中的每个成员由endpoint进行标识，它可由用户静态配置，也可通过EDS或 DNS服务动态发现；
    - Static：静态配置
    - Strict DNS：严格DNS，Envoy将持续和异步地解析指定的DNS目标，
    并将DNS结果中的返回的每个IP地址视为上游集群中可用成员；
    - Logical DNS：逻辑DNS，集群仅使用在需要启动新连接时返回的第一个IP地址，
    而非严格获取DNS查询的结果并假设它们构成整个上游集群；适用于必须通过DNS访问的大规模Web服务集群；
    - Originaldestination：当传入连接通过iptables的REDIRECT或TPROXYtarget或使用代理协议重定向到Envoy时，
    可以使用原始目标集群；
    - Endpoint discovery service (EDS)：EDS是一种基于GRPC或REST-JSON API的xDS管理服务器获取集群成员的服务发现方式；
    - Custom cluster：Envoy还支持在集群配置上的cluster_type字段中指定使用自定义集群发现机制；


