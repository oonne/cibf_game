<template>
  <div
    v-if="prizes.length > 0"
    class="prize-history"
  >
    <h3>中奖记录</h3>
    <div class="history-content">
      <div
        v-for="prize in prizes"
        :key="prize.id"
        class="prize-item"
        @click="handlePrizeClick(prize)"
      >
        {{ prize.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Prize } from '@/constant/prizes';

const router = useRouter();

defineProps<{
  prizes: Prize[]
}>();

const handlePrizeClick = (prize: Prize) => {
  router.push({
    name: 'redeem',
    query: {
      id: prize.id,
      name: prize.name,
    },
  });
};
</script>

<style scoped>
.prize-history {
  margin: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.prize-history h3 {
  color: #E91E63;
  margin-bottom: 15px;
  text-align: center;
}

.history-content {
  color: #666;
  font-size: 14px;
}

.prize-item {
  margin: 10px 0;
  line-height: 1.5;
  padding: 5px 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>
