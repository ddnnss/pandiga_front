<template>
  <header class="header">



    <div class="header-wrapper">
      <div class="header-logo">
        <nuxt-link :to="'/'"><img src="/logo.png" alt=""></nuxt-link>



      </div>
      <div class="header-links mobile-hide">
        <el-link v-if="this.$auth.loggedIn" :underline="false" class="header-link__item" icon="el-icon-position">{{this.$auth.user.city.city}}</el-link>
        <el-link v-else :underline="false" class="header-link__item" icon="el-icon-position">Москва</el-link>



        <!--        <el-link :underline="false" class="header-link__item" >Работа</el-link>-->

        <nuxt-link class="header-link__item el-link el-link--default" :to="'/catalog/'"> Каталог техники</nuxt-link>

        <nuxt-link v-if="this.$auth.loggedIn && !this.$auth.user.is_customer"  to="/orders/" class="header-link__item el-link el-link--default" >Заявки на технику</nuxt-link>


      </div><!--header-links-->
      <div  class="header-buttons mobile-hide">
        <nuxt-link v-if="this.$auth.loggedIn && !this.$auth.user.is_customer" :to="'/catalog/add/'"><el-button  class="header-buttons__add-tech" icon="el-icon-plus" type="primary">Добавить технику</el-button></nuxt-link>
        <nuxt-link v-if="this.$auth.loggedIn && this.$auth.user.is_customer" :to="'/orders/add/'"><el-button  class="header-buttons__add-tech" icon="el-icon-plus" type="primary">Заявка на технику</el-button></nuxt-link>

        <div v-if="!this.$auth.loggedIn" class="header-buttons__group ">
          <nuxt-link :to="'/login'"><el-button plain class="login-btn">Войти</el-button></nuxt-link>
          <nuxt-link :to="'/register'"><el-button plain>Зарегистрироваться</el-button></nuxt-link>
        </div>
        <div v-if="this.$auth.loggedIn"  class="header-buttons__group ">
          <div class="mobile-buttons__group">
            <el-badge :hidden='chatMgsCount === 0' :value="chatMgsCount" class="item">
              <i class="el-icon-chat-line-round mobile-toggle"></i>
            </el-badge>
            <!--            <el-badge v-if="this.$auth.user.is_customer" :value="false" class="item">-->
            <!--              <i class="el-icon-star-off mobile-toggle"></i>-->
            <!--            </el-badge>-->
            <el-badge :hidden='notifyMgsCount===0' :value="notifyMgsCount" class="item">
              <i class="el-icon-bell mobile-toggle"></i>
            </el-badge>
            <el-dropdown>
              <el-badge :hidden='userMsgCount ===0'  :value="userMsgCount" class="item">
                <i class="el-icon-user mobile-toggle"></i>
              </el-badge>
              <el-dropdown-menu slot="dropdown">
                <nuxt-link :to="'/lk/'"><el-dropdown-item ><i class="el-icon-user"></i> Профиль</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/chats/'"><el-dropdown-item><i class="el-icon-chat-line-round"></i> Сообщения</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/favorite/'"><el-dropdown-item><i class="el-icon-star-off"></i> Избранное</el-dropdown-item></nuxt-link>

                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/orders/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои заявки на технику</el-dropdown-item></nuxt-link>
                <nuxt-link v-else :to="'/lk/apply/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои предложения</el-dropdown-item></nuxt-link>



                <el-dropdown-item>
                  <el-link :underline="false"  icon="el-icon-s-finance">Реферальная система</el-link>
                </el-dropdown-item>


                <el-dropdown-item divided>
                  <el-link :underline="false" @click="$auth.logout()" icon="el-icon-switch-button">Выход</el-link>

                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </div>


      </div><!--header-buttons-->
      <div class="mobile-buttons mobile-show">
        <div v-if="this.$auth.loggedIn"class="mobile-buttons__group">

          <div class="mobile-buttons__group">
            <el-badge :hidden='chatMgsCount === 0' :value="chatMgsCount" class="item">
              <i class="el-icon-chat-line-round mobile-toggle"></i>
            </el-badge>
            <!--            <el-badge v-if="this.$auth.user.is_customer" :value="false" class="item">-->
            <!--              <i class="el-icon-star-off mobile-toggle"></i>-->
            <!--            </el-badge>-->
            <el-badge :hidden='notifyMgsCount===0' :value="notifyMgsCount" class="item">
              <i class="el-icon-bell mobile-toggle"></i>
            </el-badge>
            <el-dropdown>
              <el-badge :hidden='userMsgCount ===0'  :value="userMsgCount" class="item">
                <i class="el-icon-user mobile-toggle"></i>
              </el-badge>
              <el-dropdown-menu slot="dropdown">
                <nuxt-link :to="'/lk/'"><el-dropdown-item ><i class="el-icon-user"></i> Профиль</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/chats/'"><el-dropdown-item><i class="el-icon-chat-line-round"></i> Сообщения</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/favorite/'"><el-dropdown-item><i class="el-icon-star-off"></i> Избранное</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/orders/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои заявки на технику</el-dropdown-item></nuxt-link>
                <nuxt-link v-else :to="'/lk/apply/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои предложения</el-dropdown-item></nuxt-link>
                <el-dropdown-item>
                  <el-link :underline="false"  icon="el-icon-s-finance">Реферальная система</el-link>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-link :underline="false" @click="$auth.logout()" icon="el-icon-switch-button">Выход</el-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-badge class="item">
              <i @click="drawer = true" class="el-icon-menu mobile-toggle"></i>
            </el-badge>

          </div>
        </div>
      </div>
    </div><!--header-wrapper-->
    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      size="80%"
      :show-close=true
      :with-header="false">

      <div class="sidebar">
        <div class="sidebar__logo">
          <img src="/logo.png" alt="">
        </div>
        <el-menu
          v-if="this.$auth.loggedIn"
          default-active="2"
          class="el-menu-vertical-demo no-border">
          <el-menu-item index="2">
            <i class="el-icon-position"></i>
            <span>Москва</span>
          </el-menu-item>

          <el-menu-item index="4">
            <i class="el-icon-info"></i>
            <span>Работа</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-question"></i>
            <span>Нужна техника</span>
          </el-menu-item>
        </el-menu>
        <div class="sidebar_buttons">
          <nuxt-link v-if="this.$auth.loggedIn && !this.$auth.user.is_customer" :to="'/catalog/add/'"><el-button  class="header-buttons__add-tech full-w" icon="el-icon-plus" type="primary">Добавить технику</el-button></nuxt-link>
          <nuxt-link v-if="this.$auth.loggedIn && this.$auth.user.is_customer" :to="'/orders/add/'"><el-button  class="header-buttons__add-tech full-w" icon="el-icon-plus" type="primary">Заявка на технику</el-button></nuxt-link>
          <div v-if="!this.$auth.loggedIn" class="header-buttons__group ">
            <nuxt-link :to="'/login'"><el-button plain class="login-btn full-w" >Войти</el-button></nuxt-link>
            <nuxt-link :to="'/register'"><el-button plain class="full-w">Зарегистрироваться</el-button></nuxt-link>
          </div>
        </div>
      </div>
    </el-drawer>
  </header><!--header-->
</template>

<script>



  export default {
    data() {
      return {
        chatMgsCount:0,
        notifyMgsCount:0,
        userMsgCount:0,
        drawer:false,
        notifications:[],
        socket:null,

      }
    },
    created () {




    },
    mounted() {
      // this.socket = new WebSocket('ws://localhost:8000/ws/user/online/')
      // this.socket.onopen = () => {
      //   console.log('ws users connected')
      //   this.socket.send(JSON.stringify({'user_id':this.$auth.user.id}))
      // }
      // this.socket.onmessage = (res) =>{
      //   console.log('message',res)
      // }


    },
    methods: {
      ddd(){

      },

      pollData () {
        if (this.$auth.loggedIn){
          setInterval(() => {
            this.getNotify()
          }, 15000)
        }

      },
      async getNotify(){
        const response = await  this.$axios.get('/api/v1/notification/get/')
        console.log(response.data)
        response.data.length > 0 ? this.notifyMgsCount = response.data.length : console.log(response.data.length)
        for (let n of response.data){
          console.log(n)
          this.$notify.info({
            title: 'Оповещение',
            message: n.text,

          });

        }
        await this.$axios.post('/api/v1/notification/set_read/')
      }

    }
  }
</script>
