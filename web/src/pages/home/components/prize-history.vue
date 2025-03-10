<template>
  <div
    v-if="prize"
    class="prize-history"
  >
    <h3>上次抽中的奖品</h3>
    <p>{{ prize }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  prize: string
}>();
</script>

<style scoped>
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
