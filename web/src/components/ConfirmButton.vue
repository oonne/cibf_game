<script setup lang="ts">
const props = defineProps<{
  text: string;
  disable?: boolean;
}>();

const emit = defineEmits(['click']);

const onClick = () => {
  if (props.disable) {
    return;
  }
  emit('click');
};
</script>

<template>
  <div
    class="button"
    :class="disable ? 'disable' : ''"
    @click="onClick"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.button{
  background-color: var(--input-background);
  margin: 8px;
  padding: 12px 24px;
  cursor: pointer;
}
.disable{
  cursor: not-allowed;
  opacity: 0.4;
}
</style>
