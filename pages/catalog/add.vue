<template>

  <section   class="catalog-add-page">

    <div class="container">
      <h1 class="section-header mb-20">ДОБАВИТЬ ТЕХНИКУ В КАТАЛОГ</h1>

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

              <el-select v-if="selectedCategory" class="mb-20 filter-select" v-model="unit.selectedType" filterable placeholder="Выберите тип техники" @change="typeSelected">
                <el-option
                  v-for="type in types"
                  :key="type.name"
                  :label="type.name"
                  :value="type.name_slug">
                </el-option>
              </el-select>
              <el-input v-if="unit.selectedType" class="mb-20 filter-select" placeholder="Название" v-model="unit.name"></el-input>
              <el-switch v-if="unit.name" style="display: block" class="mb-20" v-model="unit.rent_type"
                         active-color="#CC0000" inactive-color="#202020"
                         active-text="Почасовая аренда"  inactive-text="Посуточная">
              </el-switch>
              <div v-if="unit.name" class="form-group ">
                <p>Минимальное время аренды (<span v-if="unit.rent_type">часов</span><span v-else>дней</span>)</p>
                <el-input-number v-model="unit.min_rent_time"  controls-position="right" :min="1" :max="unit.rent_type ? 24 : 31"></el-input-number>
              </div>
              <div v-if="unit.min_rent_time" class="form-group">
                <p>Стоимость аренды в <span v-if="unit.rent_type">час</span><span v-else>день</span></p>
                <el-input-number :min="1" :max="999999"  v-model="unit.rent_price" style="width: 180px"></el-input-number >

              </div>
              <el-button class="mb-20" v-if="unit.name" type="primary" @click="disabled_tab2=false,activeTab='tab2'">Далее</el-button>

            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Заполните основную информацию о вашей техники, чтобы заказчикам было легче ее найти</p>

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
              <el-button class="mb-20"  type="primary" @click="disabled_tab3=false,activeTab='tab3'">Далее</el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Выберете фильтры по которым Вашу технику будут искать заказчики</p>

              </el-card>
            </el-col>

          </el-row>
        </el-tab-pane>
        <el-tab-pane :disabled="disabled_tab3" label="Местоположение" name="tab3">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">

              <el-select
                class="mb-20"
                name="city"
                v-model="unit.city_id"
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
                <client-only>
                  <yandex-map
                    :coords="unit.coords"
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
                      :coords="unit.coords">
                    </ymap-marker>
                  </yandex-map>
                </client-only>

              <el-button class="mb-20" :disabled="!unit.city_id"  type="primary" @click="disabled_tab4=false,activeTab='tab4'">Далее</el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Выберете населенный пункт из списка в котором вы хотите сдавать технику</p>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :disabled="disabled_tab4" label="Описание" name="tab4">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-input class="mb-20" type="textarea"  placeholder="Описание техники"
                        :autosize="{ minRows: 10, maxRows: 15}"
                        v-model="unit.description"  maxlength="1000"  show-word-limit>
              </el-input>
              <el-upload
                ref="imgUpload"
                action="#"
                :multiple="true"
                list-type="picture-card"
                :auto-upload="false"
                class="mb-20">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview"  @click="handlePictureCardPreview(file)" >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span v-if="!disabled"  class="el-upload-list__item-delete" @click="handleRemove(file,file.id)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-button class="mb-20"  type="primary" @click="disabled_tab5=false,activeTab='tab5'">Далее</el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Прикрепите фото и опишите особенности вашей техники, чтобы заказчикам было легче ее найти</p>

              </el-card>
            </el-col>

          </el-row>
        </el-tab-pane>
        <el-tab-pane :disabled="disabled_tab5" label="Подтверждение" name="tab5">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">

              <el-upload
                ref="imgUpload_doc"
                action="#"
                :multiple="true"
                list-type="picture-card"
                :auto-upload="false"
                class="mb-20">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview"  @click="handlePictureCardPreview(file)" >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span v-if="!disabled"  class="el-upload-list__item-delete" @click="handleRemove(file,file.id)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-button class="mb-20"  type="primary" v-if="!is_added" :loading="add_btn_loading" @click="addUnit">Добавить технику</el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="12">
              <el-card shadow="always">
                <p class="section-sub-header mb-20">Для чего это нужно?</p>
                <el-divider></el-divider>
                <p class="mb-20">Прикрепите документы на технику, чтобы ее подтвердить. </p>
                <p>Подтвержденная техника вызывает больше доверия</p>
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

      // if (store.getters['cities/cities'].length === 0){
      //   await store.dispatch('cities/fetchCities')
      // }
    },
    data() {
      return {
        base_url:'http://localhost:8000',
        cities:[],
        windowW:'',
        tabPosition:'left',
        activeTab:'tab1',
        dialogImageUrl: '',
        dialogVisible: false,
        is_city_selected: false,
        is_added: false,
        add_btn_loading: false,
        disabled: false,
        latitude:null,
        longitude:null,
        gettingLocation: false,
        fileList:[],
        unit:{
          selectedType:'',
          name:'',
          rent_type:true,
          min_rent_time:'',
          rent_price:'',
          description:'',
          city_id:'',
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
      // cities(){
      //   return this.$store.getters['cities/cities']
      // }
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



        // navigator.geolocation.getCurrentPosition(pos => {
        //   this.coords.push(pos.coords.latitude);
        //   this.coords.push(pos.coords.longitude);
        //   console.log(this.coords)
        // }, err => {
        //   this.errorStr = err.message;
        // })


      })
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
      citySelected(){
        console.log('selected city',this.unit.city_id)
        console.log(this.cities.find(x => x.id === this.unit.city_id).city)

        ymaps.geocode(this.cities.find(x => x.id === this.unit.city_id).city, {
          results: 1
        }).then( (res) => {
          var firstGeoObject = res.geoObjects.get(0)
          this.unit.coords = firstGeoObject.geometry.getCoordinates()
          this.is_city_selected = true
        });
      },
      mapClick(e){
        console.log('data',e.get('coords'))
        this.unit.coords = e.get('coords');
      },
      initHandler(){
        console.log('map init')
      },
      async addUnit(){
        if (this.$refs['imgUpload'].uploadFiles.length === 0){
          console.log('no images')
          return
        }
        this.add_btn_loading = true
        let formData = new FormData()
        formData.set('unit', JSON.stringify(this.unit));
        formData.set('filters', JSON.stringify(this.all_filters.filter));
        this.$refs['imgUpload'].uploadFiles.forEach(img => {
          formData.append("images", img.raw)
        })
        this.$refs['imgUpload_doc'].uploadFiles.forEach(img => {
          formData.append("docs_images", img.raw)

        })
        await this.$axios({
          method: 'post',
          headers:{
            'content-type': 'multipart/form-data'
          },
          url: '/api/v1/technique/unit/add/',
          data: formData
        }).then((response) => {
          this.is_added = true
          this.$notify({
            title: 'Успешно',
            message: 'Ваша техника добавлена в каталог',
            type: 'success'
          });


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
        for (let i of this.categories){
          if (i.name_slug === this.selectedCategory){
            this.types = i.types
          }
        }
      },
      async typeSelected(){
        console.log('selected type',this.unit.selectedType)
        const  response_filters = await this.$axios.get(`/api/v1/technique/filters/${this.unit.selectedType}/`)
        this.all_filters.filter = response_filters.data
      },
      handleRemove(file,i) {
        console.log(file.uid);
        console.log(this.$refs['imgUpload'].uploadFiles)
        let x=0
        for (let i of this.$refs['imgUpload'].uploadFiles){

          if (i.uid === file.uid){
            console.log(x)
            this.$refs['imgUpload'].uploadFiles.splice(x,1)
          }
          x+=1
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>

