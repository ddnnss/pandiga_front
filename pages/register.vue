<template>
  <section class="login-page">
    <div class="container">
      <el-steps class="login-box" :active="active_step" finish-status="success">
        <el-step title="Шаг 1"></el-step>
        <el-step title="Шаг 2"></el-step>
        <el-step title="Шаг 3"></el-step>
      </el-steps>
      <el-card v-if="phone_panel" class="login-box">
        <div class="login-content">
          <h3 class="section-header mb-10">Регистрация </h3>
          <p class="login-box__subtitle">Чтобы получить доступ к нашим сервисам, зарегистрируйтесь</p>
          <p class="mb-10">Я хочу ...</p>
          <el-switch
            style="display: block"
            class="mb-20"
            v-model="registerForm.is_customer"
            active-color="#CC0000"
            inactive-color="#cc0000"

            active-text="снять технику"
            inactive-text="сдать технику">
          </el-switch>
          <p class="mb-10">Я регистрируюсь как ...</p>
          <el-switch
            style="display: block"
            class="mb-20"
            v-model="registerForm.is_person"
            active-color="#CC0000"
            inactive-color="#cc0000"

            active-text="Физическое лицо"
            inactive-text="Юридическое лицо">
          </el-switch>
          <p class="mb-10">Введите Ваш номер телефона:</p>
          <el-form @submit.native.prevent autocomplete="off" :model="registerForm" status-icon :rules="rules" ref="registerForm" >

            <el-form-item prop="phone" inline-message="true">
              <el-input  type="tel" clearable v-mask="'+7(###)###-##-##'" @input="phone_exist = false"  placeholder="Номер телефона" v-model="registerForm.phone"></el-input>
            </el-form-item>
            <p v-if="phone_error" class="form-error mb-10">Похоже, вы ввели некорректный номер телефона</p>
              <p v-if="phone_exist" class="form-error mb-10">Похоже, у нас аккаунт с этим телефоном.
