<script setup lang="ts">
import { ref } from 'vue';
import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';
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
const privkey = ref('');
const input = ref('');
const output = ref('');

/* 签名 */
const onSign = () => {
  output.value = '签名中...';

  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(privkey.value);
  const sign = encrypt.sign(
    input.value,
    CryptoJS[hashMethod.value as RSAHashMethod] as unknown as RSAHashFun,
    hashMethod.value,
  );

  if (!sign) {
    output.value = '签名失败';
    return;
  }
  output.value = sign as string;
};

</script>

<template>
  <TextInput
    v-model:text.lazy="privkey"
    text-area-class="min-height-10"
    placeholder="私钥"
  />
  <TextInput
    v-model:text.lazy="input"
    placeholder="内容"
  />
  <div class="button-warp">
    <SelectInput
      v-model:selected="hashMethod"
      label="哈希算法"
      :options="hashSelectOptions"
    />
    <ConfirmButton
      text="签名"
      :disable="input==='' || privkey===''"
      @click="onSign"
    />
  </div>
  <TextInput
    v-if="!!output"
    placeholder="签名"
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
