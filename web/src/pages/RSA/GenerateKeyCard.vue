<script setup lang="ts">
import { ref } from 'vue';
import type { SelectOption } from '@/types/type';

/* 下拉框配置 */
const keyUsagesSelectOptions: SelectOption[] = [
  {
    value: 'encrypt',
    name: '加密/解密',
  },
  {
    value: 'sign',
    name: '签名/校验',
  },
];
const keyLenSelectOptions: SelectOption[] = [
  {
    value: 512,
    name: '512位',
  },
  {
    value: 1024,
    name: '1024位',
  },
  {
    value: 2048,
    name: '2048位',
    selected: true,
  },
  {
    value: 4096,
    name: '4096位',
  },
];

// 下拉框
const keyLen = ref(2048);
const keyUsages = ref('encrypt');

/*
 * 加密/解密 使用 RSA-OAEP
 * 签名/校验 使用 RSA-PSS
 */
type KeyUsage = 'encrypt' | 'sign' | 'decrypt' | 'deriveBits' | 'deriveKey' | 'unwrapKey' | 'verify' | 'wrapKey';
interface KeyOption {
  name: string;
  keyUsages: KeyUsage[];
}
interface KeyOptions {
  [propName: string]: KeyOption;
}
const keyOptions: KeyOptions = {
  encrypt: {
    name: 'RSA-OAEP',
    keyUsages: ['encrypt', 'decrypt'],
  },
  sign: {
    name: 'RSA-PSS',
    keyUsages: ['sign', 'verify'],
  },
};

/* 生成秘钥 */
const publicKey = ref('');
const privateKey = ref('');
// 输出秘钥
type KeyType = 'PRIVATE' | 'PUBLIC';
const RSA2text = (buffer: ArrayBuffer, type: KeyType): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = window.btoa(binary);
  let text = `-----BEGIN ${type} KEY-----\n`;
  // eslint-disable-next-line no-control-regex
  text += base64.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{64}\x01?/g, '$&\n');
  text += `\n-----END ${type} KEY-----`;

  return text;
};
// 生成秘钥
const generate = async () => {
  publicKey.value = '公钥生成中...';
  privateKey.value = '私钥生成中...';

  const len = keyLen.value;
  const { name, keyUsages: usages } = keyOptions[keyUsages.value];

  // 生成秘钥对
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name,
      modulusLength: len,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: 'SHA-512' },
    },
    true,
    usages,
  );

  // 输出公钥，使用 skpi
  const publicBuffer = await window.crypto.subtle.exportKey(
    'spki',
    keyPair.publicKey,
  );
  publicKey.value = RSA2text(publicBuffer, 'PUBLIC');

  // 输出私钥，使用 pkcs8
  const privateBuffer = await window.crypto.subtle.exportKey(
    'pkcs8',
    keyPair.privateKey,
  );
  privateKey.value = RSA2text(privateBuffer, 'PRIVATE');
};

</script>

<template>
  <div class="button-warp">
    <SelectInput
      v-model:selected="keyUsages"
      label="用途"
      :options="keyUsagesSelectOptions"
    />
    <SelectInput
      v-model:selected="keyLen"
      label="长度"
      :options="keyLenSelectOptions"
    />
    <ConfirmButton
      text="生成"
      @click="generate"
    />
  </div>
  <TextInput
    v-if="!!publicKey"
    :text="publicKey"
    readonly
  />
  <TextInput
    v-if="!!privateKey"
    :text="privateKey"
    readonly
  />
</template>

<style scoped>
.button-warp{
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 480px) {
  .button-warp{
    flex-direction: column;
    align-items: end;
  }
}
</style>
