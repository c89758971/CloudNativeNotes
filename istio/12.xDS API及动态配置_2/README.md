# xDS API及动态配置_2
基于文件系统订阅，为Envoy提供动态配置的最简单方法；通过本章节的学习，你可以充分了解到基于文件系统订阅的概念、配置难点、EDS、CDS使用中的实战配置，包括单应用和多应用的结合。
 
- 基于文件系统订阅的概念
- 基于文件系统订阅的配置-EDS
- 基于文件系统订阅的实战-EDS
- 基于文件系统订阅的配置-CDS
- 基于文件系统订阅的实战-CDS+STRICT_DNS
- 基于文件系统订阅的实战-CDS+EDS

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

### 基于文件系统订阅的配置-EDS

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

### 基于文件系统订阅的实战-EDS

1) 首先将eds-filesystem/目录下的文件clone到本地，然后使用docker-compose up命令启动。你需要注意的是：
- envoy.yaml中，node级别的id和cluster字段必须指定
- 不建议在docker compose里使用volume挂载的方式，否则不方便触发inotify机制，需要手动告知envoy更新配置文件
- eds.conf只是一个配置模版，里面的ip是不对的，你需要稍后自己去更改，体验和测试自动更新
- 本实例采用egress模式，这时你应该很容易就可以发现
```bash
docker-compose up
    
#启动信息    
envoy_1       | [2019-12-29 12:02:05.235][1][warning][runtime] [source/common/runtime/runtime_impl.cc:497] Skipping unsupported runtime layer: name: "base"
envoy_1       | static_layer {
envoy_1       | }
envoy_1       | 
envoy_1       | [2019-12-29 12:02:05.235][1][info][config] [source/server/configuration_impl.cc:61] loading 0 static secret(s)
envoy_1       | [2019-12-29 12:02:05.235][1][info][config] [source/server/configuration_impl.cc:67] loading 1 cluster(s)
envoy_1       | [2019-12-29 12:02:05.236][1][info][upstream] [source/common/upstream/cluster_manager_impl.cc:124] cm init: initializing secondary clusters
webserver1_1  | Listening on http://0.0.0.0:8081
envoy_1       | [2019-12-29 12:02:05.237][1][info][upstream] [source/common/upstream/cluster_manager_impl.cc:148] cm init: all clusters initialized
envoy_1       | [2019-12-29 12:02:05.237][1][info][config] [source/server/configuration_impl.cc:71] loading 1 listener(s)
envoy_1       | [2019-12-29 12:02:05.239][1][info][config] [source/server/configuration_impl.cc:96] loading tracing configuration
envoy_1       | [2019-12-29 12:02:05.239][1][info][config] [source/server/configuration_impl.cc:116] loading stats sink configuration
envoy_1       | [2019-12-29 12:02:05.239][1][info][main] [source/server/server.cc:500] all clusters initialized. initializing init manager
envoy_1       | [2019-12-29 12:02:05.239][1][info][config] [source/server/listener_manager_impl.cc:761] all dependencies initialized. starting workers
envoy_1       | [2019-12-29 12:02:05.240][1][info][main] [source/server/server.cc:516] starting main dispatch loop
webserver2_1  | Listening on http://0.0.0.0:8081    
```

2) 接下来，我们进入eds-filesystem_envoy_1容器的交互式接口，通过admin接口查看当前culsters的配置信息，检查eds.conf的内容是否成功读取
```bash
[root@k8s-etcd-mater01 eds-filesystem]# docker exec -it eds-filesystem_envoy_1 /bin/sh
    
/etc/envoy # curl 127.0.0.1:9901/listeners
listener_http::127.0.0.1:80
/etc/envoy # curl 127.0.0.1:9901/clusters
webcluster1::default_priority::max_connections::1024
webcluster1::default_priority::max_pending_requests::1024
webcluster1::default_priority::max_requests::1024
webcluster1::default_priority::max_retries::3
webcluster1::high_priority::max_connections::1024
webcluster1::high_priority::max_pending_requests::1024
webcluster1::high_priority::max_requests::1024
webcluster1::high_priority::max_retries::3
webcluster1::added_via_api::false
webcluster1::172.17.0.3:8081::cx_active::0
webcluster1::172.17.0.3:8081::cx_connect_fail::0
webcluster1::172.17.0.3:8081::cx_total::0
webcluster1::172.17.0.3:8081::rq_active::0
webcluster1::172.17.0.3:8081::rq_error::0
webcluster1::172.17.0.3:8081::rq_success::0
webcluster1::172.17.0.3:8081::rq_timeout::0
webcluster1::172.17.0.3:8081::rq_total::0
webcluster1::172.17.0.3:8081::hostname::
webcluster1::172.17.0.3:8081::health_flags::healthy
webcluster1::172.17.0.3:8081::weight::1
webcluster1::172.17.0.3:8081::region::
webcluster1::172.17.0.3:8081::zone::
webcluster1::172.17.0.3:8081::sub_zone::
webcluster1::172.17.0.3:8081::canary::false
webcluster1::172.17.0.3:8081::priority::0
webcluster1::172.17.0.3:8081::success_rate::-1
webcluster1::172.17.0.3:8081::local_origin_success_rate::-1
    
```

