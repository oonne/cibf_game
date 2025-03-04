<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <header>
    <router-link
      class="logo"
      :to="{name: 'Index'}"
    >
      加一工具箱
    </router-link>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped>
header{
  padding: 16px 32px;
  background-color: var(--header-background);
  display: flex;
}
.logo{
  font-family: 'MFQiHei';
  font-size: 1.6rem;
  color: var(--color);
  text-decoration: none;
  margin-right: 1rem;
}
h1{
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>
