<template>
  <div id="container">
    <LoadingPage v-if="isLoading"></LoadingPage>
    <mu-container v-else>
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-title :title=" '请 '+realname+' 确认订单' " :sub-title=" '余额: ' + money"></mu-card-title>
      </mu-card>
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-header title="梅园1-4" sub-title="梅3b120">

          <mu-avatar slot="avatar">
            <mu-icon size="49" value="home"></mu-icon>
          </mu-avatar>
        </mu-card-header>
      </mu-card>
      <mu-paper :z-depth="1" class="demo-list-wrap">
        <mu-list>
          <mu-sub-header>Today</mu-sub-header>
          <mu-list-item avatar button :ripple="false" v-for="(food,index) in carShops" :key="index">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="food.foodImg">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{food.foodName |  filterName}}</mu-list-item-title>
            <mu-list-item-title style="text-align:center;">×{{food.number}}</mu-list-item-title>
            <mu-list-item-action>
              <span>￥{{food.number*food.price}}</span>
            </mu-list-item-action>
          </mu-list-item>

        </mu-list>
      </mu-paper>
    </mu-container>
    <PurchaseBar :price="$store.state.buyfood.tp" :username="username" :userid="userid" @changeMoney="updateMoney"></PurchaseBar>
  </div>
</template>

<script>
import PurchaseBar from "@/components/PurchaseBar";

export default {
  name: "Purchase",
  components: { PurchaseBar },
  data() {
    return {
      isLoading:true,
      realname: "",
      money: 0,
      username: "",
      userid: ""
    };
  },
  created() {
    this.axios.get("/api2/users/getuser").then(res => {
      if (res.data.state === 0) {
        console.log(res.data.data);
        var data = res.data && res.data.data;
        this.realname = data.realname;
        this.username = data.username;
        this.money = data.money;
        this.userid = data.userid;
      }
    });
  },
  mounted(){
    this.isLoading = false;
  },
  filters: {
    filterName(val) {
      return val.slice(0, 6);
    }
  },
  computed: {
    carShops() {
      return this.$store.state.buyfood.carShops;
    }
  },
  methods: {
    updateMoney(newMoney) {
      this.money = newMoney;
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: absolute;
  width: 100%;
  height: 563px;
  margin: 56px auto;
  padding: 0;
}

span {
  color: red;
}
</style>
