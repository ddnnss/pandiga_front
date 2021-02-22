<template>

  <section   class="catalog-add-page">

    <div class="container">
      <h1 class="section-header mb-20">Создание заявки на технику</h1>
      <p class="mb-35">Вы можете создать заявку на поиск техники и владельцы техники сами откликнуться на нее</p>
      <!--      <p class="mb-10">Добавьте свою технику в базу клуба и начинайте зарабатывать уже сегодня.</p>-->
      <!--      <p class="mb-35">Для этого заполните форму ниже, отредактировать информацию или удалить свою технику вы сможете в любое время.</p>-->

      <el-tabs :tab-position="tabPosition" v-model="activeTab">
        <el-tab-pane :disabled="disabled_tab1" label="Основная информация" name="tab1">

          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-select  v-model="selectedCategory" class="mb-20 filter-select" filterable placeholder="Выберите категорию" @change="categorySelected">
                <el-option
                  v-for="category in categories"
                  :key="category.name"
                  :label="category.name"
                  :value="category.name_slug">
                </el-option>
              </el-select>

              <el-select v-if="selectedCategory" class="mb-20 filter-select" v-model="order.selectedType" filterable placeholder="Выберите тип техники" @change="typeSelected">
                <el-option
                  v-for="type in types"
                  :key="type.name"
                  :label="type.name"
                  :value="type.name_slug">
                </el-option>
              </el-select>

              <el-switch v-if="order.selectedType" style="display: block" class="mb-20" v-model="order.rent_type"
                         active-color="#CC0000" inactive-color="#202020"
                         active-text="Почасовая аренда"  inactive-text="Посуточная">
              </el-switch>

              <div v-show="order.selectedType">
                <div v-if="order.rent_type">
                  <p class="mb-10">Выберите дату</p>
                  <el-date-picker
                    class="mb-20"
                    v-model="rentData.date"
                    type="date"
                    format="dd/MM/yyyy"
                    value-format="yyyy-MM-dd"
                    :picker-options="dateOptions"
                    placeholder="Выберите день">
                  </el-date-picker>

                  <p class="mb-10">Выберите время</p>
                  <el-time-picker
                    class="mb-20"
                    is-range
                    v-model="rentData.time"
                    format="HH:mm"
                    value-format="HH:mm"
                    range-separator="-"
                    start-placeholder="С"
                    end-placeholder="ПО">
                  </el-time-picker>
                </div>
                <div v-if="!order.rent_type">
                  <p class="mb-10">Выберите даты</p>
                  <el-date-picker
                    class="mb-20"
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
              </div>
              <el-button class="mb-20" v-if="order.selectedType" type="primary" @click="checkStep1">Далее</el-button>

            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Какая техника Вам нужна?</p>
                <el-divider></el-divider>
                <p class="mb-20">{{side_text}}</p>

              </el-card>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane :disabled="disabled_tab2" label="Фильтры" name="tab2">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-form :model="all_filters" label-width="120px" >
                <div class="filter-group" v-for="(filter,index) in all_filters.filter">

                  <el-select v-if="filter.type==='select'" clearable :ref="filter.name_slug"  v-model="filter.value" class="filter-select"
                             :name="filter.name_slug"
                             :placeholder="filter.placeholder">
                    <el-option
                      v-for="item in filter.values"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <div v-if="filter.type==='radio'" class="mb-15">
                    <p class="filter-group__title">{{filter.title}}</p>
                    <el-radio-group  fill="#E6E6E6" v-model="filter.value" :name="filter.placeholder">
                      <el-radio-button v-for="item in filter.values" :key="item.label" :label="item.value">{{item.label}}</el-radio-button>

                    </el-radio-group>
                  </div>

                  <div v-if="filter.filter_type==='dual_input'" class="">
                    <p class="filter-group__title">{{filter.filter_title}}</p>
                    <div class="filter-group__row">
                      <el-input class="filter-select"  :placeholder="filter.filter_from_placeholder" v-model="filter.filter_from_value"></el-input>
                      <el-input class="filter-select" :placeholder="filter.filter_to_placeholder" v-model="filter.filter_to_value"></el-input>

                    </div>
                  </div>

                </div>

              </el-form>

              <el-button class="mb-20"  type="primary" @click="disabled_tab3=false,activeTab='tab3'" >Далее</el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Выберете фильтры по которым Вашу заявку будут искать исполнители</p>


              </el-card>
            </el-col>

          </el-row>
        </el-tab-pane>

        <el-tab-pane :disabled="disabled_tab3" label="Описание" name="tab3">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-input  class="mb-20 filter-select" placeholder="Название" v-model="order.name"></el-input>
              <el-input class="mb-20" type="textarea"  placeholder="Описание"
                        :autosize="{ minRows: 10, maxRows: 15}"
                        v-model="order.description"  maxlength="1000"  show-word-limit>
              </el-input>
              <el-select
                class="mb-20 filter-select"
                name="city"
                v-model="order.city_id"
                filterable
                :autocomplete="'off'"
                remote
                reserve-keyword
                @change="citySelected"
                :remote-method="searchCity"
                placeholder="Выберите город"
                :loading-text="'Поиск'"
                :no-match-text="'Нет результатов'"
                :loading="loading">
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.city"
                  :value="item.id">
                  <span style="float: left">{{ item.city }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.region }}</span>
                </el-option>
              </el-select>
              <!--:loading="add_btn_loading"-->
              <el-button v-if="!is_added" class="mb-20"  type="primary" @click="createOrder">Разместить заявку</el-button>
              <client-only>
                <yandex-map
                  :coords="order.coords"
                  :class=" {ymapContanerHidden : !is_city_selected}"
                  zoom="10"
                  style="width: 100%; height: 440px; padding: 0;margin-bottom: 20px"
                  :cluster-options="{ 1: {clusterDisableClickZoom: true} }"
                  @click="mapClick"
                  :controls="['trafficControl']"
                  @map-was-initialized="initHandler"
                  map-type="map">
                  <ymap-marker
                    markerId="1"
                    marker-type="Placemark"
                    :coords="order.coords">
                  </ymap-marker>
                </yandex-map>
              </client-only>


            </el-col>
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Напишите название Вашей заявки и краткое описание, а также выберите город, в котором нужно выполнить заявку</p>
                <p>Вы можете указать точное местоположение на карте</p>

              </el-card>
            </el-col>

          </el-row>
        </el-tab-pane>

      </el-tabs>
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
      base_url:'http://localhost:8000',
      windowW:'',
      tabPosition:'left',
      activeTab:'tab1',
      dialogImageUrl: '',
      side_text: 'Сначала выберите нужную категорию',
      dialogVisible: false,
      is_city_selected: false,
      is_added: false,
      add_btn_loading: false,
      disabled: false,
      cities:[],
      filtersNotSelected:false,
      rentData:{
        type:true,
        date: '',
        dates: '',
        time:'',
      },
      order:{
        city_id:null,
        selectedType:'',
        name:'',
        rent_type:true,
        min_rent_time:'',
        rent_price:'',
        description:'',
        coords:[55,55],
      },
      all_filters:{
        filter: []
      },
      selectedCategory:'',
      types:[],
      disabled_tab1:false,
      disabled_tab2:true,
      disabled_tab3:true,
      disabled_tab4:true,
      disabled_tab5:true,
      loading: false,
    }
  },
  computed:{
    categories(){
      return this.$store.getters['categories/categories']
    },
  },
  watch: {

    windowW(val,) {
      val <= 900 ? this.tabPosition='top' : this.tabPosition='left'
    }
  },
  created(){
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {
    checkFilters(){
      console.log('cccc')
      this.filtersNotSelected = false
      for(let i of this.all_filters.filter){
        if(!i.value){
          this.filtersNotSelected = true
          console.log('not')
          return
        }
      }
      this.disabled_tab3=false
      this.activeTab='tab3'
  },
  checkStep1(){
    if(this.order.rent_type){
      if (!this.rentData.date || !this.rentData.time){
        this.$notify({
          title: 'Ошибка',
          message: 'Все поля обязательны',
          type: 'error'
        });
        return
      }
    }else{
      if (!this.rentData.dates){
        this.$notify({
          title: 'Ошибка',
          message: 'Укажите даты аренды',
          type: 'error'
        });
        return
      }


    }
    this.disabled_tab2=false
    this.activeTab='tab2'
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
  citySelected(){
    console.log('selected city',this.order.city_id)
    console.log(this.cities.find(x => x.id === this.order.city_id).city)
    ymaps.geocode(this.cities.find(x => x.id === this.order.city_id).city, {
      results: 1
    }).then( (res) => {
      var firstGeoObject = res.geoObjects.get(0)
      this.order.coords = firstGeoObject.geometry.getCoordinates()
      this.is_city_selected = true
    });
  },
  mapClick(e){
    console.log('data',e.get('coords'))
    this.order.coords = e.get('coords');
  },
  initHandler(){
    console.log('map init')
  },

  async createOrder(){
    if (!this.order.city_id){
      this.$notify({
        title: 'Ошибка',
        message: 'Не указан город',
        type: 'error'
      });
      return
    }
    if (!this.order.name){
      this.$notify({
        title: 'Ошибка',
        message: 'Укажите название',
        type: 'error'
      });
      return
    }
    this.add_btn_loading = true
    let formData = new FormData()
    formData.set('rent_data', JSON.stringify(this.rentData));
    formData.set('order', JSON.stringify(this.order));
    formData.set('filters', JSON.stringify(this.all_filters.filter));
    await this.$axios({
      method: 'post',
      headers:{
        'content-type': 'multipart/form-data'
      },
      url: '/api/v1/order/add/',
      data: formData
    }).then((response) => {
      this.is_added = true
      this.$notify({
        title: 'Спасибо',
        message: 'Ваша заявка размещена',
        type: 'success'
      });
      this.$router.push('/lk/orders')
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  onResize() {
    this.windowW = window.innerWidth
  },
  categorySelected(){
    console.log('selected cat',this.selectedCategory)
    this.side_text = 'Теперь выберите нужный тип техники'
    for (let i of this.categories){
      if (i.name_slug === this.selectedCategory){
        this.types = i.types
      }
    }
  },
  async typeSelected(){
    console.log('selected type',this.order.selectedType)
    const  response_filters = await this.$axios.get(`/api/v1/technique/filters/${this.order.selectedType}/`)
    this.all_filters.filter = response_filters.data
    console.log(this.all_filters.filter )
    this.side_text = 'Теперь укажите тип аренды, время и дату/даты начала - завершения'
  },

}
}
</script>

