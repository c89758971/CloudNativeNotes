**证书路径： /etc/kubernetes/pki**

**客户端配置：/etc/kubernetes/admin.conf**

**笔记：**

Pod、Pod Controller、Service：

    Pod Controller：
        Deployment -> rc -> nginx pod
    Service:
        ngx-svc -> ngx-dep -> nginx pod
        
Service:

    Node节点生成DNAT规则，且每个节点都有
    
**命令：**
```bash
    获取集群资源列表：
        kubectl  api-resources
            
    获取命名空间：
        kubectl  get ns
        
    创建deployment： 
        kubectl create deployment ngx-new --image=nginx
        
    创建service，并绑定deployment：
         kubectl create service clusterip ngx-new --tcp=80:80
         
    查看service信息：
         kubectl describe svc ngx-new
         
    pod扩容：
         kubectl scale --replicas=2 deployment/ngx-new
         
    登录pods：
         kubectl exec -it ngx-new-cb79d555-l87t9 /bin/sh

```
     
