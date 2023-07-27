import {h} from 'vue'
import Layout from '../layout/index.vue'
import {
    NIcon
} from "naive-ui";

import {Braces20Filled as Braces} from "@vicons/fluent"
import {Xml,Sql} from "@vicons/carbon"
import {Database} from "@vicons/tabler"


function renderIcon(icon) {
    return () => h(NIcon, null, {
        default: () => h(icon)
    });
}

const routes = [
    {
        path: '/',
        name: "Home",
        key: "Home",
        redirect: '/dashboard/sqltool',
        hidden: true,
        label: "Home",
        meta: {
            label: "首页",
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        key: 'Dashboard',
        redirect: '/dashboard/sqltool',
        component: Layout,
        label: "首页",
        icon: renderIcon(Database),
        meta: {
            label: "首页",
        },
        children: [{
            path: "/dashboard/sqltool",
            name: 'DashboardSQL',
            key: 'DashboardSQL',
            component: () => import('@/views/SqlTool.vue'),
            label: "SQL解析工具",
            icon: renderIcon(Sql),
            meta: {
                label: "SQL解析工具",
            }
        },{
            path: "/dashboard/jsontool",
            name: 'DashboardJSON',
            key: 'DashboardJSON',
            component: () => import('@/views/JsonTool.vue'),
            label: "JSON格式化",
            icon: renderIcon(Braces),
            meta: {
                label: "JSON格式化",
            }
        },{
            path: "/dashboard/xmltool",
            name: 'DashboardXML',
            key: 'DashboardXML',
            component: () => import('@/views/XmlTool.vue'),
            label: "XML格式化",
            icon: renderIcon(Xml),
            meta: {
                label: "XML格式化",
            }
        }]
    },
]

export default routes