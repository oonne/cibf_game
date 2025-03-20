<template>
  <div class="header-wrap">
    <h1 class="title">
      耀你好看·点亮深圳
    </h1>
    <h2 class="sub-title">
      第⼗七届深圳国际电池技术交流会/展览会
    </h2>
  </div>

  <div
    v-if="isGamePlaying"
    class="header-wrap"
  >
    <h1 class="title">
      倒计时：{{ countDown }}秒
    </h1>
  </div>

  <div class="jigsaw-wrap">
    <!-- 画布区域 -->
    <div class="canvas-grid">
      <div
        v-for="i in 15"
        :key="i"
        class="grid-cell"
      />
    </div>

    <!-- 开始游戏按钮 -->
    <div
      v-if="!isGamePlaying"
      class="start-game-btn"
      @click="startGame"
    >
      开始游戏
    </div>

    <!-- 拼图块 -->
    <div
      v-for="(piece, index) in pieces"
      :key="index"
      class="puzzle-piece"
      :class="{
        'puzzle-piece-active': piece.isDragging,
        'puzzle-piece-correct': piece.isCorrect,
        'puzzle-piece-returning': piece.isReturning,
      }"
      :style="{
        backgroundImage: `url(${piece.image})`,
        width: piece.width + 'vw',
        height: piece.height + 'vw',
        left: piece.currentX + 'vw',
        bottom: piece.currentY + 'vw'
      }"
      @touchstart="startDrag($event, piece)"
      @touchmove="onDrag($event, piece)"
      @touchend="endDrag($event, piece)"
      @touchcancel="endDrag($event, piece)"
      @mousedown="startDrag($event, piece)"
      @mousemove="onDrag($event, piece)"
      @mouseup="endDrag($event, piece)"
      @mouseleave="endDrag($event, piece)"
      @transitionend="onTransitionEnd(piece)"
    />
  </div>

  <!-- 结果弹窗 -->
  <div
    v-if="showResult"
    class="modal-mask"
  >
    <div
      class="modal-content"
      @click.stop
    >
      <h3 class="modal-title">
        {{ title }}
      </h3>
      <div class="modal-body">
        {{ content }}
      </div>
      <div class="modal-footer">
        <!-- 成功 -->
        <button
          v-if="isGameSuccess"
          class="modal-btn"
          @click="handleConfirm"
        >
          去抽奖
        </button>
        <!-- 失败 -->
        <button
          v-else
          class="modal-btn"
          @click="handleGameOver"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { userApi } from '@/api/index';
import { to } from '@/utils/index';
import { PuzzlePiece, piecesList } from './pieces-list';

const router = useRouter();
const pieces = ref<PuzzlePiece[]>(JSON.parse(JSON.stringify(piecesList)));

/*
 * 常量
 */
const SNAP_THRESHOLD = 20; // 吸附阈值(单位：vw)
const COUNT_DOWN = 10; // 倒计时(单位：秒)

/*
 * 游戏控制
 */
const vwSize = ref(1); // vw单位对应的像素值
const countDown = ref(COUNT_DOWN); // 倒计时
let timer: number | null = null; // 计时器
const isGamePlaying = ref(false); // 游戏是进行中
const isGameSuccess = ref(false); // 游戏是否通关

// 是否显示结果弹窗
const showResult = ref(false);

// 弹窗标题和内容
const title = ref('恭喜您');
const content = ref('获得了抽奖机会+1');

// 停止倒计时
const stopCountDown = () => {
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
};

/*
 * 结束游戏
 */
const endGame = async (isSuccess: boolean) => {
  stopCountDown();
  isGamePlaying.value = false;
  isGameSuccess.value = isSuccess;

  // 游戏失败
  if (!isSuccess) {
    title.value = '游戏失败';
    content.value = '请再接再厉';
    showResult.value = true;
    return;
  }

  // 游戏通关
  title.value = '通关啦！';
  content.value = '获得了抽奖机会+1';
  showResult.value = true;

  // 上报用户玩游戏
  const [err] = await to(userApi.gameReport({
    uuid: localStorage.getItem('UUID'),
  }));
  if (err) {
    title.value = '游戏异常';
    content.value = '服务器繁忙，请稍后重试';
  }
};

/* 开始倒计时 */
const startCountDown = () => {
  timer = window.setInterval(() => {
    if (countDown.value > 0) {
      countDown.value -= 1;
    } else {
      endGame(false);
    }
  }, 1000);
};

/*
 * 开始游戏
 */
const startGame = () => {
  isGamePlaying.value = true;
  countDown.value = COUNT_DOWN;
  // 重置拼图块位置
  pieces.value = JSON.parse(JSON.stringify(piecesList));
  startCountDown();
};

// 检查所有拼图块是否都在正确位置
const checkIsComplete = () => {
  const isComplete = pieces.value.every((piece) => piece.isCorrect);

  if (!isComplete) {
    return;
  }

  endGame(true);
};

