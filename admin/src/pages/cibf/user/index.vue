<template>
  <div class="app-view-header">
    <div />

    <div class="app-view-header-sum">
      总计: {{ pagination.total }}
    </div>
  </div>

  <!-- 表格 -->
  <a-table
    :data-source="dataList"
    :columns="columns"
    :loading="loading"
    row-key="id"
    :row-class-name="rowClassName"
    :pagination="pagination"
    @resize-column="onResizeColumn"
    @change="changeTable"
  >
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        column
      }"
    >
      <div class="table-filter-dropdown">
        <!-- 搜索 -->
        <template
          v-if="column.key === 'openId'
            || column.key === 'phone'
            || column.key === 'winningPrizeName'
            || column.key === 'gameTimes'
            || column.key === 'lotteryTimes'
          "
        >
          <a-input-search
            :value="selectedKeys[0]"
            size="small"
            allow-clear
            @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @search="confirm"
          />
        </template>

        <!-- 时间 -->
        <template v-if="column.key === 'createdAt' || column.key === 'lastVisitTime'">
          <a-range-picker
            :value="selectedKeys[0]"
            size="small"
            allow-clear
            :presets="rangePresets"
            @change="(e: any) => {
              setSelectedKeys(e ? [e] : []);
              confirm();
            }"
          />
        </template>
      </div>
    </template>

    <!-- 显示当前的搜索条件 -->
    <template #headerCell="{ column }">
      <template v-if="column.key === 'openId' && filters.openId">
        openId({{ filters.openId[0] }})
      </template>
      <template v-if="column.key === 'phone' && filters.phone">
        手机号({{ filters.phone[0] }})
      </template>
      <template v-if="column.key === 'createdAt' && filters.createdAt">
        首次访问时间({{ filters.createdAt[0].map(
          (item: any) => dayjs(item).format('YYYY-MM-DD'),
        ).join(' ~ ') }})
      </template>
      <template v-if="column.key === 'lastVisitTime' && filters.lastVisitTime">
        最近访问时间({{ filters.lastVisitTime[0].map(
          (item: any) => dayjs(item).format('YYYY-MM-DD'),
        ).join(' ~ ') }})
      </template>
      <template v-if="column.key === 'gameTimes' && filters.gameTimes">
        已玩游戏次数({{ filters.gameTimes[0] }})
      </template>
      <template v-if="column.key === 'hasPlayedGame' && filters.hasPlayedGame">
        是否已通关游戏({{ filters.hasPlayedGame[0] === true ? '是' : '否' }})
      </template>
      <template v-if="column.key === 'hasShared' && filters.hasShared">
        是否已分享({{ filters.hasShared[0] === true ? '是' : '否' }})
      </template>
      <template v-if="column.key === 'hasBrowsed' && filters.hasBrowsed">
        是否已浏览({{ filters.hasBrowsed[0] === true ? '是' : '否' }})
      </template>
      <template v-if="column.key === 'lotteryTimes' && filters.lotteryTimes">
        已抽奖次数({{ filters.lotteryTimes[0] }})
      </template>
      <template v-if="column.key === 'winningPrizeName' && filters.winningPrizeName">
        已中奖品名({{ filters.winningPrizeName[0] }})
      </template>
      <template v-if="column.key === 'hasRedeemed' && filters.hasRedeemed">
        是否已兑奖({{ filters.hasRedeemed[0] === true ? '是' : '否' }})
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- UUID -->
      <template v-if="column.key === 'uuid'">
        {{ record.uuid || '-' }}
      </template>

      <!-- openId -->
      <template v-if="column.key === 'openId'">
        {{ record.openId || '-' }}
      </template>

      <!-- 手机号 -->
      <template v-if="column.key === 'phone'">
        {{ record.phone || '-' }}
      </template>

      <!-- 首次访问时间 -->
      <template v-if="column.key === 'createdAt'">
        {{ dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss') || '-' }}
      </template>

      <!-- 最近访问时间 -->
      <template v-if="column.key === 'lastVisitTime'">
        {{ dayjs(record.lastVisitTime).format('YYYY-MM-DD HH:mm:ss') || '-' }}
      </template>

      <!-- 已玩游戏次数 -->
      <template v-if="column.key === 'gameTimes'">
        {{ record.gameTimes || 0 }}
      </template>

      <!-- 是否通关游戏 -->
      <template v-if="column.key === 'hasPlayedGame'">
        {{ record.hasPlayedGame ? '是' : '否' }}
      </template>

      <!-- 是否已分享 -->
      <template v-if="column.key === 'hasShared'">
        {{ record.hasShared ? '是' : '否' }}
      </template>

      <!-- 是否已浏览 -->
      <template v-if="column.key === 'hasBrowsed'">
        {{ record.hasBrowsed ? '是' : '否' }}
      </template>

      <!-- 已抽奖次数 -->
      <template v-if="column.key === 'lotteryTimes'">
        {{ record.lotteryTimes || 0 }}
      </template>

      <!-- 已中奖品名 -->
      <template v-if="column.key === 'winningPrizeName'">
        <a-button
          v-if="record.redeemCodeId"
          type="link"
          @click="router.push({
            name: 'cibf-redeem-detail',
            query: { redeemCodeId: record.redeemCodeId },
          })"
        >
          {{ record.winningPrizeName }}
        </a-button>
      </template>

      <!-- 是否已兑奖 -->
      <template v-if="column.key === 'hasRedeemed'">
        {{ record.hasRedeemed ? '是' : '否' }}
      </template>

      <!-- 操作 -->
      <template v-if="column.key === 'operation'">
        <a-button
          size="small"
          type="link"
          @click="router.push({ name: 'cibf-user-detail', query: { userId: record.userId } })"
        >
          详情
        </a-button>
        <a-button
          size="small"
          type="link"
          @click="router.push({ name: 'cibf-edit-user', query: { userId: record.userId } })"
        >
          编辑
        </a-button>
        <a-button
          v-if="[1, 2].includes(staffInfo.role || 0)"
          size="small"
          type="link"
          danger
          @click="onDelete(record)"
        >
          删除
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message, TableColumnsType } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import useTable from '@/hooks/use-table';
import { userApi } from '@/api/index';
import { useStaffStore } from '@/store/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import type { IUser } from '@/types/user';

