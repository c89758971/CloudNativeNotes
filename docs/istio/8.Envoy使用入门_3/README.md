# Envoy使用入门_3
本章节首先阐述L4过滤器http_connection_manager和egress代理配置说明，然后使用2个完善的例子，
让你充分了解http_connection_manager于egress和ingress中的使用情况。

 
- L4过滤器http_connection_manager
- Egress代理配置示例
- Egress实战
- Ingress实战


### L4过滤器http_connection_manager

http_connection_manager通过引入L7过滤器链实现了对http协议的操纵， 其中router过滤器用于配置路由转发
```yaml
listeners:
- name:
    address:
      socket_address: { address: ..., port_value: ..., protocol: ... }
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
          condec_type: ... # 连接管理器使用的编解码器类型，可用值有AUTO、HTTP1和HTTP2；
          stat_prefix: ... # 统计信息中使用的易读性的信息前缀；
          route_config: # 静态路由配置；动态配置应该使用rds字段进行指定；
            name: ... # 路由配置的名称；
            virtual_hosts: # 虚拟主机列表，用于构成路由表；
            - name: ... # 虚拟主机的逻辑名称，用于统计信息，与路由无关；
              domains: [] # 当前虚拟主机匹配的域名列表，支持使用“*”通配符；匹配搜索次序为精确匹配、前缀通配、后缀通配及完全通配；
              routes: [] # 路由列表，按顺序搜索，第一个匹配到路由信息；
          http_filters: # 定义http过滤器链
          - name: envoy.router # 调用的过滤器为envoy.router
```
注意：
- 处理请求时，Envoy首先根据下游客户端请求的“host”来搜索虚拟主机列表中各virtual_host中的domains列表中的定义，第一个匹配到的Domain的 定义所属的virtual_host即可处理请求的虚拟主机；
- 而后搜索当前虚拟主机中的routes列表中的路由列表中各路由条目的match的定义，第一个匹配到的match后的路由机制（route、redirect或direct_response）即生效；

### Egress代理配置示例
下面是一个egress类型的Envoy配置示例，它定义了两个virtual_host，不过，发往第二个 virtual_host的请求将被重定向至第一个virtual_hosts：web_service_1
```yaml
static_resources:
    listeners:
    - name: listener_0
      address:
        socket_address: { address: 127.0.0.1, port_value: 80 }
      filter_chains:
      - filters:
        - name: envoy.http_connection_manager
          config:
            stat_prefix: egress_http
            codec_type: AUTO
            route_config:
              name: test_route
              virtual_hosts:
              - name: web_service_1
                domains: ["*.ik8s.io", "ik8s.io"]
                routes:
                - match: { prefix: "/" }
                  route: { cluster: web_cluster_1 }
              - name: web_service_2
                domains: ["*.k8scast.cn","k8scast.cn"]
                routes:
                - match: { prefix: "/" }
                  redirect:
                    host_redirect: "www.ik8s.io"
            http_filters:
            - name: envoy.router
    clusters:
      ...
```
### Egress实战


需要提前配置好ip_forward：
```bash
sysctl -w net.ipv4.ip_forward=1
```

![egress-1](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/egress-http_connection_manager.png)

你需要先读懂这张图，本小结准备用curl模拟Sidecar模式下egress的工作逻辑，并借用内建的filter(http_connection_manager)进行代理。

1) 将egress目录下的配置文件拉取到本地，并使用docker-compose up。
    所有需要注意的地方，已经在配置文件中进行了注释
    
2) 注意业务容器ID，下面测试会echo出来，用于检测。
    进入egress_envoy_1容器的交互式接口，准备测试
```bash
CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS              PORTS               NAMES
2771ccb25e01        egress_envoy                        "/docker-entrypoint.…"   22 seconds ago      Up 21 seconds       10000/tcp           egress_envoy_1
bdd457740567        ikubernetes/mini-http-server:v0.3   "/bin/httpserver"        24 seconds ago      Up 23 seconds       8081/tcp            egress_webserver1_1
a9273da1f539        ikubernetes/mini-http-server:v0.3   "/bin/httpserver"        24 seconds ago      Up 23 seconds       8081/tcp            egress_webserver2_1
    
    
[root@k8s-etcd-mater01 tcpproxy]# docker exec -it egress_envoy_1 /bin/sh
/ # ifconfig 
eth0      Link encap:Ethernet  HWaddr 02:42:AC:13:00:04  
          inet addr:172.19.0.4  Bcast:172.19.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:17 errors:0 dropped:0 overruns:0 frame:0
          TX packets:21 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:1794 (1.7 KiB)  TX bytes:1554 (1.5 KiB)
    
lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:15 errors:0 dropped:0 overruns:0 frame:0
          TX packets:15 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:898 (898.0 B)  TX bytes:898 (898.0 B)
    
/ # netstat -tnlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.11:42955        0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:80            0.0.0.0:*               LISTEN      1/envoy

```

3) 根据我们的预研，分别进行curl测试，发现跳转结果和预期一样，配置成功
```bash
/ # curl -H "host: www.ik8s.io" 127.0.0.1/hostname
Hostname: bdd457740567.              #webserver1
    
/ # curl -H "host: www.k8scast.cn" 127.0.0.1/hostname
Hostname: a9273da1f539.              #webserver2
    
/ # curl -H "host: www.k8sall.cn" 127.0.0.1/hostname
Hostname: bdd457740567.             #webserver1
/ # curl -H "host: www.k8sall.cn" 127.0.0.1/hostname
Hostname: a9273da1f539.             #webserver2
    
curl -H "host: www.k8stest.com" 127.0.0.1/hostname
Hostname: bdd457740567.            #webserver1

```

