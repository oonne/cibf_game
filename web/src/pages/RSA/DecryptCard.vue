<script setup lang="ts">
import { ref } from 'vue';
import { JSEncrypt } from 'jsencrypt';

const privkey = ref('');
const input = ref('');
const output = ref('');

/* 解密 */
const onDecrypt = () => {
  output.value = '解密中...';

  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(privkey.value);
  const uncrypted = encrypt.decrypt(input.value);

  if (!uncrypted) {
    output.value = '解密失败';
    return;
  }
  output.value = uncrypted as string;
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
    placeholder="密文"
  />
  <div class="button-warp">
    <ConfirmButton
      text="解密"
      :disable="input==='' || privkey===''"
      @click="onDecrypt"
    />
  </div>
  <TextInput
    v-if="!!output"
    placeholder="明文"
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
