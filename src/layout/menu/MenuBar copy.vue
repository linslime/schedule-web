<template>
    <menu-logo></menu-logo>
    <a-menu
        v-model:openKeys="menuData.openKeys"
        v-model:selectedKeys="menuData.selectedKeys"
        mode="inline"
        theme="light"
        @openChange="onOpenChange"
    >
        <a-menu-item key="/dashboard">
            <template #icon>
                <home-outlined />
            </template>
            <router-link to="/dashboard">首页</router-link>
        </a-menu-item>
        <a-sub-menu key="/system">
            <template #icon>
                <setting-outlined />
            </template>
            <template #title>系统管理</template>
            <a-menu-item key="/user" index="/user">
                <template #icon>
                    <user-outlined />
                </template>
                <router-link to="/user">用户管理</router-link>

            </a-menu-item>
            <a-menu-item key="/role">
                <template #icon>
                    <PieChartOutlined />
                </template>
                <router-link to="/role">角色管理</router-link>
            </a-menu-item>
            <a-menu-item key="/menu">
                <template #icon>
                    <unordered-list-outlined />
                </template>
                <router-link to="/menu">菜单管理</router-link>
            </a-menu-item>
        </a-sub-menu>
<!--        <a-sub-menu key="/courseRoot">-->
<!--            <template #icon>-->
<!--                <file-done-outlined />-->
<!--            </template>-->
<!--            <template #title>课程管理</template>-->
<!--            <a-menu-item key="/course">-->
<!--                <template #icon>-->
<!--                    <contacts-outlined />-->
<!--                </template>-->
<!--                <router-link to="/course">课程列表</router-link>-->
<!--            </a-menu-item>-->
<!--        </a-sub-menu>-->
        <a-sub-menu key="/teacherRoot">
            <template #icon>
                <user-switch-outlined />
            </template>
            <template #title>教师管理</template>
            <a-menu-item key="/teacher">
                <template #icon>
                    <user-delete-outlined />
                </template>
                <router-link to="/teacher">教师列表</router-link>
            </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="/classroomRoot">
            <template #icon>
                <shop-outlined />
            </template>
            <template #title>教室管理</template>
            <a-menu-item key="/classroom">
                <template #icon>
                    <align-center-outlined />
                </template>
                <router-link to="/classroom">教室列表</router-link>
            </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="/scheduleRoot">
            <template #icon>
                <AppstoreOutlined />
            </template>
<!--            <template #title>排课管理</template>-->
<!--            <a-menu-item key="/schedule">-->
<!--                <template #icon>-->
<!--                    <schedule-outlined />-->
<!--                </template>-->
<!--                <router-link to="/schedule">排课日历</router-link>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item key="/scheduleList">-->
<!--                <template #icon>-->
<!--                    <menu-outlined />-->
<!--                </template>-->
<!--                <router-link to="/scheduleList">排课列表</router-link>-->
<!--            </a-menu-item>-->
        </a-sub-menu>
    </a-menu>
</template>
<script setup lang='ts'>
import { useRoute } from 'vue-router';
import MenuLogo from './MenuLogo.vue';
import { ref, reactive, onMounted, watch } from 'vue'
import { routes } from '@/router'
//当前路由
const route = useRoute()
const menuData = reactive({
    //相当于当前路由的path
    selectedKeys: [''],
    openKeys: ['']
})
//设置当前选中的菜单
const selectkey = () => {
    menuData.selectedKeys.push(route.path)
}
//路由发生变化的时候
watch(() => route.path, () => {
    //清空原来的数据
    menuData.selectedKeys = [''];
    selectkey()
    setMenuOpen(routes)
})
onMounted(() => {
    selectkey()
    setMenuOpen(routes)
})

//解决刷新之后，有下级的菜单，需要展开
const setMenuOpen = (result: any) => {
    for (let i = 0; i < result.length; i++) {
        if (result[i].children) {
            for (let y = 0; y < result[i].children.length; y++) {
                if (result[i].children[y].path === route.path) {
                    menuData.openKeys = [result[i].path]
                }
            }
        }
    }
}

//解决一次只能展开一个菜单的问题
const onOpenChange = (openKeys: string[]) =>{
    console.log(openKeys)
    if(openKeys.length !== 0){
        menuData.openKeys = [openKeys[1]]
    }else{
        menuData.openKeys = ['']
    }
}
</script>
<style scoped lang='scss'>
</style>
