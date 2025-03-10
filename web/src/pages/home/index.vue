<template>
  <div class="lucky-wheel-container">
    <LuckyWheel @prize-drawn="handlePrizeDrawn" />
    
    <!-- 可以在这里添加其他内容，例如抽奖历史记录等 -->
    <div v-if="lastPrize" class="prize-history">
      <h3>上次抽中的奖品</h3>
      <p>{{ lastPrize }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LuckyWheel from './components/lucky-wheel.vue';

// 记录上次抽中的奖品
const lastPrize = ref('');

// 处理抽奖完成事件
const handlePrizeDrawn = (result: { prize: string, prizeIndex: number }) => {
  console.log('抽奖完成，获得奖品：', result.prize, '索引：', result.prizeIndex);
  lastPrize.value = result.prize;
  
  // 这里可以添加其他逻辑，例如记录抽奖历史、发送请求到服务器等
};
</script>

<style scoped>
.lucky-wheel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.prize-history {
  margin-top: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.prize-history h3 {
  color: #E91E63;
  margin-bottom: 10px;
}
</style>
