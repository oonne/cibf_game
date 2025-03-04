<script setup lang="ts">
import type { Tab } from '@/types/type';
import IntroCard from './IntroCard.vue';
import GenerateKeyCard from './GenerateKeyCard.vue';
import DecryptCard from './DecryptCard.vue';
import EncryptCard from './EncryptCard.vue';
import SignCard from './SignCard.vue';
import VerifyCard from './VerifyCard.vue';

const tabs: Tab[] = [
  {
    key: 'generator',
    name: '生成秘钥对',
    component: GenerateKeyCard,
  },
  {
    key: 'decrypt',
    name: '解密',
    component: DecryptCard,
  },
  {
    key: 'encrypt',
    name: '加密',
    component: EncryptCard,
  },
  {
    key: 'sign',
    name: '签名',
    component: SignCard,
  },
  {
    key: 'verify',
    name: '校验',
    component: VerifyCard,
  },
];
</script>

<template>
  <HeaderBar title="RSA 非对称加密算法" />

  <!-- 功能 -->
  <TabsNav
    default="decrypt"
    :tabs="tabs"
  />

  <!-- 简介 -->
  <IntroCard />
</template>

<style scoped>
</style>
