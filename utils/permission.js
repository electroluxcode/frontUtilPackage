/**
 * @param {Array} value
 * @returns {Boolean}
 * @eg checkPermission(["value"])
 */
function checkPermission(value) {
    if (value && value instanceof Array && value.length > 0) {
        const roles = ["admin", "editor"] //这个role可以从路由传过去
        const permissionRoles = value

        const hasPermission = roles.some(role => {
            return permissionRoles.includes(role)
        })
        return hasPermission
    } else {
        console.error(`need roles! Like v-permission="['admin','editor']"`)
        return false
    }
}


// import { asyncRoutes, constantRoutes } from '@/router'
//   路由的格式类似于
// var route = [{
//     path: '/token_editor',
//     name: 'token_editor',
//     // component: token_editor,
//     meta: { role: 'admin' }
// }]


// let commonUser = ['admin']
// let commonUserRoute = route.filter(function (page) {
//     return commonUser.includes(page.meta.role)
// })

// router.addRoutes(commonUserRoute)
