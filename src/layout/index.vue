<template>
    <n-config-provider class="container" :theme="theme" :hljs="hljs">
        <n-layout position="absolute">
            <Header class="header" @switch-theme="handleSwitchTheme"/>
            <n-layout has-sider position="absolute" class="content">
                <SideBar/>
                <n-layout content-style="padding: 16px;">
                    <Breadcrumb/>
                    <n-message-provider>
                        <router-view v-slot="{Component,route}">
                            <KeepAlive :max="10">
                                <component :is="Component"/>
                            </KeepAlive>
                        </router-view>
                    </n-message-provider>
                </n-layout>
            </n-layout>
        </n-layout>
    </n-config-provider>
</template>

<script setup>
import Header from '@/layout/Header/index.vue'
import SideBar from '@/layout/SideBar/index.vue'
import Breadcrumb from '@/layout/Breadcrumb/index.vue'
import {ref} from "vue";
import {darkTheme} from "naive-ui";
import hljs from "highlight.js";

let theme = ref(darkTheme);

function handleSwitchTheme(value){
    if (value === true){
        theme.value = null
    } else {
        theme.value = darkTheme
    }
}
</script>

<style scoped lang="scss">
.container{
    height: 100vh;
    position: relative;
    .header{
        height: 46px;
        padding: 10px;
    }
    .content{
        min-height: calc(100vh - 44px);
        top: 44px;
        bottom: 56px;
    }
}
</style>