Вы можете войти в аккаунт <nuxt-link to="/login/">здесь</nuxt-link>.</p>
            <el-form-item>
              <el-button class="full-w" type="primary" :loading="step1_btn_loading" @click="submitForm('registerForm')">Продолжить</el-button>
            </el-form-item>
          </el-form>
          <p class="form-hr mb-20">или зарегистрируйтесь через</p>
          <div class="login-box__soсial">
            <div class="login-box__soсial-item">
              <img src="/fb_big.png" alt="">
              <p class="login-box__ssoсial-item-name">Facebook</p>
            </div>
            <div class="login-box__soсial-item">
              <img src="/gg_big.png" alt="">
              <p class="login-box__soсial-item-name">Google</p>
            </div>
            <div class="login-box__soсial-item">
              <img src="/vk_big.png" alt="">
              <p class="login-box__soсial-item-name">VK</p>
            </div>
          </div>
          <p class="login-box__no-acc">Уже есть аккаунт? <a href="">Войти</a> </p>
        </div>
      </el-card>
      <el-card v-if="phone_check_panel" class="login-box">
        <div class="login-content">
          <h3 class="section-header mb-10">Регистрация </h3>
          <p class="login-box__subtitle">На ваш номер телефона {{registerForm.phone}} отправлено SMS с кодом подтверждения</p>
          <p class="mb-10">Код подтверждения:</p>
          <el-form :model="phoneCheckForm" status-icon :rules="rules_phone_check" ref="phoneCheckForm">
            <el-form-item style="display: none" prop="smsCode" inline-message="true">
              <el-input   placeholder="X-X-X-X" ></el-input>
            </el-form-item>
            <el-form-item prop="smsCode" inline-message="true">
              <el-input v-mask="'X-X-X-X'"  placeholder="X-X-X-X" v-model="phoneCheckForm.smsCode"></el-input>
            </el-form-item>
            <p v-if="phone_check_error" class="form-error mb-10">Вы не верно ввели код подтверждения</p>
            <el-form-item>
              <el-button class="full-w" type="primary" @click="submitForm('phoneCheckForm')">Продолжить</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card v-if="password_panel" class="login-box">
        <div class="login-content">
          <h3 class="section-header mb-10">Регистрация </h3>
          <p class="login-box__subtitle">Введите Ваш адрес электронной почты и придумайте пароль</p>
          <el-form :model="passwordForm" ref="passwordForm">
            <el-form-item style="display: none" prop="smsCode" inline-message="true">
              <el-input   placeholder="X-X-X-X" ></el-input>
            </el-form-item>
            <el-form-item style="display: none" prop="smsCode" inline-message="true">
              <el-input   placeholder="X-X-X-X" ></el-input>
            </el-form-item>

            <el-form-item v-if="registerForm.is_person" prop="first_name" inline-message="true">
              <el-input  type="text"  placeholder="Ваше имя" v-model="passwordForm.first_name"></el-input>
            </el-form-item>
            <el-form-item v-else prop="organization_name" inline-message="true">
              <el-input  type="text"  placeholder="Название организации" v-model="passwordForm.organization_name"></el-input>
            </el-form-item>

            <el-form-item v-if="registerForm.is_person" prop="last_name" inline-message="true">
              <el-input  type="text"  placeholder="Ваша фамилия" v-model="passwordForm.last_name"></el-input>
            </el-form-item>
            <el-form-item v-else prop="inn" inline-message="true">
              <el-input  type="text"  placeholder="ИНН" v-model="passwordForm.inn"></el-input>
            </el-form-item>

            <el-form-item prop="email" inline-message="true">
              <el-input  type="text" @input="validateEmail()" placeholder="Ваш EMail" v-model="passwordForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select

                v-model="passwordForm.city_id"
                filterable
                remote

                reserve-keyword
                placeholder="Ваш город (начните вводить)"
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
            </el-form-item>

            <el-form-item prop="password1" inline-message="true">
              <el-input  type="password"  :show-password="true" @input="checkPasswordL()" placeholder="Введите пароль" v-model="passwordForm.password1"></el-input>
            </el-form-item>
            <el-form-item prop="password2"  inline-message="true">
              <el-input  type="password" :disabled="password_length_error" :show-password="true" @input="checkPassword()"  placeholder="Повторите пароль" v-model="passwordForm.password2"></el-input>
            </el-form-item>
            <p v-if="password_error" class="form-error mb-10">{{password_error_text}}</p>
            <p v-if="password_errors" v-for="error in password_errors_text" class="form-error mb-10">
              {{error}}
            </p>
            <el-form-item>
              <el-button class="full-w" :disabled="passwords_not_match || password_length_error" type="primary" :loading="step2_btn_loading" @click="registerUser()">Зарегистрироваться</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card v-if="register_done_panel" class="login-box">
        <div class="login-content">
          <h3 class="section-header mb-20 text-center">Регистрация завершена</h3>
          <p style="text-decoration: underline" class=" text-center"><nuxt-link class="color-main" to="/login">Вы можете войти в свой аккаунт</nuxt-link></p>

        </div>
      </el-card>
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
    async fetch({store}){

      // console.log('cities/cities',store.getters['cities/cities'].length)
      //
      // if (store.getters['cities/cities'].length === 0){
      //   await store.dispatch('cities/fetchCities')
      // }
    },
    layout: 'login',
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value.match(/^(\+7)?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm)) {
          console.log('this.phoneCheckForm.smsCode2',this.phoneCheckForm.smsCode)
          return callback(new Error('Введите корректный номер телефона'));
        }else{
          console.log('this.phoneCheckForm.smsCode2',this.phoneCheckForm.smsCode)
          callback();
        }
      };
      var checkSMS = (rule, val, callback) => {
        if (!val.match(/\d-\d-\d-\d/i)) {
          return callback(new Error('Введите код подтверждения'));
        }else{
          callback();
        }
      };
      return {
        active_step:0,
        loading:false,
        step1_btn_loading:false,
        step2_btn_loading:false,
        phone_panel:true,
        phone_error:false,
        phone_exist:false,
        password_error:false,
        password_length_error:true,
        password_errors:false,
        password_error_text:'',
        password_errors_text:[],
        phone_check_error:false,
        password_panel:false,
        passwords_not_match:true,
        city_is_chosen:false,
        phone_check_panel:false,
        register_done_panel:false,
        sms_code:'',
        cities:[],
        registerForm: {
          is_customer: true,
          is_person: true,
          phone: '',
        },
        phoneCheckForm: {
          smsCode:'',
        },
        passwordForm: {
          city_id:'',
          first_name:'',
          last_name:'',
          organization_name:'',
          inn:'',
          password1:'',
          password2:'',
          email:''
        },
        rules: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        },
        rules_phone_check: {
          smsCode: [
            { validator: checkSMS, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
    },
    watch: {
    },
    computed:{

      // cities(){
      //   return this.$store.getters['cities/cities']
      // }
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
      registerUser(){
        // if (!this.passwordForm.first_name || !this.passwordForm.last_name || !this.passwordForm.first_name){
        //   this.password_error_text = 'Заполните все поля!'
        //   this.password_error =true
        //   return
        // }
        this.password_error = false
        this.step2_btn_loading = true
        this.$axios.post('/auth/users/',{phone:this.registerForm.phone,
          password:this.passwordForm.password2,
          email:this.passwordForm.email,
          first_name:this.passwordForm.first_name,// ? this.passwordForm.first_name : 'none',
          last_name:this.passwordForm.last_name,// ? this.passwordForm.last_name : 'none',
          city:this.passwordForm.city_id,
          is_person:this.registerForm.is_person,
          is_customer:this.registerForm.is_customer,
          organization_name:this.passwordForm.organization_name,// ? this.passwordForm.organization_name : 'none',
          inn:this.passwordForm.inn,// ? this.passwordForm.inn : 'none',
        })
          .then((response) => {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 201){
              this.password_panel=false
              this.active_step +=1
              this.register_done_panel=true
            }
          })
          .then(response => {
            console.log('response1')
            console.log(response)

          })
          .catch(error => {
            console.log('response2')
              console.log(error.response.data)
              if(error.response.data['password']){
                for(let i of error.response.data['password']){
                console.log(i)
                this.password_errors_text= i + ' | '
              }
              }



            this.password_errors_text=error.response.data['email']
            this.password_errors =true
            this.step2_btn_loading = false
          });
      },
      validateEmail() {
        this.password_errors_text=''
        this.password_error =false
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(this.passwordForm.email))){
          this.password_error =false
        }else{
          this.password_error_text='Ввведите корректный E-Mail'
          this.password_error =true
        }
      },
      checkPasswordL(){
        console.log('ee',this.passwordForm.password1.length < 8 )
        if (this.passwordForm.password1.length < 8){
          this.password_error_text='Минимум 8 символов'
          this.password_error =true
          this.password_length_error =true
        }else{
          this.password_error =false
          this.password_length_error =false
        }
      },
      checkPassword(){
        if(this.passwordForm.password1 === this.passwordForm.password2){
          this.password_error =false
          this.passwords_not_match =false

        }else{
          this.password_error =true
          this.passwords_not_match = true
          this.password_error_text='Введенные пароли не совпадают'
        }
      },
      sendSMS(){
        this.step1_btn_loading = true
        this.$axios.post('/api/v1/user/sendSMS/',{phone:this.registerForm.phone})
          .then((response) => {
            console.log(response.data);
            // TODO Изменить проверку позже
            if (!response.data['result']){
              this.sms_code=response.data['code']
              this.phone_panel=false;
              this.phone_check_panel=true;
              this.active_step +=1
            }
            else {
              this.step1_btn_loading = false
              this.phone_error = true
            }
          })
          .catch(function (error) {
            console.log('error sms sending',error);
          })
      },
      checkSMS(){
        // TODO Изменить проверку позже
        if(this.code!==this.phoneCheckForm.smsCode.replace(/-/g,'')){
          console.log('SMS valid')
          this.phone_check_error = false
          this.phone_check_panel = false
          this.password_panel = true
          this.active_step +=1
        }
        else {
          console.log('SMS not valid')
          this.phone_check_error = true
        }
      },
      submitForm(formName) {
        console.log('form check');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName==='registerForm'){
              this.checkUserPhone()

            }
            if (formName==='phoneCheckForm'){
              this.checkSMS()
            }
          } else {
            console.log('error submit!!');
            return new Error('Введите телефон');
          }
        });
      },
      checkUserPhone(){

        this.$axios.post('/api/v1/user/getUserEmailbyPhone/',{phone:this.registerForm.phone}).then(responce =>{
          console.log(responce)
          if (responce.data['result']){
            console.log('FOUND')
            this.phone_exist = true

          }else{
            console.log('NOT FOUND')
            this.sendSMS()
          }
        })
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
    /*transform :  translateX(100px);*/
  }

  .fade1-enter-active, .fade1-leave-active {
    transition: all 1s ease-in-out

  }
  .fade1-enter, .fade1-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform :  translateX(100px);
  }
</style>
