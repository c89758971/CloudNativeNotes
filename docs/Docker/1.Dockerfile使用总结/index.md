## 1.综述
1. 每一条指令都会生成一个新的镜像层
2. 层数越多 越精细，复用性更高、增量更新、控制更精准
3. 原则：
    * 每个指令只做专一的事情
4. 忽略文件：`.dockerignore`文本文件（https://www.linuxea.com/2297.html）
5. 打镜像命令：      

```bash
     docker  image build . -t myimg:v0.1

```
## 2.常用参数
```
    COPY：
        本地路径，支持正则
        
    ADD：
        本地TAR文件:会自动解压缩
        URL路径：只会下载，不会自动解压缩

```

```
    WORKDIR：
        可以出现多次，作用域为当前->下个WORKDIR之间
        用于设定工作目录
        支持变量（更灵活，复用）：WORKDIR $DIR
        
    VOLUME：    
        VOLUME ["<path1>", "<path2>", ...]
        VOLUME <path>
        将本地主机目录挂载到目标容器中，将其他容器挂载的挂载点挂载到目标容器中

        
    EXPOSE：
        （相当于宿主机上增加一条DNAT规则，对应到宿主机的路由，从而转发到容器中)
        端口暴露
        Docker服务端容器对外映射的本地端口，需要在启动容器run时使用-p或者-P选项生效

```

```
    ENV：
        定义镜像所需的环境变量
        build阶段使用
        syntax：
            ENV <key> <value>       # 只能设置一个变量
            ENV <key>=<value> ...   # 允许一次设置多个变量
        调用：
            $key或者${key}
            
    ARG（建议用ARG，少用ENV，更灵活）：
        build阶段传值，替换dockerfile的env

``` 

```
    RUN：
        build阶段使用
        每一条都会运行
        基础镜像中需存在的命令，否则会报错
        syntax：
           RUN <command> （建议用这种）
           RUN [“<command>”,”<param1>”,”<parm2>”]（不会以shell发起）
           如：RUN [“/bin/bash”,”-c”,“<command>”,”<param1>”]
    
    CMD：
        run阶段使用
        只会运行最后一条
        允许被用户run阶段，用命令覆盖
        
    ENTRYPOINT
       （可代替CMD，如果一起使用，则CMD为参数：ENTRYPOINT CMD）：
        run阶段使用
        只会运行最后一条
        不允许被用户以传统方式覆盖，只允许用特定参数覆盖（—entrypoint）
```
 
```
    USER:
        定义用户
        
    HELATHCHECK：
        健康检查(只杀不负责重启)：
            HRALTHCHECK —internal=5m —timeout=3s\
            CMD curl -f http://localhost/||exit 1
            
    ONBUILD：（延迟加载）
                只有当以当前镜像为基础镜像，去构建下一级镜像的时候才会被执行。

```        


## 3.Dockerfile优化手段
```
    容器能快速迭代
    使用.dockerignore文件
    不要安装不必要的程序包
    单一容器只运行单一进程
    最小化镜像层数
    对多行参数进行排序
    构建镜像使用缓存
```

## 4.Dockerfile例子
```
FROM busybox:latest

ENV webhome="/data/web/html"

LABEL maintainer="Aaron <584911644@qq.com>"

COPY pages/*.html ${webhome}/

WORKDIR /tmp/

ADD http://nginx.org/download/nginx-1.15.8.tar.gz /nginx/

EXPOSE 80/tcp

RUN mkdir -p /web/bbs/{1,2} && \
   ["/bin/sh","-c","echo hi > /web/bbs/1/index.html"]

```