<template>
  <div class="redeem-container">
    <h1 class="prize-name">
      {{ prizeName }}
    </h1>
    <div
      ref="qrCodeRef"
      class="qr-code"
    />
    <p class="redeem-instructions">
      请在2024年4月30日内到深圳会展中心4号馆的A12展位兑奖
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import qrcode from 'qrcode';

const route = useRoute();
const prizeName = ref(route.query.name as string || '未知奖品');
const redeemCode = ref(route.query.code as string || '');
const qrCodeRef = ref<HTMLElement>();

onMounted(async () => {
  if (qrCodeRef.value) {
    try {
      const qrCodeUrl = await qrcode.toDataURL(redeemCode.value);
      const img = document.createElement('img');
      img.src = qrCodeUrl;
      qrCodeRef.value.appendChild(img);
    } catch (err) {
      console.error('生成二维码失败:', err);
    }
  }
});
</script>

<style scoped>
.redeem-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.prize-name {
  font-size: 24px;
  margin-bottom: 30px;
}

.qr-code {
  margin: 20px 0;
}

.qr-code img {
  max-width: 200px;
  height: auto;
}

.redeem-instructions {
  margin-top: 20px;
  color: #666;
  font-size: 16px;
}
</style>
