<script setup lang="ts">
import { ref } from 'vue';
import ScryptJS from 'scrypt-js';
import toast from '@/components/message';
import { to } from '@/utils/index';
import type { SelectOption } from '@/types/type';

const input = ref('');
const salt = ref('');
const dkLen = ref(64);
const output = ref('');

// n（计算难度）
const nSelectOptions: SelectOption[] = [
  {
    value: 2 ** 10,
    name: '1024',
  },
  {
    value: 2 ** 12,
    name: '4096',
  },
  {
    value: 2 ** 14,
    name: '16384',
  },
];
const n = ref(2 ** 10);

// r（内存消耗）
const rSelectOptions: SelectOption[] = [
  {
    value: 2 ** 3,
    name: '8',
  },
  {
    value: 2 ** 6,
    name: '64',
  },
  {
    value: 2 ** 8,
    name: '256',
  },
];
const r = ref(2 ** 6);

// p（并行计算）
const pSelectOptions: SelectOption[] = [
  {
    value: 1,
    name: '1',
  },
  {
    value: 2,
    name: '2',
  },
  {
    value: 2 ** 2,
    name: '4',
  },
  {
    value: 2 ** 3,
    name: '8',
  },
];
const p = ref(1);

/* 计算 */
const loading = ref(false);
const onCalc = async () => {
  loading.value = true;
  output.value = '计算中...';

  const startTime = Date.now();
  const inputArr = new TextEncoder().encode(input.value);
  const saltArr = new TextEncoder().encode(salt.value);
  const [err, res] = await to(ScryptJS.scrypt(
    inputArr,
    saltArr,
    Number(n.value),
    Number(r.value),
    Number(p.value),
    Number(dkLen.value),
  ));
  loading.value = false;
  const endTime = Date.now();
  toast(`耗时: ${endTime - startTime}ms`);

  if (err) {
    toast(`计算失败: ${err.message}`);
    output.value = '';
    return;
  }

  output.value = Array.from(res as Uint8Array).map((v) => v.toString(16).padStart(2, '0')).join('');
};
</script>

<template>
  <div class="input-warp">
    <TextInput
      v-model:text.lazy="input"
      text-area-class="min-height-6"
      placeholder="口令"
    />
    <TextInput
      v-model:text.lazy="salt"
      text-area-class="min-height-6"
      placeholder="盐"
    />
  </div>
  <div class="button-warp">
    <SelectInput
      v-model:selected="n"
      label="n (计算难度)"
      :options="nSelectOptions"
    />
    <SelectInput
      v-model:selected="r"
      label="r (内存消耗)"
      :options="rSelectOptions"
    />
    <SelectInput
      v-model:selected="p"
      label="p (并行计算)"
      :options="pSelectOptions"
    />
    <ValueInput
      v-model:value="dkLen"
      input-class="center width-40"
      type="number"
      label="输出长度"
    />
    <ConfirmButton
      text="计算"
      :disable="loading || input==='' || salt==='' || !dkLen"
      @click="onCalc"
    />
  </div>
  <TextInput
    v-if="!!output"
    placeholder="秘钥"
    :text="output"
    readonly
  />
</template>

<style scoped>
.input-warp{
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
}

.button-warp{
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 680px) {
  .button-warp{
    flex-direction: column;
    align-items: end;
  }
}

</style>
