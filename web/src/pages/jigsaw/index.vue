<template>
  <div class="jigsaw-game">
    <!-- 画布区域 -->
    <div class="canvas-area">
      <div class="canvas-grid">
        <div
          v-for="i in 15"
          :key="i"
          class="grid-cell"
          :data-position="getPosition(i)"
        />
      </div>
    </div>

    <!-- 拼图块区域 -->
    <div class="pieces-area">
      <div
        v-for="(piece, index) in pieces"
        :key="index"
        class="puzzle-piece"
        :style="{
          backgroundImage: `url(${piece.image})`,
          left: piece.currentX + 'px',
          top: piece.currentY + 'px'
        }"
        @touchstart="startDrag($event, piece)"
        @touchmove="onDrag($event, piece)"
        @touchend="endDrag($event, piece)"
        @mousedown="startDrag($event, piece)"
        @mousemove="onDrag($event, piece)"
        @mouseup="endDrag($event, piece)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import block11 from './block/1_1.png';
import block12 from './block/1_2.png';
import block13 from './block/1_3.png';
import block21 from './block/2_1.png';
import block22 from './block/2_2.png';
import block23 from './block/2_3.png';
import block31 from './block/3_1.png';
import block32 from './block/3_2.png';
import block33 from './block/3_3.png';
import block41 from './block/4_1.png';
import block42 from './block/4_2.png';
import block43 from './block/4_3.png';
import block51 from './block/5_1.png';
import block52 from './block/5_2.png';
import block53 from './block/5_3.png';

interface PuzzlePiece {
  id: string;
  image: string;
  correctX: number;
  correctY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
}

// 初始化拼图块数据
const pieces = ref<PuzzlePiece[]>([]);
const GRID_SIZE = ref(0); // 格子大小，将在mounted时计算
const SNAP_THRESHOLD = 30; // 吸附阈值

// 获取位置标识
const getPosition = (index: number) => {
  const row = Math.floor((index - 1) / 3) + 1;
  const col = ((index - 1) % 3) + 1;
  return `${row}_${col}`;
};

// 初始化拼图块
const initPieces = () => {
  const piecesData: PuzzlePiece[] = [];
  const blockImages = {
    '1_1': block11,
    '1_2': block12,
    '1_3': block13,
    '2_1': block21,
    '2_2': block22,
    '2_3': block23,
    '3_1': block31,
    '3_2': block32,
    '3_3': block33,
    '4_1': block41,
    '4_2': block42,
    '4_3': block43,
    '5_1': block51,
    '5_2': block52,
    '5_3': block53,
  };

  for (let row = 1; row <= 5; row += 1) {
    for (let col = 1; col <= 3; col += 1) {
      const id = `${row}_${col}`;
      const piece: PuzzlePiece = {
        id,
        image: blockImages[id as keyof typeof blockImages],
        correctX: (col - 1) * GRID_SIZE.value,
        correctY: (row - 1) * GRID_SIZE.value,
        currentX: Math.random() * (window.innerWidth - GRID_SIZE.value),
        currentY: window.innerHeight - GRID_SIZE.value - Math.random() * 200,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
      };
      piecesData.push(piece);
    }
  }
  pieces.value = piecesData;
};

// 拖拽相关函数
const startDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  const updatedPiece = { ...piece, isDragging: true };
  const pos = event instanceof MouseEvent ? event : event.touches[0];
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  updatedPiece.dragOffsetX = pos.clientX - rect.left;
  updatedPiece.dragOffsetY = pos.clientY - rect.top;
  Object.assign(piece, updatedPiece);
};

const onDrag = (event: MouseEvent | TouchEvent, piece: PuzzlePiece) => {
  if (!piece.isDragging) return;
  event.preventDefault();
  const pos = event instanceof MouseEvent ? event : event.touches[0];
  const updatedPiece = { ...piece };
  updatedPiece.currentX = pos.clientX - piece.dragOffsetX;
  updatedPiece.currentY = pos.clientY - piece.dragOffsetY;
  Object.assign(piece, updatedPiece);
};

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
    }
  }
  Object.assign(piece, updatedPiece);
};

onMounted(() => {
  // 计算格子大小
  const canvasWidth = document.querySelector('.canvas-grid')?.clientWidth || 300;
  GRID_SIZE.value = canvasWidth / 3; // 3列
  initPieces();
});
</script>

<style scoped>
.jigsaw-game {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.canvas-area {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.canvas-grid {
  width: 90vw;
  max-width: 400px;
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

.pieces-area {
  width: 100%;
  position: relative;
  margin-top: auto;
  background: rgba(0, 0, 0, 0.1);
}

.puzzle-piece {
  width: calc(90vw / 3);
  max-width: calc(400px / 3);
  aspect-ratio: 1;
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: move;
  touch-action: none;
  user-select: none;
  transition: transform 0.1s;
}

.puzzle-piece:active {
  transform: scale(1.05);
  z-index: 100;
}

@media (max-width: 768px) {
  .canvas-grid {
    width: 95vw;
  }

  .puzzle-piece {
    width: calc(95vw / 3);
  }
}
</style>
