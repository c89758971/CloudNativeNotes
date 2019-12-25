# Envoy使用入门_1
本章节将通过docker容器的方式，启动构建envoy环境；

并通过静态化配置和内置过滤器envoy.echo的方式，让你了解Envoy的初步使用。
 
- 构建说明
- 环境构建
- 参考文档

### 构建说明

Envoy使用C++开发，并以Bazel为构建系统，如果你想尝试直接编译，则需要依赖如下两个环境：
- GCC 7+ or Clang/LLVM 7+ (for C++14 support)
- These Bazel native dependencies

另外，Enovy也提供了基于docker镜像的预编译完成的程序，用户也可基于这些基础镜像打包定制镜像， 并以容器的方式运行envoy。（推荐）

### 环境构建

1) 于[dockerhub]("https://hub.docker.com/r/envoyproxy/envoy-alpine")搜索最新的envoy镜像，并pull下来
```bash
docker pull envoyproxy/envoy-alpine:v1.11.1
```

2) 创建工作目录envoy，并在目录中创建envoy.yaml配置文件和Dockerfile。
   
   配置文件的语法规范请参考：[bootstrap]("https://www.envoyproxy.io/docs/envoy/latest/api-v2/bootstrap/bootstrap")
    
   所有内置过滤器请参考：[network_filters]("https://www.envoyproxy.io/docs/envoy/latest/configuration/listeners/network_filters/network_filters#config-network-filters")
```bash
mkdir envoy 
cd envoy
    
#envoy.yaml    
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 15001
    filter_chains:
      filters:
      - name: envoy.echo      #内置filter,将返回所有接收到的报文信息   
      
#Dockerfile
FROM envoyproxy/envoy-alpine:v1.11.1
ADD envoy.yaml /etc/envoy/      
```
3) 打镜像并运行
```bash
docker build . -t envoy-echo:v0.1
docker container run --name echo --rm envoy-echo:v0.1
```

4) 另开一个中端，并通过命令获取容器运行的ip
```bash
[root@k8s-etcd-mater01 envoy]# docker exec -it echo /bin/sh
/ # ifconfig 
eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:02  
          inet addr:172.17.0.2  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:8 errors:0 dropped:0 overruns:0 frame:0
          TX packets:3 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:648 (648.0 B)  TX bytes:258 (258.0 B)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
```

5) 退出容器，使用nc命令测试172.17.0.2 10051并输入字符串，发现有相同字符返回，测试成功
```bash
[root@k8s-etcd-mater01 envoy]# nc 172.17.0.2 15001
Hi Envoy         #手动输入
Hi Envoy         #自动返回

```

### 参考文档

api-v2 Reference：

https://www.envoyproxy.io/docs/envoy/latest/api-v2/bootstrap/bootstrap

内置网络过滤器：

https://www.envoyproxy.io/docs/envoy/latest/configuration/listeners/network_filters/network_filters