<template>
  <div class="header-wrap">
    <h1 class="title">
      耀你好看·点亮深圳
    </h1>
    <h2 class="sub-title">
      第⼗七届深圳国际电池技术交流会/展览会
    </h2>
  </div>

  <!-- 转盘 -->
  <LuckyWheel
    :draw-count="drawCount"
    :can-draw="drawCount > 0"
    @prize-drawn="handlePrizeDrawn"
    @draw="decreaseDrawCount"
  />

  <!-- 抽奖次数 -->
  <DrawCount
    :count="drawCount"
    :has-played-game="hasPlayedGame"
    :has-shared="hasShared"
    :has-browsed="hasBrowsed"
    :lottery-times="lotteryTimes"
    @increase-count="increaseDrawCount"
  />

  <!-- 中奖记录 -->
  <PrizeHistory :prizes="prizeHistory" />

  <!-- 活动说明 -->
  <ActivityInfo />

  <!-- 中奖提示 -->
  <ModalPopup
    :show="showResult"
    :title="currentPrize.isWin ? '恭喜您' : '感谢参与'"
    :content="currentPrize.isWin ? `获得了 ${currentPrize.name}` : ''"
    @confirm="closeResult"
  />

  <!-- 错误提示 -->
  <ModalPopup
    :show="showError"
    :title="errorTitle"
    :content="errorContent"
    @confirm="closeError"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Prize } from '@/constant/prizes';
import ModalPopup from '@/components/modal-popup.vue';
import { userApi } from '@/api/index';
import { Utils, to } from '@/utils/index';
import LuckyWheel from './components/lucky-wheel.vue';
import DrawCount from './components/draw-count.vue';
import ActivityInfo from './components/activity-info.vue';
import PrizeHistory from './components/prize-history.vue';

const { randomChars, getUrlParams } = Utils;

/*
 * 错误提示
 */
const showError = ref(false);
const errorTitle = ref('');
const errorContent = ref('');

// 关闭错误提示
const closeError = () => {
  showError.value = false;
};

/*
 * 抽奖
 */
// 抽奖次数
const drawCount = ref(0);

// 记录中奖记录列表
const prizeHistory = ref<Prize[]>([]);
// 是否显示结果
const showResult = ref(false);
// 当前中奖奖品
const currentPrize = ref<Prize>({
  id: 0,
  name: '',
  isWin: false,
});

// 关闭结果弹窗
const closeResult = () => {
  showResult.value = false;
};

// 减少抽奖次数
const decreaseDrawCount = () => {
  if (drawCount.value > 0) {
    drawCount.value -= 1;
  }
};

// 增加抽奖次数
const increaseDrawCount = () => {
  drawCount.value += 1;
};

// 处理抽奖完成事件
const handlePrizeDrawn = (result: Prize) => {
  currentPrize.value = result;
  showResult.value = true;
  // 如果是中奖的奖品，添加到历史记录中
  if (result.isWin) {
    prizeHistory.value.push(result);
  }
};

/*
 * 初始化
 */
// 初始化UUID
const initUUID = () => {
  const uuid = localStorage.getItem('UUID');
  if (!uuid) {
    localStorage.setItem('UUID', `${randomChars(12)}-${randomChars(4)}`);
  }
};

const hasPlayedGame = ref(false);
const hasShared = ref(false);
const hasBrowsed = ref(false);
const lotteryTimes = ref(0);

/* 用户进入 */
const userEntry = async () => {
  const [err, res] = await to(userApi.userEntry({
    uuid: localStorage.getItem('UUID'),
    openid: getUrlParams('openid') || null,
  }));

  if (err) {
    console.error(err);
    errorTitle.value = '活动已结束';
    errorContent.value = '活动已结束，请下次再来参与';
    showError.value = true;
    return;
  }

  const {
    hasPlayedGame: played,
    hasShared: shared,
    hasBrowsed: browsed,
    lotteryTimes: times,
  } = res.data;

  hasPlayedGame.value = played;
  hasShared.value = shared;
  hasBrowsed.value = browsed;
  lotteryTimes.value = times;

  // 计算总抽奖次数
  let totalCount = 0;
  if (played) totalCount += 1;
  if (shared) totalCount += 1;
  if (browsed) totalCount += 1;
  drawCount.value = totalCount - times;
};

/* 进入页面 */
onMounted(() => {
  initUUID();
  userEntry();
});
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

.result-title.no-win {
  color: #666;
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
