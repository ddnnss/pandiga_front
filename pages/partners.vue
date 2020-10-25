<template>

  <section class="catalog-page">

    <div class="container">
      <h1 class="section-header mb-60 text-center">Выгодная партнерская программа</h1>
      <el-row class="mb-60">
        <el-col ::xs="8" :sm="12" :md="8" :lg="8" class="mb-10">
          <p class="fs-18 lh-24">Мы постоянно следим, чтобы ваш трафик
            конвертировался максимально
            эффективно и приносил больший доход.</p>
        </el-col>
        <el-col :xs="8" :sm="12" :md="8" :lg="8" class="mb-10">
          <p class="fs-18 lh-24">Мы привыкли знать наших партнёров
            «в лицо» — вы всегда будете знать,
            к кому обратиться с вопросом.</p>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <p class="fs-18 lh-24">Прозрачная статистика
            Все цифры по лидам и свой доход
            вы будете видеть в личном кабинете.</p>
        </el-col>
      </el-row>
      <h3 class="section-header text-center mb-10">Кто может стать нашим партнёром</h3>
      <p class="fs-18 text-center mb-60">Партнёрами Pandiga могут стать частные и юридические лица:</p>
      <p class="mb-20"><img style="margin-right: 30px" src="/dot.png" alt="">веб-мастера</p>

      <p class="mb-20"><img style="margin-right: 30px" src="/dot.png" alt="">владельцы сайтов, форумов</p>
      <p class="mb-60"><img style="margin-right: 30px" src="/dot.png" alt="">частные лица, желающие заработать в интернете</p>
  </div>

      <div class="callback-form">
        <h3 class="section-header text-center mb-35">Как стать партнёром</h3>
        <p class="text-center mb-35">Чтобы начать монетизировать свой сайт и зарабатывать в интернете, вам достаточно заполнить заявку на регистрацию или написать нам на:</p>
        <el-form :inline="true" :model="formCallback" style="text-align: center; margin-bottom: 10px">
          <el-form-item>
            <el-input v-model="formCallback.name" placeholder="Ваше имя*"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formCallback.email" placeholder="Электронная почта*"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formCallback.phone" placeholder="Номер телефона*"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit">Стать партнером</el-button>
          </el-form-item>
        </el-form>
        <p class="fs-14 text-center">Подтверждаю ознакомление и согласие с условиями и правилами работы в полном объёме.</p>
      </div>
  </section>








</template>

<script>
  export default {

    data() {
      return {
      formCallback:{
        name:null,
        email:null,
        phone:null
      }

      }
    },
    computed:{

    },
    mounted() {

    },
    methods: {
      submit() {
        console.log('submit!');
      }


    }
  }
</script>

