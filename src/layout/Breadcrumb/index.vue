<template>
    <n-breadcrumb separator=">" >
        <n-breadcrumb-item v-for="item in matched" :key="item.key" style="padding-bottom: 8px">
            {{item.meta.label}}
        </n-breadcrumb-item>
    </n-breadcrumb>
</template>

<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const matched = ref([]);

watch(() => {
        route.path
    }, () => {
        matched.value = route.matched.filter((item) => {
            return !!item.meta.label;
        });
    },
    {deep: true, immediate: true});

</script>