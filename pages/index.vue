<template>
  <div>

    <div class="main-search">
      <div class="container">
        <h3 class="main-search__title">Поиск техники</h3>
        <div class="main-search-wrapper">
          <div class="main-search__top mobile-search">
            <div class="main-search__top-input-group fg-2">
              <p class="main-search__top-input-label">Искать</p>
            <el-select
                class="main-search__top-input no-after "
                v-model="searchQuery"
                filterable
                remote
                reserve-keyword
                placeholder="Что ищем?"
                :loading-text="'Поиск'"
                :no-match-text="'Нет результатов'"
                :no-data-text="'Нет результата'"
                :loading="loading"
                :remote-method="searchHandle">
                <el-option
                  v-for="item in searchResults"
                  :key="item.id"
                  :label="item.is_filter_value ? `${item.filter_value_label} - ${item.type_name}` : `${item.type_name}`"
                  :value="`${item.type_name_slug},${item.filter_name_slug},${item.filter_value},${item.is_filter_value}`">
                  <div v-if="item.is_filter_value">
                    <span style="font-weight: bold; float: left; margin-right: 10px">{{ item.filter_value_label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.type_name }}</span>
                  </div>
                  <div v-else>
                     <span style="font-weight: bold; float: left; margin-right: 10px">{{ item.type_name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">Категория</span>
                  </div>

                </el-option>
              </el-select>
            </div>

            <div class="main-search__top-input-group fg-1">
              <p class="main-search__top-input-label">Город</p>
              <el-select
                class="main-search__top-input no-after"
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

          </div>

          <div class="main-search__btn">
            <el-button @click="searchIt" class="main-search__btn" :disabled="searchQuery===''" type="primary">Найти</el-button>
          </div>

        </div>

        <!--        <div class="main-search__bottom">-->
        <!--          <div class="main-search__top mobile-show xs-hide mr-10">-->

        <!--          <div class="main-search__top-input-group">-->
        <!--            <p class="main-search__top-input-label">Срок в</p>-->
        <!--            <div class="main-search__top-input radio-group">-->
        <!--              <el-radio  v-model="radio" label="1">Часах</el-radio>-->
        <!--              <el-radio v-model="radio" label="2">Днях</el-radio>-->
        <!--            </div>-->

        <!--          </div>-->
        <!--          <div class="main-search__top-input-group ">-->
        <!--            <p class="main-search__top-input-label">К-во часов</p>-->
        <!--            <el-input  class="main-search__top-input no-after" placeholder="12 часов" ></el-input>-->
        <!--          </div>-->

        <!--        </div>-->
        <!--          <div class="main-search__bottom-btn">-->
        <!--            <el-button class="main-search__btn" type="primary">Найти</el-button>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
    <section class="main-catalog">
      <div class="container">
        <h3 class="section-header text-center mb-35">Каталог техники</h3>
        <el-row class="mb-50" :gutter="15">
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
        <div class="text-center"><nuxt-link to="/catalog/"><el-button class="main-search__btn" type="primary">Показать все</el-button></nuxt-link> </div>
      </div>

    </section>
    <section class="mobile-app">
      <div class="container">
        <el-row >
          <el-col :sm="12" :md="12" :lg="16">
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
          <el-col :sm="12" :md="12" :lg="8">
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
        <div class="how-it-works__wrapper">
          <div class="how-it-works__item text-center" >
            <img class="how-it-works__item-img" src="/hw1.png" alt="">
            <p class="how-it-works__item-text text1">Заполните критерии поиска</p>
          </div>
          <div class="how-it-works__item text-center" >
            <img class="how-it-works__item-img" src="/hw2.png" alt="">
            <p class="how-it-works__item-text text2">Посмотрите подобранную технику</p>
          </div>
          <div class="how-it-works__item text-center" >
            <img class="how-it-works__item-img" src="/hw3.png" alt="">
            <p class="how-it-works__item-text text3">Сделайте выбор и свяжитесь с владельцем техники</p>
          </div>
        </div>



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
        searchQuery:'',
        searchResults:[],
        radio: null,
        options: [],
        value: [],
        list: [],
        loading: false,
        city_id:'',
        cities:[],
        test:null,
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


      searchIt(){
        let query=[]
        query = this.searchQuery.split(',')
        console.log(query[3])
        if(query[3]==='true'){
          this.$router.push(`/catalog/${query[0]}?filter=${query[1]}&value=${query[2]}&city=${this.city_id}`)
        }else {
          this.$router.push(`/catalog/${query[0]}?city=${this.city_id}`)
        }

      },
      async searchHandle(query){
        if (query !== '' && query.length >= 2) {
          console.log(query)
          const result = await this.$axios.get(`/api/v1/technique/search/${query}`)
          console.log(result.data)
          this.searchResults = result.data
        }else{
          this.searchResults=[]
        }


      },
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

