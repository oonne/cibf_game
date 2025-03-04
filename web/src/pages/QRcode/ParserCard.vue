<script setup lang="ts">
import { ref } from 'vue';
import qrcodeParser from 'qrcode-parser';
import message from '@/components/message';
import { to } from '@/utils';

const output = ref('');

/* 解析二维码 */
const parse = async (file: File) => {
  output.value = '解析中...';

  const [err, res] = await to(qrcodeParser(file));
  if (err) {
    message('解析失败');
    output.value = '';
    return;
  }

  output.value = res;
};
</script>

<template>
  <FileInput
    placeholder="拖拽图片到此处"
    @change="parse"
  />

  <TextInput
    v-show="!!output"
    :text="output"
    readonly
  />
</template>

<style scoped>
.drop{
  display: block;
  margin: 8px 8px 16px;
  height: 6rem;
  line-height: 6rem;
  font-size: 1.6rem;
  text-align: center;
  background-color: var(--input-background);
  border: 4px dashed var(--color);
  cursor: pointer;
  opacity: 0.7;
}
.drop:hover{
  opacity: 1;
}
</style>
