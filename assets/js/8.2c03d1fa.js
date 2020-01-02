(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{205:function(s,t,e){"use strict";e.r(t);var a=e(0),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"_1-常用命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-常用命令"}},[s._v("#")]),s._v(" 1.常用命令")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    后台运行：\n        docker-compose up -d\n    compose应用停止：\n        docker-compose stop\n    容器内的变量查看：\n        docker-compose run <容器名> env\n")])])]),e("h2",{attrs:{id:"_2-应用入门：flask"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-应用入门：flask"}},[s._v("#")]),s._v(" 2.应用入门：Flask")]),s._v(" "),e("p",[e("em",[s._v("Step 1: Setup")])]),s._v(" "),e("ol",[e("li",[s._v("创建项目目录：")])]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("$ mkdir composetest\n$ cd composetest\n\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[s._v("创建一个Flask风格的文件：")])]),s._v(" "),e("div",{staticClass:"language-python extra-class"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" time\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" redis\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" flask "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Flask\n\napp "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Flask"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__name__"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\ncache "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" redis"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Redis"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("host"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'redis'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" port"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6379")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("get_hit_count")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    retries "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" cache"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("incr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'hits'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("except")]),s._v(" redis"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exceptions"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ConnectionError "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("as")]),s._v(" exc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" retries "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n                "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("raise")]),s._v(" exc\n            retries "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n            time"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("sleep"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.5")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\n@app"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("route"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("hello")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    count "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" get_hit_count"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Hello World! I have been seen {} times.\\n'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("format")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("count"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[s._v("创建Flask项目的"),e("code",[s._v("requirements.txt")]),s._v("文件：")])]),s._v(" "),e("div",{staticClass:"language-txt extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("flask\nredis\n")])])]),e("p",[e("em",[s._v("Step 2: Create a Dockerfile")])]),s._v(" "),e("p",[s._v("In your project directory, create a file named Dockerfile and paste the following:")]),s._v(" "),e("ol",[e("li",[s._v("这一步，你需要编写一个用于打镜像的"),e("code",[s._v("Dockerfile")]),s._v("，这个镜像包含了"),e("code",[s._v("python")]),s._v("自身的依赖，以及"),e("code",[s._v("Python")]),s._v("应用所需的依赖。\n在你的项目目录中，创建一个"),e("code",[s._v("Dockfile")]),s._v("，并黏贴下面的代码：")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("FROM python:3.7-alpine\nWORKDIR /code\nENV FLASK_APP app.py\nENV FLASK_RUN_HOST "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0\nRUN apk "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" --no-cache gcc musl-dev linux-headers\nCOPY requirements.txt requirements.txt\nRUN pip "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -r requirements.txt\nCOPY "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\nCMD "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"flask"')]),s._v(", "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"run"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),e("p",[e("em",[s._v("Step 3: Define services in a Compose file")])]),s._v(" "),e("ol",[e("li",[s._v("创建"),e("code",[s._v("docker-compose.yml")]),s._v("文件：")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("version: "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'3'")]),s._v("\nservices:\n  web:\n    build: "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n    ports:\n      - "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"5000:5000"')]),s._v("\n  redis:\n    image: "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"redis:alpine"')]),s._v("\n")])])]),e("p",[s._v("其中定义了2个服务："),e("code",[s._v("web")]),s._v(" 和 "),e("code",[s._v("redis")])]),s._v(" "),e("p",[e("em",[s._v("Step 4: Build and run your app with Compose")])]),s._v(" "),e("ol",[e("li",[s._v("使用docker-compose up启动容器：")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("$ docker-compose up\nCreating network "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"composetest_default"')]),s._v(" with the default driver\nCreating composetest_web_1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nCreating composetest_redis_1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nCreating composetest_web_1\nCreating composetest_redis_1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\nAttaching to composetest_web_1, composetest_redis_1\nweb_1    "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  * Running on http://0.0.0.0:5000/ "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Press CTRL+C to quit"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":C "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.480 "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo")]),s._v("\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":C "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.480 "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Redis version=4.0.1, bits=64, commit=00000000, modified=0, pid=1, just started")]),s._v("\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":C "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.480 "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf")]),s._v("\nweb_1    "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  * Restarting with "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("stat")]),s._v("\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":M "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.483 * Running "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("mode")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("standalone, "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("port")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6379")]),s._v(".\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":M "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.483 "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.")]),s._v("\nweb_1    "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  * Debugger is active"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":M "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.483 "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Server initialized")]),s._v("\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":M "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.483 "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.")]),s._v("\nweb_1    "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  * Debugger PIN: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("330")]),s._v("-787-903\nredis_1  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(":M "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":11:10.483 * Ready to accept connections\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[s._v("访问对应机器的"),e("code",[s._v("5000")]),s._v("端口进行测试：")])]),s._v(" "),e("p",[e("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/compose-test-1.png",alt:"应用验证-1"}})]),s._v(" "),e("ol",{attrs:{start:"3"}},[e("li",[s._v("使用"),e("code",[s._v("docker image ls")]),s._v("命令，进行查看：")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("$ docker image "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v("\nREPOSITORY              TAG                 IMAGE ID            CREATED             SIZE\ncomposetest_web         latest              e2c21aa48cc1        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" minutes ago       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("93")]),s._v(".8MB\npython                  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.4")]),s._v("-alpine          84e6077c7ab6        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(" days ago          "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("82")]),s._v(".5MB\nredis                   alpine              9d8fa9aa0e5b        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" weeks ago         "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("27")]),s._v(".5MB\n")])])]),e("ol",{attrs:{start:"4"}},[e("li",[s._v("停止应用："),e("code",[s._v("docker-compose down")]),s._v(" 或者"),e("code",[s._v("ctrl+c")])])]),s._v(" "),e("p",[e("em",[s._v("Step 5: Edit the Compose file to add a bind mount")])]),s._v(" "),e("ol",[e("li",[s._v("编辑"),e("code",[s._v("docker-compose.yml")]),s._v("文件，新增"),e("code",[s._v("volume")]),s._v("配置：")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("version: "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'3'")]),s._v("\nservices:\n  web:\n    build: "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n    ports:\n      - "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"5000:5000"')]),s._v("\n    volumes:\n      - .:/code\n    environment:\n      FLASK_ENV: development\n  redis:\n    image: "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"redis:alpine"')]),s._v("\n")])])]),e("p",[s._v("说明：")]),s._v(" "),e("ul",[e("li",[s._v("将当前目录与容器内的/code目录进行挂载")]),s._v(" "),e("li",[s._v("设置了容器内的变量：FLASK_ENV: development")])]),s._v(" "),e("p",[e("em",[s._v("Step 6: Re-build and run the app with Compose")])]),s._v(" "),e("ol",[e("li",[s._v("使用docker-compose up命令重启：")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("$ docker-compose up\nCreating network "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"composetest_default"')]),s._v(" with the default driver\nCreating composetest_web_1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nCreating composetest_redis_1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nCreating composetest_web_1\nCreating composetest_redis_1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\nAttaching to composetest_web_1, composetest_redis_1\nweb_1    "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  * Running on http://0.0.0.0:5000/ "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Press CTRL+C to quit"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])])]),e("p",[s._v("说明：")]),s._v(" "),e("ul",[e("li",[s._v("变量查看：docker-compose run web env")])]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 composetest"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker-compose run web env")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("HOSTNAME")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("c9a1f2015250\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("TERM")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("xterm\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("FLASK_ENV")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("development\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("LANG")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("C.UTF-8\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GPG_KEY")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("0D96DF4D4110E5C43FBFB17F2D347EA6AA65421D\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PYTHON_VERSION")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.7")]),s._v(".5\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PYTHON_PIP_VERSION")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("19.3")]),s._v(".1\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PYTHON_GET_PIP_URL")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://github.com/pypa/get-pip/raw/ffe826207a010164265d9cc807978e3604d18ca0/get-pip.py\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PYTHON_GET_PIP_SHA256")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("b86f36cc4345ae87bfd4f10ef6b2dbfa7a872fbff70608a1e43944d283fd0eee\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("FLASK_APP")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("app.py\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("FLASK_RUN_HOST")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("HOME")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/root\n\n")])])]),e("ul",[e("li",[s._v("挂载情况测试和查看：当前目录和容器内的/code目录（不再赘述）")])]),s._v(" "),e("p",[e("em",[s._v("Step 7: Update the application")])]),s._v(" "),e("ol",[e("li",[s._v("编辑"),e("code",[s._v("app.py")]),s._v("文件，修改输出提示：")])]),s._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("return 'Hello from Docker! I have been seen {} times.\\n'.format(count)\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[s._v("刷新浏览器，效果如下所示：")])]),s._v(" "),e("p",[e("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/compose-test-2.png",alt:"应用验证-2"}})]),s._v(" "),e("p",[e("em",[s._v("Where to go next：")])]),s._v(" "),e("ul",[e("li",[e("p",[s._v("其他项目部署：")]),s._v(" "),e("p",[s._v("Django： https://docs.docker.com/compose/django/")]),s._v(" "),e("p",[s._v("Rails： https://docs.docker.com/compose/rails/")]),s._v(" "),e("p",[s._v("wordpress： https://docs.docker.com/samples/library/wordpress/")])]),s._v(" "),e("li",[e("p",[s._v("完整命令查看：")]),s._v(" "),e("p",[s._v("https://docs.docker.com/compose/reference/")])]),s._v(" "),e("li",[e("p",[s._v("compose版本和参数使用说明：")]),s._v(" "),e("p",[s._v("https://docs.docker.com/compose/compose-file/")])])]),s._v(" "),e("h2",{attrs:{id:"_3-附录-参考文档"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-附录-参考文档"}},[s._v("#")]),s._v(" 3.附录-参考文档")]),s._v(" "),e("p",[s._v("官方文档：https://docs.docker.com/compose/")]),s._v(" "),e("p",[s._v("参数说明文档：https://docs.docker.com/compose/compose-file/")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    部分说明：\n    Port：\n        - “<宿主机端口>：<容器端口>”\n    volumes:\n        - “<宿主机地址>：<容器地址>”\n\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);