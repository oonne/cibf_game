<script setup lang="ts">
import { ref } from 'vue';
import CryptoJS from 'crypto-js';
import type { SelectOption, Formatter } from '@/types/type';

const input = ref('');
const salt = ref('');
const iterations = ref(1);
const output = ref('');

// 秘钥长度
const sizeSelectOptions: SelectOption[] = [
  {
    value: 128 / 32,
    name: '128',
  },
  {
    value: 256 / 32,
    name: '256',
  },
  {
    value: 512 / 32,
    name: '512',
  },
];
const size = ref(256 / 32);

// 输出格式
const outputFormatterSelectOptions: SelectOption[] = [
  {
    value: 'Base64',
    name: 'Base64',
  },
  {
    value: 'Hex',
    name: 'Hex',
  },
];
const outputFormatter = ref('Hex');

/* 计算 */
const onCalc = () => {
  const iterationsTimes = Math.ceil(iterations.value);
  const key = CryptoJS.PBKDF2(input.value, salt.value, {
    keySize: size.value,
    iterations: iterationsTimes,
  });

  output.value = key.toString(CryptoJS.enc[outputFormatter.value as Formatter]);
};
</script>

<template>
  <div class="input-warp">
    <TextInput
      v-model:text.lazy="input"
      text-area-class="min-height-6"
      placeholder="口令"
    />
    <TextInput
      v-model:text.lazy="salt"
      text-area-class="min-height-6"
      placeholder="盐"
    />
  </div>
  <div class="button-warp">
    <ValueInput
      v-model:value="iterations"
      input-class="center width-40"
      type="number"
      label="迭代次数"
    />
    <SelectInput
      v-model:selected="size"
      label="模式"
      :options="sizeSelectOptions"
    />
    <SelectInput
      v-model:selected="outputFormatter"
      label="输出"
      :options="outputFormatterSelectOptions"
    />
    <ConfirmButton
      text="计算"
      :disable="input==='' || salt==='' || iterations<=0"
      @click="onCalc"
    />
  </div>
  <TextInput
    v-if="!!output"
    placeholder="秘钥"
    :text="output"
    readonly
  />
</template>

<style scoped>
.input-warp{
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
}

.button-warp{
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 680px) {
  .button-warp{
    flex-direction: column;
    align-items: end;
  }
}

</style>
