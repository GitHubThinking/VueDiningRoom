export default {
  path: '/main',
  component: () => import('@/View/Main'),
  children: [{
      path: '',
      component: () => import('@/components/HomePage')
    },
    // {
    //   path: 'order',
    //   component: () => import('@/components/Order')
    // },
    // {
    //   path: 'user',
    //   component: () => import('@/View/User')
    // },
    {
      path: '/main',
      redirect: '/main'
    }
  ]
}
