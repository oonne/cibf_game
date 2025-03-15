<template>
  <Loading
    v-if="loading"
    class="app-detail-loading"
  />

  <a-descriptions
    v-else
    bordered
  >
    <a-descriptions-item label="UUID">
      <a-flex
        align="center"
        gap="small"
      >
        {{ detail.uuid }}
        <Icon
          v-if="detail.uuid"
          icon="copy"
          class="copy-icon"
          @click="copyText(detail.uuid)"
        />
      </a-flex>
    </a-descriptions-item>
    <a-descriptions-item label="openId">
      <a-flex
        align="center"
        gap="small"
      >
        {{ detail.openId }}
        <Icon
          v-if="detail.openId"
          icon="copy"
          class="copy-icon"
          @click="copyText(detail.openId)"
        />
      </a-flex>
    </a-descriptions-item>
    <a-descriptions-item label="手机号">
      <a-flex
        align="center"
        gap="small"
      >
        {{ detail.phone }}
        <Icon
          v-if="detail.phone"
          icon="copy"
          class="copy-icon"
          @click="copyText(detail.phone)"
        />
      </a-flex>
    </a-descriptions-item>

    <a-descriptions-item label="首次访问时间">
      {{ dayjs(detail.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
    </a-descriptions-item>
    <a-descriptions-item
      label="最后访问时间"
      :span="2"
    >
      {{ dayjs(detail.lastVisitTime).format('YYYY-MM-DD HH:mm:ss') }}
    </a-descriptions-item>

    <a-descriptions-item label="是否已玩过游戏">
      {{ detail.hasPlayedGame ? '是' : '否' }}
    </a-descriptions-item>
    <a-descriptions-item label="是否已分享">
      {{ detail.hasShared ? '是' : '否' }}
    </a-descriptions-item>
    <a-descriptions-item label="是否已浏览">
      {{ detail.hasBrowsed ? '是' : '否' }}
    </a-descriptions-item>

    <a-descriptions-item label="游戏时间">
      {{ detail.gameTime ? dayjs(detail.gameTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
    </a-descriptions-item>
    <a-descriptions-item label="分享时间">
      {{ detail.sharedTime ? dayjs(detail.sharedTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
    </a-descriptions-item>
    <a-descriptions-item label="浏览时间">
      {{ detail.browsedTime ? dayjs(detail.browsedTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
    </a-descriptions-item>

    <a-descriptions-item label="已抽奖次数">
      {{ detail.lotteryTimes }}
    </a-descriptions-item>
    <a-descriptions-item label="已中奖品名">
      {{ detail.winningPrizeName }}
    </a-descriptions-item>
    <a-descriptions-item label="中奖时间">
      {{ detail.winningTime ? dayjs(detail.winningTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
    </a-descriptions-item>

    <a-descriptions-item label="中奖兑换码">
      <a-button
        v-if="detail.redeemCodeId"
        type="link"
        @click="router.push({
          name: 'cibf-redeem-detail',
          query: { redeemCodeId: detail.redeemCodeId },
        })"
      >
        {{ detail.redeemCode }}
      </a-button>
    </a-descriptions-item>
    <a-descriptions-item
      label="是否已兑奖"
      :span="2"
    >
      {{ detail.hasRedeemed ? '是' : '否' }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { userApi } from '@/api/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import Icon from '@/components/icon-svg/index.vue';
import Loading from '@/components/loading/index.vue';
import type { IUser } from '@/types/user';

const route = useRoute();
const router = useRouter();
const { copyText } = Feedback;

const detail = ref<IUser>({
  uuid: '',
  openId: '',
  phone: '',
  hasPlayedGame: false,
  hasShared: false,
  hasBrowsed: false,
  lotteryTimes: 0,
  winningPrizeName: '',
  hasRedeemed: false,
});
const loading = ref(false);

/* 查询详情 */
const getDetail = async () => {
  if (!route.query.userId) {
    return;
  }

  loading.value = true;
  const [err, res] = await to(userApi.getDetail({ userId: route.query.userId }));
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
