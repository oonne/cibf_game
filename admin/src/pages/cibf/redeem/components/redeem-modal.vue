<template>
  <a-modal
    :open="visible"
    title="兑奖"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form
      :model="formData"
      layout="vertical"
    >
      <a-form-item
        label="兑换码"
        name="redeemCode"
        :rules="[{ required: true, message: '请输入兑换码' }]"
      >
        <a-input
          v-model:value="formData.redeemCode"
          placeholder="请输入兑换码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {
  ref, defineProps, defineEmits, watch,
} from 'vue';
import { message } from 'ant-design-vue';
import { redeemApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible', 'success']);

// 使用 ref 而不是 reactive
const loading = ref<boolean>(false);
const formData = ref({
  redeemCode: '',
});

// 重置表单
const resetForm = () => {
  formData.value.redeemCode = '';
};

// 监听 visible 变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    resetForm();
  }
});

// 取消操作
const handleCancel = () => {
  emit('update:visible', false);
};

// 提交兑奖
const handleSubmit = async () => {
  if (!formData.value.redeemCode) {
    message.warning('请输入兑换码');
    return;
  }

  loading.value = true;
  const [err] = await to(redeemApi.redeemCode({ redeemCode: formData.value.redeemCode }));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '兑奖失败' }));
    return;
  }

  message.success('兑奖成功');
  emit('update:visible', false);
  emit('success');
  resetForm();
};

// 暴露方法给父组件
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
