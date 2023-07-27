<template>
    <n-layout-sider
            :native-scrollbar="false"
            show-trigger :collapsed-width="64" :width="200"
            collapse-mode="width"
    >
        <n-menu
                :collapsed-width="64"
                :collapsed-icon-size="22"
                @update:value="handleUpdateValue"
                :options="navs"
                :value="active"
        />
    </n-layout-sider>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import routes from "@/router/routes.js";
import {deepClone} from "@/utils/index.js";

const route = useRoute();
const router = useRouter();
const navs = filterNavs(deepClone(routes))
let active = ref('');
const handleUpdateValue = (key, item) => {
    active.value = key;
    router.push({path: item.path});
};

watch(
    () => route.path,
    () => {
        if (!route.children) {
            active.value = route.name;
        }
    },
    {immediate: true, deep: true}
);

function filterNavs(ary) {
    ary.forEach((item, index) => {
        if (item.children) {
            filterNavs(item.children);
        } else {
            if (item.hidden) {
                ary.splice(index, 1);
            }
        }
    });

    return ary;
}

</script>