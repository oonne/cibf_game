<script setup lang="ts">
</script>

<template>
  <ContentCard>
    <h2>简介</h2>
    <p>RSA是一种 <b>非对称加密算法</b> 。</p>
    <p>
      RSA算法自1978年提出至今，被广泛使用和研究，经历住了各种考验。
      其加密原理是：至今尚未找到一个多项式时间算法来做因式分解（虽然也没人能证明这种算法不存在），因此可以将两个很大的质数的乘积作为加密秘钥。
    </p>
    <br>
    <p>
      一对RSA秘钥，分为公钥和私钥。<br>
      <b>加密/解密</b>时，公钥对外公开，私钥由接收方自己保管。发送方使用公钥加密内容，接收方使用私钥解密内容。公钥仅可用于加密，无法用于解密，因此可以保证传输内容不被窃取。<br>
      <b>签名/校验</b>时，公钥对外公开，私钥由发送方自己保管。发送方使用私钥生成签名，接收方使用公钥校验签名。公钥仅可用于校验，无法用于签名，因此可以保证传输内容不被篡改。<br>
    </p>
    <br>

    <h2>安全强度</h2>
    <table>
      <thead>
        <tr>
          <th>RSA秘钥长度</th>
          <th>等效安全强度</th>
          <th>安全性</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>512</td>
          <td>56</td>
          <td class="danger">
            不安全
          </td>
        </tr>
        <tr>
          <td>1024</td>
          <td>80</td>
          <td class="danger">
            不安全
          </td>
        </tr>
        <tr>
          <td>2048</td>
          <td>112</td>
          <td class="warning">
            安全
          </td>
        </tr>
        <tr>
          <td>3072</td>
          <td>128</td>
          <td class="safe">
            安全
          </td>
        </tr>
        <tr>
          <td>7680</td>
          <td>192</td>
          <td class="safe">
            安全
          </td>
        </tr>
        <tr>
          <td>15360</td>
          <td>256</td>
          <td class="safe">
            安全
          </td>
        </tr>
      </tbody>
    </table>
  </ContentCard>
</template>

<style scoped>
</style>
