<template>
  <!-- 转盘 -->
  <div class="wheel-container">
    <div
      class="wheel"
      :style="{ transform: `rotate(${rotation}deg)` }"
      :class="{ 'rotating': isRotating }"
    >
      <!-- 使用指定的转盘图片 -->
      <img
        src="../img/disk.png"
        alt="转盘"
        class="wheel-img"
      >
    </div>
    <!-- 指针 -->
    <div class="pointer" />
    <!-- 开始按钮 -->
    <div
      class="start-btn"
      :class="{ 'disabled': isRotating || !canDraw }"
      @click="startRotate"
    >
      <span>{{ isRotating ? '抽奖中' : (canDraw ? '开始' : '次数不足') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import prizes from '@/constant/prizes';

// 定义组件事件
const emit = defineEmits(['prize-drawn', 'draw']);

// 定义props
const props = defineProps<{
  drawCount?: number;
  canDraw?: boolean;
}>();

// 转盘旋转角度
const rotation = ref(0);
// 是否正在旋转
const isRotating = ref(false);

// 奖品数量
const prizeCount = prizes.length;
// 每个奖品区域的角度
const anglePerPrize = 360 / prizeCount;

// 开始旋转
const startRotate = async () => {
  if (isRotating.value) return;
  if (!props.canDraw) return;

  // 通知父组件减少抽奖次数
  emit('draw');

  isRotating.value = true;

  // 随机选择一个奖品索引 (0 到 prizeCount-1)
  const prizeIndex = Math.floor(Math.random() * prizeCount);

  // 获取当前旋转角度（可能已经旋转了多次）
  const currentRotation = rotation.value;

  // 计算目标角度：在当前角度基础上至少旋转2圈以上
  const minRotation = 720; // 最小旋转两圈

  // 计算奖品的绝对角度位置
  // 注意：图片旋转0度时已经位于第一个奖品的正中间
  // 由于CSS transform rotate是顺时针旋转，所以需要用360度减去目标角度
  const prizeAngle = 360 - (prizeIndex * anglePerPrize);

  // 计算需要旋转的角度
  // 使用模运算(% 360)确定当前角度在一圈内的位置，然后计算到目标奖品位置需要旋转的角度
  const currentPositionInWheel = currentRotation % 360;
  const angleToTarget = (prizeAngle - currentPositionInWheel + 360) % 360;

  // 设置新的旋转角度：当前角度 + 最小旋转圈数 + 到目标位置的角度
  const targetAngle = currentRotation + minRotation + angleToTarget;

  // 设置新的旋转角度
  rotation.value = targetAngle;

  // 旋转结束后触发中奖事件
  setTimeout(() => {
    isRotating.value = false;
    // 通知父组件抽奖已完成，返回完整的奖品对象
    emit('prize-drawn', prizes[prizeIndex]);
  }, 5000); // 旋转动画持续5秒
};
</script>

<style scoped>
.wheel-container {
  position: relative;
  width: 80vw;
  height: 80vw;
  margin: auto;
}

.wheel {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 5s cubic-bezier(0.25, 0.1, 0.25, 1);
  border-radius: 50%;
  overflow: hidden;
}

.wheel-img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}

.pointer {
  position: absolute;
  top: 25vw;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid #E91E63;
  z-index: 10;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
}

.start-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background-color: #E91E63;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 20;
  border: 4px solid white;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background-color: #C2185B;
  transform: translate(-50%, -50%) scale(1.05);
}

.start-btn.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.rotating {
  pointer-events: none;
}
</style>
