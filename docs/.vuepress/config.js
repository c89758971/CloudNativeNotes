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
            { text: 'Docker', link: '/Docker/1.Dockerfile使用总结' },
            { text: 'Kubernetes', link: '/Kubernetes/1.Kubernetes基础' },
            { text: 'Ceph', link: '/Ceph/1.简介/' },
            { text: 'Prometheus', link: '/Prometheus/' }
        ],
        sidebarDepth : 3,
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
              ["/Kubernetes/1.Kubernetes基础/",'Kubernetes基础']
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