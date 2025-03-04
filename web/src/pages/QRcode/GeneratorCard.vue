<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import qrcode from 'qrcode';
import { Utils } from '@/utils';

const input = ref('');

// 默认生成公众号的二维码
onMounted(() => {
  input.value = 'http://weixin.qq.com/r/U3VtdR3En0DgrVkW9yBB';
});

// 监听输入，生成二维码
watch(input, Utils.debounce((text: string) => {
  if (!text) {
    return;
  }
  const canvas = document.getElementById('canvas');
  if (!canvas) {
    return;
  }

  qrcode.toCanvas(canvas, text);
}, 300));
</script>

<template>
  <div class="qrcode-warp">
    <TextInput v-model:text.lazy="input" />
    <div
      v-show="!!input"
      class="qrcode"
    >
      <canvas id="canvas" />
    </div>
  </div>
</template>

<style scoped>
.qrcode-warp{
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
}
@media screen and (max-width: 800px) {
  .qrcode-warp{
    flex-direction: column;
  }
}
.qrcode{
  margin: 8px;
  background: #fff;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
</style>
