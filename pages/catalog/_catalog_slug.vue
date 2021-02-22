<template>

  <section class="catalog-inner ">
    <div class="container">
      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/catalog/'}">Каталог</el-breadcrumb-item>
        <el-breadcrumb-item>{{technique_type.name}}</el-breadcrumb-item>

      </el-breadcrumb>

      <div class="catalog-inner__title">
        <h1 id="catalog_top" class="section-header fg-10">{{technique_type.name}}</h1>

<!--        <div class="catalog-inner__title-inner">-->
<!--          <p style="margin-right: 10px">Сортировка:</p>-->
<!--          <el-select v-model="value" placeholder='Выберите'>-->
<!--            <el-option-->
<!--              v-for="item in order_by"-->
<!--              :key="item.id"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </div>-->
      </div>
      <div class="catalog-inner__wrapper">
        <div v-loading="loading"
             element-loading-text="Подождите..."
             element-loading-spinner="el-icon-loading"
             style="width: 100%" class="catalog-inner__left">
          <div v-if="technique_units.length>0" class="catalog-item "  v-for="unit in technique_units" :class="{vipItem : unit.is_vip}">
            <div class="catalog-item__img">
              <el-tag v-if="unit.is_moderated" class="catalog-item__checked" type="success" effect="dark">Проверен</el-tag>
              <!--              <img :src="base_url + unit.images[0].image_thumb" alt="">-->
              <div v-if="$auth.loggedIn">
                <div v-if="$auth.user.is_customer">
                <p v-if="!$auth.user.favorites.includes(unit.id)" class="catalog-item__fav-btn item-info__middle-fav"><i @click="addFav(unit.id)" class="el-icon-star-off"></i></p>
                <p v-else class="catalog-item__fav-btn item-info__middle-fav"><i @click="delFav(unit.id)" class="el-icon-star-on color-yellow"></i></p>
              </div>
              </div>


              <nuxt-link :to="{'path' : `/catalog/${technique_type.name_slug}/${unit.name_slug}/`} ">
                <el-image :src="unit.images[0].image_thumb">
                  <div slot="placeholder" class="image-slot">
                    Загрузка<span class="dot">...</span>
                  </div>
                </el-image>
              </nuxt-link>
              <div class="catalog-item__rating mobile-show">
                <div v-if="unit.rate_times > 0" class="catalog-item__rating-wraper">
                  <p class="catalog-item__rating-p">{{unit.rating}} </p>
                  <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>
                </div>
                <span class="catalog-item__rating-span">Мин. время заказа:<br> от {{unit.min_rent_time}} <span v-if="unit.rent_type">ч</span> <span v-if="!unit.rent_type">д</span>
                </span>
              </div>
            </div>
            <div class="catalog-item__info">
              <p class="catalog-item__info-title"> <nuxt-link :to="{'path' : `/catalog/${technique_type.name_slug}/${unit.name_slug}/`} ">{{unit.name}}, {{unit.year}}</nuxt-link>  </p>
