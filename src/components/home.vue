<template>
  <div class="home_div">
    <div class="indexDiv_top">
      <p>
        <span>
          <img src="../../static/img/u1005.svg" alt />
        </span>
      </p>
      <div class="tab_header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item,index) in currentPath"
            :key="index"
            :to="{ path: item.path }"
          >{{item.meta.title}} </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="home_index" v-show="page">
      <div class="indexDiv_center">
        <div class="xihu_div">
          <div class="xihu_left">
            <span>洗护服务</span>
            <span>
              <img src="../../static/img/u274.svg" alt />
            </span>
            <span>营业中</span>
          </div>
          <div class="xihu_right">
            <p>名称（超出...表示）</p>
            <p>已缴纳保证金</p>
            <p>
              ￥
              <b>23000</b> 元
            </p>
            <p>已开店：300天</p>
            <p>
              <img src="../../static/img/star-off-1_u288.svg" alt />
              <img src="../../static/img/star-off-1_u288.svg" alt />
            </p>
          </div>
        </div>
        <div class="xihu_div" style="background-color:rgba(230, 101, 44, 1);">
          <div class="xihu_left" style="color:#E6652C">
            <span>商品销售</span>
            <span>
              <img src="../../static/img/u271.svg" alt />
            </span>
            <span>未创建</span>
          </div>
          <div class="shop_right">
            <p @click="show">
              <span>
                <img src="../../static/img/u262.svg" alt />
              </span>
              <span>创建店铺</span>
            </p>
          </div>
        </div>
      </div>
      <div class="used_div">
        <p class="title_p">常用功能</p>
        <div class="used_">
          <p v-for="(often,index) in often_list" :key="index">
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>{{often.used}}</span>
          </p>
        </div>
      </div>
      <div class="used_div">
        <p class="title_p">洗衣服务订单</p>
        <div class="laundry_div">
          <div>
            <p>待付款</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>待上门收取</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>待清点</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>待上挂(待洗涤完成)</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>待配送</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>售后退款</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <!-- <div>
            <p>待付款</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div> -->
        </div>
      </div>
      <!-- 商品订单开始 -->
      <div class="used_div">
        <p class="title_p">商品订单</p>
        <div class="laundry_div">
          <div>
            <p>待付款</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>待发货</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>售后退款</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
          <div>
            <p>待客户评价</p>
            <span>
              <img src="../../static/img/u126.svg" alt />
            </span>
            <span>888</span>
          </div>
        </div>
      </div>
      <!-- 商品订单结束 -->

      <div class="wash">
        <div class="wash_left">
          <!-- 洗涤额度趋势图开始 -->
          <div class="wash_money">
            <p class="title_p">洗涤额趋势图(近7天趋势)</p>
            <div id="myChart" :style="{width: '700px', height: '400px'}"></div>
          </div>
          <!-- 洗涤额趋势图结束 -->

          <!-- 零售额趋势图开始 -->
          <div class="wash_money">
            <p class="title_p">零售额趋势图(近7天趋势)</p>
            <div id="my_Chart" :style="{width: '700px', height: '400px'}"></div>
          </div>
          <!-- 零售额趋势图结束-->
        </div>
        <!-- 右侧衣物洗涤统计开始 -->
        <div class="wash_number">
          <p class="title_p">衣物洗涤量统计</p>
          <!-- 洗涤总量开始 -->
          <div class="washs_total">
            <p>洗涤总量</p>
            <div>
              <span>1200</span>
              件
            </div>
            <p>近7天</p>
          </div>
          <!-- 洗涤总量结束-->
          <!-- 具体洗涤衣物信息开始 -->
          <div class="washas_inf">
            <span @click="click_img">
              <img src="../../static/img/u1973.png" alt />
            </span>
            <div>
              <p>冬季棕色</p>
              <p>棕色</p>
            </div>
            <p>80</p>
          </div>
          <!-- 具体洗涤衣物信息 -->
          <p class="see_more" @click="seemore">查看更多</p>
        </div>
        <!-- 右侧衣物洗涤结束 -->
      </div>
    </div>
    <router-view v-show="!page"></router-view>
  </div>
</template>
  <script>