3) 此时我们envoy.yaml中cluster段里的type:EDS配置已经生效，接下来我们要获取一个业务容器的ip更新进来（/etc/envoy/eds.conf）
```bash
#业务容器的ip信息
eds-filesystem_webserver1_1：172.23.0.3
eds-filesystem_webserver2_1：172.23.0.4
    
#首先将eds-filesystem_webserver1_1：172.23.0.3进行更新，你需要时刻记住，基于文件系统订阅的热更新是基于inotify的，我们修改好/etc/envoy/eds.conf文件后，需要触发inotify
#文件更新
/etc/envoy # cat eds.conf 
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
              "address": "172.23.0.3",
              "port_value": 8081
            }
          }
        }
      }]
    }]
  }]
}
    
#触发inotify    
/etc/envoy # mv eds.conf eds.conf.tmp && mv eds.conf.tmp eds.conf
        
#检查当前配置，已经成功读取        
/etc/envoy # curl 127.0.0.1:9901/clusters
webcluster1::default_priority::max_connections::1024
webcluster1::default_priority::max_pending_requests::1024
webcluster1::default_priority::max_requests::1024
webcluster1::default_priority::max_retries::3
webcluster1::high_priority::max_connections::1024
webcluster1::high_priority::max_pending_requests::1024
webcluster1::high_priority::max_requests::1024
webcluster1::high_priority::max_retries::3
webcluster1::added_via_api::false
webcluster1::172.23.0.3:8081::cx_active::0
webcluster1::172.23.0.3:8081::cx_connect_fail::0
webcluster1::172.23.0.3:8081::cx_total::0
webcluster1::172.23.0.3:8081::rq_active::0
webcluster1::172.23.0.3:8081::rq_error::0
webcluster1::172.23.0.3:8081::rq_success::0
webcluster1::172.23.0.3:8081::rq_timeout::0
webcluster1::172.23.0.3:8081::rq_total::0
webcluster1::172.23.0.3:8081::hostname::
webcluster1::172.23.0.3:8081::health_flags::healthy
webcluster1::172.23.0.3:8081::weight::1
webcluster1::172.23.0.3:8081::region::
webcluster1::172.23.0.3:8081::zone::
webcluster1::172.23.0.3:8081::sub_zone::
webcluster1::172.23.0.3:8081::canary::false
webcluster1::172.23.0.3:8081::priority::0
webcluster1::172.23.0.3:8081::success_rate::-1
webcluster1::172.23.0.3:8081::local_origin_success_rate::-1

```

