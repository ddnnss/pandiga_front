<template>

  <section class="user-profile pt-20">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
        <el-breadcrumb-item>Профиль</el-breadcrumb-item>
      </el-breadcrumb>

      <!--{{this.$auth.user}}-->
      <el-card class="box-card mb-35">

        <div class="user-profile__wrapper">
          <div class="user-profile__img">
            <img  :src="imageUrl" alt="">
          </div>
          <div class="user-profile__info">
            <p v-if="this.$auth.user.is_person" class="user-profile__info-name">{{userData.first_name}} {{userData.last_name}}</p>
            <p v-if="!this.$auth.user.is_person" class="user-profile__info-name">{{userData.organization_name}}<br>ИНН: {{userData.inn}}<br>ОГРН: {{userData.ogrn}}</p>
            <div v-if="this.$auth.user.rate_times > 0" class="catalog-item__rating mb-10">
            <p class="catalog-item__rating-p">{{this.$auth.user.rating}} </p>
            <span class="catalog-item__rating-span">Отзывов: {{this.$auth.user.rate_times}}</span>
          </div>
            <p class="user-profile__info-location">{{userData.city}}</p>
          </div>
          <div class="user-profile__button">
            <!--          <el-switch-->
            <!--            style="display: block"-->
            <!--            class="mb-20"-->
            <!--            v-model="userData.is_customer"-->
            <!--            active-color="#CC0000"-->
            <!--            inactive-color="#cc00007a"-->
            <!--            :disabled="roleChange"-->
            <!--            active-text="Я заказчик"-->
            <!--            inactive-text="Я исполнитель"-->
            <!--            @change="updateUser">-->
            <!--          </el-switch>-->
            <div style="align-items: center" class="mb-15 flex-wrapper"><p>Баланс: <el-tag type="info">{{$auth.user.balance}} руб</el-tag></p>
              <nuxt-link to="/lk/balance"><el-button size="mini" type="success">Пополнить</el-button></nuxt-link>
            </div>
            <p class="mb-15">Партнерский баланс: <el-tag type="info">{{$auth.user.partner_balance}} руб</el-tag></p>
            <p class="mb-15">Партнерский код: <el-tag type="info">{{$auth.user.partner_code}}</el-tag></p>
<!--            <p class="mb-15">5 раз сдана техника в аренду<br>5 отзывов получено<br>0 % повторных заказов</p>-->
            <el-button class="mb-20 full-w" @click="editProfileModal = true" type="primary">Изменить профиль</el-button>
            <el-button class="mb-20 full-w" @click="partnerCodeModal = true" type="primary">Ввести код партнера</el-button>
          </div>
        </div>
      </el-card>

      <div v-if="!this.$auth.user.is_customer">
        <h3 class="section-header f25">Техника</h3>
      <div class="technique-cards mb-60">

        <el-card class="technique-card" v-for="unit in user_units" :key="unit.id" :xs="24" :sm="12" :md="8" :lg="8">

          <div class="technique-card__status">
            <el-tag v-if="unit.is_active" type="success" effect="dark">Участвует в поиске</el-tag>
            <el-tag v-else type="danger" effect="dark">Не участвует в поиске</el-tag>
          </div>

          <el-image class="technique-card__img" :src="unit.images[0].image_thumb">
            <div slot="placeholder" class="image-slot">
              Загрузка<span class="dot">...</span>
            </div>
          </el-image>
          <div class="technique-card__block">
            <p class="technique-card__name">
              <nuxt-link :to="`/catalog/${unit.type.name_slug}/${unit.name_slug}`">
              {{unit.name}}
              </nuxt-link>
            </p>
            <el-link v-if="unit.is_active" icon="el-icon-top" @click="unitPromote(unit.id)">Поднять в поиске</el-link>
            <el-link v-else icon="el-icon-money" @click="unitPay(unit.id)">Оплатить размещение</el-link>

          </div>
          <div class="technique-card__block">

               <p class="technique-card__price">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> час</span> <span v-if="!unit.rent_type"> день</span> </p>

          </div>

        </el-card>

      </div>
      </div>

      <h3 v-if="feedbacks.length>0" class="section-header f25">Отзывы</h3>
      <h3 v-else class="section-header f25">Отзывов пока нет</h3>
      <div class="feedback b-border" v-for="feedback in feedbacks" :key="feedback.id">
        <div class="feedback__top">
          <img class="feedback__top-img" :src="feedback.author.avatar" alt="">
          <div class="feedback__top-from">
            <nuxt-link :to="'/user/'+feedback.author.id"><p class="feedback__top-from-name">{{feedback.author.fullname}}</p></nuxt-link>
            <p class="feedback__top-from-date">{{new Date(feedback.created_at).toLocaleString().replace(/(:\d{2}| [AP]M)$/, "")}}</p>
          </div>
        </div>
        <div class="feedback__text">
          <p>{{feedback.text}}</p>
        </div>
      </div>
    </div>
    <el-dialog
      title="Ваши данные"
      :visible.sync="editProfileModal"
      width="30%"
      center>
      <el-form :label-position="'left'" label-width="200px" :model="userData">

        <el-form-item label="Фото">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" alt="" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="E-Mail">
          <el-input  v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item v-if="this.$auth.user.is_person" label="Имя">
          <el-input  v-model="userData.first_name"></el-input>
        </el-form-item>
        <el-form-item v-if="this.$auth.user.is_person" label="Фамилия">
          <el-input v-model="userData.last_name"></el-input>
        </el-form-item>

        <el-form-item v-if="!this.$auth.user.is_person" label="Название организации">
          <el-input  v-model="userData.organization_name"></el-input>
        </el-form-item>

        <el-form-item v-if="!this.$auth.user.is_person" label="ИНН">
          <el-input disabled="" v-model="userData.inn"></el-input>
        </el-form-item>

        <el-form-item v-if="!this.$auth.user.is_person" label="ОГРН">
          <el-input  v-model="userData.ogrn"></el-input>
        </el-form-item>

        <el-form-item label="Телефон">
          <el-input disabled="" v-model="userData.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button :loading="roleChange" type="primary" @click="updateUser">Сохранить</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="Введите код партнера"
      :visible.sync="partnerCodeModal"
      width="30%"
      center>
      <el-form :label-position="'top'" label-width="100px" :model="partnerCode">

        <el-form-item label="Код">
          <el-input v-mask="'########'" v-model="partnerCode.code" placeholder="8 цифр"></el-input>
        </el-form-item>
      </el-form>
      <p>{{codeResult}}</p>
      <span slot="footer" class="dialog-footer">

    <el-button :loading="codeSend" type="primary" @click="sendPartnerCode">Отправить</el-button>
  </span>
    </el-dialog>

  </section>




