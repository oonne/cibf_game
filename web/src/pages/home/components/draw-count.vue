<template>
  <div class="draw-count">
    <h3>抽奖次数</h3>
    <div class="count-info">
      我的抽奖次数：{{ count }}次
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 接收父组件传递的抽奖次数
defineProps<{
  count: number
}>();

</script>

<style scoped>
.draw-count {
  margin: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.draw-count h3 {
  color: #E91E63;
  margin-bottom: 10px;
}

.count-info {
  font-size: 18px;
  color: #333;
}
</style>