/* 开始拖拽 */
const startDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  event.preventDefault();
  if (piece.isDragging || piece.isCorrect || piece.isReturning || !isGamePlaying.value) {
    return;
  }
  const pos = event instanceof MouseEvent ? event : event.touches[0];
  const { pageX, pageY } = pos;

  const updatedPiece = {
    ...piece, isDragging: true, isReturning: false, touchX: pageX, touchY: pageY,
  };
  Object.assign(piece, updatedPiece);
};

/* 拖拽中 */
const onDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  if (!piece.isDragging) {
    return;
  }
  event.preventDefault();

  // 获取当前拖拽点的位置
  const pos = event instanceof MouseEvent ? event : event.touches[0];
  const { pageX, pageY } = pos;

  // 计算移动的像素距离
  const deltaX = pageX - piece.touchX;
  const deltaY = pageY - piece.touchY;

  // 将当前位置从vw转为px，加上移动距离，再转回vw
  const currentXPx = piece.currentX * vwSize.value;
  const currentYPx = piece.currentY * vwSize.value;

  const updatedPiece = {
    ...piece,
    currentX: (currentXPx + deltaX) / vwSize.value,
    currentY: (currentYPx - deltaY) / vwSize.value,
    touchX: pageX,
    touchY: pageY,
  };

  Object.assign(piece, updatedPiece);
};

/*
 * 拖拽结束
 */
const endDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  if (!piece.isDragging) {
    return;
  }

  // 是否靠近正确位置
  let isCorrect = false;
  if (Math.abs(piece.currentX - piece.correctX) < SNAP_THRESHOLD
    && Math.abs(piece.currentY - piece.correctY) < SNAP_THRESHOLD) {
    isCorrect = true;
  }

  // 更新拼图块状态
  const updatedPiece = {
    ...piece,
    isDragging: false,
    isCorrect,
    isReturning: !isCorrect,
    currentX: isCorrect ? piece.correctX : piece.initialX,
    currentY: isCorrect ? piece.correctY : piece.initialY,
  };
  Object.assign(piece, updatedPiece);

  // 检查是否完成拼图
  checkIsComplete();
};

/* 动画结束后的处理 */
const onTransitionEnd = (piece: PuzzlePiece) => {
  if (piece.isReturning) {
    const updatedPiece = { ...piece, isReturning: false };
    Object.assign(piece, updatedPiece);
  }
};

/* 获取vw单位对应的像素值 */
const getVwSize = () => {
  vwSize.value = document.documentElement.clientWidth / 100;
};

/* 进入页面 */
onMounted(() => {
  getVwSize();
  window.addEventListener('resize', getVwSize);
});

/* 离开页面 */
onUnmounted(() => {
  stopCountDown();
  window.removeEventListener('resize', getVwSize);
});

/* 跳转到抽奖页面 */
const handleConfirm = () => {
  showResult.value = false;
  router.push({ name: 'lottery' });
};

// 处理游戏结束
const handleGameOver = () => {
  showResult.value = false;
  isGamePlaying.value = false;
};
</script>

<style scoped>
.header-wrap {
  padding: 20px 0;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.sub-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 400;
}

.jigsaw-wrap {
  /* 拼图块宽度 */
  --piece-width: 25vw;
  /* 画布垂直margin */
  --canvas-vertical-margin: 2vw;

  width: 100vw;
  height: 200vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
}

/*
 * 画布
 */
.canvas-grid {
  margin: calc(var(--canvas-vertical-margin) - 2px)
   calc((100vw - (3 * var(--piece-width)))/2 - 2px);
  width: calc(var(--piece-width) * 3);
  aspect-ratio: 3/5;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #333;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;
  position: relative;
  background: #f5f5f5;
}

.grid-cell {
  border: 1px dashed #999;
  background: rgba(0, 0, 0, 0.05);
}

/*
 * 拼图块
 */
.puzzle-piece {
  width: 25vw;
  aspect-ratio: 1;
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: move;
  touch-action: none;
  user-select: none;
  z-index: 10;
  transform: scale(0.5);
  transition: scale 0.3s;
}

.puzzle-piece-active {
  transform: scale(1.05);
  z-index: 100;
}

.puzzle-piece-correct {
  transition: all 0.3s;
  transform: scale(1);
}

.puzzle-piece-returning {
  transition: all 0.3s;
}

/* 弹窗样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 80%;
  max-width: 300px;
  padding: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
}

.modal-body {
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: #666;
}

.modal-footer {
  text-align: center;
}

.modal-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.modal-btn:active {
  opacity: 0.8;
}

.start-game-btn {
  position: absolute;
  top: calc(var(--piece-width) * 5 / 2 + var(--canvas-vertical-margin));
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--primary-color);
  color: #fff;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s;
}

.start-game-btn:active {
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(0.95);
}
</style>
