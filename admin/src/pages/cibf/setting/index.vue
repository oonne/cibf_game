<template>
  <div class="app-form">
    <a-form
      ref="formRef"
      :model="formData"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item
        label="中奖概率"
        name="key"
        :rules="[{ required: true }]"
      >
        <a-input
          v-model:value="formData.key"
          placeholder="请输入KEY"
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
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { settingApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';

const SETTING_KEY = 'CIBF_SETTING';
const router = useRouter();

/* 表单 */
const formRef = ref();
const formData = ref({
  key: '',
  value: '',
  remark: '',
});

/* 查询配置 */
const getDetail = async () => {
  const [err, res] = await to(settingApi.getSettingByKey({ key: SETTING_KEY }));
  if (err || !res.data) {
    return;
  }

  console.log(res);
};

/* 进入页面 */
onMounted(async () => {
  getDetail();
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
  const params = {
    key: SETTING_KEY,
    value: JSON.stringify(formData.value, null, 2),
  };
  const [err] = await to(settingApi.addOrUpdateByKey(params));
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
