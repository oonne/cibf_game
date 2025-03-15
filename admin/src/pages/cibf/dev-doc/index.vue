<!-- eslint-disable max-len -->
<template>
  <div class="doc-wrap">
    <h2>CIBF小程序需要对接的工作</h2>
    <ol>
      <li>
        登录<a
          href="https://mp.weixin.qq.com/"
          target="_blank"
        >微信小程序后台</a>，开发与服务=>开发管理=>开发设置=>业务域名，添加 <b>https://cibf.wuyanxun.com</b>。
      </li>
      <li>
        小程序新增一个活动页面，使用<a
          href="https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html"
          target="_blank"
        >webview组件</a>，嵌入一个网页。网页域名为: <b>https://cibf.wuyanxun.com/#/home?openId=xxxxxx</b> 。
        请再通过在连接里面携带openId参数，用于标识用户。
      </li>
      <li>
        活动页面页面设置
        <a
          href="https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/miniapp/component/onShareAppMessage.html"
          target="_blank"
        >onShareAppMessage</a> 方法，用于分享当前活动页面。请设置path，使得分享出去的链接，可以直接进入到当前活动页面。
      </li>
      <li>
        活动页面的webview组件设置 bindmessage 事件，用于接收分享回调。
      </li>
      <li>
        提供一个页面，用于H5页面点击“浏览小程序获取抽奖次数”的回调。
      </li>
      <li>
        浏览小程序页面后，进行计时，达到规定时间后，调用 <b>https://cibf-api.wuyanxun.com/user/browse-report</b> 接口，上报浏览小程序。请求方法: <b>POST</b>。请求参数: <b>openId</b>。
      </li>
    </ol>
  </div>

  <div class="doc-wrap">
    <h2>技术支持</h2>
    <img
      :src="WxQrcode"
      alt="微信二维码"
      :style="{ width: '200px', height: '200px' }"
    >
  </div>
</template>

<script setup lang="ts">
import WxQrcode from './assets/wx-qrcode.png';
</script>

<style scoped>
.doc-wrap{
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 36px;
}
ul, ol {
  padding-left: 24px;
}
li {
  margin: 4px 0;
}
</style>
