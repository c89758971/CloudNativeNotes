(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{208:function(s,n,t){"use strict";t.r(n);var a=t(0),e=Object(a.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[t("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/deployment.png",alt:"deployment拓扑-1"}})]),s._v(" "),t("h2",{attrs:{id:"_1-系统级别的pod资源清单"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-系统级别的pod资源清单"}},[s._v("#")]),s._v(" 1.系统级别的pod资源清单")]),s._v(" "),t("p",[s._v("系统默认的这四个pod，修改后不需要手动重载，k8s集群会自动热加载（数分钟内）")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /etc/kubernetes/manifests/\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 manifests"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ll")]),s._v("\n总用量 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("\n-rw-------. "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1773")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v("月 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":00 etcd.yaml\n-rw-------. "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2606")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v("月 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":00 kube-apiserver.yaml\n-rw-------. "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2303")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v("月 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":00 kube-controller-manager.yaml\n-rw-------. "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1119")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v("月 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":00 kube-scheduler.yaml\n\n")])])]),t("h2",{attrs:{id:"_2-对象分类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-对象分类"}},[s._v("#")]),s._v(" 2.对象分类")]),s._v(" "),t("h3",{attrs:{id:"_1-守护进程型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-守护进程型"}},[s._v("#")]),s._v(" 1.守护进程型")]),s._v(" "),t("p",[s._v("1.无状态应用:非系统级（Nginx等）")]),s._v(" "),t("p",[s._v("推荐使用：Deployment，ReplicaSet")]),s._v(" "),t("p",[s._v("2.无状态应用:系统级")]),s._v(" "),t("p",[s._v("应用场景：日志、监控收集客户端：场景就是每个node节点需要且只需要运行1个")]),s._v(" "),t("p",[s._v("推荐使用：DaemonSet")]),s._v(" "),t("p",[s._v("3.有状态应用")]),s._v(" "),t("p",[s._v("应用场景：mysql、redis集群等")]),s._v(" "),t("p",[s._v("推荐使用：statefulSet")]),s._v(" "),t("h3",{attrs:{id:"_2-非守护进程型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-非守护进程型"}},[s._v("#")]),s._v(" 2.非守护进程型")]),s._v(" "),t("p",[s._v("Job：一次性任务")]),s._v(" "),t("p",[s._v("Cronjob：定时任务")]),s._v(" "),t("h2",{attrs:{id:"_3-deployment"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-deployment"}},[s._v("#")]),s._v(" 3.Deployment")]),s._v(" "),t("div",{staticClass:"language-text extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("用来管理ReplicaSet以及它的历史版本（支持回滚）,实现支持各种发布策略：滚动、蓝绿、金丝雀发布（金丝雀可以分特定流量到不同版本，但这个功能需要服务网格的支持）\n   \n#使用命令查看rs控制器的历史版本    \n[root@centos-1 mainfasts]# kubectl get rs -o wide\nNAME               DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES       SELECTOR\nmyapp-67f698f887   0         0         0       53m     myapp        nginx:1.16   app=myapp,pod-template-hash=67f698f887,rel=stable\nmyapp-7c488c6f44   5         5         5       48m     myapp        nginx:1.17   app=myapp,pod-template-hash=7c488c6f44,rel=stable\nmyapp-98f644994    0         0         0       46m     myapp        nginx:1.15   app=myapp,pod-template-hash=98f644994,rel=stable\nngx-new-cb79d555   2         2         2       2d22h   nginx        nginx        app=ngx-new,pod-template-hash=cb79d555\n\n")])])]),t("h3",{attrs:{id:"_1-滚动发布和回滚"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-滚动发布和回滚"}},[s._v("#")]),s._v(" 1.滚动发布和回滚")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("发布"),t("code",[s._v("nginx1.10")]),s._v("版本，并限制滚动策略：最多新增1个("),t("code",[s._v("maxSurge")]),s._v(")最少下线1个("),t("code",[s._v("maxUnavailable")]),s._v(")")]),s._v(" "),t("p",[s._v("第一次发布的时候是新增1个，下线2个")])])]),s._v(" "),t("div",{staticClass:"language-yaml extra-class"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" apps/v1\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Deployment\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" deploy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("nginx\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("replicas")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("minReadySeconds")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("strategy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("rollingUpdate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("maxSurge")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("maxUnavailable")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("type")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" RollingUpdate\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("selector")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("matchLabels")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" nginx\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("template")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("labels")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" nginx\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("containers")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" nginx\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" nginx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("1.10"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("alpine\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ports")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("containerPort")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" http\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("readinessProbe")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("periodSeconds")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("httpGet")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("path")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" /\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("port")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" http\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("修改"),t("code",[s._v("yaml")]),s._v("的"),t("code",[s._v("nginx")]),s._v("版本为"),t("code",[s._v("1.13")]),s._v("，发布并观察。可以发现"),t("code",[s._v("deployment")]),s._v("对应的"),t("code",[s._v("rs")]),s._v("控制器逐步应用至"),t("code",[s._v("deploy-nginx-567c45c74")]),s._v("（"),t("code",[s._v("nginx:1.13-alpine")]),s._v("）")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get rs -o wide")]),s._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       51s     nginx        nginx:1.13-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("567c45c748\ndeploy-nginx-5745bb45d7   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("       7m2s    nginx        nginx:1.10-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       5m51s   nginx        nginx:1.11-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f876bcb6\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get rs -o wide")]),s._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       52s     nginx        nginx:1.13-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("567c45c748\ndeploy-nginx-5745bb45d7   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("       7m3s    nginx        nginx:1.10-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       5m52s   nginx        nginx:1.11-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f876bcb6\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get rs -o wide")]),s._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("       2m40s   nginx        nginx:1.13-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("567c45c748\ndeploy-nginx-5745bb45d7   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       8m51s   nginx        nginx:1.10-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       7m40s   nginx        nginx:1.11-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f876bcb6\n\n")])])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("查看历史版本,第4条是我们最新的版本")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl rollout history deployment/deploy-nginx")]),s._v("\ndeployment.apps/deploy-nginx \nREVISION  CHANGE-CAUSE\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("         kubectl apply --filename"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("deploy-nginx.yaml --record"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true\n\n")])])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("回滚至上个版本，并观察"),t("code",[s._v("rs")]),s._v("变化,发现已经全部切换至"),t("code",[s._v("1.10")]),s._v("的"),t("code",[s._v("nginx")]),s._v(",至此滚动发布的策略和回滚已经演示完毕")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl rollout undo deployment/deploy-nginx --to-revision=0")]),s._v("\ndeployment.apps/deploy-nginx rolled back\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get rs -o wide")]),s._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("       4m58s   nginx        nginx:1.13-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("567c45c748\ndeploy-nginx-5745bb45d7   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("       11m     nginx        nginx:1.10-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       9m58s   nginx        nginx:1.11-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f876bcb6\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get rs -o wide")]),s._v("\nNAME                      DESIRED   CURRENT   READY   AGE    CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       5m6s   nginx        nginx:1.13-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("567c45c748\ndeploy-nginx-5745bb45d7   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("       11m    nginx        nginx:1.10-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       10m    nginx        nginx:1.11-alpine   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nginx,pod-template-hash"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f876bcb6\n\n")])])]),t("h3",{attrs:{id:"_2-金丝雀发布"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-金丝雀发布"}},[s._v("#")]),s._v(" 2.金丝雀发布")]),s._v(" "),t("ol",[t("li",[s._v("将上文的"),t("code",[s._v("1.10")]),s._v("的"),t("code",[s._v("nginx")]),s._v("，发布金丝雀版本："),t("code",[s._v("1.14")])])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl set image deployment deploy-nginx nginx=nginx:1.14-alpine && kubectl rollout pause deployment deploy-nginx")]),s._v("\ndeployment.apps/deploy-nginx image updated\ndeployment.apps/deploy-nginx paused\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("此时发现"),t("code",[s._v("pod")]),s._v("新老版本共存，2个新的2个老的")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("^C"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get pod  -w")]),s._v("\nNAME                            READY   STATUS    RESTARTS   AGE\ndeploy-nginx-5745bb45d7-5wfml   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\n    \n    \ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-5745bb45d7-5wfml   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Terminating   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     ContainerCreating   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     ContainerCreating   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          1s\ndeploy-nginx-5745bb45d7-5wfml   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\ndeploy-nginx-5745bb45d7-5wfml   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\ndeploy-nginx-5745bb45d7-5wfml   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          18m\ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Running             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          24s\ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          25s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Running             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          27s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          27s\n    \n        \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get pod  ")]),s._v("\nNAME                            READY   STATUS    RESTARTS   AGE\ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          19m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          19m\ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          61s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          61s\n")])])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("如果新版本的用户满意度不高，需要回滚的话，就用上文提到的"),t("code",[s._v("rollout")]),s._v("命令")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("kubectl rollout undo deployment/deploy-nginx --to-revision"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n")])])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("如果新版本用户满意度不错，需要完成剩余"),t("code",[s._v("Pod")]),s._v("更新的话，需要使用"),t("code",[s._v("resume")]),s._v("命令")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl rollout resume deployment deploy-nginx")]),s._v("\ndeployment.apps/deploy-nginx resumed\n    \n        \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get pod  -w")]),s._v("\nNAME                            READY   STATUS    RESTARTS   AGE\ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          27m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          27m\ndeploy-nginx-754874567-l6q7h    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          8m35s\ndeploy-nginx-754874567-q4bsh    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          8m35s\n    \n    \n    \n    \ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Terminating   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Terminating   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-754874567-l6zz8    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-754874567-l6zz8    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-754874567-l6zz8    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     ContainerCreating   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s\ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-754874567-l6zz8    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Running             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          3s\ndeploy-nginx-754874567-l6zz8    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          3s\ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-5745bb45d7-84s4c   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Terminating         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          30m\n    \n        \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get pod  ")]),s._v("\nNAME                           READY   STATUS    RESTARTS   AGE\ndeploy-nginx-754874567-l6q7h   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          14m\ndeploy-nginx-754874567-l6zz8   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          3m33s\ndeploy-nginx-754874567-q4bsh   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          14m\n\n")])])]),t("h2",{attrs:{id:"_4-replicaset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-replicaset"}},[s._v("#")]),s._v(" 4.ReplicaSet")]),s._v(" "),t("div",{staticClass:"language-text extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("   在给定的任何时间，保证一个明确的pod运行数量\n   管理底层Pod\n   不应该人为介入进行调整、管理\n")])])]),t("h2",{attrs:{id:"_5-命令补充"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-命令补充"}},[s._v("#")]),s._v(" 5.命令补充")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#实时观察Pod：")]),s._v("\nkubectl get pod -w\n")])])]),t("h2",{attrs:{id:"_6-deployment-demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-deployment-demo"}},[s._v("#")]),s._v(" 6.deployment-demo")]),s._v(" "),t("p",[s._v("https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/7.Pod%E6%8E%A7%E5%88%B6%E5%99%A8-Deployment/depolyment-nginx.yaml")])])}),[],!1,null,null,null);n.default=e.exports}}]);