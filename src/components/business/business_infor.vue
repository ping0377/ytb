<template>
  <div>
    <div class="business_div">
      <div class="bus_top">
        <p class="title_p">商户基本信息</p>
        <table class="table" :data="sh_info">
          <tbody>
            <tr>
              <td>商户号:</td>
              <td>{{sh_info.merchantNo}}111</td>
              <td></td>
            </tr>
            <tr>
              <td>登录账号(手机号):</td>
              <td>{{sh_info.phone}}111</td>
              <td>
                <button @click="change_ph" class="btn btn-success">更换手机号</button>
              </td>
            </tr>
            <tr>
              <td>账号余额:</td>
              <td>{{sh_info.wallet}}111</td>
              <td>
                <button class="btn btn-success" @click="wallet_msg">钱包记录</button>
                <button class="btn btn-success" @click="withdrawal">提现申请</button>
              </td>
            </tr>
            <tr>
              <td>商户密码:</td>
              <td>***********</td>
              <td>
                <button @click="change_pwd" class="btn btn-success">修改密码</button>
                <el-dialog title="修改密码" :visible.sync="changepsw">
                  <el-form>
                    <el-form-item label="旧密码" :label-width="formLabelWidth">
                      <el-input v-model="oldpsw" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth">
                      <el-input v-model="newpsw" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
              </td>
            </tr>
            <tr>
              <td>注册时间:</td>
              <td>{{this.moment(sh_info.registrationTime).format("YYYY-MM-DD HH:mm:ss")}}</td>
              <td></td>
            </tr>
            <tr>
              <td>收款账号类型:</td>
              <td>支付宝</td>
            </tr>
            <tr>
              <td>收款账号:</td>
              <td>1555@qq.com</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bus_center" v-show="wash.wash_show">
        <p class="title_p">洗衣服务店铺信息</p>
        <table class="table">
          <tbody>
            <tr>
              <td>商家名称:</td>
              <td>
                <el-input v-model="wash.businessName"></el-input>
              </td>
            </tr>
            <tr>
              <td>商家LOGO:</td>
              <td>
                <img src="static/img/u3013.svg" alt />
              </td>
            </tr>
            <tr>
              <td>商家首页图:</td>
              <td>
                <img src="static/img/u3021.svg" alt />
              </td>
            </tr>
            <tr>
              <td>店内图片:</td>
              <td>
                <img src="static/img/u3013.svg" alt />
              </td>
            </tr>
            <tr>
              <td>店铺编号:</td>
              <td>{{wash.businessNo}}</td>
            </tr>
            <tr>
              <td>客服电话:</td>
              <td>
                <el-input v-model="wash.serviceTel"></el-input>
              </td>
            </tr>
            <tr>
              <td>营业时间:</td>
              <td>
                <el-time-select
                  placeholder="起始时间"
                  v-model="wash.startTime"
                  :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
                ></el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="wash.endTime"
                  :picker-options="{start: '08:30',step: '00:15',end: '20:30',minTime: wash.startTime}"
                ></el-time-select>
              </td>
            </tr>
            <tr>
              <td>商家地址:</td>
              <td>
                <el-input id="wash_address" @click="map_wash" v-model="wash.detailsAddress"></el-input>
              </td>
            </tr>

            <tr>
              <td>商家介绍:</td>
              <td>
                <div id="wangeditor">
                  <div ref="editorElem" style="text-align:left;"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>商家状态:</td>
              <td>
                <el-radio v-model="wash.radio" label="1">营业</el-radio>
                <el-radio v-model="wash.radio" label="2">休息</el-radio>
              </td>
            </tr>
            <tr>
              <td>店铺描述:</td>
              <td>
                <el-input type="textarea" :rows="5" placeholder="请输入店铺描述" v-model="textarea"></el-input>
              </td>
            </tr>
            <tr>
              <td>运费模板:</td>
              <td>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: center;">
          <button class="btn btn-success" @click="save_wash">保存洗衣服务信息</button>
        </p>
      </div>
      <div class="bus_center" v-show="shop.shop_show">
        <p class="title_p">商品销售店铺信息</p>
        <table class="table">
          <tbody>
            <tr>
              <td>商家名称:</td>
              <td>
                <el-input v-model="shop.businessName"></el-input>
              </td>
            </tr>
            <tr>
              <td>商家LOGO:</td>
              <td>
                <img src="static/img/u3013.svg" alt />
              </td>
            </tr>
            <tr>
              <td>商家首页图:</td>
              <td>
                <img src="static/img/u3021.svg" alt />
              </td>
            </tr>
            <tr>
              <td>店内图片:</td>
              <td>
                <img src="static/img/u3013.svg" alt />
              </td>
            </tr>
            <tr>
              <td>店铺编号:</td>
              <td>{{shop.businessNo}}</td>
            </tr>
            <tr>
              <td>客服电话:</td>
              <td>
                <el-input v-model="shop.serviceTel"></el-input>
              </td>
            </tr>
            <tr>
              <td>营业时间:</td>
              <td>
                <el-time-select
                  placeholder="起始时间"
                  v-model="shop.startTime"
                  :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
                ></el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="shop.endTime"
                  :picker-options="{start: '08:30',step: '00:15',end: '20:30',minTime: shop.startTime}"
                ></el-time-select>
              </td>
            </tr>
            <tr>
              <td>商家地址:</td>
              <td>
                <el-input id="shop_address" @focus="map_shop" v-model="shop.detailsAddress"></el-input>
              </td>
            </tr>

            <tr>
              <td>商家介绍:</td>
              <td>
                <div id="wangeditor">
                  <div ref="shop_editorElem" style="text-align:left;"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>商家状态:</td>
              <td>
                <el-radio v-model="shop.radio" label="1">营业</el-radio>
                <el-radio v-model="shop.radio" label="2">休息</el-radio>
              </td>
            </tr>
            <tr>
              <td>店铺描述:</td>
              <td>
                <el-input type="textarea" :rows="5" placeholder="请输入店铺描述" v-model="text"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: center;">
          <button class="btn btn-success" @click="save_shop">保存商品销售信息</button>
        </p>
      </div>
    </div>
    <!-- <DialogFramework top="32vh" title="修改手机号" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <el-input placeholder="请输入新的手机号" v-model="phone"></el-input>
          <el-input placeholder="请输入原密码" v-model="pwd"></el-input>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible1 = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="query_ph" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>
    <DialogFramework top="32vh" title="修改密码" :visible.sync="dialogVisible" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <el-input placeholder="请输入原密码" v-model="pwd"></el-input>
          <el-input type="password" placeholder="请输入新密码" v-model="Npwd"></el-input>
          <el-input type="password" placeholder="确认新密码" v-model="Cpwd"></el-input>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="query_pwd" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>-->
  </div>
