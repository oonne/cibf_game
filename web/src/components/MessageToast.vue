<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Utils } from '../utils/index';

defineProps<{
  text: string;
}>();

const show = ref(false);

onMounted(async () => {
  show.value = true;
  await Utils.sleep(1500);
  show.value = false;
});

</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="toast"
    >
      {{ text }}
    </div>
  </transition>
</template>

<style scoped>
.toast{
  position: fixed;
  top: 5rem;
  left: 50%;
  padding: 4px 16px;
  transform: translateX(-50%);
  background: #000;
  opacity: 0.7;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: all .25s ease;
}

.fade-enter-from, .fade-leave-to {
  top: 4rem;
  opacity: 0;
}
</style>
