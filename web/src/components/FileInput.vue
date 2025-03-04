<script setup lang="ts">
import { HTMLInputEvent } from '../types/type';

withDefaults(defineProps<{
  placeholder?: string;
}>(), {
  placeholder: '拖拽文件到此处',
});

const emit = defineEmits(['change']);

/* 文件选择 */
const onFileChange = async (event: Event) => {
  if (!event.target) {
    return;
  }

  emit('change', ((event as HTMLInputEvent).target.files as FileList)[0]);
};

/* 文件拖拽 */
const onFileDrop = async (event: DragEvent) => {
  if (!event.dataTransfer) {
    return;
  }

  emit('change', event.dataTransfer.files[0]);
};
</script>

<template>
  <label
    class="drop"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="onFileDrop"
  >
    {{ placeholder }}
    <input
      v-show="false"
      type="file"
      @change="onFileChange"
    >
  </label>
</template>

<style scoped>
.drop{
  display: block;
  margin: 8px 8px 16px;
  height: 6rem;
  line-height: 6rem;
  font-size: 1.6rem;
  text-align: center;
  background-color: var(--input-background);
  border: 4px dashed var(--color);
  cursor: pointer;
  opacity: 0.7;
}
.drop:hover{
  opacity: 1;
}
</style>
