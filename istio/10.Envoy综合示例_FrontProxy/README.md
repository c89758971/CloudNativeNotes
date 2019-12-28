# Envoy综合示例_FrontProxy
本章节将先使用官方Sandbox的例子，给大家讲解Envoy作为前端代理时的工作逻辑，
然后我会新增一个TLS的配置去增强FrontProxy。

 
- Http-Envoy-FrontProxy
- Https-Envoy-FrontProxy

### Http-Envoy-FrontProxy

下面是使用 docker compose 部署的架构图：
![Http-Envoy-FrontProxy](https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/envoy_frontproxy.png)

所有传入的请求都通过前端 envoy 进行路由，该 envoy 充当位于 envoymesh 网络边缘的反向代理。通过docker compose将端口80映射到8000端口。
此外，请注意，由前端envoy由到服务容器的所有流量实际上路由到服务envoy。反过来，服务envoy通过回环地址将请求路由到flask应用程序。
此设置说明了运行服务 envoy 与您的服务搭配的优势：所有请求都由服务 envoy 处理，并有效地路由到您的服务。

1) 将本章节http/目录下的文件clone到本地，并使用docker-composer up启动。 你也可以在[front-proxy](https://github.com/envoyproxy/envoy/tree/master/examples/front-proxy)找到相关配置文件
```bash
docker-compose up
    
$ docker-compose ps
        Name                       Command               State      Ports
-------------------------------------------------------------------------------------------------------------
example_service1_1      /bin/sh -c /usr/local/bin/ ... Up       80/tcp
example_service2_1      /bin/sh -c /usr/local/bin/ ... Up       80/tcp
example_front-envoy_1   /bin/sh -c /usr/local/bin/ ... Up       0.0.0.0:8000->80/tcp, 0.0.0.0:8001->8001/tcp
    
```

2) 您现在可以通过前端 envoy 向两项服务发送请求。
```bash
#向service1：
$ curl -v $(docker-machine ip default):8000/service/1
*   Trying 192.168.99.100...
* Connected to 192.168.99.100 (192.168.99.100) port 8000 (#0)
> GET /service/1 HTTP/1.1
> Host: 192.168.99.100:8000
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< content-type: text/html; charset=utf-8
< content-length: 89
< x-envoy-upstream-service-time: 1
< server: envoy
< date: Fri, 26 Aug 2016 19:39:19 GMT
< x-envoy-protocol-version: HTTP/1.1
<
Hello from behind Envoy (service 1)! hostname: f26027f1ce28 resolvedhostname: 172.19.0.6
* Connection #0 to host 192.168.99.100 left intact
    
    
#向 service2：
$ curl -v $(docker-machine ip default):8000/service/2
*   Trying 192.168.99.100...
* Connected to 192.168.99.100 (192.168.99.100) port 8000 (#0)
> GET /service/2 HTTP/1.1
> Host: 192.168.99.100:8000
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< content-type: text/html; charset=utf-8
< content-length: 89
< x-envoy-upstream-service-time: 2
< server: envoy
< date: Fri, 26 Aug 2016 19:39:23 GMT
< x-envoy-protocol-version: HTTP/1.1
<
Hello from behind Envoy (service 2)! hostname: 92f4a3737bbc resolvedhostname: 172.19.0.2
* Connection #0 to host 192.168.99.100 left intact

```

3) 你也可以使用docker-compose scale service1=3命令，扩展service1节点数量，以便测试Envoy的负载均衡能力，本章节不再演示，你可以参考[官方文档-Step 4](https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/front_proxy)，也可以参考[中文文档的步骤四](https://www.servicemesher.com/envoy/start/sandboxes/front_proxy.html)。