<template>

  <section class="orders-page">
    <div class="container">

      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item >Мои предложения</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="orders grid-wrapper">
        <div class="orders-left">
          <div v-if="orders_accepted.length>0">
               <h3 class="mb-20">Принятые</h3>
          <el-card class="order" v-for="order in orders_accepted" :key="order.id" :body-style="{padding: '0'}">
            <div class="order__top">
              <p class="order__top-name"><nuxt-link :to="'/lk/apply/'+order.name_slug"> {{order.name}}</nuxt-link></p>
                <el-tag v-if="order.rent_type" effect="plain" type="info">на {{order.rentDate}} с {{order.rentStartTime}} до {{order.rentEndTime}} </el-tag>
                <el-tag v-else effect="plain" type="info">с {{order.rentStartDate}} до {{order.rentEndDate}}</el-tag>




            </div>
            <p class="order__text">Тип техники : {{order.type.name_lower}}<br>
            Характеристики : <span v-for="(filter,key) in order.filter">{{filter}}: {{order.filter_value[key]}} | </span></p>

            <div v-if="order.comment">
              <el-tooltip  v-if="order.comment.length > 11" class="item" effect="light" :content="order.comment" placement="bottom-start">
                <p  style="cursor: pointer; display: inline-block" class="order__text">{{order.comment.substring(0,10)}}...</p>
              </el-tooltip>

              <p v-else class="order__text">{{order.comment}}</p>
            </div>

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

              <el-button v-if="!order.worker" @click="cancelApply(order.id)" type="primary">Отменить предложение</el-button>

            </div>
          </el-card><!--  :pager-count="total_pages"        order-->
          </div>

         <div v-if="orders.length>0">
            <h3 class="mb-20">Все</h3>
          <el-card class="order" v-for="order in orders" :key="order.id" :body-style="{padding: '0'}">
            <div class="order__top">
              <p class="order__top-name"><nuxt-link :to="'/lk/apply/'+order.name_slug"> {{order.name}}</nuxt-link></p>
                <el-tag v-if="order.rent_type" effect="plain" type="info">на {{order.rentDate}} с {{order.rentStartTime}} до {{order.rentEndTime}} </el-tag>
                <el-tag v-else effect="plain" type="info">с {{order.rentStartDate}} до {{order.rentEndDate}}</el-tag>




            </div>
            <p class="order__text">Тип техники : {{order.type.name_lower}}<br>
            Характеристики : <span v-for="(filter,key) in order.filter">{{filter}}: {{order.filter_value[key]}} | </span></p>

            <div v-if="order.comment">
              <el-tooltip  v-if="order.comment.length > 11" class="item" effect="light" :content="order.comment" placement="bottom-start">
                <p  style="cursor: pointer; display: inline-block" class="order__text">{{order.comment.substring(0,10)}}...</p>
              </el-tooltip>

              <p v-else class="order__text">{{order.comment}}</p>
            </div>

            <div class="order__middle">

            </div>
            <div class="order__bottom">
              <p v-if="!order.worker" class="order__bottom-text">Размещено: {{new Date(order.created_at).toLocaleString()  }}<br>
              Просмотров: {{order.views }}<br>
              Предложений: {{order.apply_units.length }}</p>
              <p v-else class="order__bottom-text color-main text-bold">Выполнятся с: {{new Date(order.update_at).toLocaleString()  }}</p>
              <el-button v-if="!order.worker" @click="cancelApply(order.id)" type="primary">Отменить предложение</el-button>
            </div>
          </el-card><!--  :pager-count="total_pages"        order-->
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
    async fetch({store}){

      if (store.getters['categories/categories'].length === 0){
        await store.dispatch('categories/fetchCategories')
      }
      // if (store.getters['cities/cities'].length === 0){
      //   await store.dispatch('cities/fetchCities')
      // }
    },
    async asyncData({$axios,params}){
      console.log(params)
      try{
        const response_orders = await $axios.get(`/api/v1/order/get_user_orders_applyed/`)
        const response_orders_accepted = await $axios.get(`/api/v1/order/get_user_orders_accepted/`)
        console.log(response_orders)
        const total_pages = response_orders.data.page_count -1
        const orders = response_orders.data.results
        const orders_accepted = response_orders_accepted.data.results

        console.log(total_pages)
        return {orders,total_pages,orders_accepted}
      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        subscribe_text:'Подписаться на уведомления',
        subscribe:false,
        cur_type_id:0,
        cur_type_name:'',
        cur_type_slug:'all',


      }
    },
    components:{
      Sidebar,
    },
    mounted() {

    },
    watch:{
      subscribe(val){
        val ? this.subscribe_text='Отменить подписку на уведомления' : this.subscribe_text='Подписаться на уведомления'
      }
    },
    computed:{
      categories(){
        return this.$store.getters['categories/categories']
      },

    },
    methods: {
      pageChange(val){
        this.getOrders(this.cur_type_slug,this.cur_type_id,this.cur_type_name,val)
      },
      async deleteOrder(id){
        const respond = await this.$axios.post('/api/v1/order/delete/',{
          order_id:id
        })
        this.getOrders(this.cur_type_slug,this.cur_type_id,this.cur_type_name,1)
        console.log(respond)
      },

      getNum(id){
        let cat = this.categories.find(x => x.id === id)
        let orders_count = 0
        for(let t of cat.types){
          orders_count += t.orders_count
        }
        return orders_count
      },
      async getOrders(slug,id,name,page){
        const response_orders = await this.$axios.get(`/api/v1/order/get_user_orders/?page=${page}`)
        this.orders = response_orders.data.results
        this.cur_type_id=id
        this.cur_type_name=name
        this.cur_type_slug=slug
        this.total_pages = response_orders.data.page_count -1
        this.$auth.user.subscribe_type.includes(id) ? this.subscribe = true : this.subscribe = false
      },

    }
  }
</script>

