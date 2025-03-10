<template>
  <div class="draw-count">
    <h3>抽奖次数</h3>
    <div class="count-info">
      剩余次数：{{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(3); // 默认次数，实际应该从props或store中获取

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
