<template>
  <div class="lucky-wheel-container">
    <div class="wheel-wrapper">
      <div class="wheel-container">
        <div 
          class="wheel" 
          :style="{ transform: `rotate(${rotation}deg)` }"
          :class="{ 'rotating': isRotating }"
        >
          <!-- 使用指定的转盘图片 -->
          <img src="./img/disk.png" alt="转盘" class="wheel-img" />
        </div>
        <!-- 指针 -->
        <div class="pointer"></div>
        <!-- 开始按钮 -->
        <div class="start-btn" @click="startRotate" :class="{ 'disabled': isRotating }">
          <span>{{ isRotating ? '旋转中' : '开始' }}</span>
        </div>
      </div>
    </div>
    
    <!-- 中奖提示 -->
    <div class="result-modal" v-if="showResult">
      <div class="result-content">
        <div class="result-title">恭喜您</div>
        <div class="result-prize">获得了 {{ currentPrize }}</div>
        <div class="result-btn" @click="closeResult">确定</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 转盘旋转角度
const rotation = ref(0);
// 是否正在旋转
const isRotating = ref(false);
// 是否显示结果
const showResult = ref(false);
// 当前中奖奖品
const currentPrize = ref('');

// 奖品列表
const prizes = [
  '耳机',
  'iPhone',
  '相机',
  '咖啡杯',
  '日历',
  '键盘'
];
// 奖品数量
const prizeCount = prizes.length;
// 每个奖品区域的角度
const anglePerPrize = 360 / prizeCount;

// 关闭结果弹窗
const closeResult = () => {
  showResult.value = false;
};

// 开始旋转
const startRotate = () => {
  if (isRotating.value) return;
  
  isRotating.value = true;
  
  // 随机选择一个奖品索引 (0 到 prizeCount-1)
  const prizeIndex = Math.floor(Math.random() * prizeCount);
  
  // 获取当前旋转角度（可能已经旋转了多次）
  const currentRotation = rotation.value;
  
  // 计算目标角度：在当前角度基础上至少旋转2圈以上
  const minRotation = 720; // 最小旋转两圈
  const randomExtra = Math.floor(Math.random() * 360); // 随机额外旋转0-360度
  
  // 计算奖品的绝对角度位置
  // 注意：图片旋转0度时已经位于第一个奖品的正中间
  // 由于CSS transform rotate是顺时针旋转，所以需要用360度减去目标角度
  const prizeAngle = 360 - (prizeIndex * anglePerPrize);
  
  // 计算需要旋转的角度
  // 使用模运算(% 360)确定当前角度在一圈内的位置，然后计算到目标奖品位置需要旋转的角度
  const currentPositionInWheel = currentRotation % 360;
  const angleToTarget = (prizeAngle - currentPositionInWheel + 360) % 360;
  
  // 设置新的旋转角度：当前角度 + 最小旋转圈数 + 随机额外角度 + 到目标位置的角度
  const targetAngle = currentRotation + minRotation + randomExtra + angleToTarget;
  
  // 设置新的旋转角度
  rotation.value = targetAngle;
  
  // 旋转结束后显示中奖结果
  setTimeout(() => {
    isRotating.value = false;
    currentPrize.value = prizes[prizeIndex];
    showResult.value = true;
  }, 5000); // 旋转动画持续5秒
};
</script>

<style scoped>
.lucky-wheel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.wheel-wrapper {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.wheel-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px;
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
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #E91E63;
  z-index: 20;
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
  z-index: 10;
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
