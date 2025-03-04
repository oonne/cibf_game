<script setup lang="ts">
import message from './message';

const props = withDefaults(defineProps<{
  text: string;
  placeholder?: string;
  readonly?: boolean;
  textAreaClass?: string;
}>(), {
  text: '',
  placeholder: '',
  readonly: false,
  textAreaClass: '',
});

const emit = defineEmits(['update:text']);

// 复制
const copy = async () => {
  await navigator.clipboard.writeText(props.text);
  message('已复制');
};
// 粘贴
const paste = async () => {
  const text = await navigator.clipboard.readText();
  emit('update:text', text);
};
// 清空
const clear = () => {
  emit('update:text', '');
};
</script>

<template>
  <div class="textarea-warp">
    <textarea
      class="textarea"
      :class="textAreaClass"
      :value="text"
      :readonly="readonly"
      :placeholder="placeholder"
      @input="$emit('update:text', ($event.target as HTMLTextAreaElement).value)"
    />
    <div class="button-list">
      <span
        class="button"
        @click="copy"
      >复制</span>
      <span
        v-if="!readonly"
        class="button"
        @click="paste"
      >粘贴</span>
      <span
        v-if="!readonly"
        class="button"
        @click="clear"
      >清空</span>
    </div>
  </div>
</template>

<style scoped>
.textarea-warp{
  position: relative;
  flex-grow: 1;
  min-width: 16rem;
  margin: 8px;
  background: var(--input-background);
}
.textarea{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  min-height: 14rem;
  resize: vertical;
  overflow: auto;
  border: none;
  outline: none;
  padding: 1rem;
  padding-bottom: 3rem;
  background: var(--input-background);
  color: var(--color);
}
.textarea::placeholder {
  color: #aaa;
}

.button-list{
  position: absolute;
  display: flex;
  bottom: 10px;
  right: 10px;
}
@media screen and (max-width: 800px) {
  .button-list{
    bottom: 4px;
    right: 4px;
  }
}
.button{
  background-color: #999;
  margin: 8px;
  padding: 2px 6px;
  color: #fff;
  cursor: pointer;
}

/* textAreaClass的CSS属性 */
.min-height-6{
  min-height: 6rem;
}
.min-height-10{
  min-height: 10rem;
}
.success{
  color: var(--safe-color);
}
.failed{
  color: var(--danger-color);
}
</style>
