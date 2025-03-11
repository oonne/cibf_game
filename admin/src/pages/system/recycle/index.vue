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
        <template v-if="column.key === 'content' || column.key === 'deleteStaffName'">
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
      <template v-if="column.key === 'type' && filters.type">
        类型({{ filters.type[0] }})
      </template>
      <template v-if="column.key === 'content' && filters.content">
        内容({{ filters.content[0] }})
      </template>
      <template v-if="column.key === 'deleteStaffName' && filters.deleteStaffName">
        删除者({{ filters.deleteStaffName[0] }})
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- 类型 -->
      <template v-if="column.key === 'type'">
        <span v-if="record.type === 1">账号</span>
        <span v-if="record.type === 2">配置</span>
        <span v-if="record.type === 3">博客</span>
      </template>

      <!-- 内容 -->
      <template v-if="column.key === 'content'">
        <TextContent :content="record.content" />
      </template>

      <!-- 删除者 -->
      <template v-if="column.key === 'deleteStaffName'">
        {{ record.deleteStaffName || '-' }}
      </template>

      <!-- 删除时间 -->
      <template v-if="column.key === 'createdAt'">
        {{ dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss') || '-' }}
      </template>

      <!-- 操作 -->
      <template v-if="column.key === 'operation'">
        <a-button
          size="small"
          type="link"
          @click="router.push({ name: 'recycle-detail', query: { recycleId: record.recycleId } })"
        >
          详情
        </a-button>
        <!-- 删除 -->
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
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import useTable from '@/hooks/use-table';
import { recycleApi } from '@/api/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import TextContent from '@/components/text-content/index';
import type { IRecycle } from '@/types/recycle';

const router = useRouter();
const { confirmModal } = Feedback;

/*
 * 列表项
 */
const columns = ref<TableColumnsType>([
  {
    title: '#',
    key: 'index',
    width: 50,
    fixed: 'left',
  },
  {
    title: '类型',
    key: 'type',
    sorter: true,
    filters: [
      {
        text: '账号',
        value: 1,
      },
    ],
    resizable: true,
    width: 100,
  },
  {
    title: '内容',
    key: 'content',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 300,
  },
  {
    title: '删除者',
    key: 'deleteStaffName',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 100,
  },
  {
    title: '删除时间',
    key: 'createdAt',
    sorter: true,
    resizable: true,
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    resizable: true,
    width: 100,
    fixed: 'right',
  },
]);

/*
 * 列表
 */
const dataList = ref<IRecycle[]>([]);
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
  if (filters.value.content) {
    [params.content] = filters.value.content;
  }
  if (filters.value.deleteStaffName) {
    [params.deleteStaffName] = filters.value.deleteStaffName;
  }
  if (filters.value.type?.length > 0) {
    params.type = filters.value.type;
  }
  if (sorter.value.columnKey) {
    params.sortField = sorter.value.columnKey;
    params.sortOrder = sorter.value.order === 'ascend' ? 'asc' : 'desc';
  }

  const [err, res] = await to(recycleApi.getList(params));
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
const onDelete = async (record: IRecycle) => {
  const confirm = await confirmModal({
    title: '删除',
    content: '确定要永久删除该记录吗？',
  });

  if (!confirm) {
    return;
  }

  const [err] = await to(recycleApi.deleteRecycle({ recycleId: record.recycleId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '删除失败' }));
    return;
  }

  message.success('删除成功');
  getList();
};
</script>

<style scoped></style>
