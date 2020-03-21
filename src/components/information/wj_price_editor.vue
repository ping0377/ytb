<template>
  <div>
    <div class="editor_top">
      <P class="title_p">物件的基本信息</P>
      <div>
        <table class="table table1" style="width:100%;">
          <tbody>
            <tr>
              <td style="text-algin:right;">
                <span>*</span>物件分类:
              </td>
              <td>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.goodsTypeNo"
                    :label="item.categoriesName"
                    :value="item.goodsTypeNo"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>
                <span>*</span>物件类型:
              </td>
              <td>
                <el-radio v-model="radio" label="0">普通物件</el-radio>
                <el-radio v-model="radio" label="1">特价物件</el-radio>
              </td>
            </tr>
            <tr>
              <td>
                <span>*</span>物件名称:
              </td>
              <td>
                <el-input v-model="wj_name" clearable maxlength="10" show-word-limit></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <span>*</span>物件图片:
              </td>
              <td>
                <p>宝贝图片尺寸： 800*800px，主图大小不能超过800k.</p>
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
                <span>*</span>物件规格:
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td style="background: rgba(249, 249, 249, 1);">
                <div class="add_table">
                  <p class="tab_title">
                    服务及价格设定：
                    <el-input v-model="tj_money" v-show="tj_inp" placeholder="请输入特价价格"></el-input>
                    <el-button
                      type="success"
                      v-show="!tj_inp"
                      @click="add_fj('服务')"
                      icon="el-icon-circle-plus-outline"
                    >添加</el-button>
                  </p>
                  <table v-show="!tj_inp" class="table table2 table-bordered">
                    <tbody>
                      <tr>
                        <td>服务</td>
                        <td>价格</td>
                        <td width="30">操作</td>
                      </tr>
                      <tr v-for="(item,index) in tab1_data" :key="index">
                        <td>
                          <el-input type="text" v-model="item.goodsSpecName"></el-input>
                        </td>
                        <td>
                          <el-input type="text" v-model="item.bindPrice"></el-input>
                        </td>
                        <td width="30">
                          <img src="static/img/u2126.svg" @click="del(index)" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="add_table" v-show="!tj_inp">
                  <p class="tab_title">
                    档次:
                    <el-button
                      type="success"
                      @click="add_fj('档次')"
                      icon="el-icon-circle-plus-outline"
                    >添加</el-button>
                  </p>
                  <table class="table table2 table-bordered">
                    <tbody>
                      <tr>
                        <td>档次</td>
                        <td>档次涨价比率（%）</td>
                        <td>操作</td>
                      </tr>
                      <tr v-for="(item,index) in tab2_data" :key="index">
                        <td>
                          <el-input type="text" v-model="item.goodsSpecName"></el-input>
                        </td>
                        <td v-show="!tj_inp">
                          <el-input type="text" v-model="item.bindPrice"></el-input>
                        </td>
                        <td width="30">
                          <img src="static/img/u2126.svg" @click="del(index)" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p v-show="tj_inp" style="width:80%" class="tab_title">
                  特价物件购买数：
                  <el-input v-model="buy_num" placeholder="请输入限购数量"></el-input>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <span>*</span>物件详情:
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div id="wangeditor">
                  <div ref="editorElem" style="text-align:left;"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bottom_div">
      <el-button type="primary" @click="save">确定保存</el-button>
    </div>
  </div>
