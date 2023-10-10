![Alt text](github/logo.gif)
  仿 qqnt 的 gpt webUI，由 [@lss233](https://github.com/lss233) 的优秀开源项目 [chatgpt-mirai-qq-bot
](https://github.com/lss233/chatgpt-mirai-qq-bot) 提供后端支持。


| ![网页端](https://img.shields.io/badge/-网页端-E2CDBC?style=for-the-badge)                     | ![移动端](https://img.shields.io/badge/-移动端-E2CDBC?style=for-the-badge)                   | 
|------------------------------|------------------------------|
| ![image](github/web.png) | ![image](github/mobile.png) |


## 现有功能
- markdown 支持
- 对话
- 移动端支持 (优化中) 


## TODO
- 聊天记录以图像分享
- 音频/图像支持
- ~~小程序~~ (没打算过审)
- UI 美化
- 访问/管理码
- 基于前端的联系人管理
- prompt 管理
- 流式响应
- 重构💩山代码


## 配置
1. 克隆本项目。
2. 执行 `pnpm i`安装依赖。
3. 打开`src/assets/json`里的两个 *json 文件，按提示修改。
   - config
     - `baseurl`:你的后端地址(必须包含http(s)://)

        就是 [chatgpt-mirai-qq-bot
](https://github.com/lss233/chatgpt-mirai-qq-bot) 项目的 API 端口地址，如果你还没开，请先开一下。
     - `resetprompt`:重置会话的指令
     - `loadprompt`:加载预设的指令(注意空格)
   - main
     - `name`:自定义即可，contactor以外的是你自己
     - `title`:自己可自定义，contator以内的要填写`预设名称`
     - `important`:是否置顶(功能待完善)
     - `uin`:纯数字，可自定义(不要重复)
     - `avatar`:头像图片直链(最好1:1)
        
        可以选择用qq头像 ( https://q1.qlogo.cn/g?b=qq&s=0&nk=目标QQ号 )

4. `npm run build`编译为可部署的静态文件,你可以在`/dist`看到它们。

## 鸣谢
- 本项目直接或间接使用的优秀的开源项目：
  -  [vue](https://vuejs.org/)
  - [chatgpt-mirai-qq-bot
](https://github.com/lss233/chatgpt-mirai-qq-bot) 
  - [md-editor-v3](https://github.com/imzbf/md-editor-v3)
  - [emoji-picker-element](https://www.npmjs.com/package/emoji-picker-element)
- 给我 star 的你 ❤️

## 找到我&&学习交流
- 企鹅群 : 798543340 