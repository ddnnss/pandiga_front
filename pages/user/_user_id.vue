<template>

  <section class="user-profile">
    <div class="container">

     <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item v-if="user.is_person">Профиль пользователя {{user.fullname}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>Профиль организации {{user.organization_name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 class="section-header fg-10 mb-35">Профиль</h1>

      <div class="user-profile__wrapper">
        <div class="user-profile__img">
          <img :src="user.avatar" alt="">
        </div>
        <div class="user-profile__info">
          <p v-if="user.is_online" class="user-profile__info-status">Онлайн</p>
          <p v-else class="user-profile__info-status color-main">Оффлайн<br>Последняя активность
            {{new Date(user.last_online).toLocaleString().replace(/(:\d{2}| [AP]M)$/, "")}}
          </p>
          <p v-if="user.is_person" class="user-profile__info-name">{{user.fullname}}</p>
          <p v-else class="user-profile__info-name">{{user.organization_name}}</p>
          <div v-if="user.rate_times > 0" class="catalog-item__rating mb-10">
            <p class="catalog-item__rating-p">{{user.rating}} </p>
            <span class="catalog-item__rating-span">Отзывов: {{user.rate_times}}</span>
          </div>
          <div class="mb-10">
             <p v-if="!user.is_person">ИНН: {{user.inn}}</p>
              <p v-if="!user.is_person">ОГРН: {{user.ogrn}}</p>
          </div>

          <p class="user-profile__info-location">{{user.city.city}}</p>
        </div>
        <div class="user-profile__button">
          <p>Дата регистрации:
            {{new Date(user.date_joined).toLocaleString().replace(/(:\d{2}| [AP]M)$/, "")}}
            <br><p>{{user.orders_count}} опубликовано заявок<br>{{user.rent_count}} сдавал в аренду</p>
        </div>
      </div>
      <div v-if="!user.is_customer">
      <h3 class="section-header f25">Техника</h3>
      <div class="technique-cards mb-60">
        <el-card class="technique-card" v-for="unit in user_units" :key="unit.id" :xs="24" :sm="12" :md="8" :lg="8">
          <el-image class="technique-card__img" :src="unit.images[0].image_thumb">
                  <div slot="placeholder" class="image-slot">
                    Загрузка<span class="dot">...</span>
                  </div>
                </el-image>

          <nuxt-link :to="`/catalog/${unit.type.name_slug}/${unit.name_slug}/`"><p class="technique-card__name">{{unit.name}}</p></nuxt-link>
          <p class="technique-card__price">{{unit.rent_price}} руб./ <span v-if="unit.rent_type"> час</span> <span v-if="!unit.rent_type"> день</span> </p>
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

  </section>




</template>

<script>
  export default {
      async asyncData({$axios,params}){
      console.log(params)
      try{
        const response_user = await $axios.get(`/api/v1/user/get_user/${params.user_id}`)
        const  user_units_temp = await $axios.get(`/api/v1/technique/user/units?user_id=${params.user_id}`)
        const response_feedbacks = await $axios.get(`/api/v1/user/get_user_feedback?user_id=${params.user_id}`)
        const user = response_user.data
        const user_units = user_units_temp.data
        const feedbacks = response_feedbacks.data

        return {user,feedbacks,user_units}
      }catch (e) {
        throw e
      }

    },
    data() {
      return {

        value: '',

      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

