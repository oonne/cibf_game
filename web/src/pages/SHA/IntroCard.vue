<script setup lang="ts">
</script>

<template>
  <ContentCard>
    <h2>简介</h2>
    <p>安全散列算法。用于计算出一段信息固定的消息摘要。</p>
    <p>SHA计算是单向的，难以通过消息摘要逆向计算原内容。计算结果是离散的，输入数据的微小变化会导致输出的巨大变化。SHA2和SHA3只是算法不同，目前都是安全的。</p>
    <br>

    <h2>安全强度</h2>
    <table>
      <thead>
        <tr>
          <th>SHA2</th>
          <th>安全强度</th>
          <th>安全性</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>SHA-224</td>
          <td>112</td>
          <td class="danger">
            不安全
          </td>
        </tr>
        <tr>
          <td>SHA-256</td>
          <td>128</td>
          <td class="warning">
            安全
          </td>
        </tr>
        <tr>
          <td>SHA-384</td>
          <td>192</td>
          <td class="safe">
            安全
          </td>
        </tr>
        <tr>
          <td>SHA-512</td>
          <td>256</td>
          <td class="safe">
            安全
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>SHA3</th>
          <th>安全强度</th>
          <th>安全性</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>SHA3-224</td>
          <td>112</td>
          <td class="danger">
            不安全
          </td>
        </tr>
        <tr>
          <td>SHA3-256</td>
          <td>128</td>
          <td class="warning">
            安全
          </td>
        </tr>
        <tr>
          <td>SHA3-384</td>
          <td>192</td>
          <td class="safe">
            安全
          </td>
        </tr>
        <tr>
          <td>SHA3-512</td>
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
