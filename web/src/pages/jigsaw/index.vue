<template>
  <h1>耀你好看·点亮深圳</h1>
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
        left: piece.currentX + 'vw',
        bottom: piece.currentY + 'vw'
      }"
      @touchstart="startDrag($event, piece)"
      @touchmove="onDrag($event, piece)"
      @touchend="endDrag($event, piece)"
      @mousedown="startDrag($event, piece)"
      @mousemove="onDrag($event, piece)"
      @mouseup="endDrag($event, piece)"
      @transitionend="onTransitionEnd(piece)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PuzzlePiece, piecesList } from './pieces-list';

const pieces = ref<PuzzlePiece[]>(piecesList);

/*
 *拼图块
 */
const SNAP_THRESHOLD = 30; // 吸附阈值

/* 开始拖拽 */
const startDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  event.preventDefault();
  const updatedPiece = { ...piece, isDragging: true, isReturning: false };
  // const pos = event instanceof MouseEvent ? event : event.touches[0];
  // const rect = (event.target as HTMLElement).getBoundingClientRect();

  // // 更新拖拽偏移量的计算
  // updatedPiece.dragOffsetX = pos.clientX - rect.left;
  // updatedPiece.dragOffsetY = pos.clientY - rect.top - window.scrollY;

  Object.assign(piece, updatedPiece);
};

/* 拖拽中 */
const onDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  if (!piece.isDragging) return;
  event.preventDefault();
  // const pos = event instanceof MouseEvent ? event : event.touches[0];
  // const piecesArea = document.querySelector('.pieces-area');
  // if (!piecesArea) return;

  // const piecesAreaRect = piecesArea.getBoundingClientRect();
  const updatedPiece = { ...piece };

  Object.assign(piece, updatedPiece);
};

/*
 * 拖拽结束
 */
const endDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  if (!piece.isDragging) return;
  const updatedPiece = { ...piece, isDragging: false };

  // 检查是否在正确位置附近
  const canvasRect = document.querySelector('.canvas-grid')?.getBoundingClientRect();
  if (canvasRect) {
    const pieceRect = (event.target as HTMLElement).getBoundingClientRect();
    const relativeX = pieceRect.left - canvasRect.left;
    const relativeY = pieceRect.top - canvasRect.top;

    // 检查是否接近正确位置
    if (Math.abs(relativeX - piece.correctX) < SNAP_THRESHOLD
      && Math.abs(relativeY - piece.correctY) < SNAP_THRESHOLD) {
      // 吸附到正确位置
      updatedPiece.currentX = piece.correctX + canvasRect.left;
      updatedPiece.currentY = piece.correctY + canvasRect.top;
    } else {
      // 如果没有吸附到正确位置，添加返回初始位置的动画
      updatedPiece.isReturning = true;
      updatedPiece.currentX = piece.initialX;
      updatedPiece.currentY = piece.initialY;
    }
  }
  Object.assign(piece, updatedPiece);
};

// 动画结束后的处理
const onTransitionEnd = (piece: PuzzlePiece) => {
  if (piece.isReturning) {
    const updatedPiece = { ...piece, isReturning: false };
    Object.assign(piece, updatedPiece);
  }
};
</script>

<style scoped>
.jigsaw-wrap {
  width: 100vw;
  height: 200vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  position: relative;
  overflow-x: hidden;
}

/*
 * 画布
 */
.canvas-grid {
  margin: 5vw;
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
  transform: scale(0.5);
  transition: all 0.3s;
}

.puzzle-piece-active {
  transform: scale(1.1);
}

.puzzle-piece-correct {
  transform: scale(1);
}
</style>
