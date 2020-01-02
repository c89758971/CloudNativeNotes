(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{217:function(v,e,t){"use strict";t.r(e);var _=t(0),o=Object(_.a)({},(function(){var v=this,e=v.$createElement,t=v._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"envoy"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#envoy"}},[v._v("#")]),v._v(" Envoy")]),v._v(" "),t("p",[v._v("核心功能在于数据平面，于2016年由"),t("code",[v._v("Lyft")]),v._v("公司创建并开源，目标是成为通用的数据平面。\n云原生应用，既可用作前端代理，亦可实现"),t("code",[v._v("Service Mesh")]),v._v("中的服务间通信。\n常被用于实现"),t("code",[v._v("API Gateway")]),v._v("（如"),t("code",[v._v("Ambassador")]),v._v("）以及"),t("code",[v._v("Kubernetes")]),v._v("的"),t("code",[v._v("Ingress Controller")]),v._v("（例如 "),t("code",[v._v("gloo")]),v._v("等），不过，基于"),t("code",[v._v("Envoy")]),v._v("实现的"),t("code",[v._v("Service Mesh")]),v._v("产品"),t("code",[v._v("Istio")]),v._v("有着更广泛的用户基础")]),v._v(" "),t("ul",[t("li",[v._v("what is Envoy？")]),v._v(" "),t("li",[v._v("Envoy架构图")]),v._v(" "),t("li",[v._v("Envoy常用术语")]),v._v(" "),t("li",[v._v("参考文档")])]),v._v(" "),t("h2",{attrs:{id:"_1-what-is-envoy？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-what-is-envoy？"}},[v._v("#")]),v._v(" 1.what is Envoy？")]),v._v(" "),t("p",[t("code",[v._v("Envoy")]),v._v("是专为大型现代"),t("code",[v._v("SOA")]),v._v("（面向服务架构）架构设计的"),t("code",[v._v("L7")]),v._v("代理和通信总线。")]),v._v(" "),t("h2",{attrs:{id:"_2-envoy架构图"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-envoy架构图"}},[v._v("#")]),v._v(" 2.Envoy架构图")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/enovy.png",alt:"Envoy架构图"}})]),v._v(" "),t("p",[v._v("为了方便理解，我会给出于"),t("code",[v._v("nginx")]),v._v("的名词进行对比")]),v._v(" "),t("div",{staticClass:"language-text extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[v._v("Listener：类似于Nginx的listen，用于区分最初始的网络流量\nFilter chains：过滤链；有一个或多个过滤器组成，他们是层级关系，类似于多个location\nCluster：集群，envoy定义逻辑相同的服务器组概念，类似upstream\nEndpoint：网络端点\n")])])]),t("p",[v._v("图中展示的是"),t("code",[v._v("enovy")]),v._v("组件于"),t("code",[v._v("Hostproxy")]),v._v("模式下的组件协作图（如果工作与"),t("code",[v._v("SiderCar")]),v._v("会有些许不同），\n其中所有组件都可以静态配置，或者通过控制平面/管理服务器/xDS进行动态服务发现。")]),v._v(" "),t("h2",{attrs:{id:"_3-envoy常用术语"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-envoy常用术语"}},[v._v("#")]),v._v(" 3.Envoy常用术语")]),v._v(" "),t("ul",[t("li",[v._v("集群（Cluster）：集群是Envoy连接到的一组逻辑上相似的端点；\n在v2中，RDS通过路由指向集群，CDS提供集群配置，而Envoy通过EDS（Endpoint Discovery Server）发现集群成员，即端点；")]),v._v(" "),t("li",[v._v("下游（Downstream）：下游主机连接到Envoy，发送请求并接收响应，它们是Envoy的客户端；")]),v._v(" "),t("li",[v._v("上游（Upstream）：上游主机接收来自Envoy的连接和请求并返回响应，它们是Envoy代理的后端服务器；")]),v._v(" "),t("li",[v._v("端点（Endpoint）：端点即上游主机，是一个或多个集群的成员，可通过EDS（Endpoint Discovery Server）发现；")]),v._v(" "),t("li",[v._v("侦听器（Listener）：侦听器是能够由下游客户端连接的命名网络位置，例如端口或unix域套接字等；")]),v._v(" "),t("li",[v._v("位置（Locality）：上游端点运行的区域拓扑，包括地域、区域和子区域等；")]),v._v(" "),t("li",[v._v("管理服务器（Management Server）：实现v2API的服务器，它支持复制和分片，并且能够在不同的物理机器上实现针对不同xDS API的API服务；")]),v._v(" "),t("li",[v._v("地域（Region）：区域所属地理位置；")]),v._v(" "),t("li",[v._v("区域（Zone）：AWS中的可用区（AZ）或GCP中的区域等；")]),v._v(" "),t("li",[v._v("子区域：Envoy实例或端点运行的区域内的位置，用于支持区域内的多个负载均衡目标；")]),v._v(" "),t("li",[v._v("xDS：CDS 、EDS、HDS 、LDS、RLS(Rate Limit)、 RDS 、 SDS、VHDS和RTDS等API的统称；")])]),v._v(" "),t("h2",{attrs:{id:"_4-参考文档"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-参考文档"}},[v._v("#")]),v._v(" 4.参考文档")]),v._v(" "),t("p",[v._v("Envoy 官方文档：https://www.envoyproxy.io/docs/envoy/latest/")]),v._v(" "),t("p",[v._v("Envoy 官方文档中文版：https://www.servicemesher.com/envoy/")])])}),[],!1,null,null,null);e.default=o.exports}}]);