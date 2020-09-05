### 项目安装方法：
    1. 安装node，https://nodejs.org/zh-cn/download/
    3. cd 到项目目录下，npm install，完成。
    3. 本地启动项目，npm run dev
    
### npm切换源方法
    npm config get registry  // 查看npm当前镜像源
    
    npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

### 更换版本号
    动态替换.env.development、.env.production和.env.staging的VUE_APP_VERSION的值
    
### idea配置
    1. idea识别vue项目的@别名，settings/language & framework/javascript/webpack,
    添加项目根目录下的idea.config.js配置即可完成。
    2. 识别eslint规则，
    In the Settings/Preferences dialog (Ctrl+Alt+S), go to Languages and Frameworks | JavaScript | ESLint.          
    Select the Automatic Configuration option to use a custom ESLint package and configuratio
    
### 新建view
    1. npm install -g plop
    2. 终端中输入plop 
