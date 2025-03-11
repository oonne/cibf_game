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

export interface PuzzlePiece {
  id: string;
  image: string;
  width: number; // 宽度（单位：vw）
  height: number; // 高度（单位：vw）
  initialX: number; // 初始x坐标（单位：vw）
  initialY: number; // 初始y坐标（单位：vw）
  currentX: number; // 当前x坐标（单位：vw）
  currentY: number; // 当前y坐标（单位：vw）
  correctX: number; // 正确x坐标（单位：vw）
  correctY: number; // 正确y坐标（单位：vw）
  touchX: number; // 开始拖拽时触摸的x坐标（单位：px）
  touchY: number; // 开始拖拽时触摸的y坐标（单位：px）
  isDragging: boolean; // 是否正在拖拽
  isReturning: boolean; // 是否正在返回
  isCorrect: boolean; // 是否正确
}

// 每个格子的宽度
const piecesWidth = 27;
// 拼图块突出的长度
const piecesOverlap = 36.31;
// jigsaw-wrap的高度
const jigsawWrapHeight = 240;

// 拼图块列表
export const piecesList: PuzzlePiece[] = [
  {
    id: '1_1',
    image: block11,
    width: piecesOverlap,
    height: piecesWidth,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 4,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '1_2',
    image: block12,
    width: piecesOverlap,
    height: piecesWidth,
    initialX: 0,
    currentX: 0,
    currentY: 0,
    initialY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 4,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '1_3',
    image: block13,
    width: piecesWidth,
    height: piecesWidth,
    initialX: 0,
    currentX: 0,
    currentY: 0,
    initialY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth * 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 4,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '2_1',
    image: block21,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    currentX: 0,
    currentY: 0,
    initialY: 0,
    correctX: (100 - piecesWidth * 3) / 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 3,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '2_2',
    image: block22,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    currentX: 0,
    currentY: 0,
    initialY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 3,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '2_3',
    image: block23,
    width: piecesWidth,
    height: piecesOverlap,
    initialX: 0,
    currentX: 0,
    currentY: 0,
    initialY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth * 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 3,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '3_1',
    image: block31,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 2,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '3_2',
    image: block32,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    currentX: 0,
    currentY: 0,
    initialY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 2,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '3_3',
    image: block33,
    width: piecesWidth,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth * 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth * 2,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '4_1',
    image: block41,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '4_2',
    image: block42,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '4_3',
    image: block43,
    width: piecesWidth,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth * 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5 + piecesWidth,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '5_1',
    image: block51,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '5_2',
    image: block52,
    width: piecesOverlap,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
  {
    id: '5_3',
    image: block53,
    width: piecesWidth,
    height: piecesOverlap,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    correctX: (100 - piecesWidth * 3) / 2 + piecesWidth * 2,
    correctY: jigsawWrapHeight - (100 - piecesWidth * 3) / 2 - piecesWidth * 5,
    touchX: 0,
    touchY: 0,
    isDragging: false,
    isReturning: false,
    isCorrect: false,
  },
];
