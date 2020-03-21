import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import index from '@/components'
import home from '@/components/home'
import creat_store from '@/components/creat_store'
import second_list from '@/components/second_list'

// 资料
import wj_price from '@/components/information/wj_price'
import wj_fl from '@/components/information/wj_fl'
import shop_fl from '@/components/information/shop_fl'
import add_service from '@/components/information/add_service'
import wj_price_editor from '@/components/information/wj_price_editor'
import ty_information from '@/components/information/ty_information'
import coupon_setting from '@/components/information/coupon_setting'
import coupon_editor from '@/components/information/coupon_editor'
import activity_set from '@/components/information/activity_set'
import commodity_management from '@/components/information/commodity_management'
import commodity_editor from '@/components/information/commodity_editor'

// 订单
import wash_order from '@/components/order/wash_order'
import market_order from '@/components/order/market_order'
import washOrder_details from '@/components/order/washOrder_details'

// 财务
import all_money from "@/components/financial/all_money"
import customer_statistical from "@/components/financial/customer_statistical"
import shop_statistical from "@/components/financial/shop_statistical"
import wash_statistical from "@/components/financial/wash_statistical"

//查询
import user_consumption from "@/components/query/user_consumption"
import history_order from "@/components/query/history_order"
import feeding from "@/components/query/feeding"

//商户
import business_infor from '@/components/business/business_infor'
import freight_set from '@/components/business/freight_set'
import shop_evaluation from '@/components/business/shop_evaluation'

import ce from '@/components/ce'
import ce1 from '@/components/ce1'
import ce3 from '@/components/ce3'

// 活动设置
import activity_compile from '@/components/information/activity_compile'
import add_activity from '@/components/information/add_activity'


Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/log',
    component: Login
  }, {
    path: '/ce1',
    component: ce1
  }, {
    path: '/ce3',
    component: ce3
  }, {
    path: '/ce',
    component: ce
  },
  {
    path: '/index',
    component: index,
    redirect: "/home",
    meta: {
      requrireAuth: true
    },
    children: [{
      path: "/home",
      component: home,
      meta: {
        title: "主页",
        requrireAuth: true
      },
      children: [{
        path: "/creat_store",
        component: creat_store,
        meta: {
          title: "创建店铺",
          requrireAuth: true
        }
      }]
    },
    {
      path: "/second_list",
      component: second_list,
      meta: {
        title: "资料",
        requrireAuth: true
      },
      children: [{
        path: "/wj_price",
        component: wj_price,
        meta: {
          title: "物件价格",
          requrireAuth: true
        },
        children: [{
          path: "/wj_price_editor",
          component: wj_price_editor,
          meta: {
            title: "编辑物件",
            requrireAuth: true
          }
        }]
      },
      {
        path: "/wash_order",
        component: wash_order,
        meta: {
          title: "洗护订单",
          requrireAuth: true
        },
        children: [{
          path: "/washOrder_details",
          component: washOrder_details,
          meta: {
            title: "订单详情",
            requrireAuth: true
          }
        }]
      },
      {
        path: "/market_order",
        component: market_order,
        meta: {
          title: "商城订单",
          requrireAuth: true
        },
        children: [{
          path: "/washOrder_details",
          component: washOrder_details,
          meta: {
            title: "订单详情",
            requrireAuth: true
          }
        }]
      },
      {
        path: "/wj_fl",
        component: wj_fl,
        meta: {
          title: "物件分类",
          requrireAuth: true
        },
      },
      {
        path: "/add_service",
        component: add_service,
        meta: {
          title: "附加服务设置",
          requrireAuth: true
        },
      },
      {
        path: "/ty_information",
        component: ty_information,
        meta: {
          title: "通用规格设置",
          requrireAuth: true
        },
      },
      {
        path: "/coupon_setting",
        component: coupon_setting,
        meta: {
          title: "优惠券",
          requrireAuth: true
        },
        children: [{
          path: "/coupon_editor",
          component: coupon_editor,
          meta: {
            title: "编辑优惠券",
            requrireAuth: true
          }
        }]
      },
      {
        path: "/activity_set",
        component: activity_set,
        meta: {
          title: "活动设置",
          requrireAuth: true
        },
        children:[{
          path: "/activity_compile",
          component: activity_compile,
          meta: {
            title: "活动编辑",
            requrireAuth: true
          }
        }]
      },
      {
        path: "/shop_fl",
        component: shop_fl,
        meta: {
          title: "商品分类",
          requrireAuth: true
        },
      }, {
        path: "/commodity_management",
        component: commodity_management,
        meta: {
          title: "商品管理",
          requrireAuth: true
        },
        children: [{
          path: "/commodity_editor",
          component: commodity_editor,
          meta: {
            title: "商品编辑",
            requrireAuth: true
          }
        }]
      }, {
        path: "/business_infor",
        component: business_infor,
        meta: {
          title: "商户信息",
          requrireAuth: true
        }
      }, {
        path: "/all_money",
        component: all_money,
        meta: {
          title: "总入账",
          requrireAuth: true
        }
      }, {
        path: "/shop_statistical",
        component: shop_statistical,
        meta: {
          title: "商品统计",
          requrireAuth: true
        }
      }, {
        path: "/wash_statistical",
        component: wash_statistical,
        meta: {
          title: "洗护统计",
          requrireAuth: true
        }
      }, {
        path: "/customer_statistical",
        component: customer_statistical,
        meta: {
          title: "商户消费统计",
          requrireAuth: true
        }
      }, {
        path: "/user_consumption",
        component: user_consumption,
        meta: {
          title: "商户消费查询",
          requrireAuth: true
        }
      }, {
        path: "/history_order",
        component: history_order,
        meta: {
          title: "历史订单查询",
          requrireAuth: true
        }
      }, {
        path: "/feeding",
        component: feeding,
        meta: {
          title: "收送查询",
          requrireAuth: true
        }
      }, {
        path: "/freight_set",
        component: freight_set,
        meta: {
          title: "运费设置",
          requrireAuth: true
        }
      }, {
        path: "/shop_evaluation",
        component: shop_evaluation,
        meta: {
          title: "商铺评价",
          requrireAuth: true
        }
      }
      ]
    }
    ]
  },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.path == '/log') {
    next();
  } else if (to.meta.requrireAuth) {
    let user = sessionStorage.getItem("token");
    if (user) {
      next();
    } else {
      next({
        path: '/log'
      });
    }
  } else {
    next();
  }
})

// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }
export default router
