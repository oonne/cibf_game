<template>
  <div class="app-form">
    <a-alert
      message="此操作会删除所有指定奖品的兑换码，删除后数据无法找回，无备份。仅供测试时使用，请谨慎操作！"
      type="error"
      :style="{ marginBottom: '16px' }"
    />

    <a-form
      ref="formRef"
      :model="formData"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item
        label="奖品"
        name="prizeType"
        :rules="[{ required: true }]"
      >
        <a-select
          v-model:value="formData.prizeType"
          placeholder="请选择奖品"
          :style="{ width: '240px' }"
        >
          <a-select-option
            v-for="item in prizeTypeList"
            :key="item.type"
            :value="item.type"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-button
        type="primary"
        danger
        :loading="loading"
        @click="onSubmit"
      >
        删除
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
import prizeTypeList from '@/constant/prize';

const router = useRouter();

/* 表单 */
const formRef = ref();
const formData = ref({
  prizeType: prizeTypeList[0]?.type || 1,
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
    redeemApi.batchDelete(formData.value),
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
