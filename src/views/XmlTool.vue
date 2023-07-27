<template>
    <n-space vertical>
        <n-input
                v-model:value="xml"
                placeholder="请输入XML"
                type="textarea"
        />
        <n-space justify="end">
            <n-button type="primary" @click="clear">清空</n-button>
        </n-space>
        <n-log :language="'xml'" :log="formattedXml" :rows="24" v-show="xml !== ''"/>
    </n-space>
</template>

<script setup>
import vkbeautify from 'vkbeautify'
import {ref, watch} from "vue";

let xml = ref("")
let formattedXml = ref("")

watch(xml,
    () => {
        formattedXml.value = vkbeautify.xml(xml.value)
    })

function clear() {
    xml.value = ''
}
</script>

<style scoped>

</style>