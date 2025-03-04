<script setup lang="ts">
withDefaults(defineProps<{
  label?: string;
  value: string | number;
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  inputClass?: string;
}>(), {
  label: '',
  placeholder: '',
  type: 'text',
  readonly: false,
  inputClass: '',
});

defineEmits(['update:value']);
</script>

<template>
  <div class="input-warp">
    <label>{{ label }}</label>
    <input
      class="input"
      :class="inputClass"
      :value="value"
      :type="type"
      :readonly="readonly"
      :placeholder="placeholder"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<style scoped>
.input-warp{
  margin: 8px 12px 8px 24px;
}
@media screen and (max-width: 800px) {
  .input-warp{
    margin-right: -4px;
  }
}

label{
  padding: 12px 0;
}
.input{
  margin: 4px 12px;
  width: 100px;
  height: 1rem;
  line-height: 1rem;
  padding: 12px;
  border: none;
  outline: none;
  background: var(--input-background);
  color: var(--color);
}
.input::placeholder {
  color: #aaa;
}

.input[type=number]::-webkit-inner-spin-button,
.input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* inputClass的CSS属性 */
.center{
  text-align: center;
}
.width-40{
  width: 40px;
}
</style>
