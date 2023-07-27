<template>
    <Vue3JsonEditor
            class="edit-area"
            v-model="formattedJson"
            :mode="'code'"
            @json-change="onJsonChange"
            @has-error="onJsonError"/>
</template>

<script setup>
import {getCurrentInstance, ref, watch} from "vue";
import {Vue3JsonEditor} from 'vue3-json-editor/dist/vue3-json-editor.esm.js'
import {useMessage, useThemeVars} from "naive-ui";

let originJson = ref("")
let formattedJson = ref(null)
let jsonValid = ref(true)
let isPasted = ref(false)
let message = useMessage();
const {proxy} = getCurrentInstance()

const themeVars = useThemeVars();

watch(() => originJson.value,
    () => {
        if (originJson.value instanceof Object) {
            formattedJson.value = originJson.value
            return
        }
        formattedJson.value = JSON.parse(originJson.value)
    },
    {deep: true})
watch(
    () => formattedJson.value,
    (val) => {
    },
    {deep: true}
)
const onJsonChange = proxy.debounce((json) => {
    originJson.value = json
}, 600)

function onJsonError() {
    if (jsonValid && isPasted) {
        isPasted.value = false
    } else {
        message.error("JSON格式错误，无法格式化！")
    }
}

const onPaste = (e) => {
    const text = e.clipboardData.getData('text');
    jsonValid.value = true
    try {
        JSON.parse(text)
        isPasted.value = true
    } catch (e) {
        jsonValid.value = false
    }
}

window.addEventListener("paste", onPaste)
</script>

<style scoped lang="scss">
$body-color: v-bind("themeVars.bodyColor");
$font-color: v-bind("themeVars.textColorBase");
$info-color: v-bind("themeVars.infoColor");
.edit-area {
  &:deep(.jsoneditor-vue) {
    height: 450px;
    //自定义编辑器主题
    & div.jsoneditor {
      border-color: $body-color;

      .jsoneditor-outer {
        //border: red 1px solid;
        height: 100% !important;

        .ace_gutter {
          background-color: $body-color;
        }

        & .ace_folding-enabled .ace_gutter-cell {
          //border: yellow 1px solid;
          background-color: $body-color;
        }

        .ace_content {
          background-color: $body-color;
          // 光标所在行
          .ace_active-line {
            background-color: $body-color;
          }

          .ace_line_group {
            .ace_line {
              .ace_variable {
                color: $font-color;
              }

              .ace_string {
                color: $info-color;
              }
            }
          }
        }

        .jsoneditor-tree {
          .jsoneditor-values {
            .jsoneditor-field {
              color: $font-color;
            }

            .jsoneditor-value {
              color: $info-color;
            }
          }
        }
      }
    }
  }
}

</style>