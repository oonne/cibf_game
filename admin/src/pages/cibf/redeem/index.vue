<template>
  <div class="app-view-header">
    <a-space>
      <a-button
        type="primary"
      >
        兑奖
      </a-button>
      <a-button
        @click="router.push({
          name: 'cibf-batch-generate',
        })"
      >
        批量生成
      </a-button>
      <a-button
        v-if="[1, 2].includes(staffInfo.role || 0)"
        danger
        @click="router.push({
          name: 'cibf-batch-delete',
        })"
      >
        批量删除
      </a-button>
    </a-space>

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
          v-if="column.key === 'redeemCode' || column.key === 'issuedUserPhone'
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
        <template v-if="column.key === 'issuedTime' || column.key === 'redeemedTime'">
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
      <template v-if="column.key === 'redeemCode' && filters.redeemCode">
        兑奖码({{ filters.redeemCode[0] }})
      </template>
      <template v-if="column.key === 'prizeType' && filters.prizeType">
        奖品({{ getPrizeTypeText(filters.prizeType[0]) }})
      </template>
      <template v-if="column.key === 'isIssued' && filters.isIssued">
        是否已发放({{ filters.isIssued[0] === true ? '是' : '否' }})
      </template>
      <template v-if="column.key === 'issuedTime' && filters.issuedTime">
        发放时间({{ filters.issuedTime[0].map(
          (item: any) => dayjs(item).format('YYYY-MM-DD'),
        ).join(' ~ ') }})
      </template>
      <template v-if="column.key === 'issuedUserPhone' && filters.issuedUserPhone">
        发放用户手机号({{ filters.issuedUserPhone[0] }})
      </template>
      <template v-if="column.key === 'isRedeemed' && filters.isRedeemed">
        是否已兑换({{ filters.isRedeemed[0] === true ? '是' : '否' }})
      </template>
      <template v-if="column.key === 'redeemedTime' && filters.redeemedTime">
        兑换时间({{ filters.redeemedTime[0].map(
          (item: any) => dayjs(item).format('YYYY-MM-DD'),
        ).join(' ~ ') }})
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- 兑奖码 -->
      <template v-if="column.key === 'redeemCode'">
        {{ record.redeemCode || '-' }}
      </template>

      <!-- 奖品 -->
      <template v-if="column.key === 'prizeType'">
        {{ getPrizeTypeText(record.prizeType) || '-' }}
      </template>

      <!-- 是否已发放 -->
      <template v-if="column.key === 'isIssued'">
        {{ record.isIssued ? '是' : '否' }}
      </template>

      <!-- 发放时间 -->
      <template v-if="column.key === 'issuedTime'">
        {{ record.issuedTime ? dayjs(record.issuedTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
      </template>

      <!-- 发放用户手机号 -->
      <template v-if="column.key === 'issuedUserPhone'">
        <a-button
          v-if="record.issuedUserId"
          type="link"
          @click="router.push({
            name: 'cibf-user-detail',
            query: { userId: record.issuedUserId },
          })"
        >
          {{ record.issuedUserPhone || '-' }}
        </a-button>
      </template>

      <!-- 是否已兑换 -->
      <template v-if="column.key === 'isRedeemed'">
        {{ record.isRedeemed ? '是' : '否' }}
      </template>

      <!-- 兑换时间 -->
      <template v-if="column.key === 'redeemedTime'">
        {{ record.redeemedTime ? dayjs(record.redeemedTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
      </template>

      <!-- 操作 -->
      <template v-if="column.key === 'operation'">
        <a-button
          size="small"
          type="link"
          @click="router.push({
            name: 'cibf-redeem-detail',
            query: {
              redeemCodeId: record.redeemCodeId,
            },
          })"
        >
          详情
        </a-button>
        <a-button
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
import { redeemApi } from '@/api/index';
import { useStaffStore } from '@/store/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import type { IRedeem } from '@/types/redeem';
import { getPrizeTypeText, getPrizeTypeFilters } from './redeem-utils';

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
    title: '兑奖码',
    key: 'redeemCode',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '奖品',
    key: 'prizeType',
    sorter: true,
    filters: getPrizeTypeFilters(),
    resizable: true,
    width: 150,
  },
  {
    title: '是否已发放',
    key: 'isIssued',
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
    title: '发放时间',
    key: 'issuedTime',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '发放用户手机号',
    key: 'issuedUserPhone',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '是否已兑换',
    key: 'isRedeemed',
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
    title: '兑换时间',
    key: 'redeemedTime',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    resizable: true,
    width: 150,
  },
]);

/*
 * 列表
 */
const dataList = ref<IRedeem[]>([]);
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
  if (filters.value.redeemCode) {
    [params.redeemCode] = filters.value.redeemCode;
  }
  if (filters.value.prizeType?.length > 0) {
    [params.prizeType] = filters.value.prizeType;
  }
  if (filters.value.isIssued) {
    [params.isIssued] = filters.value.isIssued;
  }
  if (filters.value.issuedTime) {
    params.issuedTime = filters.value.issuedTime[0].map(
      (item: any) => dayjs(item).valueOf(),
    ).join(',');
  }
  if (filters.value.issuedUserPhone) {
    [params.issuedUserPhone] = filters.value.issuedUserPhone;
  }
  if (filters.value.isRedeemed) {
    [params.isRedeemed] = filters.value.isRedeemed;
  }
  if (filters.value.redeemedTime) {
    params.redeemedTime = filters.value.redeemedTime[0].map(
      (item: any) => dayjs(item).valueOf(),
    ).join(',');
  }
  if (sorter.value.columnKey) {
    params.sortField = sorter.value.columnKey;
    params.sortOrder = sorter.value.order === 'ascend' ? 'asc' : 'desc';
  }

  const [err, res] = await to(redeemApi.getList(params));
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
const onDelete = async (record: IRedeem) => {
  const confirm = await confirmModal({
    title: '删除',
    content: `确定删除兑奖码 ${getPrizeTypeText(record.prizeType)}(${record.redeemCode}) 吗？`,
  });

  if (!confirm) {
    return;
  }

  const [err] = await to(redeemApi.deleteRedeem({ redeemId: record.id as number }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '删除失败' }));
    return;
  }

  message.success('删除成功');
  getList();
};
</script>

<style scoped></style>
