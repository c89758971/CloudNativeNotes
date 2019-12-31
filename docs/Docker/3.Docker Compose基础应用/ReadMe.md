## 1.常用命令
``` 
    后台运行：
        docker-compose up -d
    compose应用停止：
        docker-compose stop
    容器内的变量查看：
        docker-compose run <容器名> env
```
   
## 2.应用入门：Flask

*Step 1: Setup*

1. 创建项目目录：
```
$ mkdir composetest
$ cd composetest

```
2. 创建一个Flask风格的文件：
```python
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)


def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
```

3. 创建Flask项目的`requirements.txt`文件：
```txt
flask
redis
```

*Step 2: Create a Dockerfile*

In your project directory, create a file named Dockerfile and paste the following:
1. 这一步，你需要编写一个用于打镜像的`Dockerfile`，这个镜像包含了`python`自身的依赖，以及`Python`应用所需的依赖。
在你的项目目录中，创建一个`Dockfile`，并黏贴下面的代码：
```bash
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run"]
```
*Step 3: Define services in a Compose file*

1. 创建`docker-compose.yml`文件：
```bash
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```
其中定义了2个服务：`web` 和 `redis`

*Step 4: Build and run your app with Compose*
1. 使用docker-compose up启动容器：
```bash
$ docker-compose up
Creating network "composetest_default" with the default driver
Creating composetest_web_1 ...
Creating composetest_redis_1 ...
Creating composetest_web_1
Creating composetest_redis_1 ... done
Attaching to composetest_web_1, composetest_redis_1
web_1    |  * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
redis_1  | 1:C 17 Aug 22:11:10.480 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis_1  | 1:C 17 Aug 22:11:10.480 # Redis version=4.0.1, bits=64, commit=00000000, modified=0, pid=1, just started
redis_1  | 1:C 17 Aug 22:11:10.480 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
web_1    |  * Restarting with stat
redis_1  | 1:M 17 Aug 22:11:10.483 * Running mode=standalone, port=6379.
redis_1  | 1:M 17 Aug 22:11:10.483 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
web_1    |  * Debugger is active!
redis_1  | 1:M 17 Aug 22:11:10.483 # Server initialized
redis_1  | 1:M 17 Aug 22:11:10.483 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
web_1    |  * Debugger PIN: 330-787-903
redis_1  | 1:M 17 Aug 22:11:10.483 * Ready to accept connections
```
2. 访问对应机器的`5000`端口进行测试：

![应用验证-1](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/compose-test-1.png)


3. 使用`docker image ls`命令，进行查看：
```bash
$ docker image ls
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
composetest_web         latest              e2c21aa48cc1        4 minutes ago       93.8MB
python                  3.4-alpine          84e6077c7ab6        7 days ago          82.5MB
redis                   alpine              9d8fa9aa0e5b        3 weeks ago         27.5MB
```
4. 停止应用：`docker-compose down` 或者`ctrl+c`

*Step 5: Edit the Compose file to add a bind mount*
1. 编辑`docker-compose.yml`文件，新增`volume`配置：
```bash
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/code
    environment:
      FLASK_ENV: development
  redis:
    image: "redis:alpine"
```
说明：
*  将当前目录与容器内的/code目录进行挂载
*  设置了容器内的变量：FLASK_ENV: development

*Step 6: Re-build and run the app with Compose*
1. 使用docker-compose up命令重启：
```bash
$ docker-compose up
Creating network "composetest_default" with the default driver
Creating composetest_web_1 ...
Creating composetest_redis_1 ...
Creating composetest_web_1
Creating composetest_redis_1 ... done
Attaching to composetest_web_1, composetest_redis_1
web_1    |  * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
...
```
说明：
* 变量查看：docker-compose run web env
```bash
[root@centos-1 composetest]# docker-compose run web env
PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=c9a1f2015250
TERM=xterm
FLASK_ENV=development
LANG=C.UTF-8
GPG_KEY=0D96DF4D4110E5C43FBFB17F2D347EA6AA65421D
PYTHON_VERSION=3.7.5
PYTHON_PIP_VERSION=19.3.1
PYTHON_GET_PIP_URL=https://github.com/pypa/get-pip/raw/ffe826207a010164265d9cc807978e3604d18ca0/get-pip.py
PYTHON_GET_PIP_SHA256=b86f36cc4345ae87bfd4f10ef6b2dbfa7a872fbff70608a1e43944d283fd0eee
FLASK_APP=app.py
FLASK_RUN_HOST=0.0.0.0
HOME=/root

```
* 挂载情况测试和查看：当前目录和容器内的/code目录（不再赘述）

*Step 7: Update the application*
1. 编辑`app.py`文件，修改输出提示：
```text
return 'Hello from Docker! I have been seen {} times.\n'.format(count)
```

2. 刷新浏览器，效果如下所示：

![应用验证-2](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/compose-test-2.png)


*Where to go next：*
* 其他项目部署：
    
    Django： https://docs.docker.com/compose/django/
    
    Rails： https://docs.docker.com/compose/rails/
    
    wordpress： https://docs.docker.com/samples/library/wordpress/
    
* 完整命令查看：

    https://docs.docker.com/compose/reference/
    
* compose版本和参数使用说明：

    https://docs.docker.com/compose/compose-file/
    
## 3.附录-参考文档    

官方文档：https://docs.docker.com/compose/

参数说明文档：https://docs.docker.com/compose/compose-file/

```
    部分说明：
    Port：
        - “<宿主机端口>：<容器端口>”
    volumes:
        - “<宿主机地址>：<容器地址>”

```