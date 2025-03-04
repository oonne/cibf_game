<script setup lang="ts">
withDefaults(defineProps<{
  id?: string;
  label?: string;
  value: boolean;
  inputClass?: string;
}>(), {
  id: 'checkbox',
  label: '',
  value: false,
  inputClass: '',
});

defineEmits(['update:value']);
</script>

<template>
  <div
    class="input-warp"
    :class="inputClass"
  >
    <input
      :id="id"
      class="checkbox"
      type="checkbox"
      :checked="value"
      @input="$emit('update:value', ($event.target as HTMLInputElement).checked)"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped>
.input-warp{
  margin: 8px 12px;
  display: flex;
  align-items: center;
}
label{
  padding: 12px 0;
}
.checkbox{
  width: 30px;
  height: 1rem;
  line-height: 1rem;
  padding: 12px;
  border: none;
  outline: none;
  background: var(--input-background);
  color: var(--color);
}

/* inputClass的CSS属性 */
.width-70{
  width: 70px;
}
</style>
