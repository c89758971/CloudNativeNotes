(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{210:function(s,t,a){"use strict";a.r(t);var e=a(0),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"_1-标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-标签"}},[s._v("#")]),s._v(" 1.标签")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#帮助命令")]),s._v("\nkubectl label -h\n    \n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#相关查询命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#    kubectl get pod --show-labels")]),s._v("\nNAME                     READY   STATUS    RESTARTS   AGE     LABELS\nngx-new-cb79d555-gqwf8   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          4h57m   "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ngx-new,pod-template-hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("cb79d555\nngx-new-cb79d555-hcdr9   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          5h9m    "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ngx-new,pod-template-hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("cb79d555\n    \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#    kubectl get pod --show-labels -A -l app=flannel")]),s._v("\nNAMESPACE     NAME                          READY   STATUS    RESTARTS   AGE     LABELS\nkube-system   kube-flannel-ds-amd64-bc56m   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v("          2d23h   "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("flannel,controller-revision-hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f65bfbc7,pod-template-generation"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(",tier"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node\nkube-system   kube-flannel-ds-amd64-ltp9p   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          2d23h   "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("flannel,controller-revision-hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f65bfbc7,pod-template-generation"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(",tier"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node\nkube-system   kube-flannel-ds-amd64-v9gmq   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("         2d23h   "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("app")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("flannel,controller-revision-hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("67f65bfbc7,pod-template-generation"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(",tier"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node\n    \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 dingqishi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#    kubectl get pod  -A -l app=flannel -L app")]),s._v("\nNAMESPACE     NAME                          READY   STATUS    RESTARTS   AGE     APP\nkube-system   kube-flannel-ds-amd64-bc56m   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v("          2d23h   flannel\nkube-system   kube-flannel-ds-amd64-ltp9p   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          2d23h   flannel\nkube-system   kube-flannel-ds-amd64-v9gmq   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("         2d23h   flannel\n")])])]),a("h2",{attrs:{id:"_2-资源注解（annotation）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-资源注解（annotation）"}},[s._v("#")]),s._v(" 2.资源注解（annotation）")]),s._v(" "),a("p",[s._v("不受字符数量的限制，但不用用于标签的筛选，仅用于为资源提供“元数据”信息")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#帮助命令")]),s._v("\nkubectl annotate -h\n\n")])])]),a("h2",{attrs:{id:"_3-探针"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-探针"}},[s._v("#")]),s._v(" 3.探针")]),s._v(" "),a("h3",{attrs:{id:"_1-liveness"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-liveness"}},[s._v("#")]),s._v(" 1.liveness")]),s._v(" "),a("pre",[a("code",[s._v("健康状态检查，用于检测Pod的健康性，后续的动作会重启`Pod`\n")])]),s._v(" "),a("ol",[a("li",[s._v("帮助文档")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("kubectl explain pods.spec.containers.livenessProbe\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("编辑"),a("code",[s._v("liveness-exec.yaml")]),s._v("，并"),a("code",[s._v("apply -f")]),s._v("生成"),a("code",[s._v("pod")])])]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Pod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("labels")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" liveness"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("exec\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" liveness"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("exec\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" liveness"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("demo\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" busybox\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("args")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" /bin/sh\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("c\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" touch /tmp/healthy; sleep 30; rm "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("rf /tmp/healthy; sleep 600\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("livenessProbe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" test\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("e\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" /tmp/healthy\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("观察"),a("code",[s._v("pod")]),s._v("情况，发现30秒后，"),a("code",[s._v("pod")]),s._v("探测不到"),a("code",[s._v("/tmp/healthy")]),s._v("文件，并进行了重启操作，"),a("code",[s._v("RESTARTS")]),s._v("为1")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 chapter4"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl get pods")]),s._v("\nNAME                     READY   STATUS    RESTARTS   AGE\nliveness-exec            "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("          2m39s\nngx-new-cb79d555-gqwf8   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          2d2h\nngx-new-cb79d555-hcdr9   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          2d2h\n    \ndescribe pod liveness-exec\n    State:          Running\n      Started:      Sat, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),s._v(" Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2019")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":17:31 +0800\n    Last State:     Terminated\n      Reason:       Error\n      Exit Code:    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("137")]),s._v("\n      Started:      Sat, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),s._v(" Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2019")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":16:03 +0800\n      Finished:     Sat, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),s._v(" Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2019")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":17:25 +0800\n    Ready:          True\n    Restart Count:  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    Liveness:       "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("test -e /tmp/healthy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("delay")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("0s "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("timeout")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("1s "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("period")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("10s "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#success=1 #failure=3")]),s._v("\n\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("同理可使用本页的"),a("code",[s._v("liveness-http.yaml")]),s._v("进行学习和实践")])]),s._v(" "),a("h3",{attrs:{id:"_2-readiness"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-readiness"}},[s._v("#")]),s._v(" 2.readiness")]),s._v(" "),a("pre",[a("code",[s._v("就绪状态检查，没有重启Pod权利，用于为Service流量分发作为依据\n")])]),s._v(" "),a("ol",[a("li",[s._v("帮助文档")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("kubectl explain pods.spec.containers.readinessProbe\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("编辑"),a("code",[s._v("readiness-exec.yaml")]),s._v("，并"),a("code",[s._v("apply -f")]),s._v("生成"),a("code",[s._v("pod")])])]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Pod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("labels")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" readiness"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("exec\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" readiness"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("exec\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" readiness"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("demo\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" busybox\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("args")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/bin/sh"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-c"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"while true; do rm -f /tmp/ready; sleep 30; touch /tmp/ready; sleep 300; done"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("readinessProbe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-e"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/tmp/ready"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("initialDelaySeconds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("periodSeconds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("观察发现，"),a("code",[s._v("readiness-exec")]),s._v("启动后并没有直接进入就绪状态，而是探测到有"),a("code",[s._v("/tmp/ready")]),s._v("文件后，才变成1/1")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("readiness-exec           "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("            "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\nreadiness-exec           "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Pending             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("        centos-2.shared   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\nreadiness-exec           "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     ContainerCreating   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          0s      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("        centos-2.shared   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\nreadiness-exec           "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/1     Running             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          11s     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.244")]),s._v(".1.34   centos-2.shared   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\nreadiness-exec           "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/1     Running             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          43s     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.244")]),s._v(".1.34   centos-2.shared   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])])]),a("h2",{attrs:{id:"_4-pod对象的相位"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-pod对象的相位"}},[s._v("#")]),s._v(" 4.Pod对象的相位")]),s._v(" "),a("p",[a("code",[s._v("Pod")]),s._v("一共有5个状态，分为"),a("code",[s._v("Pending")]),s._v("、"),a("code",[s._v("Running")]),s._v("、"),a("code",[s._v("Succeeded")]),s._v("、"),a("code",[s._v("Failed")]),s._v("和"),a("code",[s._v("Unknown")]),s._v("，其中：")]),s._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("Pending：\n    Pod未完成调度，通常由于没有符合调度需求的node节点\nRunning：\n    Pod已经调度成功，且已经被kubelet创建完成\nSucceeded：\n    Pod中的所有容器已经成功且不会被重启\nFailed：\n    Pod中至少有一个容器终止失败\nUnknown：\n    Apiserver无法获取Pod对象的状态信息，通常由于其无法与所在工作节点的kubelet通信导致\n\n")])])]),a("h2",{attrs:{id:"_5-pod-security"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-pod-security"}},[s._v("#")]),s._v(" 5.Pod Security")]),s._v(" "),a("p",[a("code",[s._v("Pod")]),s._v("对象的安全上下文用于设定Pod或容器的权限和访问控制功能，其支持设置的常用属性包括以下几个方面：")]),s._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("1）基于用户ID（UID）和组ID（GID）控制访问对象（如文件）时的权限\n2）以特权或非特权的方式运行\n3）通过Linux Capabilities为其提供部分特权\n4）基于Seccomp过滤进程的系统调用\n5）基于SELinux的安全标签\n6）是否能够进行权限升级\n")])])]),a("p",[s._v("其中包括2个安全级别：")]),s._v(" "),a("pre",[a("code",[s._v("两个级别：\n     kubectl explain pod.spec.securityContext\n     kubectl explain pod.spec.containers.[].securityContext.capabilities\n")])]),s._v(" "),a("p",[s._v("最后，看一个配置清单：以"),a("code",[s._v("uid")]),s._v("为1000的非特权用户运行"),a("code",[s._v("busybox")]),s._v("容器，并禁止权限升级")]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Pod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" pod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("with"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("securitycontext\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" busybox\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" busybox\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/bin/sh"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-c"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sleep 86400"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("securityContext")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("runAsNonRoot")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("runAsUser")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("allowPrivilegeEscalation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("false")]),s._v("\n")])])]),a("p",[s._v("测试如下：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 ~"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl exec -it   pod-with-securitycontext -- /bin/sh")]),s._v("\n/ $ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" -ef"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" busy\n   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(":00 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" busy\n/ $ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nmkdir: can"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'t create directory '")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("': Permission denied\n")])])]),a("h2",{attrs:{id:"_6-资源配额"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-资源配额"}},[s._v("#")]),s._v(" 6.资源配额")]),s._v(" "),a("ol",[a("li",[s._v("查看文档")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("kubectl explain pod.spec.containers.resources\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("参数说明")])]),s._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("limits：\n    上限配额，最多吃的资源量\nrequests：\n    下限要求，低于下限，pod会启动失败\n\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("code",[s._v("OOM")]),s._v("系统级别常出现的情况")])]),s._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    节点内存太少\n    limits限制的太小\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("资源配额"),a("code",[s._v("demo")])])]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Pod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" stress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" stress\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ikubernetes/stress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("ng\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/usr/bin/stress-ng"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-c 1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-m 1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"--metrics-brief"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("resources")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("requests")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("memory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"128Mi"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"200m"')]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("limits")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("memory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"512Mi"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"400m"')]),s._v("\n")])])]),a("h2",{attrs:{id:"_7-pod服务质量类别（-qos-class）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-pod服务质量类别（-qos-class）"}},[s._v("#")]),s._v(" 7.Pod服务质量类别（ QoS Class）")]),s._v(" "),a("p",[a("code",[s._v("kubectl describe pod")]),s._v("可查看对应的服务质量类别,共有以下三类：")]),s._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("Guaranteed: 必须保证,requests和limits都有，且都相等，最高优先级\nBurstable: 尽量满足，requests或limits有一个，中等优先级\nBestEffort: 未设置requests或limits属性的pod资源，优先级最低\n\n")])])]),a("h2",{attrs:{id:"_8-pod中断预算"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-pod中断预算"}},[s._v("#")]),s._v(" 8.Pod中断预算")]),s._v(" "),a("p",[a("code",[s._v("PDB（PodDisruptionBudget）")]),s._v("中断预算由"),a("code",[s._v("k8s1.4")]),s._v("版本引入，用于为那些自愿的中断做好预算方案，\n限制可自愿中断的最大Pod副本数量或确保最少可用的"),a("code",[s._v("Pod")]),s._v("副本数，以确保服务的高可用性。")]),s._v(" "),a("ol",[a("li",[s._v("命令")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("kubectl get pdb\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[a("code",[s._v("demo")]),s._v("参考")])]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" policy/v1beta1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" PodDisruptionBudget\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ngx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("new\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("minAvailable")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("selector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("matchLabels")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("app")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ngx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("new\n")])])]),a("h3",{attrs:{id:"_1-非自愿中断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-非自愿中断"}},[s._v("#")]),s._v(" 1.非自愿中断")]),s._v(" "),a("p",[s._v("由不可控的外界因素所导致的Pod中断退出操作，例如：硬件或系统故障、网络故障、节点故障等")]),s._v(" "),a("h3",{attrs:{id:"_2-自愿中断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-自愿中断"}},[s._v("#")]),s._v(" 2.自愿中断")]),s._v(" "),a("p",[s._v("由用户特地执行的管理操作导致的Pod中断，例如：排空节点、人为删除Pod对象等")])])}),[],!1,null,null,null);t.default=n.exports}}]);