<script setup lang="ts">
import type { Link } from '@/types/type';

const refer: Link[] = [
  {
    href: 'https://blog.oonne.com/site/blog?id=32',
    text: 'Base64编码原理及应用',
  },
  {
    href: 'https://developer.mozilla.org/zh-CN/docs/Glossary/Base64',
    text: 'MDN文档',
  },
];
</script>

<template>
  <ContentCard>
    <h2>简介</h2>
    <p>Base64用于将 <b>二进制数据</b> 编码为 <b>可见字符传输</b> 。</p>
    <br>

    <h2>参考文献</h2>
    <ul>
      <li
        v-for="link in refer"
        :key="link.href"
      >
        <a
          :href="link.href"
          target="_blank"
        >{{ link.text }}</a>
      </li>
    </ul>
  </ContentCard>
</template>

<style scoped>
</style>
