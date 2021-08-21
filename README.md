## my-vue-router
自建基于hash实现的vue-router

#### 说明
几个月前做的一个vue-router的项目，现在整理开源到github，对学习vue插件和路由实现挺有学习价值的，最近添加了关键地方的注释  
项目分为几个分支，代表不同实现阶段：  
+ v1分支表示新建的vue2项目，使用基于vue-router实现的路由，有两个页面，基本配置，一个是默认页面，一个是测试页面，安装好包后即可跑起来.  
主要工作如下：添加了my-router目录，路由实现逻辑都在这里，在main.js中替换掉router目录的文件即是自定义的实现。初始化页面的监听  
+ v2分支做了vue插件化和用单例模式保证路由对象唯一性的工作
+ v3分支定义了 view-router 组件
