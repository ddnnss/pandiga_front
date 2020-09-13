<template>

  <section class="orders-page">
    <div class="container">
      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/apply/'}">Мои предложения</el-breadcrumb-item>
        <el-breadcrumb-item >Детали заявки №{{order.id}}</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="orders grid-wrapper">
        <div class="orders-left">
          <el-card class="order" :body-style="{padding:'0'}">
            <p class="fs-14 mb-10">Заявка номер: {{order.id}}</p>
            <div class="order__top">

              <p class="order__top-name">{{order.name}}</p>
                <el-tag v-if="order.rent_type" effect="plain" type="info">на {{order.rentDate}} с {{order.rentStartTime}} до {{order.rentEndTime}} </el-tag>
                <el-tag v-else effect="plain" type="info">с {{order.rentStartDate}} до {{order.rentEndDate}}</el-tag>
            </div>
            <p class="order__text">Требуется {{order.type.name_lower}} c характеристиками: <span v-for="(filter,key) in order.filter">{{filter}}: {{order.filter_value[key]}} | </span></p>
            <p class="order__text">Описание: {{order.comment}}</p>


            <div class="order__middle">


            </div>
            <div class="order__bottom">
              <el-tag v-if="!order.is_finished" type="warning" class="order__bottom-text text-bold">Выполнятся с: {{new Date(order.update_at).toLocaleString()  }}</el-tag>
              <el-tag v-else type="success" class="order__bottom-text text-bold">Выполнено</el-tag>
<!--              <el-button v-if="order.worker && !order.is_finished" @click="closeOrder(order.id)" type="primary">Завершить</el-button>-->

            </div>
          </el-card><!--          order-->
          <div v-if="order.is_finished && !order.worker_feedback">

          <div class="mb-20" >
            <el-card class="box-card" shadow="never">
              <div class="">
                <p class="mb-20">Оцените заказчика</p>
                <el-rate
                  class="mb-20"
                v-model="feedbackData.rate_value"
                :texts="['Не советую', 'Плохо', 'Средне', 'Хорошо', 'Отлично']"
                show-text>
              </el-rate>
                <el-input
                  class="mb-20"
                  type="textarea"
                  :rows="2"
                  placeholder="Ваш отзыв"
                  v-model="feedbackData.rate_text">
                </el-input>
                <el-button @click="sendFeedback" type="primary">Оставить отзыв</el-button>

              </div>



            </el-card>
          </div>
          </div>
        </div>
        <el-card class="orders-right bg-grey h-fit  sticky-block mobile-hide" :body-style="{ width: '100%' }">
           <ul class="lk-menu__list">
                <li class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/profile/'">Профиль</nuxt-link> </li>
                <li class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/chats/'">Сообщения</nuxt-link> </li>
                <li v-if="this.$auth.user.is_customer" class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/chats/'">Избранное</nuxt-link> </li>

                <li v-if="this.$auth.user.is_customer" class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/orders/'">Мои заявки на технику</nuxt-link> </li>
                <li v-else class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/apply/'">Мои предложения</nuxt-link> </li>
          </ul>
        </el-card>
      </div>
    </div>
  </section>




</template>

<script>
  export default {
    async asyncData({$axios,params}){
      console.log(params)
      try{
        const  response_order= await $axios.get(`/api/v1/order/get_lk_order/${params.name_slug}`)
        const order = response_order.data
        console.log(order)
        return {order,}

      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        offer_units:0,
        value2:false,
        is_finished:false,

        feedbackData:{
           rate_value:null,
          rate_text:'',

        },


      }
    },
    mounted() {


    },
    methods: {
      async sendFeedback(){
        const respond = await this.$axios.post('/api/v1/user/add_feedback/',{data:this.feedbackData,to:this.order.worker.id,order:this.order.id})
        window.location.reload()
      },
      async closeOrder(id){
        const respond = await this.$axios.post('/api/v1/order/close/',{
          order_id:id
        })
        window.location.reload()
      },
      async applyAccept(worker_id,worker_unit_id){
        const respond = await this.$axios.post('/api/v1/order/apply/accept/',{
          order_id:this.order.id,
          worker_id:worker_id,
          worker_unit_id:worker_unit_id
        })
        console.log(respond)
        window.location.reload()
      },
      async applyDecline(worker_id,apply_unit_id){
        const respond = await this.$axios.post('/api/v1/order/apply/decline/',{
          order_id:this.order.id,
          worker_id:worker_id,
          apply_unit_id:apply_unit_id
        })
        console.log(respond)
      },

    }
  }
</script>

