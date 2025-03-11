<template>
  <div
    v-if="show"
    class="modal-popup"
  >
    <div class="popup-content">
      <div class="popup-title">
        {{ title }}
      </div>
      <div class="popup-body">
        {{ content }}
      </div>
      <div
        class="popup-btn"
        @click="handleConfirm"
      >
        确定
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title: string;
  content: string;
}>();

const emit = defineEmits(['confirm']);

const handleConfirm = () => {
  emit('confirm');
};
</script>

<style scoped>
.modal-popup {
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

.popup-content {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: popup 0.5s ease;
}

.popup-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #E91E63;
}

.popup-body {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.popup-btn {
  background-color: #E91E63;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s;
}

.popup-btn:hover {
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
