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
            { text: 'Ceph', link: '/Ceph/1.简介/' },
            { text: 'Prometheus', link: '/Prometheus/' }
        ],
        sidebarDepth : 3,
        sidebar: [
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