<!--              <p class="catalog-item__info-subtitle">2.5 л ( 174 л.c.), дизель, автомат, 4WD</p>-->
              <p class="catalog-item__info-subtitle grey mobile-hide">Мин. время заказа: от {{unit.min_rent_time}} <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span></p>
              <p class="catalog-item__price-summ mobile-show">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span></p>
              <span class="catalog-item__rating-span mobile-show">{{unit.city}} {{new Date(unit.created_at).toLocaleString().replace(/(:\d{2}| [AP]M)$/, "")}}</span>

              <div v-if="$auth.loggedIn" class="">
                <div v-if="$auth.user.is_customer && unit.owner !== $auth.user.id" class="catalog-item__info-btn">
                  <!--                <el-button type="primary" @click="sendMsg(unit.owner,true,unit.id)">Взять в аренду</el-button>-->
                  <el-button type="primary" @click="rentData.technique_id = unit.id,rentData.owner_id = unit.owner, rentModal=true">Взять в аренду</el-button>
                  <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <el-input
                      class="mb-10" type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="Ваше сообщение"
                      v-model="private_message">
                    </el-input>
                    <div class="text-center">
                      <el-button :disabled="private_message===''" @click="sendMsg(unit.owner,false,0)" type="primary" >Отправить</el-button>
                    </div>

                    <el-button slot="reference" plain>Написать</el-button>
                  </el-popover>

                </div>
              </div>

            </div>
            <div class="catalog-item__price mobile-hide hide-block">
              <p class="catalog-item__price-summ">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span></p>
              <div v-if="unit.rate_times > 0" class="catalog-item__rating ">
                <p class="catalog-item__rating-p">{{unit.rating}} </p>
                <span class="catalog-item__rating-span">{{unit.rate_times}} отзыв</span>
              </div>
              <span class="catalog-item__rating-span">{{unit.city}} {{new Date(unit.created_at).toLocaleString().replace(/(:\d{2}| [AP]M)$/, "")}}</span>
            </div>
          </div><!--catalog-item-->

          <el-pagination class="mb-50" background layout="prev, pager, next"
                         :hide-on-single-page="true"
                         :page-count="page_count" @current-change="paginatorChange">
          </el-pagination>

          <div v-if="technique_units.length === 0" class="">
            <p class="section-header fg-10 text-center">Нет информации по Вашему запросу</p>
          </div>
        </div>
        <div class="catalog-inner__right sticky-block mb-35">
          <div class="filter-wrapper ">

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
              <el-divider></el-divider>
              <div class="filter-group mb-15">
                <p class="filter-group__title">Аренда по</p>
                <el-radio-group  fill="#E6E6E6" v-model="rent_type" >
                  <el-radio-button :label="1">часам</el-radio-button>
                  <el-radio-button :label="0">дням</el-radio-button>

                </el-radio-group>
              </div>
              <div class="filter-group">
                <p class="filter-group__title">Время аренды <span v-if="rent_type">(часы)</span><span v-if="!rent_type && rent_type !==''">(дни)</span> </p>
                <div class="filter-group__row">
                  <el-input class="filter-select" placeholder="от" v-model="rent_time_from"></el-input>
                  <el-input class="filter-select" placeholder="до" v-model="rent_time_to"></el-input>
                </div>
              </div>
              <div class="filter-group ">
                <p class="filter-group__title">Стоимость <span v-if="rent_type">(часы)</span><span v-if="!rent_type && rent_type !==''">(дни)</span> </p>
                <div class="filter-group__row">
                  <el-input class="filter-select"  placeholder="от" v-model="rent_price_from"></el-input>
                  <el-input class="filter-select" placeholder="до" v-model="rent_price_to"></el-input>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="filter-group">
                <p class="filter-group__title">Сортировка</p>
                <el-select v-model="order_by_value" placeholder='Выберите'>
            <el-option
              v-for="item in order_by"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
              </div>
              <el-divider></el-divider>
              <div class="filter-group mb-15">

              <el-select
                v-model="city_id"
                filterable
                remote
                reserve-keyword
                clearable
                placeholder="Город (начните вводить)"
                autocomplete="off"
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
              <el-button type="primary"
                         :loading="loading"
                         class="full-w"
                         @click="submitForm(1)">Поиск</el-button>
            </el-form>

          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="Укажите детали аренды"
      :visible.sync="rentModal"
      class="modal-window"
      center>
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
  export default {
    async asyncData({$axios,params}){
      console.log(params)
      try{
        const  response_units = await $axios.get(`/api/v1/technique/units?type=${params.catalog_slug}`)
        const  response_type = await $axios.get(`/api/v1/technique/type/${params.catalog_slug}`)
        const  response_filters = await $axios.get(`/api/v1/technique/filters/${params.catalog_slug}/`)
        const technique_units = response_units.data.results
        const page_count = response_units.data.page_count
        const links = response_units.data.links
        const items_count = technique_units.length

        const technique_type = response_type.data
        const technique_filters = response_filters.data

        console.log(technique_units,page_count,links)
        return {
          items_count ,
          technique_units,
          technique_type,
          page_count,
          links,
          all_filters:{
            filter: technique_filters
          }
        }
      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        is_filtered:false,

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

        private_message: '',
        technique_type:'',
        items_count:0,
        loading: false,
        rentModal: false,
        rent_time_to:'',
        rent_time_from:'',
        rent_price_from:'',
        rent_price_to:'',
        rent_type:'1',
        city_id:'',
        cities:[],
        rentMsg_send:false,
        rentData:{
          technique_id:0,
          owner_id:0,
          type:'true',
          date: '',
          dates: '',
          time:'',


        },
        radio1: 'New York',


        order_by: [
          {
          value: '-created_at',
          label: 'По дате (сначала новые)'
        },
           {
          value: 'created_at',
          label: 'По дате (сначала старые)'
        },
           {
          value: 'rent_price',
          label: 'По стоимости (цена вниз)'
        },
           {
          value: '-rent_price',
          label: 'По стоимости (цена вверх)'
        },

        ],
        order_by_value: '',
        value1: '',


      }
    },
    mounted() {
      console.log('this.all_filters',this.all_filters)
      console.log('items_count mounted',this.items_count)
      console.log('this.$route.query',this.$route.query.filter)
      if (this.$route.query.filter){
        console.log(this.$route.query)
      this.all_filters.filter.filter(x => x.name_slug === this.$route.query['filter'])[0].value=this.$route.query['value']
        if (this.$route.query.city){
           this.$axios.get(`/api/v1/city/search_by_id?city_id=${this.$route.query.city}`).then((response) => {
           console.log(response)
           this.cities.push({
             id:response.data.id,
             city:response.data.city,
           })
           this.city_id = response.data.id
           this.submitForm(1)
             console.log('1')
         })
        }
        this.submitForm(1)
        console.log('2')

      }else {
        if (this.$route.query.city){
           this.$axios.get(`/api/v1/city/search_by_id?city_id=${this.$route.query.city}`).then((response) => {
           console.log(response)
           this.cities.push({
             id:response.data.id,
             city:response.data.city,
           })
           this.city_id = response.data.id
          this.submitForm(1)
             console.log('3')
         })
          this.submitForm(1)
          console.log('4')
        }
      }
    },
    methods: {
     async paginatorChange(page){
        console.log(page)
       this.loading = true
       let  response_units
       if (!this.is_filtered){
            response_units = await this.$axios.get(`/api/v1/technique/units?page=${page}&type=${this.$route.params.catalog_slug}`)
         this.technique_units = response_units.data.results
          this.loading = false
         this.$scrollTo('#catalog_top',300,
           {offset: -120,
             easing: 'ease-in',
             lazy: false}
             )

       }
       else {
           this.submitForm(page)
       }


      },
      async searchCity(query){
        if (query !== '' && query.length >= 2) {
          console.log(query)
          const result = await this.$axios.get(`/api/v1/city/search?city=${query}`)
          console.log('c',result.data)
          this.cities = result.data
        } else {
          this.cities = [];
        }
      },
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
      async submitForm(page){
       this.loading = true
        await this.$axios({
          method: 'post',
          headers:{
            'Content-Type':'application/json'
          },
          url: `/api/v1/technique/filter/?page=${page}`,
          data: JSON.stringify({
              technique_type:this.technique_type.name_slug,
              rent_time_to:(this.rent_time_to ? this.rent_time_to : 1000),
              rent_time_from:(this.rent_time_from ? this.rent_time_from : 0),
              rent_price_from:(this.rent_price_from ? this.rent_price_from : 0),
              rent_price_to:(this.rent_price_to ? this.rent_price_to : 1000000),
              rent_type:  this.rent_type  ,
              city_id:  this.city_id  ,
              order_by:  this.order_by_value  ,
              'primary_filter': this.all_filters.filter
            }
          )
        }).then((response) => {
          // handle success
          console.log('success');
          this.technique_units =response.data.results
          this.is_filtered = true
          this.page_count = response.data.page_count
          this.loading = false
          this.$scrollTo('#catalog_top',300,
           {offset: -120,
             easing: 'ease-in',
             lazy: false}
             )
          console.log('items_count posrtt',response.data)
        })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      }
    }
  }
</script>

