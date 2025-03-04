<script setup lang="ts">
import { ref } from 'vue';
import { JSEncrypt } from 'jsencrypt';

const pubkey = ref('');
const input = ref('');
const output = ref('');

/* 加密 */
const onEncrypt = () => {
  output.value = '加密中...';

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubkey.value);
  const uncrypted = encrypt.encrypt(input.value);

  if (!uncrypted) {
    output.value = '加密失败';
    return;
  }
  output.value = uncrypted as string;
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
    placeholder="明文"
  />
  <div class="button-warp">
    <ConfirmButton
      text="加密"
      :disable="input==='' || pubkey===''"
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

</style>
