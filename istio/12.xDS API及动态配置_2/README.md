# xDS API及动态配置_2

 
- 基于文件系统订阅的概念
- 基于文件系统订阅的配置
- 基于文件系统订阅的实战

### 基于文件系统订阅的概念

基于文件系统订阅，为Envoy提供动态配置的最简单方法是将其放置在ConfigSource中显式指定的文件路径中，使用inotify（Mac OS X上的kqueue）来监视文件的更改，并在更新时解析文件中的DiscoveryResponse proto，其支持：
```text
protobufs，JSON，YAML和proto文本
```
但你需要注意：

- 无论采用上述何种方案，文件内容自身需要编排为DiscoveryResponse proto响应报文的格式
- 如果发生配置更新拒绝，xDS API的最后一个有效配置将继续适用
- 除了统计计数器和日志以外，没有任何机制可用于文件系统订阅ACK/NACK更新
- 最简单的提供动态配置的方法，仅方便学习，不适合生产环境使用。其手动修改环节较多，和动态的挑战场景不符。

### 基于文件系统订阅的配置

以EDS为例，Cluster为静态定义，其各Endpoint通过EDS动态发现：

![eds_文件系统订阅](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/eds_%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E8%AE%A2%E9%98%85.png)

如图所示，左边是我们之前一直使用的静态方式指定的方法，右边则是通过基于文件系统订阅的方式进行动态配置的。
你需要做的是：
- 指定type: EDS
- 给出EDS对应配置即可，这里是指定订阅的文件路径

##### 订阅的文件：/etc/envoy/eds.conf

文件的配置需要以json格式给出：
```json
{
"version_info": "1",
"resources": [{
  "@type": "type.googleapis.com/envoy.api.v2.ClusterLoadAssignment",
  "cluster_name": "webcluster1",
  "endpoints": [{
    "lb_endpoints": [{
      "endpoint": {
        "address": {
          "socket_address": {
            "address": "172.17.0.3",
            "port_value": 80}}}},
      {
      "endpoint": {
        "address": {
          "socket_address": {
            "address": "172.17.0.3",
            "port_value": 80}}}
			}]
		}]
	}]

}
```

你需要注意的是：
1) 基于文件订阅的配置是基于inotify监听的
2) 配置文件的更新 需要增加"version_info": "1"字段的值