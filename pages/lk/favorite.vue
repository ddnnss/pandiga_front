<template>

  <section class="catalog-inner ">
    <div class="container">
      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/catalog/'}">Каталог</el-breadcrumb-item>
        <el-breadcrumb-item>{{technique_type.name}}</el-breadcrumb-item>

      </el-breadcrumb>

      <div class="catalog-inner__title">
        <h1 class="section-header fg-10">{{technique_type.name}}</h1>
        <div class="catalog-inner__title-inner">
          <p style="margin-right: 10px">Сортировка:</p>
          <el-select v-model="value" placeholder='Выберите'>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="catalog-inner__wrapper">
        <div style="width: 100%" class="catalog-inner__left">

          <div v-if="technique_units.length>0" class="catalog-item "  v-for="unit in technique_units" :class="{vipItem : unit.is_vip}">
            <div class="catalog-item__img">
              <el-tag v-if="unit.is_moderated" class="catalog-item__checked" type="success" effect="dark">Проверен</el-tag>
              <!--              <img :src="base_url + unit.images[0].image_thumb" alt="">-->
              <p v-if="!$auth.user.favorites.includes(unit.id)" class="catalog-item__fav-btn item-info__middle-fav"><i @click="addFav(unit.id)" class="el-icon-star-off"></i></p>
              <p v-else class="catalog-item__fav-btn item-info__middle-fav"><i @click="delFav(unit.id)" class="el-icon-star-on color-yellow"></i></p>
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
              <p class="catalog-item__info-subtitle">2.5 л ( 174 л.c.), дизель, автомат, 4WD</p>
              <p class="catalog-item__info-subtitle grey mobile-hide">Мин. время заказа: от {{unit.min_rent_time}} <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span></p>
              <p class="catalog-item__price-summ mobile-show">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> ч</span> <span v-if="!unit.rent_type"> д</span></p>
              <span class="catalog-item__rating-span mobile-show">{{unit.city}} Сегодня</span>

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
              <span class="catalog-item__rating-span">{{unit.city}} Сегодня</span>
            </div>
          </div><!--catalog-item-->
          <div v-if="technique_units.length === 0" class="">
            <p class="section-header fg-10 text-center">Нет информации по Вашему запросу</p>
          </div>
        </div>
         <sidebar></sidebar>

      </div>
    </div>
    <el-dialog
      title="Укажите детали аренды"
      :visible.sync="rentModal"
      width="30%"
      center>
      {{rentData.type}}
      <el-form :label-position="'left'" label-width="120px" :model="rentData">
        {{rentData.time}}
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
    async asyncData({$axios}){
      try{
        const  response_units = await $axios.get(`/api/v1/user/fav_get/`)

        const technique_units = response_units.data




        console.log('technique_units',technique_units)
        return {

          technique_units,

        }
      }catch (e) {
        throw e
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

        private_message: '',
        technique_type:'',
        items_count:0,
        loading: true,
        rentModal: false,
        rent_time_to:'',
        rent_time_from:'',
        rent_price_from:'',
        rent_price_to:'',
        rent_type:'1',
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


        options: [{
          value: 'Option1',
          label: 'По дате'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: '',
        value1: '',


      }
    },
    mounted() {


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

