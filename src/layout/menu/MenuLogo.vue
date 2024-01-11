<template>
    <div class="logo">
        <img src="@/assets/logos.png" />
        <span v-show="show" class="title">在线排班系统</span>
    </div>
</template>
<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import { collapseStore } from '@/store/collapse';

//获取store
const store = collapseStore()

//collapsed
const collapse = computed(() => {
    return store.getCollapse
})

//定义show
const show = ref(true)

//监听collapsed值，做延时处理
//解决标题闪动的问题
watch(() => collapse.value, (collapsed: boolean) => {
    if (!collapsed) {
        setTimeout(() => {
            show.value = !collapsed
        }, 250)
    } else {
        show.value = !collapsed
    }
})
</script>
<style scoped lang='scss'>
.logo {
    // background-color: #2b2f3a;
    background-color: rgb(52, 64, 80);
    height: 50px;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    color: #fff;
    // border-right: 1px solid #e5e5e5;
    img {
        width: 43px;
        height: 43px;
        margin-right: 12px;
    }
    .title {
        height: 50px;
        background-color: rgb(52, 64, 80);
        text-align: center;
        color: #fff;
        box-sizing: border-box;
        font-weight: 600;
        line-height: 50px;
        font-size: 20px;
        vertical-align: middle;
    }
}
</style>
