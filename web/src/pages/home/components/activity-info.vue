<template>
  <div class="activity-info">
    <h3>活动说明</h3>
    <div class="info-content">
      <p>1. 每位用户每天有3次抽奖机会</p>
      <p>2. 奖品将在7个工作日内发放</p>
      <p>3. 活动最终解释权归主办方所有</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.activity-info {
  margin: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.activity-info h3 {
  color: #E91E63;
  margin-bottom: 15px;
  text-align: center;
}

.info-content {
  color: #666;
  font-size: 14px;
}

.info-content p {
  margin: 10px 0;
  line-height: 1.5;
}
</style>
