<template>
  <div class="store_div">
    <div class="creat_div">
      <P class="title_p">店铺的基本信息</P>
      <table class="table" width="50%">
        <tbody>
          <tr>
            <td>
              <span>*</span>商品分类:
            </td>
            <td>
              <el-radio v-model="radio" label="1">洗衣服务</el-radio>
              <el-radio v-model="radio" label="2">商品销售</el-radio>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>店铺名称:
            </td>
            <td>
              <el-input v-model="store_name" placeholder="请输入"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>店铺地址:
            </td>
            <td>
              <el-input placeholder="请输入店铺地址" v-model="address" id="address_id" @focus="map_"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>客服电话:
            </td>
            <td>
              <el-input v-model="store_phone" placeholder="请输入"></el-input>
            </td>
          </tr>
          <tr v-show="show_img">
            <td>
              <span>*</span>店内图片:
            </td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="limitCount"
                :class="{hide:hideUpload}"
                :on-change="chan"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>营业执照图片:
            </td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="limitCount"
                :class="{hide:hideUpload}"
                :on-change="chan"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </td>
          </tr>
        </tbody>
      </table>
      <p style="text-align: center;">
        <el-button @click="save" type="primary">确认保存</el-button>
      </p>
    </div>
  </div>
</template>
<script>
import * as axios from "@/http/http.js";
let that;
export default {
  data() {
    return {
      // 设置上传图片信息
      fileList: [
        {
          name: "",
          url:
            "http://file02.16sucai.com/d/file/2014/0829/372edfeb74c3119b666237bd4af92be5.jpg"
        }
      ], //el-upload回显图片
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false,
      limitCount: 4,

      //设置上传营业执照
      fileList1: [], //上传图片
      limitCount1: 1,

      radio: "1",
      address: "", //地址
      province: "", //省
      city: "", //市
      district: "", //区
      lat: "", //纬度
      lng: "", //经度
      store_phone: "",
      store_name: "",
      show_img: true
    };
  },
  mounted() {
    that = this;
    if (this.dialogImageUrl != "") {
      this.dialogVisible = true;
    }
    console.log(window.location.href)
    this.resetSetItem("watchItem3", this.$route.path);
  },
  methods: {
    loading_page() {},
    map_() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "address_id"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.address = e.poi.district + e.poi.name;
          console.log(e);
          console.log(e.poi.location.lat);
          console.log(e.poi.location.lng);
          that.lat = e.poi.location.lat;
          that.lng = e.poi.location.lng;
          var lnglat = [that.lng, that.lat];
          var geoc = new AMap.Geocoder({
            city: "全国"
          });
          geoc.getAddress(lnglat, function(status, result) {
            var addrs = result.regeocode.addressComponent;
            console.log(addrs);
            that.province = addrs.province;
            that.city = addrs.city;
            that.district = addrs.district;
          });
          // axios.getArea(e.poi.district).then(val=>{
          //   console.log(val)
          //   that.province=val.Province
          //   that.city=val.city
          //   that.district=val.district
          // })
        }
      });
    },
    save() {
      let arr = [];
      this.fileList.forEach(item => {
        arr.push(item.name);
      });
      if (this.store_name == "") {
        this.$message.error("店铺名称不能为空");
        return;
      } else if (this.address == "") {
        this.$message.error("店铺地址不能为空");
        return;
      } else if (this.store_phone == "") {
        this.$message.error("客服电话不能为空");
        return;
      }
      let data = {
        businessAudits: {
          businessType: this.radio,
          businessName: this.store_name,
          lat: this.lat,
          lng: this.lng,
          province: this.province,
          city: this.city,
          district: this.district,
          detailsAddress: this.address,
          serviceTel: this.store_phone
        },
        storeAudit: arr,
        businessProveAudits: [
          {
            prove: "1.jpg",
            proveType: 1,
            storageType: true
          }
        ]
      };
      axios.creat_bussiness(data).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.$message.success("创建店铺成功");
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    updated() {
      if (this.radio != "1") {
        this.show_img = false;
      } else {
        this.show_img = true;
      }
    },
    //elementui上传图片
    chan(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file);
    }
  }
};
</script>
<style lang="less" scoped>
.store_div {
  height: calc(100vh - 74px);
}
.creat_div {
  width: 94%;
  margin: 20px auto;
  height: 550px;
  padding: 20px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  .title_p {
    border-left: 4px solid rgba(245, 188, 16, 1);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(26, 188, 156);
  }
  .table span {
    color: red;
  }
  tr td:nth-child(1) {
    width: 22%;
    text-align: right;
  }
}
</style>
<style lang="">
.creat_div .table {
  width: 50%;
}
</style>