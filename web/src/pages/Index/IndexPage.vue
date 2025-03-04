<script setup lang="ts">
import { ref, computed } from 'vue';
import categorys from '@/constant/category';
import features from '@/constant/features';

/* 分类 */
const active = ref('All');
const SetCategory = (en: string) => {
  active.value = en;
};

/* 功能 */
const featuresList = computed(() => features.filter((f) => f.category.includes(active.value)));
</script>

<template>
  <div class="index">
    <!-- 标题 -->
    <header class="logo">
      加一工具箱
    </header>

    <!-- 筛选 -->
    <div class="category-warp">
      <ul class="category">
        <li
          v-for="category in categorys"
          :key="category.en"
          class="category-item"
          :class="category.en===active ? 'active' : ''"
          @click="SetCategory(category.en)"
        >
          <p>{{ category.cn }}</p>
          <p class="category-en">
            {{ category.en }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 功能 -->
    <div class="feature-warp">
      <router-link
        v-for="item in featuresList"
        :key="item.name"
        :to="{ name: item.name }"
        class="feature-item"
      >
        {{ item.label }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.index{
  margin: auto;
  padding-top: 3rem;
  max-width: 768px;
}

.logo{
  font-family: 'MFQiHei';
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
}

.category-warp{
  overflow: auto;
}
.category-warp::-webkit-scrollbar {
  display: none;
}
.category{
  display: flex;
  background-color: var(--content-stacked-background);
  width: 768px;
}
.category-item{
  list-style: none;
  padding: 16px;
  width: 128px;
  cursor: pointer;
  text-align: center;
}
.category-en{
  font-size: 0.8rem;
  opacity: 0.6;
  font-weight: lighter;
}
.category-item.active{
  background-color: var(--content-background);
}
@media screen and (max-width: 768px) {
  .category-warp{
    display: none;
  }
}

.feature-warp{
  display: flex;
  flex-wrap: wrap;
  background-color: var(--content-background);
  padding: 16px 24px;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .feature-warp{
    background-color: transparent;
    justify-content: center;
    padding: 24px;
  }
}

.feature-item{
  display: block;
  margin: 10px;
  width: 120px;
  height: 90px;
  line-height: 90px;
  cursor: pointer;
  background: #4f4f4f;
  color: rgb(203, 197, 29);
  text-align: center;
  text-decoration: none;
}
.feature-item:hover{
  background-color: #555;
  color: rgb(203, 197, 100);
}

</style>
