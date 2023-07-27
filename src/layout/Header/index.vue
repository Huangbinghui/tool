<template>
    <n-layout-header class="header">
        <n-space justify="space-between">
            <n-h3>DevTools</n-h3>
            <n-button round type="success" size="small" @click="activateSettingDrawer">设置</n-button>
        </n-space>
        <n-drawer :show="settingDrawerVisible" :width="302">
            <n-drawer-content>
                <template #header>
                    设置
                </template>
                <n-space vertical>
                    <n-space>
                        <n-text>主题：</n-text>
                        <n-switch v-model:value="active" @update:value="handleChange">
                            <template #checked-icon>
                                <n-icon :component="Sunny"/>
                            </template>
                            <template #checked>
                                浅色
                            </template>
                            <template #unchecked-icon>
                                <n-icon :component="Moon"/>
                            </template>
                            <template #unchecked>
                                深色
                            </template>
                        </n-switch>
                    </n-space>
                    <n-divider/>
                    <n-gradient-text type="info">
                        BY 黄丙辉
                    </n-gradient-text>
                </n-space>
                <template #footer>
                    <n-button @click="deactivateSettingDrawer">关闭</n-button>
                </template>
            </n-drawer-content>
        </n-drawer>
    </n-layout-header>
</template>

<script setup>
import {ref} from "vue";
import {Moon, Sunny} from "@vicons/ionicons5";
import {darkTheme} from "naive-ui";

let props = defineProps(['theme'])
let settingDrawerVisible = ref(false);
let active = ref(props.theme === darkTheme);
let emits = defineEmits(['switchTheme'])

function activateSettingDrawer() {
    settingDrawerVisible.value = true;
}

function deactivateSettingDrawer() {
    settingDrawerVisible.value = false;
}

function handleChange(value) {
    emits('switchTheme', value)
}

</script>
