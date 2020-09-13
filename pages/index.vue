<template>
  <div>

    <div class="main-search">
      <div class="container">
        <h3 class="main-search__title">Поиск техники</h3>
        <div class="main-search__top mobile-search">
          <div class="main-search__top-input-group fg-1">
            <p class="main-search__top-input-label">Искать</p>
            <el-input  class="main-search__top-input" placeholder="Что ищем" ></el-input>
          </div>

          <div class="main-search__top-input-group">
            <p class="main-search__top-input-label">Город</p>
            <el-select
              class="main-search__top-input"
              v-model="city_id"
              filterable
              remote
              reserve-keyword
              placeholder="Город"
              :loading-text="'Поиск'"
              :no-match-text="'Нет результатов'"
              :no-data-text="'Нет результата'"
              :loading="loading"
              :remote-method="searchCity">
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.city"
                :value="item.id">
                <span style="float: left; margin-right: 10px">{{ item.city }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.region }}</span>
              </el-option>
            </el-select>
          </div>
          <div class="main-search__top-input-group ">
            <p class="main-search__top-input-label">Дата</p>
            <el-date-picker
              class="main-search__top-input"
              v-model="value1"
              type="date"
              format="dd MMMM yyyy"
              placeholder="Выберите дату">
            </el-date-picker>
          </div>
          <div class="main-search__top-input-group mobile-hide xs-show">
            <p class="main-search__top-input-label">Срок в</p>
            <div class="main-search__top-input radio-group">
              <el-radio  v-model="radio" label="1">Часах</el-radio>
              <el-radio v-model="radio" label="2">Днях</el-radio>
            </div>

          </div>
          <div class="main-search__top-input-group mobile-hide xs-show">
            <p class="main-search__top-input-label">К-во часов</p>
            <el-input  class="main-search__top-input no-after" placeholder="12 часов" ></el-input>
          </div>
        </div>
        <div class="main-search__bottom">
          <div class="main-search__top mobile-show xs-hide mr-10">

          <div class="main-search__top-input-group">
            <p class="main-search__top-input-label">Срок в</p>
            <div class="main-search__top-input radio-group">
              <el-radio  v-model="radio" label="1">Часах</el-radio>
              <el-radio v-model="radio" label="2">Днях</el-radio>
            </div>

          </div>
          <div class="main-search__top-input-group ">
            <p class="main-search__top-input-label">К-во часов</p>
            <el-input  class="main-search__top-input no-after" placeholder="12 часов" ></el-input>
          </div>

        </div>
          <div class="main-search__bottom-btn">
            <el-button class="main-search__btn" type="primary">Найти</el-button>
          </div>
        </div>
      </div>
    </div>
    <section class="main-catalog">
      <div class="container">
        <h3 class="section-header text-center mb-35">Каталог техники</h3>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="item in categories" :key="item.id">
            <div v-if="item.is_show_at_index" class="main-catalog__item mb-15" :style="{'background': '#F4F4F4 url('+item.image+')'}">
              <p class="main-catalog__item-title">{{item.name}}</p>
              <ul class="main-catalog__item-list">

                <li class="main-catalog__item-list-item" v-for="(subcat,index) in item.types">

                  <nuxt-link v-if="index<3" :to="'catalog/'+subcat.name_slug">{{subcat.name}}</nuxt-link>
                  <nuxt-link v-if="index===3" class="color-main" to="catalog/">еще...</nuxt-link>
                </li>

              </ul>
            </div>
          </el-col>

        </el-row>
      </div>

    </section>
    <section class="mobile-app">
      <div class="container">
        <el-row >
          <el-col  :md="12" :lg="16">
            <h3 class="mobile-app__title">Загрузите мобильное приложение</h3>
            <p class="mobile-app__subtitle">Получите ссылку для скачивания приложения</p>
            <el-row class="mobile-app__phone" :gutter="20">
              <el-col :xs="12" :sm="12" :md="12" :lg="12"><el-input type="tel" v-mask="'+7 (###) ###-##-##'" placeholder="+7" v-model="radio"></el-input></el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12"> <el-button plain>Отправить</el-button></el-col>
            </el-row>
            <div class="mobile-app__store">
              <div class="mobile-app__store-btn">
                <img src="/aas.png" alt="">
              </div>   <div class="mobile-app__store-btn">
              <img src="/ggp.png" alt="">
            </div>
            </div>
          </el-col>
          <el-col :md="12" :lg="8">
            <div class="mobile-app__image">
              <img src="/mobile.png" alt="">
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="how-it-works">
      <div class="container">
          <h3 class="section-header text-center mb-60">Как это работает</h3>
        <el-row >
          <el-col class="how-it-works__item text-center" :xs="24" :sm="6" :md="6" :lg="8">
            <img class="how-it-works__item-img" src="/hw1.png" alt="">
          <p class="how-it-works__item-text text1">Заполните критерии поиска</p>
          </el-col>
          <el-col class="how-it-works__item text-center" :xs="24" :sm="6" :md="6" :lg="8">
            <img class="how-it-works__item-img" src="/hw2.png" alt="">
          <p class="how-it-works__item-text text2">Посмотрите подобранную технику</p>
          </el-col>
          <el-col class="how-it-works__item text-center" :xs="24" :sm="6" :md="6" :lg="8">
            <img class="how-it-works__item-img" src="/hw3.png" alt="">
          <p class="how-it-works__item-text text3">Сделайте выбор и свяжитесь с владельцем техники</p>
          </el-col>

        </el-row>


      </div>
    </section>


  </div>
</template>

<script>
  export default {
    async fetch({store}){
      console.log('categories/categories',store.getters['categories/categories'].length)

      if (store.getters['categories/categories'].length === 0){
        await store.dispatch('categories/fetchCategories')
      }

    },
    data() {
      return {

        value1: '',
        radio: '',
        options: [],
        value: [],
        list: [],
        loading: false,
        city_id:'',
        cities:[]


      }
    },
    computed:{
      categories(){
        return this.$store.getters['categories/categories']
      },

    },
    mounted() {
      // this.list = this.cities.map(item => {
      //   return { value: `id:${item.id}`, label: `${item.city}` };
      // });
    },
    methods: {
      async searchCity(query){

        if (query !== '' && query.length >= 2) {
                 console.log(query)

                const result = await this.$axios.get(`/api/v1/city/search?city=${query}`)
                console.log(result.data)
          this.cities = result.data
                } else {
                  this.cities = [];
                }
      },

    }
  }
</script>

