<template>
  <div class="app-form">
    <a-form
      ref="formRef"
      :model="formData"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item
        label="奖品"
        name="奖品"
        :rules="[{ required: true }]"
      >
        <a-input
          v-model:value="formData.prizeType"
          placeholder="请输入奖品"
          :style="{ width: '240px' }"
        />
      </a-form-item>

      <a-form-item
        label="数量"
        name="数量"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.count"
          placeholder="请输入数量"
          :style="{ width: '240px' }"
        />
      </a-form-item>

      <a-button
        type="primary"
        :loading="loading"
        @click="onSubmit"
      >
        保存
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { redeemApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';

const router = useRouter();

/* 表单 */
const formRef = ref();
const formData = ref({
  prizeType: 1,
  count: 0,
});

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

  loading.value = true;
  const [err] = await to(
    redeemApi.batchGenerate(formData.value),
  );
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
