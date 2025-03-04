<script setup lang="ts">
import { ref } from 'vue';
import { enc } from 'crypto-js';

const input = ref('');
const output = ref('');

/* 编码 */
const onEncode = () => {
  output.value = enc.Base64.stringify(enc.Utf8.parse(input.value));
};
</script>

<template>
  <TextInput
    v-model:text.lazy="input"
    placeholder="编码前"
  />

  <div class="button-warp">
    <ConfirmButton
      text="编码"
      :disable="input===''"
      @click="onEncode"
    />
  </div>

  <TextInput
    v-if="!!output"
    placeholder="编码后"
    :text="output"
    readonly
  />
</template>

<style scoped>
.button-warp{
  display: flex;
  justify-content: flex-end;
}

</style>
