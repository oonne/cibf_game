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
        <template v-if="column.key === 'username'">
          <a-input-search
            :value="selectedKeys[0]"
            size="small"
            allow-clear
            @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @search="confirm"
          />
        </template>
      </div>
    </template>

    <!-- 显示当前的搜索条件 -->
    <template #headerCell="{ column }">
      <template v-if="column.key === 'username' && filters.username">
        用户名({{ filters.username[0] }})
      </template>
      <template v-if="column.key === 'isActive' && filters.isActive">
        是否启用({{ filters.isActive[0] === true ? '启用' : '禁用' }})
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- 用户名 -->
      <template v-if="column.key === 'username'">
        {{ record.username || '-' }}
      </template>

      <!-- 昵称 -->
      <template v-if="column.key === 'nickname'">
        {{ record.nickname || '-' }}
      </template>

      <!-- 手机号 -->
      <template v-if="column.key === 'phone'">
        {{ record.phone || '-' }}
      </template>

      <!-- 更新时间 -->
      <template v-if="column.key === 'updatedAt'">
        {{ dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss') || '-' }}
      </template>

      <!-- 操作 -->
      <template v-if="column.key === 'operation'">
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
import { ref, computed, onMounted } from 'vue';
import { message, TableColumnsType } from 'ant-design-vue';
import dayjs from 'dayjs';
import useTable from '@/hooks/use-table';
import { userApi } from '@/api/index';
import { useStaffStore } from '@/store/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import type { IUser } from '@/types/user';

const { confirmModal } = Feedback;
const staffStore = useStaffStore();

/*
 * 列表项
 */
const columns = computed<TableColumnsType>(() => {
  const baseColumns: TableColumnsType = [
    {
      title: '#',
      key: 'index',
      width: 50,
    },
  ];

  if ([1, 2].includes(staffStore.staffInfo.role || 0)) {
    baseColumns.push({
      title: '操作',
      key: 'operation',
      resizable: true,
      width: 150,
    });
  }

  return baseColumns;
});

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
  if (filters.value.username) {
    [params.username] = filters.value.username;
  }
  if (filters.value.isActive?.length === 1) {
    [params.isActive] = filters.value.isActive;
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

<style scoped>
.copy-icon {
  cursor: pointer;
  width: 16px;
  height: 16px;
  fill: #666;
}
</style>
