<template>
    <n-space vertical>
        <div class="edit">
            <n-input 
                class="left" 
                placeholder=""
                v-model:value="lineNum" 
                type="textarea" 
                :autosize="{minRows: 2,maxRows: 9}" 
                disabled />
            <n-input
                    class="content"
                    v-model:value="log"
                    placeholder="请输入日志"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 9}"
            />
        </div>
        
        <n-space justify="end">
            <n-button type="primary" round @click="convert">解析</n-button>
            <n-button type="primary" round @click="clear">清空</n-button>
            <n-button type="primary" round @click="copy">拷贝SQL</n-button>
        </n-space>
        <n-log :log="sql" :language="'sql'"/>
    </n-space>
</template>

<script setup>

import {ref, watch} from "vue";
import useClipboard from 'vue-clipboard3'
import {useMessage} from "naive-ui";


let log = ref('')
let sql = ref('')
let lineNum = ref('')
const {toClipboard} = useClipboard()
const message = useMessage()


watch(log, async(newlog, oldlog) => {
    lineNum.value = '';
    let str = log.value.replace(/\r/gi,"");
    str = str.split("\n");
    for(let i = 1; i <= str.length; i ++){
        lineNum.value += (i + "\n")
    }
})

function convert() {
    const rawSql = log.value.match(/==>.*Preparing: (.+)/)[1]
    const params = log.value.match(/==>.*Parameters: (.+)/)[1].split(', ');
    const paramValues = [];
    const paramTypes = [];

    params.forEach(param => {
        const matches = param.match(/(.+)\((.+)\)/);
        if (matches == null) {
            paramValues.push('null');
            paramTypes.push('null');
            return;
        }
        paramValues.push(matches[1]);
        paramTypes.push(matches[2]);
    });

    sql.value = rawSql.replace(/\?/g, () => {
        const value = paramValues.shift();
        const type = paramTypes.shift();
        if (type === 'String') {
            return `'${value}'`;
        } else {
            return value;
        }
    });
}

async function copy() {
    try {
        await toClipboard(sql.value);
        message.info("复制成功！")
    } catch (e) {
        message.error("复制失败！")
    }
}

function clear() {
    log.value = '';
    sql.value = '';
}
</script>

<style lang="scss" scoped>

.edit{
    display: flex;
    .left{
        width: 35px;
        height: 100%;
        text-align: left;
    }
    .content{
        overflow-wrap: normal;
    }
}


</style>