4) 最后我们把另一个业务ip更新进去就行了，具体操作如下所示：
```bash
#eds.conf
{
  "version_info": "10",
  "resources": [{
    "@type": "type.googleapis.com/envoy.api.v2.ClusterLoadAssignment",
    "cluster_name": "webcluster1",
    "endpoints": [{
      "lb_endpoints": [{
        "endpoint": {
          "address": {
            "socket_address": {
              "address": "172.23.0.3",
              "port_value": 8081
            }
          }
        }},
        {"endpoint": {
          "address": {
            "socket_address": {
              "address": "172.23.0.4",
              "port_value": 8081
            }
          }
        }
      }]
    }]
  }]
}
    
    
#检查管理接口，你可以发现业务2的ip也已经热加载进来了
/etc/envoy # mv eds.conf eds.conf.tmp && mv eds.conf.tmp eds.conf
/etc/envoy # curl 127.0.0.1:9901/clusters
webcluster1::default_priority::max_connections::1024
webcluster1::default_priority::max_pending_requests::1024
webcluster1::default_priority::max_requests::1024
webcluster1::default_priority::max_retries::3
webcluster1::high_priority::max_connections::1024
webcluster1::high_priority::max_pending_requests::1024
webcluster1::high_priority::max_requests::1024
webcluster1::high_priority::max_retries::3
webcluster1::added_via_api::false
webcluster1::172.23.0.3:8081::cx_active::0
webcluster1::172.23.0.3:8081::cx_connect_fail::0
webcluster1::172.23.0.3:8081::cx_total::3
webcluster1::172.23.0.3:8081::rq_active::0
webcluster1::172.23.0.3:8081::rq_error::0
webcluster1::172.23.0.3:8081::rq_success::6
webcluster1::172.23.0.3:8081::rq_timeout::0
webcluster1::172.23.0.3:8081::rq_total::6
webcluster1::172.23.0.3:8081::hostname::
webcluster1::172.23.0.3:8081::health_flags::healthy
webcluster1::172.23.0.3:8081::weight::1
webcluster1::172.23.0.3:8081::region::
webcluster1::172.23.0.3:8081::zone::
webcluster1::172.23.0.3:8081::sub_zone::
webcluster1::172.23.0.3:8081::canary::false
webcluster1::172.23.0.3:8081::priority::0
webcluster1::172.23.0.3:8081::success_rate::-1
webcluster1::172.23.0.3:8081::local_origin_success_rate::-1
webcluster1::172.23.0.4:8081::cx_active::0
webcluster1::172.23.0.4:8081::cx_connect_fail::0
webcluster1::172.23.0.4:8081::cx_total::0
webcluster1::172.23.0.4:8081::rq_active::0
webcluster1::172.23.0.4:8081::rq_error::0
webcluster1::172.23.0.4:8081::rq_success::0
webcluster1::172.23.0.4:8081::rq_timeout::0
webcluster1::172.23.0.4:8081::rq_total::0
webcluster1::172.23.0.4:8081::hostname::
webcluster1::172.23.0.4:8081::health_flags::healthy
webcluster1::172.23.0.4:8081::weight::1
webcluster1::172.23.0.4:8081::region::
webcluster1::172.23.0.4:8081::zone::
webcluster1::172.23.0.4:8081::sub_zone::
webcluster1::172.23.0.4:8081::canary::false
webcluster1::172.23.0.4:8081::priority::0
webcluster1::172.23.0.4:8081::success_rate::-1
webcluster1::172.23.0.4:8081::local_origin_success_rate::-1
    
#最后我们也可以通过实际访问，来进行检验。
/etc/envoy # curl 127.0.0.1/hostname
Hostname: 8887eef2b2e7.
/etc/envoy # curl 127.0.0.1/hostname
Hostname: 687143741fc6.
/etc/envoy # curl 127.0.0.1/hostname
Hostname: 8887eef2b2e7.
/etc/envoy # curl 127.0.0.1/hostname
Hostname: 687143741fc6.
```
此时，我相信你已经对EDS基于文件系统订阅的动态配置已经有了一定的了解了。

### 基于文件系统订阅的配置-CDS

1) 编辑envoy.yaml，将集群配置修改为动态资源。

    注意：dynamic_resources为定级字段！！！
```bash
dynamic_resources:
    cds_config:
        path: "cds.conf"
```
2) 定义cds.conf (/etc/envoy/cds.conf) 配置文件，配置Discovery Response应答配置
```bash
{
	"version_info": "0",
	"resources": [{
		"@type": "type.googleapis.com/envoy.api.v2.Cluster",
		"name": "targetCluster",
		"connect_timeout": "0.25s",
		"lb_policy": "ROUND_ROBIN",
		"type": "EDS",
		"eds_cluster_config": {
			"service_name": "webcluster1",
			"eds_config": {
				"path": "/etc/envoy/eds.conf"
			}
		}
	}]
}	
```

### 基于文件系统订阅的实战-CDS+STRICT_DNS

本小节通过CDS+STRICT_DNS的方式，向你展示CDS基于文件系统订阅的配置变更自动化
1) 首先将cds-filesystem/目录下的文件clone到本地，然后使用docker-compose up命令启动三个容器。你需要注意的是：
- envoy.yaml中的dynamic_resources段是定级字段；
- compose文件中描述的2个业务容器的别名aliases：myserver，在cds.conf中通过"type": "STRICT_DNS"的方式，结合socket_address指定的。
```bash
docker-compose up
```

