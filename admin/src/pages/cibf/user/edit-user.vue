<template>
  <div class="app-form">
    <a-form
      ref="formRef"
      :model="formData"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item
        name="phone"
        label="手机号"
      >
        <a-input v-model:value="formData.phone" />
      </a-form-item>

      <a-form-item label="是否已玩过游戏">
        <a-switch v-model:checked="formData.hasPlayedGame" />
      </a-form-item>

      <a-form-item label="是否已分享">
        <a-switch v-model:checked="formData.hasShared" />
      </a-form-item>

      <a-form-item label="是否已浏览">
        <a-switch v-model:checked="formData.hasBrowsed" />
      </a-form-item>

      <a-form-item
        label="已抽奖次数"
        name="lotteryTimes"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.lotteryTimes"
          :min="0"
          :max="3"
          :precision="0"
        />
      </a-form-item>

      <a-form-item
        label="已中奖品名"
      >
        <a-input
          v-model:value="formData.winningPrizeName"
          disabled
        />
      </a-form-item>

      <a-form-item label="中奖兑换码Id">
        <a-input
          v-model:value="formData.redeemCodeId"
          disabled
        />
      </a-form-item>

      <a-form-item label="中奖兑换码">
        <a-input
          v-model:value="formData.redeemCode"
          disabled
        />
      </a-form-item>

      <a-space>
        <a-button
          @click="onClearPrize"
        >
          清空奖品
        </a-button>
        <a-button
          type="primary"
          :loading="loading"
          @click="onSubmit"
        >
          保存
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { userApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import type { IUser } from '@/types/user';

const route = useRoute();
const router = useRouter();

/* 表单 */
const formRef = ref();
const formData = ref<IUser>({
  userId: '',
  phone: '',
  hasPlayedGame: false,
  hasShared: false,
  hasBrowsed: false,
  lotteryTimes: 0,
  winningPrizeName: '',
  redeemCodeId: '',
  redeemCode: '',
});

/* 查询详情 */
const getDetail = async () => {
  if (!route.query.userId) {
    message.error('用户ID不能为空');
    return;
  }

  const [err, res] = await to(userApi.getDetail({ userId: route.query.userId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }
  formData.value = res.data;
};

/* 进入页面 */
onMounted(async () => {
  getDetail();
});

/* 清空奖品 */
const onClearPrize = () => {
  formData.value.winningPrizeName = '';
  formData.value.redeemCodeId = '';
  formData.value.redeemCode = '';
};

/* 提交 */
const loading = ref(false);
const onSubmit = async () => {
  if (loading.value) {
    return;
  }

  const [validateErr] = await to(formRef.value?.validate());
  if (validateErr) {
    return;
  }

  const params = {
    ...formData.value,
  };

  loading.value = true;
  const [err] = await to(userApi.updateUser(params));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '提交失败' }));
    return;
  }

  message.success('提交成功');
  router.back();
};
</script>

<style scoped></style>
