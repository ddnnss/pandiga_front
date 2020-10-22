<template>

  <section class="orders-page">
    <div class="container">
      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/orders/'}">Мои заявки на технику</el-breadcrumb-item>
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
              <div v-if="!order.is_finished">
                <p v-if="!order.worker" class="order__bottom-text">Размещено: {{new Date(order.created_at).toLocaleString()  }}<br>
              Просмотров: {{order.views }}<br>
              Предложений: {{order.apply_units.length }}</p>
              <el-tag type="warning" v-if="order.worker" class="order__bottom-text color-main text-bold">Выполнятся с: {{new Date(order.update_at).toLocaleString()  }}</el-tag>
              </div>
              <div v-else>
                <el-tag class="text-bold" type="success">Выполнена</el-tag>
              </div>
              <el-button v-if="order.worker && !order.is_finished" @click="closeOrder(order.id)" type="primary">Завершить</el-button>

            </div>
          </el-card><!--          order-->
          <div v-if="!order.is_finished ">
            <div v-if="!order.worker" class="">
              <h3 v-if="order.apply_units.length >0"  class="section-header f25">Предложения от исполнителей</h3>
              <h3 v-else  class="section-header f25">Предложении от исполнителей пока не поступало</h3>


              <div class="catalog-item "  v-for="unit in order.apply_units" :key="unit.id" :class="{vipItem : unit.is_vip}">
                <div class="catalog-item__img">
                  <el-tag v-if="unit.is_moderated" class="catalog-item__checked" type="success" effect="dark">Проверен</el-tag>
                  <!--              <img :src="base_url + unit.images[0].image_thumb" alt="">-->
                  <nuxt-link :to="{'path' : `/catalog/${unit.type.name_slug}/${unit.name_slug}/`} ">
                    <el-image :src="unit.images[0].image_thumb">
                      <div slot="placeholder" class="image-slot">
                        Загрузка<span class="dot">...</span>
                      </div>
                    </el-image>
                  </nuxt-link>
                  <!--              <div class="catalog-item__rating mobile-show">-->
                  <!--                <div v-if="unit.rate_times > 0" class="catalog-item__rating-wraper">-->
                  <!--                  <p class="catalog-item__rating-p">{{unit.rating}} </p>-->
                  <!--                  <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>-->
                  <!--                </div>-->
                  <!--                <span class="catalog-item__rating-span">Мин. время заказа:<br> от {{unit.min_rent_time}} <span v-if="unit.rent_type">ч</span> <span v-if="!unit.rent_type">д</span>-->
                  <!--                </span>-->
                  <!--              </div>-->
                </div>
                <div class="catalog-item__info">
                  <p class="catalog-item__info-title"> <nuxt-link :to="{'path' : `/catalog/${unit.type.name_slug}/${unit.name_slug}/`} ">{{unit.name}}, 2007</nuxt-link>  </p>
                  <p class="catalog-item__info-subtitle">2.5 л ( 174 л.c.), дизель, автомат, 4WD</p>
                  <p class="catalog-item__info-subtitle grey mobile-hide">Мин. время заказа: от {{unit.min_rent_time}} <span v-if="unit.rent_type"> ч</span>
                    <span v-if="!unit.rent_type"> д</span></p>
                  <div class="mobile-show">
                    <div v-if="unit.rate_times > 0" class="catalog-item__rating-wraper">
                      <p class="catalog-item__rating-p">{{unit.rating}} </p>
                      <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>
                    </div>
                    <p class="catalog-item__price-summ ">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span><br>
                      <span class="catalog-item__rating-span">Мин. время заказа:<br> от {{unit.min_rent_time}} <span v-if="unit.rent_type">ч</span> <span v-if="!unit.rent_type">д</span>
                  </span>
                    </p>
                    <span class="catalog-item__rating-span ">{{unit.city}}</span>
                  </div>

                </div>
                  <div class="order-buttons">
                    <el-button plain @click="applyAccept(unit.owner,unit.id)">Принять</el-button>
                    <el-button type="primary" @click="applyDecline(unit.owner,unit.id)">Отказать</el-button>
                  </div>
                <div class="catalog-item__price mobile-hide hide-block">
                  <p class="catalog-item__price-summ">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span></p>
                  <div v-if="unit.rate_times > 0" class="catalog-item__rating ">
                    <p class="catalog-item__rating-p">{{unit.rating}} </p>
                    <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>
                  </div>
                  <span class="catalog-item__rating-span">{{unit.city}}</span>
                </div>
              </div><!--catalog-item-->

            </div>
            <div v-else>
              <h3 class="section-header f25">Выбрано предложение от {{order.worker.fullname}}</h3>
              <div class="catalog-item "   :class="{vipItem : order.worker_unit.is_vip}">
                <div class="catalog-item__img">
                  <el-tag v-if="order.worker_unit.is_moderated" class="catalog-item__checked" type="success" effect="dark">Проверен</el-tag>
                  <!--              <img :src="base_url + unit.images[0].image_thumb" alt="">-->
                  <nuxt-link :to="{'path' : `/catalog/${order.worker_unit.type.name_slug}/${order.worker_unit.name_slug}/`} ">
                    <el-image :src="order.worker_unit.images[0].image_thumb">
                      <div slot="placeholder" class="image-slot">
                        Загрузка<span class="dot">...</span>
                      </div>
                    </el-image>
                  </nuxt-link>
                  <!--              <div class="catalog-item__rating mobile-show">-->
                  <!--                <div v-if="unit.rate_times > 0" class="catalog-item__rating-wraper">-->
                  <!--                  <p class="catalog-item__rating-p">{{unit.rating}} </p>-->
                  <!--                  <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>-->
                  <!--                </div>-->
                  <!--                <span class="catalog-item__rating-span">Мин. время заказа:<br> от {{unit.min_rent_time}} <span v-if="unit.rent_type">ч</span> <span v-if="!unit.rent_type">д</span>-->
                  <!--                </span>-->
                  <!--              </div>-->
                </div>
                <div class="catalog-item__info">
                  <p class="catalog-item__info-title"> <nuxt-link :to="{'path' : `/catalog/${order.worker_unit.type.name_slug}/${order.worker_unit.name_slug}/`} ">{{order.worker_unit.name}}, 2007</nuxt-link>  </p>
                  <p class="catalog-item__info-subtitle">2.5 л ( 174 л.c.), дизель, автомат, 4WD</p>
                  <p class="catalog-item__info-subtitle grey mobile-hide">Мин. время заказа: от {{order.worker_unit.min_rent_time}} <span v-if="order.worker_unit.rent_type"> ч</span>
                    <span v-if="!order.worker_unit.rent_type"> д</span></p>
                  <div class="mobile-show">
                    <div v-if="order.worker_unit.rate_times > 0" class="catalog-item__rating-wraper">
                      <p class="catalog-item__rating-p">{{order.worker_unit.rating}} </p>
                      <span class="catalog-item__rating-span">{{order.worker_unit.rate_times}} отзыв</span>
                    </div>
                    <p class="catalog-item__price-summ ">{{order.worker_unit.rent_price}} руб./ <span v-if="order.worker_unit.rent_type"> ч</span> <span v-if="!order.worker_unit.rent_type"> д</span><br>
                      <span class="catalog-item__rating-span">Мин. время заказа:<br> от {{order.worker_unit.min_rent_time}} <span v-if="order.worker_unit.rent_type">ч</span> <span v-if="!order.worker_unit.rent_type">д</span>
                  </span>
                    </p>
                    <span class="catalog-item__rating-span ">{{order.worker_unit.city}}</span>
                  </div>
                </div>
                <div class="catalog-item__price mobile-hide hide-block">
                  <p class="catalog-item__price-summ">{{order.worker_unit.rent_price}} руб./ <span v-if="order.worker_unit.rent_type"> ч</span> <span v-if="!order.worker_unit.rent_type"> д</span></p>
                  <div v-if="order.worker_unit.rate_times > 0" class="catalog-item__rating ">
                    <p class="catalog-item__rating-p">{{order.worker_unit.rating}} </p>
                    <span class="catalog-item__rating-span">{{order.worker_unit.rate_times}} отзыв</span>
                  </div>
                  <span class="catalog-item__rating-span">{{order.worker_unit.city}}</span>
                </div>
              </div><!--catalog-item-->
            </div>
          </div>
          <div class="mb-20" v-else>
            <div v-if="!order.customer_feedback">
              <el-card class="box-card" shadow="never">
              <div class="">
                <p class="mb-20">Оцените исполнителя</p>
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
       <sidebar></sidebar>
      </div>
    </div>
  </section>




</template>

<script>
  import Sidebar from '@/components/Sidebar';
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
    components:{
      Sidebar,
    },
    mounted() {
    },
    methods: {
      async sendFeedback(){
        const respond = await this.$axios.post('/api/v1/technique/add_feedback/',{data:this.feedbackData,to:this.order.worker_unit.id,order:this.order.id})
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

