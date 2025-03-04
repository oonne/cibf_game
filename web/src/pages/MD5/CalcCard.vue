<script setup lang="ts">
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

const input = ref('');
const output = ref('');

/* 计算 */
const onCalc = () => {
  output.value = CryptoJS.MD5(input.value).toString();
};
</script>

<template>
  <TextInput
    v-model:text.lazy="input"
    placeholder="内容"
  />

  <div class="button-warp">
    <ConfirmButton
      text="计算"
      :disable="input===''"
      @click="onCalc"
    />
  </div>

  <TextInput
    v-if="!!output"
    placeholder="MD5"
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
