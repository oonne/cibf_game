<script setup lang="ts">
import { SelectOption } from '../types/type';

defineProps<{
  selected: string | number;
  label?: string;
  options: SelectOption[];
}>();

defineEmits(['update:selected']);
</script>

<template>
  <div class="select-warp">
    <label>{{ label }}</label>
    <select
      :value="selected"
      @change="$emit('update:selected', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.selected"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-warp{
  margin: 8px 12px 8px 24px;
}
@media screen and (max-width: 800px) {
  .select-warp{
    margin-right: -4px;
  }
}

label{
  padding: 12px 0;
}
select{
  margin: 4px 12px;
  height: 40px;
  line-height: 40px;
  padding: 12px;
  border: none;
  outline: none;
  background-color: var(--input-background);
  color: var(--color);
}
</style>
