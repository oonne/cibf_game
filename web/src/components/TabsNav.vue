<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Tab } from '../types/type';

const props = defineProps<{
  tabs: Tab[];
  default: string;
}>();

/* 导航栏 */
const active = ref(props.default);
const SelectTab = (key: string) => {
  active.value = key;
};

const activeTab = computed(() => props.tabs.find((tab) => tab.key === active.value));
</script>

<template>
  <div class="content-card">
    <!-- Tabs -->
    <div class="tabs-warp">
      <ul class="tabs">
        <li
          v-for="tab in props.tabs"
          :key="tab.key"
          class="tab-item"
          :class="tab.key===active ? 'active' : ''"
          @click="SelectTab(tab.key)"
        >
          <p>{{ tab.name }}</p>
        </li>
      </ul>
    </div>

    <!-- Content -->
    <div class="content-page">
      <keep-alive>
        <component :is="activeTab?.component" />
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
.content-card{
  max-width: var(--content-max-width);
  background:  var(--content-background);
  margin: 16px auto;
}
@media screen and (max-width: 800px) {
  .content-card{
    margin: 2px auto;
  }
}

.tabs-warp{
  overflow: auto;
}
.tabs-warp::-webkit-scrollbar {
  display: none;
}
.tabs{
  display: flex;
  background-color: var(--content-stacked-background);
}
.tab-item{
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 16px;
  width: 128px;
  cursor: pointer;
  text-align: center;
}
.tab-item.active{
  background-color: var(--content-background);
}

.content-page{
  padding: 16px;
  overflow: auto;
}

</style>
