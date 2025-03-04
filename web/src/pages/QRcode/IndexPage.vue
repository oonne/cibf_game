<script setup lang="ts">
import type { Tab } from '@/types/type';
import GeneratorCard from './GeneratorCard.vue';
import ParserCard from './ParserCard.vue';

const tabs: Tab[] = [
  {
    key: 'generator',
    name: '生成二维码',
    component: GeneratorCard,
  },
  {
    key: 'parser',
    name: '解析二维码',
    component: ParserCard,
  },
];
</script>

<template>
  <HeaderBar title="二维码" />

  <!-- 功能 -->
  <TabsNav
    default="generator"
    :tabs="tabs"
  />
</template>

<style scoped>
</style>
