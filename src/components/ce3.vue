<template>
  <div class="safetyInfo">
    <h1>搜索功能测试</h1>
    <input type="text" name id placeholder="搜索" v-model="search" />
    <button @click="btn">搜索</button>
    <ul v-for="(list,index) in searchData" :key="index">
      <li>
        <span>{{list.name}}</span>
        <span>{{list.date}}</span>
        <span>{{list.depart}}</span>
        <span>{{list.num}}</span>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      search: "",
      searchData: "",
      products: [
        //假数据
        { name: "数据1", date: "2018-01-04", depart: "泸化工1",num:"13" },
        { name: "数据2", date: "2018-01-25", depart: "泸化工2",num:"12" },
        { name: "数据3", date: "2019-02-10", depart: "泸化工3",num:"23" },
        { name: "数据4", date: "2018-03-04", depart: "泸化工4",num:"55" },
        { name: "数据5", date: "2018-05-24", depart: "泸化工5",num:"44" },
        { name: "数据6", date: "2018-10-29", depart: "泸化工6",num:"12" }
      ]
    };
  },
  mounted(){
    this.searchData=this.products
  },
  methods: {
    btn() {
      var search = this.search;
      if (search) {
        this.searchData = this.products.filter(function(product) {
          console.log(product);
          return Object.keys(product).some(function(key) {
            console.log(key);
            return (
              String(product[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
    }
  }
};
</script>