const { confirmModal } = Feedback;
const router = useRouter();
const staffStore = useStaffStore();
const { staffInfo } = storeToRefs(staffStore);
/*
 * 列表项
 */
const columns = ref<TableColumnsType>([
  {
    title: '#',
    key: 'index',
    width: 50,
  },
  {
    title: 'UUID',
    key: 'uuid',
    sorter: true,
    resizable: true,
    width: 150,
  },
  {
    title: 'openId',
    key: 'openId',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '手机号',
    key: 'phone',
    customFilterDropdown: true,
    sorter: true,
    resizable: true,
    width: 150,
  },
  {
    title: '首次访问时间',
    key: 'createdAt',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '最近访问时间',
    key: 'lastVisitTime',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '已玩游戏次数',
    key: 'gameTimes',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '是否已通关游戏',
    key: 'hasPlayedGame',
    sorter: true,
    filters: [
      {
        text: '是',
        value: true,
      },
      {
        text: '否',
        value: false,
      },
    ],
    resizable: true,
    width: 150,
  },
  {
    title: '是否已分享',
    key: 'hasShared',
    sorter: true,
    filters: [
      {
        text: '是',
        value: true,
      },
      {
        text: '否',
        value: false,
      },
    ],
    resizable: true,
    width: 150,
  },
  {
    title: '是否已浏览',
    key: 'hasBrowsed',
    sorter: true,
    filters: [
      {
        text: '是',
        value: true,
      },
      {
        text: '否',
        value: false,
      },
    ],
    resizable: true,
    width: 150,
  },
  {
    title: '已抽奖次数',
    key: 'lotteryTimes',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '已中奖品名',
    key: 'winningPrizeName',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '是否已兑奖',
    key: 'hasRedeemed',
    sorter: true,
    filters: [
      {
        text: '是',
        value: true,
      },
      {
        text: '否',
        value: false,
      },
    ],
    resizable: true,
    width: 150,
  }, {
    title: '操作',
    key: 'operation',
    resizable: true,
    width: 150,
  },
]);

/*
 * 列表
 */
const dataList = ref<IUser[]>([]);
const {
  loading,
  setGetDataFunction,
  pagination,
  filters,
  sorter,
  changeTable,
  onResizeColumn,
  rowClassName,
  rangePresets,
} = useTable();

/*
 * 获取数据
 */
const getList = async () => {
  loading.value = true;
  const params: any = {
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  if (filters.value.openId) {
    [params.openId] = filters.value.openId;
  }
  if (filters.value.phone) {
    [params.phone] = filters.value.phone;
  }
  if (filters.value.createdAt) {
    params.createdAt = filters.value.createdAt[0].map(
      (item: any) => dayjs(item).valueOf(),
    ).join(',');
  }
  if (filters.value.lastVisitTime) {
    params.lastVisitTime = filters.value.lastVisitTime[0].map(
      (item: any) => dayjs(item).valueOf(),
    ).join(',');
  }
  if (filters.value.gameTimes) {
    [params.gameTimes] = filters.value.gameTimes;
  }
  if (filters.value.hasPlayedGame) {
    [params.hasPlayedGame] = filters.value.hasPlayedGame;
  }
  if (filters.value.hasShared) {
    [params.hasShared] = filters.value.hasShared;
  }
  if (filters.value.hasBrowsed) {
    [params.hasBrowsed] = filters.value.hasBrowsed;
  }
  if (filters.value.lotteryTimes) {
    [params.lotteryTimes] = filters.value.lotteryTimes;
  }
  if (filters.value.winningPrizeName) {
    [params.winningPrizeName] = filters.value.winningPrizeName;
  }
  if (filters.value.hasRedeemed) {
    [params.hasRedeemed] = filters.value.hasRedeemed;
  }
  if (sorter.value.columnKey) {
    params.sortField = sorter.value.columnKey;
    params.sortOrder = sorter.value.order === 'ascend' ? 'asc' : 'desc';
  }

  const [err, res] = await to(userApi.getList(params));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }

  dataList.value = res.data.list;
  pagination.value.total = res.data.total;
  pagination.value.current = res.data.pageNo;
};
setGetDataFunction(getList);

/*
 * 进入页面
 */
onMounted(() => {
  getList();
});

/*
 * 删除
 */
const onDelete = async (record: IUser) => {
  const confirm = await confirmModal({
    title: '删除',
    content: `确定删除用户 ${record.uuid} 吗？`,
  });

  if (!confirm) {
    return;
  }

  const [err] = await to(userApi.deleteUser({ userId: record.userId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '删除失败' }));
    return;
  }

  message.success('删除成功');
  getList();
};
</script>

<style scoped></style>
