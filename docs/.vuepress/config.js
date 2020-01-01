module.exports = {
  base: '/CloudNativeNotes/',
  title: 'CloudNativeNotes',
  description: 'Vuepress blog demo',
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/Aaron1989/CloudNativeNotes',
        //repo: "Aaron1989/blog-demo",
        // 自定义仓库链接文字。
        repoLabel: 'My GitHub',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docker', link: '/Docker/1.Dockerfile使用总结/' },
            { text: 'Kubernetes', link: '/Kubernetes/1.Kubernetes基础/' },
            { text: 'Istio', link: '/istio/1.Service Mesh简介/' },
            { text: 'Ceph', link: '/Ceph/1.简介/' },
            { text: 'Prometheus', link: '/Prometheus/' }
        ],
        sidebarDepth : 5,
        sidebar: [
            {
            title: "Docker篇",
            collapsable: false,
            children: [
              ["/Docker/1.Dockerfile使用总结/",'Dockerfile使用总结'],
              ["/Docker/2.私有仓库和资源限制/",'私有仓库和资源限制'],
              ["/Docker/3.Docker Compose基础应用/",'Docker Compose基础应用']
            ]
            },
            {
            title: "Kubernetes篇",
            collapsable: false,
            children: [
              ["/Kubernetes/1.Kubernetes基础/",'Kubernetes基础'],
              ["/Kubernetes/2.Kubernetes基础和部署说明/",'Kubernetes基础和部署说明'],
              ["/Kubernetes/3.使用Kubeadm部署k8s集群/",'使用Kubeadm部署k8s集群'],
              ["/Kubernetes/4.Kubernetes快速入门/",'Kubernetes快速入门'],
              ["/Kubernetes/5.Pod资源清单配置基础/",'Pod资源清单配置基础'],
              ["/Kubernetes/6.Pod资源管理/",'Pod资源管理'],
              ["/Kubernetes/7.Pod控制器-Deployment/",'Pod控制器-Deployment'],
              ["/Kubernetes/8.Pod控制器-DaemonSet/",'Pod控制器-DaemonSet'],
              ["/Kubernetes/9.Pod控制器-Job/",'Pod控制器-Job'],
              ["/Kubernetes/10.Service资源管理/",'Service资源管理'],
              ["/Kubernetes/11.Ingress资源/",'Ingress资源'],
              ["/Kubernetes/12.Volume基础应用/",'Volume基础应用源'],
              ["/Kubernetes/13.ConfigMap资源/",'ConfigMap资源'],
              ["/Kubernetes/14.Secret资源/",'Secret资源'],
              ["/Kubernetes/15.StatefulSet资源/",'StatefulSet资源'],
              ["/Kubernetes/16.Kubernetes系统安全/",'Kubernetes系统安全'],
              ["/Kubernetes/17.Dashboard/",'Dashboard'],
              ["/Kubernetes/18.准入控制器/",'准入控制器'],
              ["/Kubernetes/19.网络插件体系/",'网络插件体系'],
              ["/Kubernetes/20.Network-Policy/",'Network-Policy'],
              ["/Kubernetes/21.调度器与调度机制/",'调度器与调度机制'],
              ["/Kubernetes/22.高级调度机制/",'高级调度机制'],
              ["/Kubernetes/23.污点和容忍度/",'污点和容忍度'],
              ["/Kubernetes/24.使用CRD扩展Kubernetes-API/",'使用CRD扩展Kubernetes-API'],
              ["/Kubernetes/25.HPA控制器/",'HPA控制器'],
              ["/Kubernetes/26.Helm基础/",'Helm基础'],
              ["/Kubernetes/27.Helm使用进阶/",'Helm使用进阶'],
              ["/Kubernetes/28.二进制部署高可用k8s集群/",'二进制部署高可用k8s集群阶']
            ]
            },
            {
            title: "istio篇",
            collapsable: false,
            children: [
              ["/istio/1.Service Mesh简介/",'Service Mesh简介'],
              ["/istio/2.微服务和服务治理基础/",'微服务和服务治理基础'],
              ["/istio/3.Envoy基础/",'Envoy基础'],
              ["/istio/4.Envoy部署类型/",'Envoy部署类型'],
              ["/istio/5.Envoy配置方式/",'Envoy配置方式'],
              ["/istio/6.Envoy使用入门_1/",'Envoy使用入门_1'],
              ["/istio/7.Envoy使用入门_2/",'Envoy使用入门_2'],
              ["/istio/8.Envoy使用入门_3/",'Envoy使用入门_3'],
              ["/istio/9.Envoy管理接口基础应用/",'Envoy管理接口基础应用'],
              ["/istio/10.Envoy综合示例_FrontProxy/",'Envoy综合示例_FrontProxy'],
              ["/istio/11.xDS API及动态配置_1/",'xDS API及动态配置_1'],
              ["/istio/12.xDS API及动态配置_2/",'xDS API及动态配置_2']
            ]
            },
            {
            title: "Ceph篇",
            collapsable: false,
            children: [
              ["/Ceph/1.简介/",'综述']
            ]
            },
            {
            title: "Prometheus篇",
            collapsable: false,
            children: [
              ["/Prometheus/",'综述']
            ]
            }
        ]
    }
}