import $axios from 'axios';
import qs from "qs"


// let Http = "http://192.168.1.109"
let Http="http://ytb.fryxy.cn/testDev"
let http1="http://192.168.1.109"


//登录
export async function Login(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/mer/login";
  return $axios.post(Url, Data, { 
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type":"application/json",
    }
  })
}
//员工登录
export async function employeesLogin(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/worker/workerLogin";
  return $axios.post(Url, Data, {
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type":"application/json",
    }
  })
}
// 注册
export async function Reg(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/mer/addMerchant";
  return $axios.post(Url, Data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type":"application/json",
    }
  })
}
// 忘记密码
export async function Forget(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/mer/forGetPwd";
  return $axios.post(Url, Data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type":"application/json",
    }
  })
}

// 资料///////////////////////////////////////////////////////////////////////////////////////////
//查询物件价格  物件信息
export async function Query_price(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/goods/getGoods";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//查询物件规格
export async function Query_specification(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/goodsBinding/getGoodsBindingSpec";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//添加物件价格
export async function add_price(log_data) {
  let Data = JSON.stringify(log_data)
  let Url = Http + "/washProtect/goods/addGoods";
  return $axios.post(Url, Data, {
    headers: {
      "Content-Type": "application/json",
      "token": sessionStorage.getItem("token")
    }
  })
}
//修改物件价格信息
export async function update_price(log_data) {
  let Data = JSON.stringify(log_data)
  let Url = Http + "/washProtect/goods/updateGoods";
  return $axios.post(Url, Data, {
    headers: {
      "Content-Type": "application/json",
      "token": sessionStorage.getItem("token")
    }
  })
}



//查询物件分类
export async function Query_classification(num) {
  let Url = Http + "/washProtect/gtype/getGoodsType";
  return $axios.post(Url,{}, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "pageNum": Number(num),
      "pageSize": 12
    }
  })
}

//添加物件分类
export async function add_classification(data) {
  let Data = qs.stringify(data)
  let Url = Http + "/washProtect/gtype/addGoodsType";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//修改物件分类
export async function update_classification(data) {
  let Data = qs.stringify(data)
  let Url = Http + "/washProtect/gtype/updateGoodsType";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//删除物件分类
export async function delete_classification(data) {
  let Data = qs.stringify(data)
  let Url = Http + "/washProtect/gtype/deleteGoodsType";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}

//查询附加服务
export async function Query_addservices(num) {
  let Url = Http + "/washProtect/att/getAttachServices";
  return $axios.post(Url, {}, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "token": sessionStorage.getItem("token"),
      "pageNum": Number(num),
      "pageSize": 21
    }
  })
}
//添加附加服务
export async function add_addservices(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/att/addAttachServices";
  return $axios.post(Url, Data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "token": sessionStorage.getItem("token")
    }
  })
}
//修改附加服务
export async function update_addservices(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/att/updateAttachServices";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//删除附加服务
export async function delete_addservices(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/att/deleteAttachServices";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}

//查询通用资料
export async function Query_general(data,num) {
  let Data = qs.stringify(data)
  let url = Http + "/washProtect/goodsSpec/getGoodsSpec"
  return $axios.post(url, Data, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "pageNum": Number(num),
      "pageSize": 18
    }
  })
}
//添加通用资料
export async function add_general(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/goodsSpec/addGoodsSpec";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
// 修改通用资料
export async function update_general(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/goodsSpec/updateGoodsSpec";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//删除通用资料
export async function delete_general(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/goodsSpec/deleteGoodsSpec";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//查询优惠券
export async function Query_coupon(num) {
  let url = Http + "/activity/coupon/getCouponListAndCount"
  return $axios.post(url, {}, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "pageNum": Number(num),
      "pageSize": 6
    }
  })
}
// 添加优惠券
export async function add_coupon(data) {
  let Data = JSON.stringify(data)
  let url = Http + "/activity/coupon/addCoupon"
  return $axios.post(url, Data, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "Content-Type": "application/json;charset=UTF-8",
    }
  })
}
// 修改优惠券
export async function update_coupon(data) {
  let Data = JSON.stringify(data)
  let url = Http + "/activity/coupon/changeCoupon"
  return $axios.post(url, Data, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "Content-Type": "application/json;charset=UTF-8",
    }
  })
}
//查询商品分类
export async function Query_GoodsSpec() {
  // let Data = qs.stringify(data)
  // console.log(Data)
  let url = Http + "/commCategory/getCommCategory"
  console.log(url)
  return $axios.post(url,{
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      "token": sessionStorage.getItem("token"),
      // "pageNum": 1,
      // "pageSize": 10,
    }
  })
}
//添加商品分类
export async function add_GoodsSpec(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/commCategory/addCommCategory";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
// 修改商品分类
export async function update_GoodsSpec(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/commCategory/updateCommCategory";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//删除商品分类
export async function delete_GoodsSpec(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/washProtect/commCategory/deleteCommCategory";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
//查询商户的信息////////////////////////////////////////////////////////////////////////
export async function Query_merchants() {
  // let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/consumers/getConsumersInfo";
  return $axios.post(Url,{},{
    headers: {
      "token": sessionStorage.getItem("token")
      // "Content-Type": "application/json"
    }
  })
}
//修改商户密码
export async function updata_pwd(data){
  let Data=qs.stringify(data)
  let Url=Http + "/handlers/mer/updMerchantPwd"
  return $axios.post(Url,Data,{
    headers:{
      "token":sessionStorage.getItem("token")
    }
  })
}
//修改商户绑定手机号
export async function updata_phone(data){
  let Data=qs.stringify(data)
  let Url=Http + "/handlers/mer/updMerchant"
  return $axios.post(Url,Data,{
    headers:{
      "token":sessionStorage.getItem("token")
    }
  })
}
//查询创建的洗衣店铺
export async function Query_business(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/business/getBusinessListClose";
  return $axios.post(Url, Data, {
    headers: {
      "Content-Type": "application/json",
      "token": sessionStorage.getItem("token")
    }
  })
}
//创建洗衣店铺
export async function creat_bussiness(log_data) {
  let Data = JSON.stringify(log_data)
  let Url = Http + "/handlers/business/modifyOrCreateAudit";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
}
//修改洗衣店铺
export async function update_bussiness(log_data) {
  let Data = JSON.stringify(log_data)
  let Url = Http + "/handlers/business/modifyOrCreateAudit";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
}



//测试
export async function ce(log_data) {
  let Data = qs.stringify(log_data)
  let Url = Http + "/handlers/mer/getMerchantList";
  return $axios.post(Url, Data, {
    headers: {
      "token": sessionStorage.getItem("token")
    }
  })
}
// 校验保留两位小数金额
export function isMoney(money) {
  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (reg.test(money)) {
    return true
  } else {
    return false
  }
}

// 查询商品列表
export function goods_list() {
  let url=Http+"/mall/commManage/consumerGetComm";
  return $axios.post(url)
}

