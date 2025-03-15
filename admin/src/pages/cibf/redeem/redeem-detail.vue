<template>
  <Loading
    v-if="loading"
    class="app-detail-loading"
  />

  <a-descriptions
    v-else
    bordered
  >
    <a-descriptions-item label="奖品类型">
      {{ getPrizeTypeText(detail.prizeType) }}
    </a-descriptions-item>
    <a-descriptions-item
      label="兑换码"
      :span="2"
    >
      <a-flex
        align="center"
        gap="small"
      >
        {{ detail.redeemCode }}
        <Icon
          v-if="detail.redeemCode"
          icon="copy"
          class="copy-icon"
          @click="copyText(detail.redeemCode)"
        />
      </a-flex>
    </a-descriptions-item>

    <a-descriptions-item label="是否已发放">
      {{ detail.isIssued ? '是' : '否' }}
    </a-descriptions-item>
    <a-descriptions-item label="发放时间">
      {{ detail.issuedTime ? dayjs(detail.issuedTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
    </a-descriptions-item>
    <a-descriptions-item label="发放用户手机号">
      <a-flex
        align="center"
        gap="small"
      >
        <a-button
          v-if="detail.issuedUserId"
          type="link"
          @click="router.push({
            name: 'cibf-user-detail',
            query: { userId: detail.issuedUserId },
          })"
        >
          {{ detail.issuedUserPhone || '-' }}
        </a-button>
        <Icon
          v-if="detail.issuedUserPhone"
          icon="copy"
          class="copy-icon"
          @click="copyText(detail.issuedUserPhone)"
        />
      </a-flex>
    </a-descriptions-item>

    <a-descriptions-item label="是否已兑换">
      {{ detail.isRedeemed ? '是' : '否' }}
    </a-descriptions-item>
    <a-descriptions-item
      label="兑换时间"
      :span="2"
    >
      {{ detail.redeemedTime ? dayjs(detail.redeemedTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { redeemApi } from '@/api/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import Icon from '@/components/icon-svg/index.vue';
import Loading from '@/components/loading/index.vue';
import type { IRedeem } from '@/types/redeem';
import { getPrizeTypeText } from './redeem-utils';

const route = useRoute();
const router = useRouter();
const { copyText } = Feedback;

const detail = ref<IRedeem>({
  redeemCodeId: '',
  redeemCode: '',
  prizeType: undefined,
  isIssued: false,
  issuedTime: undefined,
  issuedUserId: '',
  issuedUserPhone: '',
  isRedeemed: false,
  redeemedTime: undefined,
});
const loading = ref(false);

/* 查询详情 */
const getDetail = async () => {
  if (!route.query.redeemCodeId) {
    return;
  }

  loading.value = true;
  const [err, res] = await to(redeemApi.getDetail({ redeemCodeId: route.query.redeemCodeId }));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }

  detail.value = res.data;
};

/* 进入页面 */
onMounted(async () => {
  getDetail();
});
</script>

<style scoped></style>
