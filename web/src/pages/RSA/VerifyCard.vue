<script setup lang="ts">
import { ref } from 'vue';
import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';
import message from '@/components/message';
import type { SelectOption, RSAHashFun, RSAHashMethod } from '@/types/type';

/* 哈希算法 */
const hashSelectOptions: SelectOption[] = [
  {
    value: 'MD5',
    name: 'MD5',
  },
  {
    value: 'SHA1',
    name: 'SHA1',
  },
  {
    value: 'SHA256',
    name: 'SHA256',
  },
  {
    value: 'SHA512',
    name: 'SHA512',
  },
  {
    value: 'RIPEMD160',
    name: 'ripemd160',
  },
];

const hashMethod = ref('SHA512');
const pubkey = ref('');
const input = ref('');
const output = ref('');
// 校验结果（以CSS className命名，用于显示样式）
const result = ref('');

/* 校验 */
const onVerify = () => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubkey.value);
  const verify = encrypt.verify(
    input.value,
    output.value,
    CryptoJS[hashMethod.value as RSAHashMethod] as unknown as RSAHashFun,
  );

  // 正确
  if (verify) {
    message('校验结果正确');
    result.value = 'success';
    return;
  }

  // 错误
  message('校验结果错误');
  result.value = 'failed';
};

</script>

<template>
  <TextInput
    v-model:text.lazy="pubkey"
    text-area-class="min-height-10"
    placeholder="公钥"
  />
  <TextInput
    v-model:text.lazy="input"
    :text-area-class="result"
    placeholder="内容"
  />
  <TextInput
    v-model:text.lazy="output"
    :text-area-class="result"
    placeholder="签名"
  />
  <div class="button-warp">
    <SelectInput
      v-model:selected="hashMethod"
      label="哈希算法"
      :options="hashSelectOptions"
    />
    <ConfirmButton
      text="校验"
      :disable="pubkey==='' || input==='' || output===''"
      @click="onVerify"
    />
  </div>
</template>

<style scoped>
.button-warp{
  display: flex;
  justify-content: flex-end;
}

</style>
