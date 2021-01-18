<template>

  <section class="login-page">
    <div class="container">
      <el-card v-if="login_panel" class="login-box">
        <div class="login-content">
          <h3 class="section-header mb-10">Вход </h3>
          <p class="login-box__subtitle">Чтобы получить доступ к нашим сервисам, войдите, используя данные своего аккаунта </p>
          <p v-if="password_reset" style="margin-top: 10px;color: green" class="login-box__subtitle">Пароль успешно изменен</p>

          <p class="mb-10">Номер телефона:</p>
          <el-form @submit.native.prevent :model="loginForm" status-icon :rules="rules"
                   ref="loginForm"  class="demo-ruleForm">
            <el-form-item prop="phone" inline-message="true">

              <el-input @onkeyup="console.log(event)"  type="tel" clearable v-mask="'+7(###)###-##-##'" placeholder="+7" v-model="loginForm.phone"></el-input>
            </el-form-item>
            <p v-if="login_error" class="form-error mb-10">Похоже, у нас нет аккаунта с этим телефоном.Вы можете создать новый аккаунт <nuxt-link to="/register/">здесь</nuxt-link>.</p>
            <el-form-item>
              <el-button class="full-w" type="primary" :loading="step1_btn_loading" @click="submitForm('loginForm')">Продолжить</el-button>
            </el-form-item>
          </el-form>
<!--          <p class="form-hr mb-20">или нажмите ниже, чтобы войти в аккаунт</p>-->
<!--          <div class="login-box__soсial">-->
<!--            <div class="login-box__soсial-item">-->
<!--              <img src="/fb_big.png" alt="">-->
<!--              <p class="login-box__ssoсial-item-name">Facebook</p>-->
<!--            </div>-->
<!--            <div class="login-box__soсial-item">-->
<!--              <img src="/gg_big.png" alt="">-->
<!--              <p class="login-box__soсial-item-name">Google</p>-->
<!--            </div>-->
<!--            <div class="login-box__soсial-item">-->
<!--              <img src="/vk_big.png" alt="">-->
<!--              <p class="login-box__soсial-item-name">VK</p>-->
<!--            </div>-->
<!--          </div>-->
          <p class="login-box__no-acc mb-10">Нет аккаунта? <nuxt-link to="/register/">Здесь</nuxt-link> </p>
          <p class="login-box__no-acc">Забыли пароль? <a href="#" @click.prevent="login_panel = false, recovery_panel=true">Восстановить</a> </p>
        </div>

      </el-card>
      <transition name = "fade">
      <el-card v-if="password_panel" class="login-box">
        <div class="login-content">
          <h3 class="section-header mb-10">Вход </h3>
          <p class="login-box__subtitle">Введите пароль от Pandiga</p>

          <p class="mb-10">Пароль:</p>
          <el-form @submit.native.prevent :model="passwordForm" status-icon  ref="passwordForm" >
            <el-form-item prop="password" inline-message="true">

              <el-input  type="password" :show-password="true"  placeholder="Ваш пароль" v-model="passwordForm.password"></el-input>
            </el-form-item>
            <p v-if="password_error" class="form-error mb-10">Введен не верный пароль</p>
            <el-form-item>
              <el-button class="full-w" type="primary" :loading="step2_btn_loading" @click="userLogin()">Войти в аккаунт</el-button>
            </el-form-item>
          </el-form>
          <p class="text-center mb-15"><a class="color-main" href="">Забыли пароль?</a></p>


        </div>

      </el-card>
      </transition>
      <transition name = "fade">
         <el-card v-if="recovery_panel" class="login-box">
            <p class="login-box__subtitle">Новый пароль будет выслан Вам на указанный номер телефона</p>
           <el-form @submit.native.prevent :model="loginForm" status-icon :rules="rules"
                   ref="loginForm"  class="demo-ruleForm">
            <el-form-item prop="phone" inline-message="true">

              <el-input @onkeyup="console.log(event)"  type="tel" clearable v-mask="'+7(###)###-##-##'" placeholder="+7" v-model="loginForm.phone"></el-input>
            </el-form-item>
            <p v-if="login_error" class="form-error mb-10">Похоже, у нас нет аккаунта с этим телефоном.Вы можете создать новый аккаунт <nuxt-link to="/register/">здесь</nuxt-link>.</p>
            <el-form-item>
              <el-button class="full-w" type="primary" :loading="step1_btn_loading" @click="recoverPassword('loginForm')">Восстановить пароль</el-button>
            </el-form-item>
          </el-form>
         </el-card>
      </transition>
      <div class="login-msg">
        <p>Входя в аккаунт или создавая новый, вы соглашаетесь
с нашими <a href="">Правилами и условиями</a> и <a href="">Положением
о конфиденциальности</a></p>
      </div>
    </div>

  </section>




</template>

<script>
  export default {
    layout: 'login',

    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Введите телефон'));
        }else{
          callback();
        }

      };
      return {
        step1_btn_loading:false,
        step2_btn_loading:false,
        login_panel:true,
        login_error:false,
        password_error:false,
        password_panel:false,
        recovery_panel:false,
        password_reset:false,
        loginForm: {
          phone: ''
        },
        passwordForm: {
          email:'',
          password: ''
        },
        rules: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        }

      }
    },
    mounted() {

    },
    methods: {
      async userLogin() {
        this.step2_btn_loading = true
        this.password_error = false
        try {
          let response = await this.$auth.loginWith('local', { data: this.passwordForm })
          console.log(response)
        } catch (err) {
           this.step2_btn_loading = false
           this.password_error = true
        }
      },
      async getUserEmail(){
        this.step1_btn_loading = true
        const response = await this.$axios.post('/api/v1/user/getUserEmailbyPhone/',{phone:this.loginForm.phone})
          console.log(response)
        if (response.data['result']){
          this.passwordForm.email = response.data.email
               this.login_panel=false;
               this.password_panel=true;
        }else {
          this.step1_btn_loading = false
          this.login_error = true
        }
      },
      submitForm(formName) {
        console.log('form check');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('valid');
              this.getUserEmail()

          } else {
            console.log('error submit!!');
            return new Error('Введите телефон');
          }
        });
      },
      async recoverPassword(){
        this.step1_btn_loading = true
           const response = await this.$axios.post('/api/v1/user/recover_password',{phone:this.loginForm.phone})
            if (response.data['result']){
               this.login_error = false
                this.recovery_panel = false
              this.login_panel = true
              this.password_reset=true
              this.step1_btn_loading = false
        }else {
          this.step1_btn_loading = false
          this.login_error = true
        }
      }

    }
  }
</script>

<style>
         .fade-enter-active, .fade-leave-active {
            transition: all .5s ease-in-out

         }
         .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
            transform :  translateX(100px);
         }
      </style>
