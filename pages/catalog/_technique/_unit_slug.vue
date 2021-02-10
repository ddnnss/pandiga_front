<template>

  <section class="item-page pt-20">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/catalog/'}">Каталог</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/catalog/'+unit.type.name_slug+'/'}">{{unit.type.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{unit.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="mb-50">
        <el-col :sm="8" :md="12" :lg="12"><carousel :starting-image="2" :images="unit.images"></carousel></el-col>
        <el-col :sm="14" :md="10" :lg="10" :offset="2" class="item-info">
          <div class="item-info__top">
            <el-tag v-if="unit.is_free" class="item-info__top-status" type="success" effect="dark"> Cвободен </el-tag>
            <el-tag v-if="!unit.is_free" class="item-info__top-status" type="danger" effect="dark"> Занят </el-tag>
            <div v-if="unit.rate_times  > 0" class="catalog-item__rating ">
              <p class="catalog-item__rating-p">{{unit.rating}}</p>
              <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>
            </div>
          </div>
          <div class="item-info__middle">
            <h1 class="item-info__middle-title section-header">{{unit.name}}, {{unit.year}}
               <div v-if="this.$auth.loggedIn">
              <div v-if="this.$auth.user.is_customer">
                 <p v-if="!this.$auth.user.favorites.includes(unit.id)" class="item-info__middle-fav"><i @click="addFav(unit.id)" class="el-icon-star-off"></i></p>
                  <p v-else class="item-info__middle-fav"><i @click="delFav(unit.id)" class="el-icon-star-on color-yellow"></i></p>
              </div>
               </div>

            </h1>
            <div class="item-info__middle-group">
              <p class="item-info__middle-price">{{unit.rent_price}} руб/<span v-if="unit.rent_type">час</span> <span v-if="!unit.rent_type">день</span></p>
              <p class="item-info__middle-text">Мин. время заказа: от {{unit.min_rent_time}} <span v-if="unit.rent_type">ч</span> <span v-if="!unit.rent_type">д</span></p>
            </div>
            <div v-if="this.$auth.loggedIn && this.$auth.user.is_customer && unit.owner !== $auth.user.id" class="item-info__middle-group">
              <el-button type="primary" @click="rentData.technique_id = unit.id,rentData.owner_id = unit.owner.id, rentModal=true">Взять в аренду</el-button>
              <el-popover
                placement="bottom"
                width="400"
                trigger="click">
                <el-input
                  class="mb-10" type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Ваше сообщение"
                  v-model="private_message">
                </el-input>
                <div class="text-center">
                  <el-button :disabled="private_message===''" @click="sendMsg(unit.owner.id,false,0)" type="primary" >Отправить</el-button>
                </div>
                <el-button slot="reference" plain>Написать</el-button>
              </el-popover>
            </div>
<!--            <p>2.5 л ( 174 л.c.), дизель, автомат, 4WD</p><br>-->
            <div >
              <span class="text-bold fs-14 ">Размещение: {{unit.city}} | </span>
               <el-link  class="text-bold fs-14 " @click="showMap">Показать на карте</el-link>
            </div>

          </div>
        </el-col>
      </el-row>
      <client-only>
        <yandex-map
          :coords="coords"
          class="mb-35"
          :class=" {ymapContanerHidden : !is_city_selected}"
          zoom="10"
          style="width: 95%; height: 440px; padding: 0;margin-bottom: 20px"
          :cluster-options="{ 1: {clusterDisableClickZoom: true} }"
          :controls="['trafficControl']"
          map-type="map">
          <ymap-marker
            markerId="1"
            marker-type="Placemark"
            :coords="coords">
          </ymap-marker>
        </yandex-map>
      </client-only>
      <el-row class="item-description" :gutter="20">
        <el-col :sm="8" :md="8" :lg="8">
          <div class="item-owner">
            <p class="item-owner__title">О владельце:</p>
            <nuxt-link :to="'/user/'+unit.owner.id">
            <div class="item-owner__group">
              <img  class="item-owner__img" :src="unit.owner.avatar" alt="">
              <div class="item-owner__group-inner">
                <p v-if="unit.owner.is_person"  class="item-owner__name">{{unit.owner.fullname}}</p>
                <p v-else  class="item-owner__name">{{unit.owner.organization_name}}</p>
                <div v-if="unit.owner.rate_times > 0" class="catalog-item__rating mb-10">
                  <p class="catalog-item__rating-p">{{unit.owner.rating}} </p>
                  <span class="catalog-item__rating-span">Отзывов: {{unit.owner.rate_times}}</span>
                </div>
                <p class="item-owner__location">{{unit.city}}</p>
              </div>
            </div>
            </nuxt-link>
          </div>
        </el-col>
        <el-col :sm="14" :md="16" :lg="16">
          <el-tabs :stretch="true" v-model="activeTab" >
            <el-tab-pane label="Описание" name="first">
              <p>{{unit.description}}</p>
            </el-tab-pane>
            <el-tab-pane label="Характеристики" name="second">



              <ul  style="columns: 2; width: 80%">
                <li class="item-description__feature" v-for="(item,index) in unit.filter">

                  <p>{{item.placeholder}}: <span>{{unit.filter_value.find(x=>x.filter === item.id).label}}</span></p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="Отзывы" name="third">
              <div class="feedback__header">
                <p v-if="unit.unit_feedbacks.length > 0" class="color-main">{{unit.unit_feedbacks.length}} отзыв о {{unit.name}} </p>
              </div>
              <div class="feedback" v-for="feedback in unit.unit_feedbacks">
                <div class="feedback__top">
                  <img class="feedback__top-img" :src="feedback.author.avatar" alt="">
                  <div class="feedback__top-from">
                    <p class="feedback__top-from-name">{{feedback.author.fullname}}</p>
                    <p class="feedback__top-from-date">{{new Date(feedback.created_at).toLocaleString().replace(/(:\d{2}| [AP]M)$/, "")}}</p>
                  </div>
                </div>
                <div class="feedback__text">
                  <p>{{feedback.text}}</p>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="Укажите детали аренды" :visible.sync="rentModal" center>
      <el-form :label-position="'top'" label-width="120px" :model="rentData">
        <el-form-item label="Тип аденды">
          <el-radio-group v-model="rentData.type">
            <el-radio-button label="true"  name="type">Почасовая</el-radio-button>
            <el-radio-button label="false" name="type">Посуточная</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div v-if="rentData.type === 'true'">
          <el-form-item label="Дата аренды">
            <el-date-picker
              v-model="rentData.date"
              type="date"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              :picker-options="dateOptions"
              placeholder="Выберите день">
            </el-date-picker>
          </el-form-item>
          <p class="mb-10">Выберите время</p>
          <el-time-picker
            is-range
            v-model="rentData.time"
            format="HH:mm"
            value-format="HH:mm"
            range-separator="-"
            start-placeholder="С"
            end-placeholder="ПО">
          </el-time-picker>
        </div>
        <div v-else>
          <p class="mb-10">Выберите даты</p>
          <el-date-picker
            v-model="rentData.dates"
            type="daterange"
            start-placeholder="C"
            end-placeholder="ПО"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
            :picker-options="dateOptions"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button :loading="rentMsg_send" type="primary" @click="sendRentMsg">Сохранить</el-button>
  </span>
    </el-dialog>
  </section>
