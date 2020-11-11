<template>

  <section class="orders-page">
    <div class="container">

      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item >Заявки на технику</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="section-header__wrapper mb-60">
        <h1 v-if="cur_type_id === 0" class="section-header text-center ">Заявки на технику</h1>
        <h1 v-else class="section-header text-center ">Заявки на {{cur_type_name}}</h1>
        <el-switch
          v-if="cur_type_id!==0"
          v-model="subscribe"
          active-color="#CC0000"
          :active-text="subscribe_text"
          @change="subscribeChange"
          inactive-color="#CECECE">
        </el-switch>
      </div>

      <div class="orders grid-wrapper">
        <div class="orders-left">
          <el-card shadow="hover" :body-style="{ padding: '0px' }" class="order" v-for="order in orders" :key="order.id">
            <div class="order__top">
              <p class="order__top-name"><nuxt-link :to="'/orders/'+order.name_slug"> {{order.name}}</nuxt-link></p>

              <el-tag v-if="order.rent_type" effect="plain" type="info">на <b>{{order.rentDate}}</b> с {{order.rentStartTime}} до {{order.rentEndTime}} </el-tag>
                <el-tag v-else effect="plain" type="info">с {{order.rentStartDate}} до {{order.rentEndDate}}</el-tag>


            </div>
            <p class="order__text">Тип техники : {{order.type.name_lower}}</p>

            <div v-if="order.comment">
              <el-tooltip v-if="order.comment.length > 11" class="item" effect="light" :content="order.comment" placement="bottom-start">
                <p  style="cursor: pointer; display: inline-block" class="order__text">{{order.comment.substring(0,10)}}...</p>
              </el-tooltip>

              <p v-else class="order__text">{{order.comment}}</p>
            </div>

            <div class="order__middle">
              <img class="order__middle-img" :src="order.owner.avatar" alt="">
              <div class="order__middle-group">
                <p v-if="order.owner.is_person" class="order__middle-name"><nuxt-link :to="'/user/'+order.owner.id"> {{order.owner.fullname}}</nuxt-link></p>
                <p v-else class="order__middle-name"><nuxt-link :to="'/user/'+order.owner.id"> {{order.owner.organization_name}}</nuxt-link></p>
                <p class="order__middle-info">Размещено заявок: {{order.owner.orders_count}}</p>
                 <div v-if="order.owner.rate_times > 0" class="catalog-item__rating mb-10">
                  <p class="catalog-item__rating-p">{{order.owner.rating}} </p>
                  <span class="catalog-item__rating-span">Отзывов: {{order.owner.rate_times}} </span>
                </div>
              </div>
            </div>
            <div class="order__bottom">
              <p class="order__bottom-text">Размещено: {{new Date(order.created_at).toLocaleString()  }}</p>


              <div class="">
                 <p style="font-size: 11px;margin-bottom: 5px" class="color-main text-center" v-if="order.apply_units.some(v => $auth.user.units.includes(v)) ">Есть предложенная Вами техника</p>


                 <el-button plain><nuxt-link :to="'/orders/'+order.name_slug"> Предложить технику</nuxt-link></el-button>
              </div>

            </div>
          </el-card><!--  :pager-count="total_pages"        order-->

          <el-pagination
            @current-change="pageChange"
            :hide-on-single-page="true"
            :total="total_pages"
            :page-size="2"
            layout="prev, pager, next">
          </el-pagination>


        </div>
        <div class="orders-right  h-fit  sticky-block">
          <el-card shadow="always">
      <div class="section-header f25">Каталог заявок</div>
          <el-collapse  accordion>
            <el-collapse-item v-for="category in categories" :key="category.id" :title="category.name+' ('+getNum(category.id)+')'" :name="category.id ">
              <ul>
                <li v-for="type in category.types" :key="type.id"><p style="cursor: pointer" @click="getOrders(type.name_slug,type.id,type.name_lower,1)">{{type.name}} ({{type.orders_count}})</p></li>
              </ul>
            </el-collapse-item>
          </el-collapse>

    </el-card>




        </div>
      </div>





    </div>
  </section>




</template>

<script>
  export default {
    async fetch({store}){

      if (store.getters['categories/categories'].length === 0){
        await store.dispatch('categories/fetchCategories')
      }

    },
    async asyncData({$axios,params,$auth}){
      console.log(params)
      try{
        const response_orders = await $axios.get(`/api/v1/order/get_orders?type_slug=all&city=${$auth.user ? $auth.user.city.id : 0}`)

        console.log($auth.user)
        console.log(response_orders)

        const total_pages = response_orders.data.page_count -1
        const orders = response_orders.data.results

        console.log(total_pages)
        return {orders,total_pages}
      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        subscribe_text:'Подписаться на уведомления',
        subscribe:false,
        cur_type_id:0,
        applyUnits:0,
        cur_type_name:'',
        cur_type_slug:'all',


      }
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
      async subscribeChange(){
        if(this.subscribe){
          const response = await this.$axios.get(`/api/v1/order/subscribe?type=add&type_id=${this.cur_type_id}`)
          await this.$auth.fetchUser()
        }
        else{
          const response = await this.$axios.get(`/api/v1/order/subscribe?type=del&type_id=${this.cur_type_id}`)
          await this.$auth.fetchUser()
        }
      },
      async getOrders(slug,id,name,page){
        const response_orders = await this.$axios.get(`/api/v1/order/get_orders?type_slug=${slug}&page=${page}&city=${this.$auth.user ? this.$auth.user.city.id : 0}`)
        this.orders = response_orders.data.results
        this.cur_type_id=id
        this.cur_type_name=name
        this.cur_type_slug=slug
        this.total_pages = response_orders.data.page_count -1
        this.$auth.user.subscribe_type.includes(id) ? this.subscribe = true : this.subscribe = false
      },
      getNum(id){
        let cat = this.categories.find(x => x.id === id)
        let orders_count = 0
        for(let t of cat.types){
          orders_count += t.orders_count
        }
        return orders_count
      },

    }
  }
</script>

