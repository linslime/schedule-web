<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" class="asside">
      <menu-bar></menu-bar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Header></Header>
      </a-layout-header>
      <a-layout-content class="main">
        <Tabs></Tabs>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import MenuBar from './menu/MenuBar.vue';
import Header from './header/Header.vue';
import { collapseStore } from '@/store/collapse';
import Tabs from './tabs/Tabs.vue';
//获取store
const store = collapseStore()

//collapsed
const collapsed = computed(() => {
  return store.getCollapse
})
</script>
<style scoped lang='scss'>
//去掉菜单右侧的边框
:deep(.ant-menu-vertical) {
  border-right: none !important;
}
:deep(.ant-menu-inline) {
  border-right: none !important;
}
.layout {
  height: 100%;
  .asside {
    //  background-color: yellowgreen;
    background-color: #fff;
    border-right: 1px solid #f0f0f0 !important;
    :deep(.ant-menu-inline) {
      border-right: none !important;
    }
    :deep(.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left) {
      border-right: none !important;
    }
  }
  .header {
    height: 50px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(52, 64, 80);
  }
  .main {
    padding: 5px 20px !important;
    background-color: #fff !important;
  }
}
</style>
