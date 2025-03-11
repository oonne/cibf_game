<template>
  <div class="header-wrap">
    <h1 class="title">
      耀你好看·点亮深圳
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

    <!-- 拼图块 -->
    <div
      v-for="(piece, index) in pieces"
      :key="index"
      class="puzzle-piece"
      :class="{ 'puzzle-piece-active': piece.isDragging, 'puzzle-piece-correct': piece.isCorrect }"
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { PuzzlePiece, piecesList } from './pieces-list';

const pieces = ref<PuzzlePiece[]>(piecesList);

/*
 * 拼图块
 */
const SNAP_THRESHOLD = 10; // 吸附阈值(单位：vw)
const vwSize = ref(1); // vw单位对应的像素值

/* 开始拖拽 */
const startDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  event.preventDefault();
  if (piece.isDragging || piece.isCorrect || piece.isReturning) {
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
};

/*
 * 动画结束后的处理
 */
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
  window.removeEventListener('resize', getVwSize);
});
</script>

<style scoped>
.header-wrap {
  padding: 20px 0;
}

.title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
}

.jigsaw-wrap {
  width: 100vw;
  height: 240vw;
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
  margin: calc(5vw - 2px);
  width: 90vw;
  height: 150vw;
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
  width: 30vw;
  aspect-ratio: 1;
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: move;
  touch-action: none;
  user-select: none;
  z-index: 10;
  transform: scale(0.6);
  transition: all 0.3s;
}

.puzzle-piece-active {
  transform: scale(1.1);
  z-index: 100;
}

.puzzle-piece-correct {
  transform: scale(1);
}
</style>
