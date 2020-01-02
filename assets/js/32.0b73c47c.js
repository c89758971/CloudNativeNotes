(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{228:function(e,t,a){"use strict";a.r(t);var v=a(0),s=Object(v.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"kubernetes快速入门"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes快速入门"}},[e._v("#")]),e._v(" Kubernetes快速入门")]),e._v(" "),a("p",[e._v("通过本章节的学习，你可以充分了解到一个"),a("code",[e._v("https")]),e._v("的"),a("code",[e._v("kubernetes")]),e._v("集群中所需的证书及其作用，以及"),a("code",[e._v("kubernetes")]),e._v("语境内的"),a("code",[e._v("api")]),e._v("资源类型，最后我还补充了几个基础的GET命令，此时你可以登录到上一章节我们使用"),a("code",[e._v("kubeadm")]),e._v("创建的集群，进行一些查询操作了")]),e._v(" "),a("ul",[a("li",[e._v("证书管理")]),e._v(" "),a("li",[e._v("API资源模型")]),e._v(" "),a("li",[e._v("API资源类型")]),e._v(" "),a("li",[e._v("命令补充")])]),e._v(" "),a("h2",{attrs:{id:"_1-证书管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-证书管理"}},[e._v("#")]),e._v(" 1.证书管理")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s_ca.png",alt:"k8s证书"}})]),e._v(" "),a("p",[a("code",[e._v("k8s")]),e._v("于生产环境运行时，我强烈建议大家运行在"),a("code",[e._v("https")]),e._v("的安全环境下，其证书可分为以下三大类：")]),e._v(" "),a("h3",{attrs:{id:"_1-root-ca"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-root-ca"}},[e._v("#")]),e._v(" 1.root CA")]),e._v(" "),a("ul",[a("li",[e._v("apiserver：apiserver自己的证书")]),e._v(" "),a("li",[e._v("apiserver-kubelet-client：kubelet客户端连接apiserver时的客户端证书")])]),e._v(" "),a("h3",{attrs:{id:"_2-etcd-ca"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-etcd-ca"}},[e._v("#")]),e._v(" 2.etcd CA")]),e._v(" "),a("ul",[a("li",[e._v("etcd-server：etcd服务端证书")]),e._v(" "),a("li",[e._v("etcd-peer：etcd对等证书，用于etcd集群间https通信")]),e._v(" "),a("li",[e._v("etcd-healthcheck-client：etcd健康检查的客户端证书")]),e._v(" "),a("li",[e._v("apiserver-etcd-client：apiserver连接etcd的客户端证书")])]),e._v(" "),a("h3",{attrs:{id:"_3-front-proxy-ca"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-front-proxy-ca"}},[e._v("#")]),e._v(" 3.front-proxy CA")]),e._v(" "),a("ul",[a("li",[e._v("front-proxyserver-client：apiserver（中的聚合器aggregator）于前端的客户端证书")])]),e._v(" "),a("p",[e._v("你需要注意的是：")]),e._v(" "),a("ol",[a("li",[a("code",[e._v("k8s")]),e._v("集群证书默认有效期是90天，你有2个办法去调整（修改"),a("code",[e._v("go")]),e._v("源文件或者证书签名请求生成时声明，如何修改我后面章节会说）")]),e._v(" "),a("li",[e._v("证书的过期时间，你可以到"),a("code",[e._v("/etc/kubernetes/pki")]),e._v("目录下，使用以下命令进行查看：")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("openssl x509 -in front-proxy-client.crt   -noout -text  "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("grep")]),e._v(" Not\n            Not Before: Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("28")]),e._v(" 09:07:02 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2018")]),e._v(" GMT\n            Not After "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("25")]),e._v(" 09:07:03 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2028")]),e._v(" GMT\n    \nopenssl x509 -in apiserver.crt   -noout -text  "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("grep")]),e._v(" Not\n            Not Before: Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("28")]),e._v(" 09:07:04 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2018")]),e._v(" GMT\n            Not After "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" Nov "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("25")]),e._v(" 09:07:04 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2028")]),e._v(" GMT\n")])])]),a("h2",{attrs:{id:"_2-api资源模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-api资源模型"}},[e._v("#")]),e._v(" 2.API资源模型")]),e._v(" "),a("p",[a("code",[e._v("RESTfulAPI")]),e._v("的核心组件是“资源（"),a("code",[e._v("resource")]),e._v("）”，不同类别的事物会被抽象会不同“类型（"),a("code",[e._v("type")]),e._v("）”的资源。\n"),a("code",[e._v("k8s")]),e._v('中的资源也类似于对象式编程语言中的“类"（'),a("code",[e._v("class")]),e._v("），但它仅支持有限的方法，而且通常是标准的"),a("code",[e._v("HTTP")]),e._v("方法，例如："),a("code",[e._v("GET")]),e._v("、"),a("code",[e._v("PUT")]),e._v("、"),a("code",[e._v("POST")]),e._v("和"),a("code",[e._v("DELETE")]),e._v("；此时，你应该可以联想到常用的基础命令"),a("code",[e._v("kubelet")]),e._v("：")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("kubectl get pod\nkubectl delete node\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n")])])]),a("ul",[a("li",[e._v("为了便于独立进行版本演进，"),a("code",[e._v("Kubernetes")]),e._v("将"),a("code",[e._v("API")]),e._v("划分为了称为“"),a("code",[e._v("API群组")]),e._v("”的逻辑集合，每个群组的"),a("code",[e._v("REST")]),e._v("路径为“"),a("code",[e._v("/apis/$GROUP_NAME/$VERSION")]),e._v("”，例如"),a("code",[e._v("/apis/apps/v1")]),e._v("；")]),e._v(" "),a("li",[e._v("核心群组"),a("code",[e._v("core")]),e._v("使用简化的"),a("code",[e._v("REST")]),e._v("路径"),a("code",[e._v("/api/v1")]),e._v("；")]),e._v(" "),a("li",[e._v("同时，每个群组可同时存在多个不同级别的版本，主要包括"),a("code",[e._v("alpha")]),e._v("、"),a("code",[e._v("beta")]),e._v("和"),a("code",[e._v("stable")]),e._v("三个，使用的级别标识如"),a("code",[e._v("v1alpha1")]),e._v("、"),a("code",[e._v("v1beta2")]),e._v("和"),a("code",[e._v("v1")]),e._v("等。")])]),e._v(" "),a("p",[e._v("你可以通过"),a("code",[e._v("api-versions")]),e._v("命令查询当前所支持的"),a("code",[e._v("API")]),e._v("版本：")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("root@k8s-etcd-mater01 cds-filesystem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# kubectl api-versions")]),e._v("\nadmissionregistration.k8s.io/v1beta1\napiextensions.k8s.io/v1beta1\napiregistration.k8s.io/v1\napiregistration.k8s.io/v1beta1\napps/v1\napps/v1beta1\napps/v1beta2\nauthentication.k8s.io/v1\nauthentication.k8s.io/v1beta1\nauthorization.k8s.io/v1\nauthorization.k8s.io/v1beta1\nautoscaling/v1\nautoscaling/v2beta1\nautoscaling/v2beta2\nbatch/v1\nbatch/v1beta1\ncertificates.k8s.io/v1beta1\ncoordination.k8s.io/v1beta1\nevents.k8s.io/v1beta1\nextensions/v1beta1\nnetworking.k8s.io/v1\npolicy/v1beta1\nrbac.authorization.k8s.io/v1\nrbac.authorization.k8s.io/v1beta1\nscheduling.k8s.io/v1beta1\nstorage.k8s.io/v1\nstorage.k8s.io/v1beta1\nv1\n")])])]),a("h2",{attrs:{id:"_3-api资源类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-api资源类型"}},[e._v("#")]),e._v(" 3.API资源类型")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/API%E8%B5%84%E6%BA%90%E7%B1%BB%E5%9E%8B.png",alt:"API资源类型"}})]),e._v(" "),a("p",[e._v("如图所示，"),a("code",[e._v("Kubernetes")]),e._v("系统把管理的绝大多数事物都抽象成了资源，它们分别代表着不同的事物类型，例如："),a("code",[e._v("Node")]),e._v("、"),a("code",[e._v("Service")]),e._v("、"),a("code",[e._v("Pod")]),e._v("、"),a("code",[e._v("Controller")]),e._v("等等")]),e._v(" "),a("ul",[a("li",[e._v("每种类型均可通过“属性赋值”进行实例化，从而构建出“对象（"),a("code",[e._v("object")]),e._v("）；")]),e._v(" "),a("li",[e._v("对象主要用于描述要在集群中运行的“应用程序（Pod）”，以及应用程序相关的控制（"),a("code",[e._v("controllers")]),e._v("）、配置（"),a("code",[e._v("ConfigMap")]),e._v("和"),a("code",[e._v("Secret")]),e._v("）、服务暴露（"),a("code",[e._v("Service")]),e._v("和"),a("code",[e._v("Ingress")]),e._v("）、存储（"),a("code",[e._v("Volume")]),e._v("）等；")]),e._v(" "),a("li",[e._v("用户使用这些对象来规划、部署、配置、维护和监控应用程序并记录运行日志；")]),e._v(" "),a("li",[e._v("每种类型的资源对象都支持相应的一组方法（管理操作），它们可用标准的"),a("code",[e._v("HTTP Verb")]),e._v("进行表示，例如："),a("code",[e._v("GET")]),e._v("、"),a("code",[e._v("PUT")]),e._v("、"),a("code",[e._v("DELETE")]),e._v("和"),a("code",[e._v("POST")]),e._v("等。")])]),e._v(" "),a("h2",{attrs:{id:"_4-命令补充"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-命令补充"}},[e._v("#")]),e._v(" 4.命令补充")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("    获取集群资源列表：\n        kubectl  api-resources\n            \n    获取命名空间：\n        kubectl  get ns\n        \n    创建deployment： \n        kubectl create deployment ngx-new --image"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("nginx\n                 \n    查看service信息：\n         kubectl describe svc ngx-new\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);