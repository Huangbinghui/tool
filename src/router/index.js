import {createRouter, createWebHashHistory} from 'vue-router'
import routes from "@/router/routes.js";

const router = createRouter({
    history: createWebHashHistory(), // 使用history模式
    routes,
})

export default router;