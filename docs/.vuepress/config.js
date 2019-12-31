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
              ["/Kubernetes/18.准入控制器/",'准入控制器']
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