<template>

  <section class="orders-page">
    <div class="container">

      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item >Партнерская программа</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="orders grid-wrapper">
        <div class="orders-left">
          <h3 class="section-header mb-20">Ваш партнерский баланс: {{this.$auth.user.partner_balance}}</h3>

          <div v-if="this.$auth.user.partner_balance>0" class="mb-50">
              <p class="section-sub-header mb-20">Перечислить на основной баланс</p>
             <el-input-number v-model="partner_balance" :min="0" :max="this.$auth.user.partner_balance" :step="100"></el-input-number>
          <el-button type="primary" @click="sendMoney">Перечислить</el-button>
          </div>
          <p >История начислений</p>
          <el-table
            :data="refferals"
            style="width: 100%">
            <el-table-column
              prop="created_at"
              label="Дата активации кода"
              width="180">
            </el-table-column>
            <el-table-column
              prop="refferal.fullname"
              label="Пользователь"
              width="180">
            </el-table-column>
            <el-table-column
              prop="earned"
              label="Доход">
            </el-table-column>
          </el-table>
        </div>
        <sidebar></sidebar>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from '@/components/Sidebar';
export default {
  async asyncData({$axios,$auth}){

    try{
      const response_refferals = await $axios.get(`/api/v1/user/get_refferals/`)


      const refferals = response_refferals.data

      console.log(refferals)
      return {refferals}
    }catch (e) {
      throw e
    }

  },

  data() {
    return {
      partner_balance:this.$auth.user.partner_balance
    }
  },
  components:{
    Sidebar,
  },
  methods: {
    async sendMoney(){
      await this.$axios.post('/api/v1/user/bonuses_to_money',{amount:this.partner_balance})
      this.$auth.fetchUser()
      this.partner_balance = this.$auth.user.partner_balance
    }

  }
}
</script>

