<template>
  <Loading
    v-if="loading"
    class="app-detail-loading"
  />

  <a-descriptions
    v-else
    bordered
  >
    <a-descriptions-item
      label="类型"
      :span="3"
    >
      哈哈哈
    </a-descriptions-item>
    <a-descriptions-item label="删除时间">
      {{ dayjs(detail.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
    </a-descriptions-item>
    <a-descriptions-item label="操作者">
      {{ detail.deleteStaffName }}
    </a-descriptions-item>
    <a-descriptions-item label="操作者ID">
      {{ detail.deleteStaffId }}
    </a-descriptions-item>

    <a-descriptions-item label="内容">
      <TextContent :content="detail.content" />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { userApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import Loading from '@/components/loading/index.vue';
import TextContent from '@/components/text-content/index';
import type { IUser } from '@/types/user';

const route = useRoute();

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
