<template>

  <section class="orders-page">
    <div class="container">

      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item >Пополнение счета</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="orders grid-wrapper">
        <div class="orders-left">
          <el-radio-group class="pay-types" v-for="type in payment_types" :key="type.id" v-model="payment.pay_type">
            <el-radio-button class="pay-radio" :label="type.method"><div class="pay-type">
              <img :src="type.icon" alt="">
              <p>{{type.name}}</p>
            </div>
            </el-radio-button>

          </el-radio-group>

          <el-form :inline="true" :model="payment" class="demo-form-inline">
            <el-form-item>
              <el-input-number
               :min="100"
               :max="Infinity"
               :step="100"

              v-model="payment.amount">
            </el-input-number>
            </el-form-item>
            <el-form-item>
               <el-button :disabled="!payment.amount || !payment.pay_type" :loading="is_pay_request" @click="sendPayment" type="primary">Оплатить</el-button>
            </el-form-item>
          </el-form>

          <h3 class="section-header mb-20">История платежей</h3>

  <el-button @click="clearFilter">Сбросить фильтры</el-button>
  <el-table
    class="mb-60"
    ref="filterTable"
    :data="payments"
    style="width: 100%">
    <el-table-column
      prop="created_at"
      label="Дата"
      sortable
      column-key="date"
      :filter-method="filterHandler"
    >
      <template slot-scope="scope">
        <p> {{new Date(scope.row.created_at).toLocaleString()}}</p>
      </template>


    </el-table-column>
    <el-table-column
      prop="amount"
      label="Сумма"

      >
      <template slot-scope="scope">
        <p> {{scope.row.amount}} руб</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="type.name"
      label="Платежная система">
    </el-table-column>
    <el-table-column
      prop="is_payed"
      label="Cтатус"

      :filters="[{ text: 'Оплачено', value: true }, { text: 'Не оплачено', value: false }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.is_payed === true ? 'success' : 'danger'"
          disable-transitions>
          {{scope.row.is_payed ? 'Оплачено' : 'Не оплачено'}}
        </el-tag>
      </template>
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
        const  response_payment_types = await $axios.get(`/api/v1/user/all_payment_types/`)
        const  response_payments = await $axios.get(`/api/v1/user/all_payments?user_id=${$auth.user.id}`)
        const payment_types = response_payment_types.data
        const payments = response_payments.data
        console.log(payments)
        return {payment_types,payments }
      }catch (e) {
        throw e
      }

    },

    data() {
      return {
        is_pay_request:false,
        payment:{
          amount:null,
        pay_type:null,
        }
      }
    },
    components:{
      Sidebar,
    },
    mounted() {

      if($nuxt.$route.query['pay_id']){
        console.log($nuxt.$route.query['pay_id'])
        this.$axios.post(`/api/v1/user/check_payment/`,{pay_id:$nuxt.$route.query['pay_id']}).then(res=>{
          console.log(res)
        })
      }
    },
    created() {


    },
    watch:{

    },
    computed:{


    },
    methods: {
       async sendPayment(){
         this.is_pay_request=true
         const response = await this.$axios.post(`/api/v1/user/new_payment/`,this.payment)
         console.log(response)
         if (response.status === 200){
           window.location.href = response.data
         }
       },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.is_payed === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }


    }
  }
</script>