### Ingress实战

1) 所有配置文件，请看ingress目录下（关键字段，我已经给了注释），此时你应该较容易看懂，
然后使用docker-compose up
```bash
[root@k8s-etcd-mater01 ingress]# docker-compose up
Creating network "ingress_envoymesh" with the default driver
Creating ingress_mainserver_1 ... done
Creating ingress_envoy_1      ... done
Attaching to ingress_mainserver_1, ingress_envoy_1
envoy_1       | [2019-12-26 14:28:31.246][1][info][main] [source/server/server.cc:238] initializing epoch 0 (hot restart version=11.104)
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:240] statically linked extensions:
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:242]   access_loggers: envoy.file_access_log,envoy.http_grpc_access_log
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:245]   filters.http: envoy.buffer,envoy.cors,envoy.csrf,envoy.ext_authz,envoy.fault,envoy.filters.http.dynamic_forward_proxy,envoy.filters.http.grpc_http1_reverse_bridge,envoy.filters.http.header_to_metadata,envoy.filters.http.jwt_authn,envoy.filters.http.original_src,envoy.filters.http.rbac,envoy.filters.http.tap,envoy.grpc_http1_bridge,envoy.grpc_json_transcoder,envoy.grpc_web,envoy.gzip,envoy.health_check,envoy.http_dynamo_filter,envoy.ip_tagging,envoy.lua,envoy.rate_limit,envoy.router,envoy.squash
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:248]   filters.listener: envoy.listener.original_dst,envoy.listener.original_src,envoy.listener.proxy_protocol,envoy.listener.tls_inspector
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:251]   filters.network: envoy.client_ssl_auth,envoy.echo,envoy.ext_authz,envoy.filters.network.dubbo_proxy,envoy.filters.network.mysql_proxy,envoy.filters.network.rbac,envoy.filters.network.sni_cluster,envoy.filters.network.thrift_proxy,envoy.filters.network.zookeeper_proxy,envoy.http_connection_manager,envoy.mongo_proxy,envoy.ratelimit,envoy.redis_proxy,envoy.tcp_proxy
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:253]   stat_sinks: envoy.dog_statsd,envoy.metrics_service,envoy.stat_sinks.hystrix,envoy.statsd
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:255]   tracers: envoy.dynamic.ot,envoy.lightstep,envoy.tracers.datadog,envoy.tracers.opencensus,envoy.zipkin
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:258]   transport_sockets.downstream: envoy.transport_sockets.alts,envoy.transport_sockets.tap,raw_buffer,tls
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:261]   transport_sockets.upstream: envoy.transport_sockets.alts,envoy.transport_sockets.tap,raw_buffer,tls
envoy_1       | [2019-12-26 14:28:31.247][1][info][main] [source/server/server.cc:267] buffer implementation: old (libevent)
envoy_1       | [2019-12-26 14:28:31.254][1][warning][main] [source/server/server.cc:327] No admin address given, so no admin HTTP server started.
envoy_1       | [2019-12-26 14:28:31.256][1][info][main] [source/server/server.cc:432] runtime: layers:
envoy_1       |   - name: base
envoy_1       |     static_layer:
envoy_1       |       {}
envoy_1       |   - name: admin
envoy_1       |     admin_layer:
envoy_1       |       {}
envoy_1       | [2019-12-26 14:28:31.256][1][warning][runtime] [source/common/runtime/runtime_impl.cc:497] Skipping unsupported runtime layer: name: "base"
envoy_1       | static_layer {
envoy_1       | }
envoy_1       | 
envoy_1       | [2019-12-26 14:28:31.256][1][info][config] [source/server/configuration_impl.cc:61] loading 0 static secret(s)
envoy_1       | [2019-12-26 14:28:31.256][1][info][config] [source/server/configuration_impl.cc:67] loading 1 cluster(s)
envoy_1       | [2019-12-26 14:28:31.261][1][info][upstream] [source/common/upstream/cluster_manager_impl.cc:148] cm init: all clusters initialized
envoy_1       | [2019-12-26 14:28:31.261][1][info][config] [source/server/configuration_impl.cc:71] loading 1 listener(s)
envoy_1       | [2019-12-26 14:28:31.263][1][info][config] [source/server/configuration_impl.cc:96] loading tracing configuration
envoy_1       | [2019-12-26 14:28:31.263][1][info][config] [source/server/configuration_impl.cc:116] loading stats sink configuration
envoy_1       | [2019-12-26 14:28:31.263][1][info][main] [source/server/server.cc:500] all clusters initialized. initializing init manager
envoy_1       | [2019-12-26 14:28:31.263][1][info][config] [source/server/listener_manager_impl.cc:761] all dependencies initialized. starting workers
envoy_1       | [2019-12-26 14:28:31.264][1][info][main] [source/server/server.cc:516] starting main dispatch loop

```

2) 进入ingress_envoy_1容器交互式接口，获知ip地址
```bash
[root@k8s-etcd-mater01 egress]# docker exec -it ingress_envoy_1 /bin/sh
/ # ifconfig 
eth0      Link encap:Ethernet  HWaddr 02:42:AC:14:00:02  
          inet addr:172.20.0.2  Bcast:172.20.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:32 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:4528 (4.4 KiB)  TX bytes:180 (180.0 B)
    
lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

```

3) 退出容器，使用curl命令，探测ingress_envoy_1容器的80端口；和预期一致，配置成功
```bash
[root@k8s-etcd-mater01 egress]# curl 172.20.0.2
This is a website server by a Go HTTP server.
    
[root@k8s-etcd-mater01 egress]# curl 172.20.0.2/hostname
Hostname: 43e46c0f245e.

```