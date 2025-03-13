<template>
  <div class="app-form">
    <a-form
      ref="formRef"
      :model="formData"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item label="开启活动">
        <a-switch v-model:checked="formData.isActive" />
      </a-form-item>

      <a-form-item
        label="奖品一（玩偶）中奖率"
        name="prize_rate_1"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.prize_rate_1"
          placeholder="请输入中奖率"
          min="0"
          max="100"
          :precision="2"
        >
          <template #addonAfter>
            %
          </template>
        </a-input-number>
      </a-form-item>

      <a-form-item
        label="奖品二（加湿器）中奖率"
        name="prize_rate_2"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.prize_rate_2"
          placeholder="请输入中奖率"
          min="0"
          max="100"
          :precision="2"
        >
          <template #addonAfter>
            %
          </template>
        </a-input-number>
      </a-form-item>

      <a-form-item
        label="奖品三（雨伞）中奖率"
        name="prize_rate_3"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.prize_rate_3"
          placeholder="请输入中奖率"
          min="0"
          max="100"
          :precision="2"
        >
          <template #addonAfter>
            %
          </template>
        </a-input-number>
      </a-form-item>

      <a-form-item
        label="奖品四（感谢参与）中奖率"
        name="prize_rate_4"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.prize_rate_4"
          placeholder="请输入中奖率"
          min="0"
          max="100"
          :precision="2"
        >
          <template #addonAfter>
            %
          </template>
        </a-input-number>
      </a-form-item>

      <a-form-item
        label="奖品五（手持电风扇）中奖率"
        name="prize_rate_5"
        :rules="[{ required: true }]"
      >
        <a-input-number
          v-model:value="formData.prize_rate_5"
          placeholder="请输入中奖率"
          min="0"
          max="100"
          :precision="2"
        >
          <template #addonAfter>
            %
          </template>
        </a-input-number>
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
import { settingApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';

const SETTING_KEY = 'CIBF_SETTING';

/* 表单 */
const formRef = ref();
const formData = ref({
  isActive: true,
  prize_rate_1: 0,
  prize_rate_2: 0,
  prize_rate_3: 0,
  prize_rate_4: 0,
  prize_rate_5: 0,
});

/* 查询配置 */
const getDetail = async () => {
  const [err, res] = await to(settingApi.getSettingByKey({ key: SETTING_KEY }));
  if (err || !res.data) {
    return;
  }

  try {
    formData.value = JSON.parse(res.data.value);
  } catch (e) {
    console.error(e);
  }
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
    message.error(buildErrorMsg({ err, defaultMsg: '更新失败' }));
    return;
  }

  message.success('已更新配置');
};
</script>

<style scoped></style>
