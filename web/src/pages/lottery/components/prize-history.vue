<template>
  <div
    v-if="prizes.length > 0"
    class="prize-history"
  >
    <h3>中奖记录</h3>
    <div class="history-content">
      <div
        v-for="prize in prizes"
        :key="prize.id"
        class="prize-item"
        @click="handlePrizeClick(prize)"
      >
        {{ prize.winningPrizeName }}
        <span
          v-if="prize.hasRedeemed"
          :style="{ color: '#f66' }"
        >(已兑奖)</span>
      </div>
    </div>
  </div>

  <!-- 手机号输入弹框 -->
  <div
    v-if="showPhoneModal"
    class="modal-popup"
  >
    <div class="popup-content">
      <div class="popup-title">
        请输入手机号
      </div>
      <div class="popup-body">
        <input
          v-model="phoneNumber"
          type="tel"
          maxlength="11"
          placeholder="请输入您的手机号"
          class="phone-input"
        >
        <div
          v-if="phoneError"
          class="error-message"
        >
          {{ phoneError }}
        </div>
      </div>
      <div class="popup-btn-group">
        <div
          class="popup-btn cancel-btn"
          @click="closePhoneModal"
        >
          取消
        </div>
        <div
          class="popup-btn"
          @click="submitPhone"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userApi } from '@/api/index';
import { to } from '@/utils/index';

const router = useRouter();

const props = defineProps<{
  prizes: any[]
  phone?: string
}>();

const currentPrize = ref<any>(null);

/* 跳转到兑奖码页面 */
const goRedeem = () => {
  // 跳转到兑奖码页面
  router.push({
    name: 'redeem',
    query: {
      name: currentPrize.value?.winningPrizeName,
      code: currentPrize.value?.redeemCode,
    },
  });
};

/*
 * 填写手机号弹框
 */
const showPhoneModal = ref(false);
const phoneNumber = ref('');
const phoneError = ref('');

// 关闭手机号输入弹框
const closePhoneModal = () => {
  showPhoneModal.value = false;
  phoneNumber.value = '';
  phoneError.value = '';
};

// 验证手机号
const validatePhone = (phone: string) => {
  if (!phone) {
    return '请输入手机号';
  }
  // if (!/^1[3-9]\d{9}$/.test(phone)) {
  //   return '请输入正确的手机号';
  // }
  return '';
};

// 提交手机号
const submitPhone = async () => {
  // 验证手机号
  const error = validatePhone(phoneNumber.value);
  if (error) {
    phoneError.value = error;
    return;
  }

  if (!currentPrize.value) {
    return;
  }

  // 提交手机号
  const [err] = await to(userApi.submitPhone({
    phone: phoneNumber.value,
    uuid: localStorage.getItem('UUID'),
  }));

  if (err) {
    phoneError.value = '提交失败，请重试';
    return;
  }

  // 关闭弹框
  closePhoneModal();

  // 跳转到兑奖码页面
  goRedeem();
};

/*
 * 点击奖品
 */
const handlePrizeClick = (prize: any) => {
  if (prize.hasRedeemed) {
    return;
  }
  // 保存当前奖品
  currentPrize.value = prize;
  if (!props.phone) {
    // 显示手机号输入弹框
    showPhoneModal.value = true;
  } else {
    // 跳转到兑奖码页面
    goRedeem();
  }
};
</script>

<style scoped>
.prize-history {
  margin: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.prize-history h3 {
  color: #E91E63;
  margin-bottom: 15px;
  text-align: center;
}

.history-content {
  color: #666;
  font-size: 14px;
}

.prize-item {
  margin: 10px 0;
  line-height: 1.5;
  padding: 5px 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

/* 手机号输入弹框样式 */
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
  width: 80%;
  max-width: 320px;
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

.phone-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.popup-btn-group {
  display: flex;
  justify-content: space-between;
}

.popup-btn {
  background-color: #E91E63;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s;
  flex: 1;
  margin: 0 5px;
}

.cancel-btn {
  background-color: #999;
}

.popup-btn:hover {
  background-color: #C2185B;
}

.cancel-btn:hover {
  background-color: #777;
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