2) 进入cds-filesystem_envoy_1容器的交互式接口，并查看cluster的管理接口，发现CDS+STRICT_DNS的方式已经成功加载，并能获取cluster接口的配置
```bash
/etc/envoy # curl 127.0.0.1:9901/clusters
webcluster1::default_priority::max_connections::1024
webcluster1::default_priority::max_pending_requests::1024
webcluster1::default_priority::max_requests::1024
webcluster1::default_priority::max_retries::3
webcluster1::high_priority::max_connections::1024
webcluster1::high_priority::max_pending_requests::1024
webcluster1::high_priority::max_requests::1024
webcluster1::high_priority::max_retries::3
webcluster1::added_via_api::true
webcluster1::172.31.0.4:8081::cx_active::0
webcluster1::172.31.0.4:8081::cx_connect_fail::0
webcluster1::172.31.0.4:8081::cx_total::0
webcluster1::172.31.0.4:8081::rq_active::0
webcluster1::172.31.0.4:8081::rq_error::0
webcluster1::172.31.0.4:8081::rq_success::0
webcluster1::172.31.0.4:8081::rq_timeout::0
webcluster1::172.31.0.4:8081::rq_total::0
webcluster1::172.31.0.4:8081::hostname::myserver
webcluster1::172.31.0.4:8081::health_flags::healthy
webcluster1::172.31.0.4:8081::weight::1
webcluster1::172.31.0.4:8081::region::
webcluster1::172.31.0.4:8081::zone::
webcluster1::172.31.0.4:8081::sub_zone::
webcluster1::172.31.0.4:8081::canary::false
webcluster1::172.31.0.4:8081::priority::0
webcluster1::172.31.0.4:8081::success_rate::-1
webcluster1::172.31.0.4:8081::local_origin_success_rate::-1
webcluster1::172.31.0.3:8081::cx_active::0
webcluster1::172.31.0.3:8081::cx_connect_fail::0
webcluster1::172.31.0.3:8081::cx_total::0
webcluster1::172.31.0.3:8081::rq_active::0
webcluster1::172.31.0.3:8081::rq_error::0
webcluster1::172.31.0.3:8081::rq_success::0
webcluster1::172.31.0.3:8081::rq_timeout::0
webcluster1::172.31.0.3:8081::rq_total::0
webcluster1::172.31.0.3:8081::hostname::myserver
webcluster1::172.31.0.3:8081::health_flags::healthy
webcluster1::172.31.0.3:8081::weight::1
webcluster1::172.31.0.3:8081::region::
webcluster1::172.31.0.3:8081::zone::
webcluster1::172.31.0.3:8081::sub_zone::
webcluster1::172.31.0.3:8081::canary::false
webcluster1::172.31.0.3:8081::priority::0
webcluster1::172.31.0.3:8081::success_rate::-1
webcluster1::172.31.0.3:8081::local_origin_success_rate::-1
    
#访问实际业务容器
/etc/envoy # curl 127.0.0.1/hostname
Hostname: 76519a85b890.
/etc/envoy # curl 127.0.0.1/hostname
Hostname: ce52256a9f45.
    
```

### 基于文件系统订阅的实战-CDS+EDS

如果上面的操作你已经成功完成。那么文件已经有了，现在要做的只是让配置生效，接下来你要做的是：
1) 将cds.conf.v2文件的内容覆盖cds.conf，并更新"version_info": "0"字段；
2) 更新eds.conf文件，将2个业务容器的ip填写进去，同时要保证更新"version_info": "0"字段；
3) 通过mv命令，触发inotify机制：cds.conf和eds.conf；
4) 最后通过config_dump检查配置清单，因为如果你操作正确的化，cluster配置和上一小节是一摸一样的，无法判断。所以我们要去看配置，确认读取的是STRICT_DNS还是EDS！！！
```bash
/etc/envoy # curl 127.0.0.1:9901/config_dump
  {
   "@type": "type.googleapis.com/envoy.admin.v2alpha.ClustersConfigDump",
   "version_info": "0",
   "dynamic_active_clusters": [
    {
     "version_info": "0",
     "cluster": {
      "name": "webcluster1",
      "type": "EDS",                  #cds配置此时读取的是EDS，测试完成
      "eds_cluster_config": {
       "eds_config": {
        "path": "/etc/envoy/eds.conf"
       },

```