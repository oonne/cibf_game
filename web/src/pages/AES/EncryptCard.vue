<script setup lang="ts">
import { ref } from 'vue';
import CryptoJS from 'crypto-js';
import type { SelectOption, AESMode, AESPadding } from '@/types/type';

const secret = ref('');
const iv = ref('');
const input = ref('');
const output = ref('');

// 分组密码工作模式
const modeSelectOptions: SelectOption[] = [
  {
    value: 'ECB',
    name: 'ECB',
  },
  {
    value: 'CBC',
    name: 'CBC',
  },
  {
    value: 'CFB',
    name: 'CFB',
  },
  {
    value: 'OFB',
    name: 'OFB',
  },
  {
    value: 'CTR',
    name: 'CTR',
  },
];
const mode = ref('CBC');

// 填充模式模式
const padSelectOptions: SelectOption[] = [
  {
    value: 'AnsiX923',
    name: 'AnsiX923',
  },
  {
    value: 'Iso10126',
    name: 'Iso10126',
  },
  {
    value: 'Iso97971',
    name: 'Iso97971',
  },
  {
    value: 'Pkcs7',
    name: 'Pkcs7',
  },
  {
    value: 'ZeroPadding',
    name: 'ZeroPadding',
  },
  {
    value: 'NoPadding',
    name: 'NoPadding',
  },
];
const pad = ref('Pkcs7');

/* 加密 */
const onEncrypt = () => {
  const encrypt = CryptoJS.AES.encrypt(input.value, CryptoJS.enc.Utf8.parse(secret.value), {
    iv: CryptoJS.enc.Utf8.parse(iv.value),
    mode: CryptoJS.mode[mode.value as AESMode],
    padding: CryptoJS.pad[pad.value as AESPadding],
  });

  output.value = encrypt.toString();
};

</script>

<template>
  <TextInput
    v-model:text.lazy="secret"
    text-area-class="min-height-6"
    placeholder="秘钥"
  />
  <TextInput
    v-show="mode!=='ECB'"
    v-model:text.lazy="iv"
    text-area-class="min-height-6"
    placeholder="初始化向量（IV）"
  />
  <TextInput
    v-model:text.lazy="input"
    placeholder="明文"
  />
  <div class="button-warp">
    <SelectInput
      v-model:selected="mode"
      label="模式"
      :options="modeSelectOptions"
    />
    <SelectInput
      v-model:selected="pad"
      label="填充"
      :options="padSelectOptions"
    />
    <ConfirmButton
      text="加密"
      :disable="secret==='' || input==='' || (mode!=='ECB' && iv==='')"
      @click="onEncrypt"
    />
  </div>
  <TextInput
    v-if="!!output"
    placeholder="密文"
    :text="output"
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
