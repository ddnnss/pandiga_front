<template>

  <section class="catalog-page">

    <div class="container">
      <h1 class="section-header mb-60">Вопрос-Ответ</h1>
      <h3 class="section-header fs-25 mb-15">Вопрос 1</h3>
      <p class="faq-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra volutpat viverra pharetra, dis platea morbi aliquet augue eget. At lacus massa arcu purus. Felis ultrices suspendisse tellus enim, in vestibulum velit, velit. Diam, vitae orci varius ultricies facilisi aenean fauc
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra volutpat viverra pharetra, dis platea morbi aliquet augue eget. At lacus massa arcu purus. Felis ultrices suspendisse tellus enim, in vestibulum velit, velit. Diam, vitae orci varius ultricies facilisi aenean fauc</p>
        <el-divider class="mb-50"></el-divider>
      <h3 class="section-header fs-25 mb-15">Вопрос 1</h3>
      <p class="faq-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra volutpat viverra pharetra, dis platea morbi aliquet augue eget. At lacus massa arcu purus. Felis ultrices suspendisse tellus enim, in vestibulum velit, velit. Diam, vitae orci varius ultricies facilisi aenean fauc
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra volutpat viverra pharetra, dis platea morbi aliquet augue eget. At lacus massa arcu purus. Felis ultrices suspendisse tellus enim, in vestibulum velit, velit. Diam, vitae orci varius ultricies facilisi aenean fauc</p>
        <el-divider class="mb-50"></el-divider>
       <h3 class="section-header fs-25 mb-15">Вопрос 1</h3>
      <p class="faq-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra volutpat viverra pharetra, dis platea morbi aliquet augue eget. At lacus massa arcu purus. Felis ultrices suspendisse tellus enim, in vestibulum velit, velit. Diam, vitae orci varius ultricies facilisi aenean fauc
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra volutpat viverra pharetra, dis platea morbi aliquet augue eget. At lacus massa arcu purus. Felis ultrices suspendisse tellus enim, in vestibulum velit, velit. Diam, vitae orci varius ultricies facilisi aenean fauc</p>

    </div>

      <div id="form" class="callback-form">
        <h3 class="section-header text-center mb-35">Задать вопрос</h3>
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
            <el-button type="primary" @click="submit">Задать вопрос</el-button>
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

