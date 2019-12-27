# Envoy管理接口基础应用
Envoy内建了一个管理接口，它支持查询和修改操作，甚至有可能暴露私 有数据（例如统计数据、集群名称和证书信息等），因此非常有必要精心 编排其访问控制机制以避免非授权访问
 
- admin核心字段
- admin-path
- Egress实战
- Ingress实战

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

admin是另一个定级字段，和static_resources同级，你可以在[admin](https://www.envoyproxy.io/docs/envoy/latest/api-v2/admin/admin)中找到最详细的api配置说明

### admin-path

envoy的admin管理接口中，也内置了很多/path，不同的path可能会分别接受不同的GET或 POST请求。你可以通过GET /help：打印所有可用选项：

uri | description | 备注
---- | ----- 
/ | Admin home page | GET
/certs | print certs on machine | GET，列出已加载的所有TLS证书及相关的信息
/clusters | upstream cluster status | GET，额外支持使用“GET /clusters?format=json”
/config_dump | dump current Envoy configs (experimental) | GET，打印Envoy加载的各类配置信息
