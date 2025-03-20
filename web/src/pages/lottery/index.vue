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
  />

  <!-- 抽奖次数 -->
  <DrawCount
    :count="drawCount"
    :has-played-game="hasPlayedGame"
    :has-shared="hasShared"
    :has-browsed="hasBrowsed"
    :lottery-times="lotteryTimes"
  />

  <!-- 中奖记录 -->
  <PrizeHistory
    :prizes="prizeHistory"
    :phone="phone"
  />

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
import ModalPopup from '@/components/modal-popup.vue';
import { userApi } from '@/api/index';
import { Utils, to } from '@/utils/index';
import LuckyWheel from './components/lucky-wheel.vue';
import DrawCount from './components/draw-count.vue';
import ActivityInfo from './components/activity-info.vue';
import PrizeHistory from './components/prize-history.vue';

const { initUUID, getUrlParams } = Utils;

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
const prizeHistory = ref<any[]>([]);
// 是否显示结果
const showResult = ref(false);
// 当前中奖奖品
const currentPrize = ref({
  id: 0,
  name: '',
  isWin: false,
  winningPrizeName: '',
  redeemCode: '',
  hasRedeemed: false,
});

// 关闭结果弹窗
const closeResult = () => {
  showResult.value = false;
};

// 处理抽奖完成事件
const handlePrizeDrawn = (result: any) => {
  if (drawCount.value > 0) {
    drawCount.value -= 1;
  }

  currentPrize.value = result;
  showResult.value = true;
  // 如果是中奖的奖品，添加到历史记录中
  if (result.isWin) {
    prizeHistory.value.push(result);
  }
};

/*
 * 用户数据
 */
const hasPlayedGame = ref(false);
const hasShared = ref(false);
const hasBrowsed = ref(false);
const lotteryTimes = ref(0);
const phone = ref('');

/* 用户进入 */
const userEntry = async () => {
  const [err, res] = await to(userApi.userEntry({
    uuid: localStorage.getItem('UUID'),
    openId: getUrlParams('openid') || null,
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
    winningPrizeName,
    redeemCode,
    hasRedeemed,
  } = res.data;

  hasPlayedGame.value = played;
  hasShared.value = shared;
  hasBrowsed.value = browsed;
  lotteryTimes.value = times;
  phone.value = res.data.phone;

  // 计算总抽奖次数
  let totalCount = 0;
  if (played) totalCount += 1;
  if (shared) totalCount += 1;
  if (browsed) totalCount += 1;
  drawCount.value = totalCount - times;
  if (drawCount.value < 0) {
    drawCount.value = 0;
  }

  // 已中奖的奖品
  if (redeemCode) {
    prizeHistory.value.push({
      winningPrizeName,
      redeemCode,
      hasRedeemed,
    });
  }
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
  color: var(--primary-color);
}

.result-title.no-win {
  color: #666;
}

.result-prize {
  font-size: 20px;
  margin-bottom: 20px;
}

.result-btn {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s;
}

.result-btn:hover {
  background-color: var(--secondary-color);
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
