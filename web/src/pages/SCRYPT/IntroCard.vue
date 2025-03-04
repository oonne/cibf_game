<script setup lang="ts">
import type { Link } from '@/types/type';

const refer: Link[] = [
  {
    href: 'https://blog.oonne.com/site/blog?id=75',
    text: '工作量证明',
  },
];
</script>

<template>
  <ContentCard>
    <h2>简介</h2>
    <p>密钥派生函数。基于简单的口令，生成安全的秘钥。</p>
    <p>
      生成的过程需要占用大量的内存，因此经常被应用在工作量证明算法上。
    </p>
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