</template>

<script>
  export default {
    async asyncData({$axios,$auth,params}){
      console.log(params)
      try{
        const  user_units_temp = await $axios.get(`/api/v1/technique/user/units?user_id=${$auth.user.id}`)
        const response_feedbacks = await $axios.get(`/api/v1/user/get_user_feedback?user_id=${$auth.user.id}`)
        const response_favorites = await $axios.get(`/api/v1/user/fav_get/`)
        console.log(response_favorites.data)
        const user_units = user_units_temp.data
        const feedbacks = response_feedbacks.data
        console.log(user_units)
        return {user_units,feedbacks}
      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        imageUrl: this.$auth.user.avatar,
        avatar:'',
        editProfileModal: false,
        partnerCodeModal: false,
        roleChange: false,
        codeSend: false,
        codeResult:'',
        partnerCode:{
          code:null
        },
        userData: {
          email: this.$auth.user.email,
          organization_name: this.$auth.user.organization_name,
          inn: this.$auth.user.inn,
          ogrn: this.$auth.user.ogrn,
          orders_count: this.$auth.user.orders_count,
          rent_count: this.$auth.user.rent_count,
          city: this.$auth.user.city.city,
          first_name: this.$auth.user.first_name,
          last_name: this.$auth.user.last_name,
          phone: this.$auth.user.phone,
          is_customer: this.$auth.user.is_customer,

        }
      }
    },
    mounted() {
      this.$auth.fetchUser()

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
        this.avatar = file.raw

      },
      async unitPromote(id){
        const response = await this.$axios.post('/api/v1/technique/promote',{unit_id:id})
        console.log(response)
        if(response.data.result){
          this.$notify({
            title: 'Успешно',
            message: 'Ваша техника поднята в поиске',
            type: 'success'
          });
          this.$auth.fetchUser()
        }else {
          this.$notify({
            title: 'Ошибка',
            message: 'Не хватает средств',
            type: 'error'
          });
        }
      },
      async unitPay(id){
        const response = await this.$axios.post('/api/v1/technique/pay',{unit_id:id})
        console.log(response)
         if(response.data.result){
          this.$notify({
            title: 'Успешно',
            message: 'Ваша техника снова участвует в поиске',
            type: 'success'
          });
          this.$auth.fetchUser()
           const response = await this.$axios.get(`/api/v1/technique/user/units?user_id=${this.$auth.user.id}`)
           this.user_units = response.data
        }else {
          this.$notify({
            title: 'Ошибка',
            message: 'Не хватает средств',
            type: 'error'
          });
        }
      },
      async sendPartnerCode(){
        this.codeSend = true
        const response = await this.$axios.post('/api/v1/user/new_partner/',this.partnerCode)
        console.log(response)
        if (response.data['status']){
          this.codeSend=false
          this.codeResult='Код успешно применен'
        }else {
          this.codeSend=false
          this.codeResult='Код не действительный'
        }
      },


      async updateUser(){
        this.roleChange = true
        let formData = new FormData()
        formData.set('userData', JSON.stringify(this.userData))

        formData.set('avatar',this.avatar)

        await this.$axios({
          method: 'post',
          headers:{
            'content-type': 'multipart/form-data'
          },
          url: '/api/v1/user/update/',
          data: formData
        }).then((response) => {
          this.roleChange = false
          this.$notify({
            title: 'Успешно',
            message: 'Ваши данные обновлены',
            type: 'success'
          });
          this.$auth.fetchUser()
          this.editProfileModal = false


        })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      },

    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
