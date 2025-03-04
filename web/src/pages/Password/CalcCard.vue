<script setup lang="ts">
import { ref } from 'vue';
import { Utils } from '@/utils/index';

const checkNum = ref(true);
const checkCaps = ref(true);
const checkLower = ref(true);
const checkPunctuation = ref(false);
const passLength = ref(8);
const output = ref('');

/* 生成 */
const onCalc = () => {
  const num = '23456789';
  const caps = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const punctuation = '@#%';

  const character = `${checkNum.value ? num : ''}${checkCaps.value ? caps : ''}${checkLower.value ? lower : ''}${checkPunctuation.value ? punctuation : ''}`;
  if (!character.length) {
    output.value = '';
    return;
  }

  let password = '';
  for (let i = 0; i < passLength.value; i += 1) {
    password += character.charAt(Utils.randomWithin(character.length));
  }
  output.value = password;
};
</script>

<template>
  <div class="button-warp">
    <CheckboxInput
      id="checkNum"
      v-model:value="checkNum"
      input-class="width-70"
      label="数字"
    />
    <CheckboxInput
      id="checkCaps"
      v-model:value="checkCaps"
      input-class="width-70"
      label="大写"
    />
    <CheckboxInput
      id="checkLower"
      v-model:value="checkLower"
      input-class="width-70"
      label="小写"
    />
    <CheckboxInput
      id="checkPunctuation"
      v-model:value="checkPunctuation"
      input-class="width-70"
      label="符号"
    />
    <ValueInput
      v-model:value="passLength"
      input-class="center width-40"
      type="number"
      label="长度"
    />
    <ConfirmButton
      text="生成"
      :disable="passLength<=0"
      @click="onCalc"
    />
  </div>
  <TextInput
    v-if="!!output"
    :text="output"
    text-area-class="min-height-6"
    readonly
  />
</template>

<style scoped>
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