// debugger
import * as axios from "@/http/http.js";
import echarts from "echarts";
export default {
  data() {
    return {
      page: true,
      currentPath: [],
      often_list: [
        { used: "常用功能1" },
        { used: "常用功能2" },
        { used: "常用功能1" },
        { used: "常用功能1" },
        { used: "常用功能1" },
        { used: "常用功能1" },
        { used: "常用功能1" }
      ]
    };
  },
  created() {},
  mounted() {
    let myChart = echarts.init(document.getElementById("myChart"));
    let my_Chart = echarts.init(document.getElementById("my_Chart"));
    // console.log(myChart);
    // 洗涤额趋势开始
    myChart.setOption({
      title: { text: "", textAlign: "auto" },
      tooltip: {},
      //x轴相关
      xAxis: {
        data: [
          "23日",
          "3:00",
          "6:00",
          "9:00",
          "12:00",
          "15:00",
          "18:00",
          "21:00"
        ], //x轴的数据
        axisLine: {
          //x轴线的颜色以及宽度
          show: true,
          interval: 13,
          lineStyle: {
            // color: "#ddd",
            width: 1, //x轴粗细
            type: "solid"
          }
        }
      },
      //y轴相关
      yAxis: {
        type: "value",
        //内容横线为虚线
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        },
        axisLine: { show: false } //y轴竖线不显示
      },
      series: [
        {
          name: "销量",
          type: "line",
          itemStyle: {
            normal: {
              color: "#3AA1FF",
              lineStyle: {
                color: "#3AA1FF"
              }
            }
          },
          areaStyle: {
            normal: {
              color: "#B9DDFF" //改变区域颜色
            }
          },
          data: [1572, 857, 1487, 4875, 12014, 5784, 6787, 7754] //y轴的数据
        }
      ]
    });
    // 零售额趋势图开始
    my_Chart.setOption({
      title: { text: "", textAlign: "auto" },
      tooltip: {},
      //x轴相关
      xAxis: {
        data: [
          "23日",
          "3:00",
          "6:00",
          "9:00",
          "12:00",
          "15:00",
          "18:00",
          "21:00"
        ], //x轴的数据
        axisLine: {
          //x轴线的颜色以及宽度
          show: true,
          interval: 13,
          lineStyle: {
            // color: "#ddd",
            width: 1, //x轴粗细
            type: "solid"
          }
        }
      },
      //y轴相关
      yAxis: {
        type: "value",
        //内容横线为虚线
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        },
        axisLine: { show: false } //y轴竖线不显示
      },
      series: [
        {
          name: "销量",
          type: "line",
          itemStyle: {
            normal: {
              color: "#3AA1FF",
              lineStyle: {
                color: "#3AA1FF"
              }
            }
          },
          areaStyle: {
            normal: {
              color: "#B9DDFF" //改变区域颜色
            }
          },
          data: [1572, 857, 1487, 4875, 12014, 5784, 6787, 7754] //y轴的数据
        }
      ]
    });
    this.b();
    this.get_all();
  },
  methods: {
    click_img(){
      // 衣物洗涤量统计列表图片
      this.$message('点击列表图片')
    },
    seemore(){
        // 洗涤衣物统计查看更多事件
        this.$message('点击了查看更多')
    },
    //获取公共所需的信息
    get_all() {
      //获取所需的店铺号，或商家号
      axios.Query_business().then(res => {
        res.data.data.forEach(item => {
          if (item.businessType == "2") {
            sessionStorage.setItem("washNo", item.businessNo);
          } else if (item.businessType == "1") {
            sessionStorage.setItem("shopNo", item.businessNo);
          }
        });
      });
    },
    show() {
      this.$router.push({ path: "/creat_store" });
    },
    //面包屑
    b() {
      this.currentPath = [];
        console.log(this.$route.matched)
      for (let i = 1; i < this.$route.matched.length; i++) {
        this.currentPath.push(this.$route.matched[i]);
      }
      if (this.$route.path == "/home") {
        this.page = true;
        sessionStorage.removeItem("watchItem3");
      } else {
        this.page = false;
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.b();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.wash_left{
  width: 75%;
}
.wash {
  width: 94%;
  height: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.see_more {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.washas_inf {
  margin: 10px auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.washas_inf span img{
  cursor: pointer;
}
.wash_number {
  width: 50%;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
  height: 940px;
  // margin: 20px;
  margin-top: 10px;
  // margin-right: 10px;
  border-bottom: 0px;
  .title_p {
    border-left: 4px solid rgba(245, 188, 16, 1);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
  }
}
.washs_total {
  margin: 20px auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 98%;
}
.washs_total div span{
  font-size: 36px;
  line-height: 20px;
}
.home_index {
  min-width: 1100px;
  height: calc(100vh - 74px);
  overflow-y: auto;
  overflow-y: scroll;
}
.wash_money {
  width: 93%;
  padding: 20px;
  // margin: 10px ;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 210px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  .title_p {
    border-left: 4px solid rgba(245, 188, 16, 1);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
  }
}
.home_index::-webkit-scrollbar {
  display: none;
}
.indexDiv_top {
  line-height: 54px;
  height: 54px;
  background-color: rgba(242, 242, 242, 1);
  box-shadow: 0px 5px 5px rgba(204, 204, 204, 0.349019607843137);
  p {
    line-height: 54px;
    width: 54px;
    display: inline-block;
    span {
      padding-left: 10px;
    }
  }
  .tab_header {
    border-left: 3px solid #00e6e6;
    line-height: 54px;
    display: inline-block;
    font-size: 16px !important;
    font-weight: 700;
    line-height: 19px;
    padding-left: 10px;
  }
}
.indexDiv_center {
  width: 94%;
  margin: 20px auto;
  height: 250px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .xihu_div {
    width: 280px;
    height: 165px;
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 10px;
    border-top-left-radius: 0px;
    background-color: rgba(0, 181, 169, 1);

    span {
      display: block;
    }
    div {
      float: left;
      height: 165px;
    }
    .shop_right {
      width: 170px;
      display: flex;
      justify-content: center;
      p {
        width: 130px;
        height: 50px;
        line-height: 50px;
        background-color: #b03500;
        color: #fff;
        display: flex;
        justify-content: space-around;
        justify-items: center;
        margin-top: 35%;
        span {
          display: block;
        }
      }
      p:hover {
        cursor: pointer;
      }
    }
    .xihu_left {
      width: 100px;
      text-align: center;
      color: #00b5a9;
      span:nth-child(1) {
        background-color: #fff;
        line-height: 35px;
        border-bottom-right-radius: 20px;
      }
      span:nth-child(2) {
        margin-top: 20px;
      }
      span:nth-child(3) {
        width: 70px;
        margin: 10px auto;
        border-radius: 10px;
        background-color: #fff;
      }
    }
    .xihu_right {
      width: 170px;
      color: #fff;
      padding-left: 10px;
      b {
        color: #ffa812;
        font-size: 20px;
      }
      p:nth-child(1) {
        line-height: 40px;
      }
      p:nth-child(3) {
        line-height: 35px;
      }
      p {
        line-height: 25px;
      }
    }
  }
}
.used_div {
  width: 94%;
  padding: 20px;
  margin: 20px auto;
  min-height: 210px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  .title_p {
    border-left: 4px solid rgba(245, 188, 16, 1);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .used_ {
    p {
      width: 14%;
      background-color: rgba(242, 242, 242, 1);
      border-radius: 10px;
      margin: 15px 1.3%;
      display: inline-block;
    }
    span:nth-child(1) {
      width: 28%;
    }
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    span:nth-child(2) {
      width: 69%;
      border: 1px solid rgba(215, 215, 215, 1);
    }
  }
  .laundry_div {
    div {
      display: inline-block;
      margin: 15px 1.3%;
      width: 17%;
      height: 125px;
      border: 1px solid rgba(215, 215, 215, 1);
      color: #1abc9c;
      border-radius: 5px;
      p {
        height: 45px;
        background-color: rgba(242, 242, 242, 1);
        border-bottom: 1px solid rgba(215, 215, 215, 1);
        text-align: center;
        line-height: 45px;
      }
      span {
        display: inline-block;
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
      span:nth-child(2) {
        width: 30%;
      }
      span:nth-child(3) {
        width: 60%;
        color: #000;
      }
    }
  }
}
</style>