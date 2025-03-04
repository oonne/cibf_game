<script setup lang="ts">
import type { Tab } from '@/types/type';
import IntroCard from './IntroCard.vue';
import Sha2Card from './Sha2Card.vue';
import Sha3Card from './Sha3Card.vue';

const tabs: Tab[] = [
  {
    key: 'sha2',
    name: 'SHA2',
    component: Sha2Card,
  },
  {
    key: 'sha3',
    name: 'SHA3',
    component: Sha3Card,
  },
];
</script>

<template>
  <HeaderBar title="SHA 单向散列函数" />

  <!-- 功能 -->
  <TabsNav
    default="sha3"
    :tabs="tabs"
  />

  <!-- 简介 -->
  <IntroCard />
</template>

<style scoped>
</style>
