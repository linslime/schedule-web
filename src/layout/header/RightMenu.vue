<template>
    <a-dropdown placement="bottomLeft">
        <a class="ant-dropdown-link">
            <img class="right-img" src="@/assets/user.png" />
        </a>
        <template #overlay>
            <a-menu>
                <a-menu-item key="1">修改密码</a-menu-item>
                <a-menu-item key="2" @click.native="loingout">退出登录</a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script setup lang='ts'>
import { clearSession } from '@/utils/auth'
import { useRouter } from 'vue-router';
import { tabsStore } from '@/store/tabs/index'
const store = tabsStore()
const router = useRouter()
//退出登录
const loingout = () => {
    console.log('退出')
    router.push({ name: 'login' })
    //清空session数据
    clearSession()
    //清空store里面的选项卡
    store.tabsList = []
}
</script>
<style scoped lang='scss'>
.right-img {
    width: 40px;
    height: 40px;
}
</style>