</template>
<script>
let that;
import bus from "@/http/bus";
import E from "wangeditor";
import * as axios from "@/http/http.js";
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

      //按钮组
      ischeck: "10",
      btn_list: ["快递", "EMS", "平邮"],

      //编辑器数据
      editor: null,
      editorContent: "",
      url: "",
      //添加表格数据
      tab1_data: [],
      tab2_data: [],
      radio: "0", //单选框内容
      options: "", //下拉框数据
      value: "", //下拉框的内容
      tj_inp: false,
      wj_name: "",
      tj_money: "",
      buy_num: ""
    };
  },
  mounted() {
    that = this;
    this.editor_container();
    this.get_select(); //获取下拉框内容
    this.resetSetItem("watchItem3", this.$route.path);
  },
  updated() {
    if (this.radio == "1") {
      this.tj_inp = true;
    } else {
      this.tj_inp = false;
    }
  },
  methods: {
    get_select() {
      axios.Query_classification().then(res => {
        console.log(res);
        if (res.data.status == "200") {
          that.options = res.data.data.list;
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
      let page_data = this.$route.query.data;
      if (page_data) {
        this.value = page_data.fkGoodsTypeNo;
        this.editorContent = page_data.goodsDetails;
        if (page_data.isSpecialGoods) {
          this.radio = "1";
          this.tj_money = page_data.specialValue;
          this.buy_num = page_data.specialPurchaseNum;
        } else {
          this.radio = "0";
          let data = {
            fkGoodsNo: page_data.goodsNo
          };
          console.log(data);
          axios.Query_specification(data).then(res => {
            console.log(res, "hello");
            that.tab1_data = res.data.data[4];
            that.tab2_data = res.data.data[5];
          });
        }

        this.wj_name = page_data.goodsName;
        // this.editorContent=page_data.
      }
      console.log(this.$route.query.data);
    },
    check_express(list, index) {
      this.ischeck = index;
      console.log(list);
    },
    //添加td
    add_fj(type) {
      if (type == "服务") {
        this.tab1_data.push({
          goodsSpecName: "",
          fkSpecTypesNo: "4"
        });
      } else {
        this.tab2_data.push({
          goodsSpecName: "",
          fkSpecTypesNo: "5"
        });
      }
    },
    del(index) {
      this.tab1_data.splice(index, 1);
    },
    save() {
      // 底部确定保存信息
      this.$message('确定保存信息')
      let goodsBindingSpecList = this.tab1_data.concat(this.tab2_data);
      let page_data = this.$route.query.data;
      if (page_data) {
        let data = {
          goods: {
            goodsNo: page_data.goodsNo,
            fkGoodsTypeNo: this.value,
            fkBusinessNo: "123",
            isSale: page_data.isSale,
            isCardDiscount: 1,
            isSpecialGoods: Number(this.radio),
            specialValue: this.tj_money,
            specialPurchaseNum: this.buy_num,
            goodsPrice: page_data.goodsPrice,
            goodsName: this.wj_name,
            goodsImg: "anta中国.jpg",
            defaultStorageNo: page_data.defaultStorageNo,
            goodsDetails: this.editorContent
          },
          goodsBindingSpecList: goodsBindingSpecList
        };
        axios.update_price(data).then(res => {
          console.log(res);
        });
      } else {
        let data = {
          goods: {
            fkGoodsTypeNo: this.value,
            fkBusinessNo: "123",
            isSpecialGoods: Number(this.radio),
            specialValue: this.tj_money,
            specialPurchaseNum: this.buy_num,
            goodsPrice: "10-20",
            goodsName: this.wj_name,
            goodsImg: "ghfdhgfh",
            goodsDetails: this.editorContent
          },
          goodsBindingSpecList: goodsBindingSpecList
        };
        console.log(data);
        axios.add_price(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.$message.success("添加成功");
          } else if (res.data.status == "588") {
            this.$message.error(res.data.msg);
            this.$router.push({ path: "/log" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
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
    }
  }
};
</script>
<style lang="less" scoped>
.editor_top {
  width: 94%;
  margin: 20px auto;
  min-height: 900px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
  .table1 tr td:nth-child(1) {
    text-align: right;
    width: 12%;
  }

  td span {
    color: red;
  }
  .add_table {
    width: 80%;
    button {
      float: right;
    }
    td {
      text-align: center;
    }
    .table2 tr td:nth-child(1) {
      width: 40%;
      text-align: center;
    }
    .table2 tr td:nth-child(3) {
      width: 20%;
      text-align: center;
    }
  }
}
.title_p {
  border-left: 4px solid rgba(245, 188, 16, 1);
  padding-left: 10px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(26, 188, 156);
}
.express_div {
  width: 94%;
  height: 165px;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
  .active {
    background-color: rgb(26, 188, 156);
    color: #fff;
  }
}
.after_div {
  width: 94%;
  height: 120px;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
  p:nth-child(2) {
    padding: 20px;
  }
}
.bottom_div {
  width: 94%;
  margin: 20px auto;
  button {
    margin-left: 47%;
  }
}
</style>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.tab_title {
  font-weight: 700;
  line-height: 50px;
  .el-input {
    width: 30%;
  }
}
</style>