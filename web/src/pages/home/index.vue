<template>
  <div class="home-wrap">
    <!-- 转盘 -->
    <div class="wheel-wrap">
      <LuckyWheel @prize-drawn="handlePrizeDrawn" />
    </div>

    <!-- 抽奖次数 -->
    <DrawCount />

    <!-- 中奖结果 -->
    <PrizeHistory :prize="lastPrize" />

    <!-- 活动说明 -->
    <ActivityInfo />
  </div>

  <!-- 中奖提示 -->
  <div v-if="showResult" class="result-modal">
    <div class="result-content">
      <div class="result-title">
        恭喜您
      </div>
      <div class="result-prize">
        获得了 {{ currentPrize }}
      </div>
      <div class="result-btn" @click="closeResult">
        确定
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LuckyWheel from './components/lucky-wheel.vue';
import DrawCount from './components/draw-count.vue';
import ActivityInfo from './components/activity-info.vue';
import PrizeHistory from './components/prize-history.vue';
import { Prize } from '@/constant/prizes';

// 记录上次抽中的奖品
const lastPrize = ref('');
// 是否显示结果
const showResult = ref(false);
// 当前中奖奖品
const currentPrize = ref('');

// 关闭结果弹窗
const closeResult = () => {
  showResult.value = false;
};

// 处理抽奖完成事件
const handlePrizeDrawn = (result: Prize) => {
  console.log('抽奖完成，获得奖品：', result.name);
  currentPrize.value = result.name;
  showResult.value = true;
  lastPrize.value = result.name;
};
</script>

<style scoped>
.wheel-wrap {
  padding: 100px 40px;
}

/* 结果弹窗 */
.result-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.result-content {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: popup 0.5s ease;
}

.result-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #E91E63;
}

.result-prize {
  font-size: 20px;
  margin-bottom: 20px;
}

.result-btn {
  background-color: #E91E63;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s;
}

.result-btn:hover {
  background-color: #C2185B;
}

@keyframes popup {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