</template>
<script>
let that;
import bus from "@/http/bus";
import E from "wangeditor";
import * as axios from "@/http/http.js";
import DialogFramework from "@/components/alert/dialog_modal";
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      changepsw: false,
      dialogVisible: false,
      dialogVisible1: false,
      oldpsw: "",
      newpsw: "",
      formLabelWidth: "120px",
      phone: "",
      pwd: "",
      Npwd: "",
      Cpwd: "",
      options: [
        {
          value: "选项1",
          label: "运费模板1"
        },
        {
          value: "选项2",
          label: "运费模板2"
        }
      ],
      value: "",
      sh_info: [],
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)], //选择起止时间
      text: "",
      //洗护编辑器数据
      editor: null,
      editorContent: "", //商家介绍
      url: "",
      // 商城编辑器数据
      shop_editor: null,
      shop_editorContent: "", //商家介绍
      shop_url: "",
      wash: {
        wash_show: true,
        fkBusinessNo: "", //商户号
        businessName: "", //名称
        serviceTel: "", //电话
        businessNo: "", //店铺编号
        detailsAddress: "", //店铺地址
        descriptions: "", //商家描述
        introduction: "", //商家介绍
        radio: "1", //商家状态
        lng: "",
        lat: "",
        province: "",
        city: "",
        district: "",
        detailsAddress: "",
        startTime: "",
        endTime: ""
      },
      shop: {
        shop_show: true,
        fkBusinessNo: "", //商户号
        businessName: "", //名称
        serviceTel: "", //电话
        businessNo: "", //店铺编号
        detailsAddress: "", //店铺地址
        descriptions: "", //商家描述
        introduction: "", //商家介绍
        radio: "1",
        lng: "",
        lat: "",
        province: "",
        city: "",
        district: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  mounted() {
    that = this;
    this.editor_container();
    this.editor_shop();
    this.lading_page();
  },
  methods: {
    save_wash() {
      // 保存洗衣店铺信息
      this.$message('点击保存洗衣店铺')
    },
    withdrawal() {
      this.$message("点击提现申请..");
    },
    wallet_msg() {
      // 查看钱包记录
      this.$message("查看钱包记录详情...");
    },
    lading_page() {
      //查询商户的基本信息
      axios.Query_merchants().then(res => {
        // console.log(sessionStorage.getItem("token"))
        console.log(res);
        if (res.data.status == "200") {
          that.sh_info = res.data.data[0];
          // console.log(
          //   this.moment(res.data.data[0].registrationTime).format(
          //     "YYYY-MM-DD HH:mm:ss"
          //   )
          // );
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
      //查询洗护店铺
      axios.Query_business().then(res => {
        // console.log(res);
        res.data.data.forEach(item => {
          if (item.businessType == "2") {
            that.wash.wash_show = true;
            that.wash.businessName = item.businessName;
            that.wash.fkBusinessNo = item.fkMerchantNo;
            that.wash.serviceTel = item.serviceTel;
            that.wash.businessNo = item.businessNo;
            that.wash.startTime = item.startTime;
            that.wash.endTime = item.endTime;
            that.wash.detailsAddress = item.detailsAddress;
            that.editorContent = item.introduction;
            that.wash.descriptions = item.descriptions;
            (that.wash.lng = item.lng),
              (that.wash.lat = item.lat),
              (that.wash.province = item.province),
              (that.wash.city = item.city),
              (that.wash.district = item.district);
            if (item.operatingState == "210") {
              this.wash.radio = "1";
            } else if (item.operatingState == "215") {
              this.wash.radio = "2";
            } else {
              this.wash.radio = "3";
            }
            sessionStorage.setItem("washNo", item.businessNo);
          } else if (item.businessType == "1") {
            console.log(item);
            that.shop.shop_show = true;
            that.shop.businessName = item.businessName;
            that.shop.serviceTel = item.serviceTel;
            that.shop.businessNo = item.businessNo;
            that.shop.startTime = item.startTime;
            that.shop.endTime = item.endTime;
            that.shop.detailsAddress = item.detailsAddress;
            that.shop_editorContent = item.introduction;
            that.shop.descriptions = item.descriptions;
            (that.shop.lng = item.lng),
              (that.shop.lat = item.lat),
              (that.shop.province = item.province),
              (that.shop.city = item.city),
              (that.shop.district = item.district);
            if (item.operatingState == "210") {
              this.shop.radio = "1";
            } else if (item.operatingState == "215") {
              this.shop.radio = "2";
            } else {
              this.shop.radio = "3";
            }
            sessionStorage.setItem("shopNo", item.businessNo);
            // operatingState//营业状态
          }
        });
      });
    },
    save_shop() {
      // 保存商品店铺信息
      let data = {
        fkBusinessNo: this.shop.fkBusinessNo,
        businessAudits: {
          businessName: this.shop.businessName,
          logo: "helloLogo",
          descriptions: this.shop.descriptions,
          introduction: this.shop_editorContent,
          serviceTel: this.shop.serviceTel,
          lng: this.shop.lng,
          lat: this.shop.lat,
          province: this.shop.province,
          city: this.shop.city,
          district: this.shop.district,
          detailsAddress: this.shop.detailsAddress,
          businessType: "2"
        }
      };
      axios.update_bussiness(data).then(res => {
        console.log(res);
      });
    },
    map_wash() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "wash_address"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.wash.detailsAddress = e.poi.district + e.poi.name;
          that.wash.lat = e.poi.location.lat;
          that.wash.lng = e.poi.location.lng;
          var lnglat = [that.wash.lng, that.wash.lat];
          var geoc = new AMap.Geocoder({
            city: "全国"
          });
          geoc.getAddress(lnglat, function(status, result) {
            var addrs = result.regeocode.addressComponent;
            console.log(addrs);
            that.wash.province = addrs.province;
            that.wash.city = addrs.city;
            that.wash.district = addrs.district;
          });
        }
      });
    },
    map_shop() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "shop_address"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.shop.detailsAddress = e.poi.district + e.poi.name;
          that.shop.lat = e.poi.location.lat;
          that.shop.lng = e.poi.location.lng;
          var lnglat = [that.shop.lng, that.shop.lat];
          var geoc = new AMap.Geocoder({
            city: "全国"
          });
          geoc.getAddress(lnglat, function(status, result) {
            var addrs = result.regeocode.addressComponent;
            console.log(addrs);
            that.shop.province = addrs.province;
            that.shop.city = addrs.city;
            that.shop.district = addrs.district;
          });
        }
      });
    },
    //富文本编辑器
    editor_container() {
      this.editor = new E(this.$refs.editorElem);
      this.editor.customConfig.uploadImgShowBase64 = true;
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        //this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.menus = [
        // 菜单配置
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "justify", // 对齐方式
        "image", // 插入图片
        "undo" // 撤销
      ];

      this.editor.create(); // 创建富文本实例
    },
    //商城富文本编辑器
    editor_shop() {
      this.shop_editor = new E(this.$refs.shop_editorElem);
      this.shop_editor.customConfig.uploadImgShowBase64 = true;
      // 编辑器的事件，每次改变会获取其html内容
      this.shop_editor.customConfig.onchange = html => {
        this.shop_editorContent = html;
        //this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      this.shop_editor.customConfig.menus = [
        // 菜单配置
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "justify", // 对齐方式
        "image", // 插入图片
        "undo" // 撤销
      ];

      this.shop_editor.create(); // 创建富文本实例
    },
    change_pwd() {
      this.changepsw = true;
      console.log("修改密码");
    },
    query_pwd() {
      if (this.Npwd != this.Cpwd) {
        this.$message.error("输入的两次新密码不一致");
      } else {
        let data = {
          pwd: this.pwd,
          freshPwd: this.Npwd,
          confirmPwd: this.Cpwd
        };
        axios.updata_pwd(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.dialogVisible = false;
            this.$message.success(res.data.msg);
          } else if (res.data.status == "588") {
            this.$message.error(res.data.msg);
            this.$router.push({ path: "/log" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    change_ph() {
      this.dialogVisible1 = true;
      this.$message("点击修改绑定手机号");
    },
    query_ph() {
      let data = {
        phone: this.phone
      };
      axios.updata_phone(data).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.dialogVisible1 = false;
          this.lading_page();
          this.$message.success(res.data.msg);
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.bus_top,
.bus_center {
  width: 94%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
}
.business_div {
  .title_p {
    border-left: 4px solid rgba(245, 188, 16, 1);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(26, 188, 156);
  }
  .bus_top {
    height: 370px;
    tr td:nth-child(1) {
      width: 22%;
      text-align: right;
    }
    tr td:nth-child(2) {
      width: 24%;
    }
    table {
      width: 70%;
      tbody tr td {
        line-height: 20px;
      }
    }
  }
  .bus_center {
    tr td:nth-child(1) {
      width: 22%;
      text-align: right;
    }
    table {
      width: 70%;
    }
  }
}
.modal_center {
  height: 180px;
  .el-input {
    margin: 10px 5%;
  }
}
</style>