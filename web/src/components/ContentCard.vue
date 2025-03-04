<script setup lang="ts">
</script>

<template>
  <div class="content-card">
    <slot />
  </div>
</template>

<style scoped>
.content-card{
  box-sizing: border-box;
  max-width: var(--content-max-width);
  background:  var(--content-background);
  margin: 16px auto;
  padding: 16px 24px;
  line-height: 1.6;
}
@media screen and (max-width: 800px) {
  .content-card{
    margin: 2px auto;
  }
}

/* 简介内容 */
.content-card:deep() h2{
  font-weight: normal;
  font-size: 1.4rem;
}
.content-card:deep() a{
  color: var(--color);
}
.content-card:deep() ul {
  margin-left: 0;
  padding-left: 1.2rem;
}

/* 简介表格 */
.content-card:deep() table {
  border: 2px solid var(--color);
  border-collapse: collapse;
  margin: 10px 0;
}
.content-card:deep() th, .content-card:deep() td {
  border: 1px solid var(--color);
  padding: 0.5rem 1rem;
}
</style>
