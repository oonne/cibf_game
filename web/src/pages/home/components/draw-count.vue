<template>
  <div class="draw-count">
    <h3>抽奖次数</h3>
    <div class="count-info">
      我的抽奖次数：{{ count }}次
    </div>
    <div class="action-buttons">
      <button
        class="action-btn"
        :class="{ disabled: hasPlayedGame }"
        @click="handlePlayGame"
      >
        玩游戏获取抽奖次数
      </button>
      <button
        class="action-btn"
        :class="{ disabled: hasShared }"
        @click="handleShare"
      >
        分享获取抽奖次数
      </button>
      <button
        class="action-btn"
        :class="{ disabled: hasShared }"
        @click="handleView"
      >
        浏览小程序获取抽奖次数
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 接收父组件传递的抽奖次数
const props = defineProps<{
  count: number,
  hasPlayedGame: boolean,
  hasShared: boolean,
  hasBrowsed: boolean,
  lotteryTimes: number
}>();

const emit = defineEmits(['increase-count']);

// 处理玩游戏按钮点击
const handlePlayGame = () => {
  if (!props.hasPlayedGame) {
    router.push({ name: 'jigsaw' });
  }
};

// 处理分享按钮点击
const handleShare = () => {
  if (!props.hasShared) {
    emit('increase-count');
  }
};

// 处理浏览小程序按钮点击
const handleView = () => {
  if (!props.hasBrowsed) {
    emit('increase-count');
  }
};
</script>

<style scoped>
.draw-count {
  margin: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.draw-count h3 {
  color: #E91E63;
  margin-bottom: 10px;
}

.count-info {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
}

.action-btn {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #E91E63;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover:not(.disabled) {
  background-color: #C2185B;
}

.action-btn.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
