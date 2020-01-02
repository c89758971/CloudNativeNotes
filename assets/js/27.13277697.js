(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{250:function(t,e,s){"use strict";s.r(e);var a=s(0),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"helm基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#helm基础"}},[t._v("#")]),t._v(" Helm基础")]),t._v(" "),s("p",[s("code",[t._v("Helm")]),t._v("是一种管理"),s("code",[t._v("Charts")]),t._v("的工具，而"),s("code",[t._v("charts")]),t._v("则是打包预配置"),s("code",[t._v("Kubernetes")]),t._v("基础资源的配置")]),t._v(" "),s("ul",[s("li",[t._v("概念介绍")]),t._v(" "),s("li",[t._v("安装")]),t._v(" "),s("li",[t._v("常用命令")]),t._v(" "),s("li",[t._v("附录：参考文档")])]),t._v(" "),s("h2",{attrs:{id:"_1-概念介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-概念介绍"}},[t._v("#")]),t._v(" 1.概念介绍")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/helm.png",alt:"helm"}})]),t._v(" "),s("p",[t._v("各组件说明：")]),t._v(" "),s("ul",[s("li",[t._v("helm：负责本地开发，作为命令行客户端，通过grpc协议，向tiller发送请求")]),t._v(" "),s("li",[t._v("tiller：接受helm请求，合并charts、发布、卸载和回滚release，并向API server发送相应请求")]),t._v(" "),s("li",[t._v("charts：基础资源的配置模版集合")]),t._v(" "),s("li",[t._v("config：charts配置参数，用于渲染charts")]),t._v(" "),s("li",[t._v("charts repo：charts仓库，有远程和本地两种")]),t._v(" "),s("li",[t._v("chart release：通过charts发布的应用，称之为release")])]),t._v(" "),s("h2",{attrs:{id:"_2-安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-安装"}},[t._v("#")]),t._v(" 2.安装")]),t._v(" "),s("ol",[s("li",[t._v("根据自己平台，下载对应的"),s("a",{attrs:{href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装包"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("解压压缩包")]),t._v(" "),s("li",[t._v("把"),s("code",[t._v("helm")]),t._v("二进制文件"),s("code",[t._v("cp")]),t._v("到系统目录即可")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" helm /usr/local/bin/\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[t._v("检查是否成功："),s("code",[t._v("helm help")])]),t._v(" "),s("li",[t._v("创建"),s("code",[t._v("SA")]),t._v(",并通过"),s("code",[t._v("clusterrolebinding")]),t._v("绑定到内建的"),s("code",[t._v("role")]),t._v("("),s("code",[t._v("cluster-admin")]),t._v(")上")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#创建sa")]),t._v("\nkubectl create serviceaccount --namespace kube-system tiller\n    \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#权限绑定        ")]),t._v("\nkubectl create clusterrolebinding tiller-cluster-rule --clusterrole"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("cluster-admin --serviceaccount"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("kube-system:tiller\n\n")])])]),s("ol",{attrs:{start:"6"}},[s("li",[t._v("初始化helm(安装服务端tiller)")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#K8s>1.16")]),t._v("\nhelm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.3 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account tiller --override spec.selector.matchLabels."),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'tiller'")]),t._v(",spec.selector.matchLabels."),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'helm'")]),t._v(" --output yaml "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sed")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'s@apiVersion: extensions/v1beta1@apiVersion: apps/v1@'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" kubectl apply -f -\n    \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#K8s<1.16")]),t._v("\nhelm init --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.12.2 --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts\n\n")])])]),s("ol",{attrs:{start:"7"}},[s("li",[t._v("检查helm初始化是否成功")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#版本查看")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 linux-amd64"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# helm version")]),t._v("\nClient: "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("version.Version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("SemVer:"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"v2.9.1"')]),t._v(", GitCommit:"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"20adb27c7c5868466912eebdf6664e7390ebe710"')]),t._v(", GitTreeState:"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"clean"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nServer: "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("version.Version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("SemVer:"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"v2.14.3"')]),t._v(", GitCommit:"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0e7f3b6637f7af8fcfddb3d2941fcc7cbebb0085"')]),t._v(", GitTreeState:"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"clean"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#远程稳定版仓库stable和本地仓库local")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 linux-amd64"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# helm repo list")]),t._v("\nNAME  \tURL                                             \nstable\thttps://kubernetes-charts.storage.googleapis.com\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("local")]),t._v(" \thttp://127.0.0.1:8879/charts    \n")])])]),s("h3",{attrs:{id:"常用命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("CMD")]),t._v(" "),s("th",[t._v("description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("helm repo list")]),t._v(" "),s("td",[t._v("helm仓库展示")])]),t._v(" "),s("tr",[s("td",[t._v("helm repo update")]),t._v(" "),s("td",[t._v("helm仓库更新")])]),t._v(" "),s("tr",[s("td",[t._v("helm inspect readme stable/jenkins")]),t._v(" "),s("td",[t._v("charts使用说明")])]),t._v(" "),s("tr",[s("td",[t._v("helm install stable/redis")]),t._v(" "),s("td",[t._v("charts部署，可配合--dry-run")])]),t._v(" "),s("tr",[s("td",[t._v("helm list release")]),t._v(" "),s("td",[t._v("release 版本查看")])]),t._v(" "),s("tr",[s("td",[t._v("helm delete  redis-release-1")]),t._v(" "),s("td",[t._v("卸载名为redis-release-1的charts")])])])]),t._v(" "),s("h3",{attrs:{id:"附录：参考文档"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#附录：参考文档"}},[t._v("#")]),t._v(" 附录：参考文档")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("helm")]),t._v(" "),s("p",[t._v("https://helm.sh/docs/intro/quickstart/")]),t._v(" "),s("p",[t._v("https://github.com/helm/helm")])]),t._v(" "),s("li",[s("p",[t._v("helm-hub")]),t._v(" "),s("p",[t._v("https://hub.helm.sh/")])]),t._v(" "),s("li",[s("p",[t._v("jimmysong.io")]),t._v(" "),s("p",[t._v("https://jimmysong.io/kubernetes-handbook/practice/helm.html")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);