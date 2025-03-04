<script setup lang="ts">
import type { Tab } from '@/types/type';
import IntroCard from './IntroCard.vue';
import DecodeCard from './DecodeCard.vue';
import EncodeCard from './EncodeCard.vue';
import EncodeFileCard from './EncodeFileCard.vue';

const tabs: Tab[] = [
  {
    key: 'decode',
    name: '解码',
    component: DecodeCard,
  },
  {
    key: 'encode',
    name: '编码',
    component: EncodeCard,
  },
  {
    key: 'dataurl',
    name: '文件转DataUrl',
    component: EncodeFileCard,
  },
];
</script>

<template>
  <HeaderBar title="Base64 编码解码" />

  <!-- 功能 -->
  <TabsNav
    default="decode"
    :tabs="tabs"
  />

  <!-- 简介 -->
  <IntroCard />
</template>

<style scoped>
</style>
