<template>

  <section class="orders-page">
    <div class="container">
      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/orders/'}">Заявки на технику</el-breadcrumb-item>
        <el-breadcrumb-item >Заявка №{{order.id}} - {{order.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 class="section-header mb-60">Предложить технику</h1>
<!--      {{order}}-->



      <el-card class="order" :body-style="{ padding: '0px' }">
        <div class="order__top">
          <p class="order__top-name">{{order.name}}</p>
         <el-tag v-if="order.rent_type" effect="plain" type="info">на <b>{{order.rentDate}}</b> с {{order.rentStartTime}} до {{order.rentEndTime}} </el-tag>
                <el-tag v-else effect="plain" type="info">с {{order.rentStartDate}} до {{order.rentEndDate}}</el-tag>
        </div>
        <p class="order__text">Требуется {{order.type.name_lower}} c характеристиками: <span v-for="(filter,key) in order.filter">{{filter}}: {{order.filter_value[key]}} | </span></p>
        <p class="order__text">Описание: {{order.comment}}</p>


        <div class="order__middle">
          <img class="order__middle-img" :src="order.owner.avatar" alt="">
          <div class="order__middle-group">
            <p class="order__middle-name"><nuxt-link :to="'/'"> {{order.owner.fullname}}</nuxt-link></p>
            <p class="order__middle-info">Размещено заявок: {{order.owner.orders_count}}</p>
          </div>
        </div>
        <div class="order__bottom">
          <p class="order__bottom-text">Размещено: {{new Date(order.created_at).toLocaleString()  }}</p>
        </div>
      </el-card><!--          order-->

      <h3 v-if="offer_units !== 0" class="section-header f25">Какую технику предложить</h3>
      <h3 v-else class="section-header f25">У Вас нет подходяшей техники для этой заявки</h3>
      <div class="technique-cards mb-60">
        <el-card :body-style="{ padding: '0px' }"  v-if="unit.type.id === order.type.id" class="technique-card" v-for="unit in user_units" :key="unit.id" :xs="24" :sm="12" :md="8" :lg="8">
         <span style="display: none">{{offer_units+=1}}</span>
          <el-image class="technique-card__img" :src="unit.images[0].image_thumb">
            <div slot="placeholder" class="image-slot">
              Загрузка<span class="dot">...</span>
            </div>
          </el-image>
          <p class="technique-card__name">{{unit.name}}</p>
          <p class="technique-card__price mb-20">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> час</span> <span v-if="!unit.rent_type"> день</span> </p>
          <el-button v-if="!order.apply_units.includes(unit.id)" @click="applyUnit(unit.id)" plain class="full-w">Предложить</el-button>
          <el-button v-else  plain class="full-w">Техника уже предложена</el-button>

        </el-card>
      </div>
    </div>
<!--    {{user_units}}-->
  </section>




</template>

<script>
  export default {
    async asyncData({$axios,params}){
      console.log(params)
      try{
        const  response_order= await $axios.get(`/api/v1/order/get_order/${params.name_slug}`)
        const  user_units_temp = await $axios.get(`/api/v1/technique/user/units/`)
        const user_units = user_units_temp.data
        const order = response_order.data
        console.log(user_units)
        return {order,user_units}

      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        offer_units:0,
        value2:false,

      }
    },
    mounted() {


    },
    methods: {
      async applyUnit(u_id){
        const respond = await this.$axios.post('/api/v1/order/apply/',{order_id:this.order.id,unit_id:u_id})
        console.log(respond)
        window.location.reload()
      }

    }
  }
</script>

