<script setup lang="ts">
</script>

<template>
  <ContentCard>
    <h2>简介</h2>
    <p>密钥派生函数。基于简单的口令，生成安全的秘钥。</p>
    <p>人类通常只能记住简单的口令（密码）。但是加密的安全性，依赖于指定长度、随机的、难以预测的秘钥。PBKDF2应用一个伪随机函数，对口令和盐重复多次计算，来生成安全的秘钥。</p>
  </ContentCard>
</template>

<style scoped>
</style>
