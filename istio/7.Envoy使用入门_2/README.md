# Envoy使用入门_1
本章节将通过docker-compose容器的方式，模拟Sidecar与主容器协作的方式，让你学习到其中的基础配置、
并理解监听器（listener）和集群（Cluster）之间是如何协作的。

 
- Cluster简易静态配置
- tcpproxy-ingress实例
- 参考文档

### Cluster简易静态配置

```yaml
clusters:
- name: ... # 集群的惟一名称，且未提供alt_stat_name时将会被用于统计信息中；
  alt_state_name: ... # 统计信息中使用的集群代名称；
  type: ... # 用于解析集群（生成集群端点）时使用的服务发现类型，可用值有STATIC、STRICT_DNS、LOGICAL_DNS、ORIGINAL_DST和EDS等；
  lb_policy: # 负载均衡算法，支持ROUND_ROBIN、LEAST_REQUEST、RING_HASH、RANDOM、MAGLEV和CLUSTER_PROVIDED；
  load_assignment: # 为STATIC、STRICT_DNS或LOGICAL_DNS类型的集群指定成员获取方式；EDS类型的集成要使用eds_cluster_config字段配置；
    cluster_name: ... # 集群名称；
    endpoints: # 端点列表；
    - locality: {} # 标识上游主机所处的位置，通常以region、zone等进行标识；
      lb_endpoints: # 属于指定位置的端点列表；
      - endpoint_name: ... # 端点的名称；
        endpoint: # 端点定义；
          socket_adddress: # 端点地址标识；
            address: ... # 端点地址；
            port_value： ... # 端点端口；
            protocol: ... # 协议类型；
```

### tcpproxy-ingress实例

1) 创建工作目录，并编辑所需文件
```bash
mkdir tcpproxy
cd tcpproxy
    
#envoy.yaml
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 80}                   #ingress模式，需要接收外部请求，所以是0.0.0.0
    filter_chains:
    - filters:
      - name: envoy.tcp_proxy
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.tcp_proxy.v2.TcpProxy
          stat_prefix: tcp
          cluster: test_cluster

  clusters:
  - name: test_cluster
    connect_timeout: 0.25s
    type: STATIC
    lb_policy: ROUND_ROBIN
    load_assignment:
      cluster_name: test_cluster
      endpoints:
      - lb_endpoints:
        - endpoint:
            address: 
              socket_address: { address: 127.0.0.1, port_value: 8081}               #模拟Sidecar中ingress模式的业务pod主进程，只需要监听本地127.0.0.1接收listener_0的请求就行
              
              
#docker-compose,yaml
version: '3'

services:
  envoy:
    image: envoyproxy/envoy-alpine:v1.11.1
    volumes:
    - /root/envoy/tcpproxy/envoy.yaml:/etc/envoy/envoy.yaml
    network_mode: "service:mainserver"
    depends_on:
    - mainserver

  mainserver:
    image: ikubernetes/mini-http-server:v0.3
    networks:
      envoymesh:
        aliases:
        - webserver
        - httpserver

networks:
  envoymesh: {}           
```

2) 使用docker-compose up启动容器，两者处于同一个网络名称空间（network_mode）

    一个是服务网格的ingress容器：tcpproxy_envoy_1
    
    另一个是业务主容器：tcpproxy_mainserver_1
```bash
docker-compose up
```

3) 进入tcpproxy_envoy_1容器观察ingress的listener_0 80端口是否起来
```bash
[root@k8s-etcd-mater01 tcpproxy]# docker exec -it tcpproxy_envoy_1 /bin/sh
/ # ifconfig 
eth0      Link encap:Ethernet  HWaddr 02:42:AC:12:00:02  
          inet addr:172.18.0.2  Bcast:172.18.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:8 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:648 (648.0 B)  TX bytes:90 (90.0 B)
    
lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
    
/ # netstat -npl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.11:48746        0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1/envoy
tcp        0      0 :::8081                 :::*                    LISTEN      -
udp        0      0 127.0.0.11:47282        0.0.0.0:*                           -
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node PID/Program name    Path
```
 
4) 测试成功
```bash
[root@k8s-etcd-mater01 tcpproxy]# curl 172.18.0.2/
This is a website server by a Go HTTP server.
[root@k8s-etcd-mater01 tcpproxy]# curl 172.18.0.2/hostname
Hostname: 9cb0738547f0.
[root@k8s-etcd-mater01 tcpproxy]# curl 172.18.0.2/headers
User-Agent: curl/7.29.0
Accept: */*

```

### 参考文档

Clusters_API_v2_Reference：https://www.envoyproxy.io/docs/envoy/latest/api-v2/clusters/clusters