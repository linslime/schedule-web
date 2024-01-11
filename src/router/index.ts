import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import home from '@/views/data/home.vue';

export const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/index',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: '/dashboard',
  //       component: () => import('@/layout/dashboard/Index.vue'),
  //       name: 'dashboard',
  //       meta: {
  //         title: '首页',
  //         icon: '#icondashboard'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/page',
  //   name: 'page',
  //   component: () => import('@/views/data/page1.vue')
  // },
  {
    path: '/data',
    redirect: '/page1',
  },
  {
    path: '',
    name: 'home',
    component: home,
    children: [
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/data/page1.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/data/page2.vue')
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('@/views/data/page3.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  // {
  //   path: "/system",
  //   component: Layout,
  //   name: "system",
  //   meta: {
  //     title: "系统管理",
  //     icon: "el-icon-menu",
  //     roles: ["sys:manage"],
  //     parentId: 0,
  //   },
  //   children: [
  //     {
  //       path: "/user",
  //       component: () => import('@/views/system/user/User.vue'),
  //       name: "user",
  //       meta: {
  //         title: "用户管理",
  //         icon: "el-icon-s-custom",
  //         roles: ["sys:user"]
  //       },
  //     },
  //     {
  //       path: "/role",
  //       component: () => import('@/views/system/role/Role.vue'),
  //       name: "role",
  //       meta: {
  //         title: "角色管理",
  //         icon: "el-icon-s-tools",
  //         roles: ["sys:role"]
  //       },
  //     },
  //     {
  //       path: "/menu",
  //       component: () => import('@/views/system/menu/Menu.vue'),
  //       name: "menu",
  //       meta: {
  //         title: "菜单管理",
  //         icon: "el-icon-document",
  //         roles: ["sys:menu"]
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/storesRoot",
  //   component: Layout,
  //   name: "storesRoot",
  //   meta: {
  //     title: "教室管理",
  //     icon: "el-icon-menu",
  //     roles: ["sys:classroomRoot"],
  //     parentId: 0,
  //   },
  //   children: [
  //     {
  //       path: "/classroom",
  //       component: () => import('@/views/classroom/Classroom.vue'),
  //       name: "classroom",
  //       meta: {
  //         title: "教室列表",
  //         icon: "el-icon-s-custom",
  //         roles: ["sys:classroom"]
  //       },
  //     }
  //   ]
  // },
  // {
  //   path: "/courseRoot",
  //   component: Layout,
  //   name: "courseRoot",
  //   meta: {
  //     title: "课程管理",
  //     icon: "el-icon-menu",
  //     roles: ["sys:courseRoot"],
  //     parentId: 0,
  //   },
  //   children: [
  //     {
  //       path: "/course",
  //       component: () => import('@/views/course/Course.vue'),
  //       name: "course",
  //       meta: {
  //         title: "课程列表",
  //         icon: "el-icon-s-custom",
  //         roles: ["sys:course"]
  //       },
  //     }
  //   ]
  // },
  // {
  //   path: "/teacherRoot",
  //   component: Layout,
  //   name: "teacherRoot",
  //   meta: {
  //     title: "教师管理",
  //     icon: "el-icon-menu",
  //     roles: ["sys:manage"],
  //     parentId: 0,
  //   },
  //   children: [
  //     {
  //       path: "/teacher",
  //       component: () => import('@/views/teacher/Teacher.vue'),
  //       name: "teacher",
  //       meta: {
  //         title: "教师列表",
  //         icon: "el-icon-s-custom",
  //         roles: ["sys:teacher"]
  //       },
  //     }
  //   ]
  // },
  // {
  //   path: "/scheduleRoot",
  //   component: Layout,
  //   name: "scheduleRoot",
  //   meta: {
  //     title: "排课管理",
  //     icon: "el-icon-menu",
  //     roles: ["sys:scheduleRoot"],
  //     parentId: 0,
  //   },
  //   children: [
  //     {
  //       path: "/schedule",
  //       component: () => import('@/views/schedule/Schedule.vue'),
  //       name: "schedule",
  //       meta: {
  //         title: "排课日历",
  //         icon: "el-icon-s-custom",
  //         roles: ["sys:schedule"]
  //       },
  //     },
  //     {
  //       path: "/scheduleList",
  //       component: () => import('@/views/schedule/ScheduleList.vue'),
  //       name: "scheduleList",
  //       meta: {
  //         title: "排课列表",
  //         icon: "el-icon-s-custom",
  //         roles: ["sys:scheduleList"]
  //       },
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
