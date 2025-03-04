<script setup lang="ts">
import { ref } from 'vue';

const output = ref('');

/* 编码 */
const encode = (file: Blob) => {
  output.value = '编码中...';

  const reader = new FileReader();
  reader.onload = (e) => {
    output.value = String(e?.target?.result);
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <FileInput @change="encode" />

  <TextInput
    v-show="!!output"
    :text="output"
    readonly
  />
</template>

<style scoped>
</style>
