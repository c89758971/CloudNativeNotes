# Envoy管理接口基础应用
Envoy内建了一个管理接口，它支持查询和修改操作，甚至有可能暴露私 有数据（例如统计数据、集群名称和证书信息等），因此非常有必要精心 编排其访问控制机制以避免非授权访问
 
- admin核心字段
- admin-path
- admin实战

### admin核心字段
```yaml
admin:
    access_log_path: ...                 # 管理接口的访问日志文件路径，无须记录访问日志时使用/dev/null；
    profile_path: ...                    # cpu profiler的输出路径，默认为/var/log/envoy/envoy.prof；
    address:                             # 监听的套接字；
      socket_address: 
      protocol: ...
      address: ...
      port_value: ...
```

admin是另一个定级字段，和static_resources同级，你可以在[官方admin](https://www.envoyproxy.io/docs/envoy/latest/api-v2/admin/admin)中找到最详细的api配置说明

### admin-path

envoy的admin管理接口中，也内置了很多/path，不同的path可能会分别接受不同的GET或 POST请求。你可以通过GET /help：打印所有可用选项：

uri | description | 备注
---- | ----- | ----- 
/ | Admin home page | GET
/certs | print certs on machine | GET，列出已加载的所有TLS证书及相关的信息
/clusters | upstream cluster status | GET，额外支持使用“GET /clusters?format=json”
/config_dump | dump current Envoy configs (experimental) | GET，打印Envoy加载的各类配置信息
/contention | dump current Envoy mutex contention stats (if enabled) | GET，互斥跟踪
/cpuprofiler | enable/disable the CPU profiler | POST，启用或禁用cpuprofiler
/healthcheck/fail | cause the server to fail health checks | POST，强制设定HTTP健康状态检查为失败
/healthcheck/ok | cause the server to pass health checks | POST，强制设定HTTP健康状态检查为成功
/heapprofiler | enable/disable the heap profiler | POST，启用或禁用heapprofiler
/hot_restart_version | print the hot restart compatibility version | GET，打印热重启相关的信息
/listeners | print listener addresses | GET，列出所有侦听器，支持使用“GET /listeners?format=json”
/logging | query/change logging levels | POST，启用或禁用不同子组件上的不同日志记录级别
/memory | print current allocation/heap usage | POST，打印当前内在分配信息，以字节为单位
/quitquitquit | exit the server | POST，干净退出服务器
/reset_counters | reset all counters to zero | POST，重置所有计数器
/runtime | print runtime values | GET，以json格式输出所有运行时相关值
/runtime_modify | modify runtime values | POST /runtime_modify?key1=value1&key2=value2，添加或修改在查询参数中传递的运行时值
/server_info | print server version/status information | GET，打印当前Envoy Server的相关信息
/stats| print server stats | 按需输出统计数据，例如GET /stats?filter=regex，另外还支持json和prometheus两种输出格式
/stats/prometheus | print server stats in prometheus format | 输出prometheus格式的统计信息

### admin实战

1)将envoy.yaml、Dockerfile-envoy和docker-compose.yaml拉下来，并docker-compose up。这三个代码和上一章节egress/中一摸一样，只是在envoy.yaml中增加了admin段配置
```yaml
admin:
  access_log_path: /tmp/admin.log                              #统计信息的日志存放路径
  address:
    socket_address: { address: 127.0.0.1, port_value: 9901}         #需要使用未被分配的端口
```

2) 进入envoy的交互式接口，你可以发现可以访问到管理接口和上文提到的path信息了
```bash
/ # curl 127.0.0.1:9901/help
admin commands are:
  /: Admin home page
  /certs: print certs on machine
  /clusters: upstream cluster status
  /config_dump: dump current Envoy configs (experimental)
  /contention: dump current Envoy mutex contention stats (if enabled)
  /cpuprofiler: enable/disable the CPU profiler
  /healthcheck/fail: cause the server to fail health checks
  /healthcheck/ok: cause the server to pass health checks
  /heapprofiler: enable/disable the heap profiler
  /help: print out list of admin commands
  /hot_restart_version: print the hot restart compatibility version
  /listeners: print listener info
  /logging: query/change logging levels
  /memory: print current allocation/heap usage
  /quitquitquit: exit the server
  /ready: print server state, return 200 if LIVE, otherwise return 503
  /reset_counters: reset all counters to zero
  /runtime: print runtime values
  /runtime_modify: modify runtime values
  /server_info: print server version/status information
  /stats: print server stats
  /stats/prometheus: print server stats in prometheus format

```

3) 你也可以在我们配置的容器路径（/tmp/admin.log）中查看到对应日志
```bash
[2019-12-27T12:51:55.172Z] "GET / HTTP/1.1" 200 - 0 5072 1 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:51:57.185Z] "GET / HTTP/1.1" 200 - 0 5072 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:52:00.106Z] "GET /help HTTP/1.1" 200 - 0 1056 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:55:05.962Z] "GET /clusters HTTP/1.1" 200 - 0 4712 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:55:22.523Z] "GET //stats/prometheus HTTP/1.1" 404 - 0 1070 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:55:33.173Z] "GET /stats HTTP/1.1" 200 - 0 22191 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:55:43.750Z] "GET /help HTTP/1.1" 200 - 0 1056 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:55:51.948Z] "GET /listeners HTTP/1.1" 200 - 0 25 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
[2019-12-27T12:56:23.638Z] "GET /server_info HTTP/1.1" 200 - 0 891 0 - "172.21.0.4" "curl/7.66.0" "-" "127.0.0.1:9901" "-"
```