</template>

<script>
  import Carousel from '@/components/Carousel.vue';
  import { loadYmap } from 'vue-yandex-maps'
  import { yandexMap, ymapMarker } from 'vue-yandex-maps'

  export default {
    async asyncData({$axios,params}){
      console.log(params)
      try{
        const response_unit = await $axios.get(`/api/v1/technique/unit/${params.unit_slug}`)
        const unit = response_unit.data
        console.log(unit)
        return {unit}
      }catch (e) {
        throw e
      }

    },
    components: {
      Carousel,
      yandexMap,
      ymapMarker
    },
    data() {
      return {
        dateOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        timeOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        coords:[],
        activeTab:'first',
        private_message: '',
        rentMsg_send:false,
        is_city_selected:false,
        rentData:{
          technique_id:0,
          owner_id:0,
          type:'true',
          date: '',
          dates: '',
          time:'',
        },
        isRentMessage:false,
        loading: true,
        rentModal: false,
      }
    },
    mounted() {


    },
    created() {

    },
    methods: {
      async addFav(id){
        const response = await this.$axios.post(`/api/v1/user/fav_add/${id}`)
        this.$auth.fetchUser()
        this.$notify({
              title: 'Успешно',
              message: 'Техника добалена в избранное',
              type: 'success'
            });
      },
      async delFav(id){
        const response = await this.$axios.post(`/api/v1/user/fav_del/${id}`)
        this.$auth.fetchUser()
        this.$notify({
              title: 'Успешно',
              message: 'Техника удалена из избранного',
              type: 'success'
            });
      },
      showMap(){
        if (this.unit.coords.length >0){
          this.coords = this.unit.coords.replace('[','').replace(']','').split(',')
          this.is_city_selected = true
        }else{
          ymaps.geocode(this.unit.city, {
            results: 1
          }).then( (res) => {
            var firstGeoObject = res.geoObjects.get(0)
            this.coords = firstGeoObject.geometry.getCoordinates()
            this.is_city_selected = true
          });
        }

      },
      async sendMsg(owner_id,is_rent_msg,unit_id){
        await this.$axios.post(`/api/v1/chat/new_message/${owner_id}`,{message:this.private_message,isRentMessage:is_rent_msg,rentUnit:unit_id})
          .then((response) => {
            console.log(response.status);
            this.private_message =''
            this.$notify({
              title: 'Успешно',
              message: 'Ваше сообщение отправлено',
              type: 'success'
            });
          })
          .then(response => {
            console.log('response1')
            console.log(response)
          })
          .catch(error => {
            console.log('response2')
            console.log(error.response)
            this.step1_btn_loading = false
            this.login_error = true

          });
      },
      async sendRentMsg(){
        await this.$axios.post(`/api/v1/chat/new_message/${this.rentData.owner_id}`,{isRentMessage:true,
          rentUnit:this.rentData.technique_id,
          rentType:this.rentData.type,
          rentDate:this.rentData.date,
          rentDates:this.rentData.dates,
          rentTime:this.rentData.time,
        })
          .then((response) => {
            console.log(response.status);
            this.rentData.technique_id = 0
            this.rentData.type = 'true'
            this.rentData.date = ''
            this.rentData.dates =''
            this.rentData.time =''
            this.rentModal = false
            this.$notify({
              title: 'Успешно',
              message: 'Ваше сообщение отправлено',
              type: 'success'
            });
          })
          .then(response => {
            console.log('response1')
            console.log(response)
          })
          .catch(error => {
            console.log('response2')
            console.log(error.response)
            this.step1_btn_loading = false
            this.login_error = true

          });
      },

    }
  }
</script>

