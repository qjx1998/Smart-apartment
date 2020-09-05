import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '../layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,ç
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('../views/login/login.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('../views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        name: 'index',
        redirect: { name: 'dashBoard' },
        children: [
            {
                path: 'dashboard',
                name: 'dashBoard',
                meta: { title: 'dashBoard', icon: 'dashboard' },
                component: () => import('@/views/dashboard/dashboard.vue')
            }
        ]
    },
    {
        path: '/base/info',
        component: Layout,
        redirect: { name: 'subject' },
        name: 'base-info',
        meta: { title: 'baseInfo', icon: 'base_info' },
        children: [
            {
                path: 'subject',
                name: 'subject',
                component: () => import('../views/base.info/subject/subject.list.vue'),
                meta: { title: 'subject', icon: 'subject' }
            }, {
                path: 'room',
                name: 'room',
                component: () => import('../views/base.info/room/room.list.vue'),
                meta: { title: 'room', icon: 'room' }
            }, {
                path: 'building',
                name: 'building',
                component: () => import('../views/base.info/building/building.list.vue'),
                meta: { title: 'building', icon: 'building' }
            }, {
                path: 'school',
                name: 'school',
                component: () => import('../views/base.info/school/school.vue'),
                meta: { title: 'school', icon: 'college' }
            }, {
                path: 'faculty',
                name: 'faculty',
                component: () => import('../views/base.info/faculty/faculty.vue'),
                meta: { title: 'faculty', icon: 'institute' }
            }, {
                path: 'classes',
                name: 'classes',
                component: () => import('../views/base.info/classes/classes.vue'),
                meta: { title: 'classes', icon: 'classes' }
            }, {
                path: 'department',
                name: 'department',
                component: () => import('../views/base.info/department/department.vue'),
                meta: { title: 'department', icon: 'department' }
            }
        ]
    },
    {
        path: '/pass',
        component: Layout,
        name: 'pass',
        meta: { title: 'pass', icon: 'pass-management' },
        redirect: { name: 'recognizeHistory' },
        children: [
            {
                path: 'device/group',
                name: 'deviceGroup',
                component: () => import('@/views/pass/device.group/device.group.vue'),
                meta: { title: 'deviceGroup', icon: 'device-group-management' }
            },
            {
                path: 'device',
                name: 'device',
                component: () => import('@/views/pass/device/devices.vue'),
                meta: { title: 'device', icon: 'device-management' }
            },
            {
                path: 'history',
                name: 'recognizeHistory',
                component: () => import('@/views/pass/recognize.history/history.vue'),
                meta: { title: 'history', icon: 'history' }
            },
            {
                path: 'authorizeSubjects',
                name: 'authorizeSubjects',
                component: () => import('@/views/pass/authorize.subjects/authorize.subjects.vue'),
                meta: { title: 'authorizeSubjects' },
                hidden: true
            }
        ]
    },
    {
        path: '/visitor',
        name: 'visitorManagement',
        meta: { title: 'visitorManagement', icon: 'visitor' },
        alwaysShow: true,
        redirect: { name: 'visitorAudit' },
        component: Layout,
        children: [
            {
                path: 'audit',
                name: 'visitorAudit',
                meta: { title: 'visitorAudit', icon: 'visitor-live' },
                component: () => import('@/views/visitor/visitor.audit/visitor.audit.vue')
            }
        ]
    },
    {
        path: '/inspection',
        component: Layout,
        redirect: { name: 'daily' },
        name: 'inspection',
        meta: { title: 'inspection', icon: 'inspection' },
        children: [
            {
                path: 'daily',
                name: 'daily',
                component: () => import('../views/inspection/daily/inspection.daily.vue'),
                meta: { title: 'daily', icon: 'inspection-now' }
            },
            {
                path: 'weekly',
                name: 'weekly',
                component: () => import('../views/inspection/history/inspection.history.vue'),
                meta: { title: 'weekly', icon: 'inspection-history' }
            }
        ]
    },
    {
        path: '/behavior/analysis',
        component: Layout,
        name: 'behaviorAnalysis',
        redirect: { name: 'lateReturn' },
        meta: { title: 'behaviorAnalysis', icon: 'behavior-analysis' },
        children: [
            {
                path: 'late/return',
                name: 'lateReturn',
                meta: { title: 'lateReturn', icon: 'late.return' },
                component: () => import('@/views/behavior.analysis/late.return/late.return.vue')
            },
            {
                path: 'continuous/in',
                name: 'continuousIn',
                meta: { title: 'continuousIn', icon: 'continuous.in' },
                component: () => import('@/views/behavior.analysis/continuous.in/continuous.in.vue')
            },
            {
                path: 'continuous/out',
                name: 'continuousOut',
                meta: { title: 'continuousOut', icon: 'continuous.out' },
                component: () => import('@/views/behavior.analysis/continuous.out/continuous.out.vue')
            }
        ]
    },
    {
        path: '/warning',
        component: Layout,
        redirect: { name: 'message' },
        name: 'warning',
        meta: { title: 'warning', icon: 'warningcenter' },
        children: [
            {
                path: 'message',
                name: 'message',
                component: () => import('@/views/warning/message/message.vue'),
                meta: { title: 'message', icon: 'warningmessage' }
            },
            {
                path: 'rule',
                name: 'rule',
                component: () => import('@/views/warning/rule/rule.vue'),
                meta: { title: 'rule', icon: 'warningrule' }
            }
        ]
    },
    {
        path: '/management',
        component: Layout,
        redirect: { name: 'user' },
        name: 'management',
        alwaysShow: true,
        meta: { title: 'management', icon: 'inspection' },
        children: [
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/management/user/user.vue'),
                meta: { title: 'userManagement', icon: 'subject-management' }
            }
        ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
