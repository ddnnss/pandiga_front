<template>
  <header class="header">



    <div class="header-wrapper">
      <div class="header-logo">
        <nuxt-link :to="'/'"><img src="/logo.svg" alt=""></nuxt-link>
        <p v-if="this.$auth.loggedIn && this.$auth.user.is_customer" class="header-logo__type">Заказчик</p>
        <p v-if="this.$auth.loggedIn && !this.$auth.user.is_customer" class="header-logo__type">Исполнитель</p>


      </div>
      <div class="header-links mobile-hide">
<!--        <el-link v-if="this.$auth.loggedIn" :underline="false" class="header-link__item" icon="el-icon-position">{{this.$auth.user.city.city}}</el-link>-->
<!--        <el-link v-else :underline="false" class="header-link__item" icon="el-icon-position">Москва</el-link>-->



        <!--        <el-link :underline="false" class="header-link__item" >Работа</el-link>-->





      </div><!--header-links-->
      <div  class="header-buttons mobile-hide">
        <nuxt-link style="margin-right: 10px" class="header-link__item el-link el-link--default" :to="'/catalog/'">
            <el-button v-if="!this.$auth.loggedIn" icon="el-icon-truck" type="primary">Каталог техники</el-button>
            <el-button v-else plain icon="el-icon-truck">Каталог техники</el-button>
          </nuxt-link>
        <nuxt-link style="margin-right: 10px" v-if="this.$auth.loggedIn && !this.$auth.user.is_customer" to="/orders/"
                   class="header-link__item el-link el-link--default" >
          <el-button plain  icon="el-icon-folder-opened">Заявки на технику</el-button>
        </nuxt-link>
        <nuxt-link v-if="this.$auth.loggedIn && !this.$auth.user.is_customer" :to="'/catalog/add/'">
          <el-button  class="header-buttons__add-tech" icon="el-icon-plus" type="primary">Добавить технику</el-button>
        </nuxt-link>
        <nuxt-link v-if="this.$auth.loggedIn && this.$auth.user.is_customer" :to="'/orders/add/'">
          <el-button  class="header-buttons__add-tech" icon="el-icon-plus" type="primary">Заявка на технику</el-button>
        </nuxt-link>

        <div v-if="!this.$auth.loggedIn" class="header-buttons__group ">

          <nuxt-link :to="'/login'"><el-button plain class="login-btn">Войти</el-button></nuxt-link>
          <nuxt-link :to="'/register'"><el-button plain>Зарегистрироваться</el-button></nuxt-link>
        </div>
        <div v-if="this.$auth.loggedIn"  class="header-buttons__group ">
          <div class="mobile-buttons__group">
             <nuxt-link to="/lk/favorite/">
            <el-badge :hidden='this.$auth.user.favorites.length===0' v-if="this.$auth.user.is_customer" :value="this.$auth.user.favorites.length" class="item">
              <i v-if="this.$auth.user.favorites.length>0" class="el-icon-star-on mobile-toggle"></i>
              <i v-else class="el-icon-star-off mobile-toggle"></i>
            </el-badge>
             </nuxt-link>
            <nuxt-link to="/lk/chats/">
              <el-badge :hidden='chatMgsCount === 0' :value="chatMgsCount" class="item">
                <i class="el-icon-chat-line-round mobile-toggle"></i>
              </el-badge>
            </nuxt-link>

            <nuxt-link to="/lk/notifications/">
              <el-badge :hidden='notifyMgsCount===0' :value="notifyMgsCount" class="item">
                <i class="el-icon-bell mobile-toggle"></i>
              </el-badge>
            </nuxt-link>
            <el-dropdown trigger="click">
              <el-badge :hidden='userMsgCount ===0'  :value="userMsgCount" class="item">
                <i class="el-icon-user mobile-toggle"></i>
              </el-badge>
              <el-dropdown-menu slot="dropdown">
                <nuxt-link :to="'/lk/profile/'"><el-dropdown-item ><i class="el-icon-user"></i> Профиль</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/notifications/'"><el-dropdown-item ><i class="el-icon-bell"></i> Оповещения</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/chats/'"><el-dropdown-item><i class="el-icon-chat-line-round"></i> Сообщения</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/favorite/'"><el-dropdown-item><i class="el-icon-star-off"></i> Избранное</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/orders/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои заявки на технику</el-dropdown-item></nuxt-link>
                <nuxt-link v-else :to="'/lk/apply/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои предложения</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/refferal/'"><el-dropdown-item><i class="el-icon-s-finance"></i>Партнерская программа</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/balance/'"><el-dropdown-item><i class="el-icon-wallet"></i>Баланс</el-dropdown-item></nuxt-link>
                <el-dropdown-item divided>
                  <el-link :underline="false" @click="logOut()" icon="el-icon-switch-button">Выход</el-link>
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
            <el-badge v-if="this.$auth.user.is_customer" :value="this.$auth.user.favorites.length" class="item">
              <i v-if="this.$auth.user.favorites.length>0" class="el-icon-star-on mobile-toggle"></i>
              <i v-else class="el-icon-star-off mobile-toggle"></i>
            </el-badge>
            <el-badge :hidden='notifyMgsCount===0' :value="notifyMgsCount" class="item">
              <i class="el-icon-bell mobile-toggle"></i>
            </el-badge>
            <el-dropdown trigger="click">
              <el-badge :hidden='userMsgCount ===0'  :value="userMsgCount" class="item">
                <i class="el-icon-user mobile-toggle"></i>
              </el-badge>
              <el-dropdown-menu  slot="dropdown">
                <nuxt-link :to="'/lk/profile/'"><el-dropdown-item ><i class="el-icon-user"></i> Профиль</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/notifications/'"><el-dropdown-item ><i class="el-icon-user"></i> Оповещения</el-dropdown-item></nuxt-link>
                <nuxt-link :to="'/lk/chats/'"><el-dropdown-item><i class="el-icon-chat-line-round"></i> Сообщения</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/favorite/'"><el-dropdown-item><i class="el-icon-star-off"></i> Избранное</el-dropdown-item></nuxt-link>
                <nuxt-link v-if="this.$auth.user.is_customer" :to="'/lk/orders/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои заявки на технику</el-dropdown-item></nuxt-link>
                <nuxt-link v-else :to="'/lk/apply/'"><el-dropdown-item><i class="el-icon-finished"></i> Мои предложения</el-dropdown-item></nuxt-link>
                <el-dropdown-item>
                  <el-link :underline="false"  icon="el-icon-s-finance">Реферальная система</el-link>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-link :underline="false" @click="logOut()" icon="el-icon-switch-button">Выход</el-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-badge class="item">
              <i @click="drawer = true" class="el-icon-menu mobile-toggle"></i>
            </el-badge>

          </div>
        </div>
        <div v-else class="mobile-buttons__group">
          <el-badge class="item">
            <i @click="drawer = true" class="el-icon-menu mobile-toggle"></i>
          </el-badge>
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
<!--          <el-menu-item index="2">-->
<!--            <i class="el-icon-position"></i>-->
<!--            <span>Москва</span>-->
<!--          </el-menu-item>-->

<!--          <el-menu-item index="4">-->
<!--            <i class="el-icon-info"></i>-->
<!--            <span>Работа</span>-->
<!--          </el-menu-item>-->

        </el-menu>
        <div class="sidebar_buttons">
          <nuxt-link  :to="'/catalog/'">
            <el-button class="header-buttons__add-tech full-w mb-20" v-if="!this.$auth.loggedIn" icon="el-icon-truck" type="primary">Каталог техники</el-button>
            <el-button class="header-buttons__add-tech full-w mb-20" v-else plain icon="el-icon-truck">Каталог техники</el-button>
          </nuxt-link>
        <nuxt-link  v-if="this.$auth.loggedIn && !this.$auth.user.is_customer"  to="/orders/"  >
          <el-button class="header-buttons__add-tech full-w mb-20" plain  icon="el-icon-folder-opened"> Заявки на технику</el-button>
        </nuxt-link>
          <nuxt-link v-if="this.$auth.loggedIn && !this.$auth.user.is_customer" :to="'/catalog/add/'">
            <el-button  class="header-buttons__add-tech full-w" icon="el-icon-plus" type="primary">Добавить технику</el-button>
          </nuxt-link>
          <nuxt-link v-if="this.$auth.loggedIn && this.$auth.user.is_customer" :to="'/orders/add/'">
            <el-button  class="header-buttons__add-tech full-w" icon="el-icon-plus" type="primary">Заявка на технику</el-button>
          </nuxt-link>
          <div v-if="!this.$auth.loggedIn" >

            <nuxt-link :to="'/login'"><el-button plain class="login-btn full-w mb-20" >Войти</el-button></nuxt-link>


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
        test:666,
        chat_sound:'/chat.mp3'
      }
    },
    created () {
    },
    watch: {
      '$route.path': function(val) {

        this.drawer = false
        if(this.$auth.user) {
          this.getNotifications()
        }
        if(this.$auth.user && val === '/lk/notifications/') {
          //this.getNotifications()
          console.log('$route.path',val)
          this.getNotifications()
        }
      }
    },
    beforeDestroy() {
      console.log('destroy')
    },
    mounted() {
      console.log('this.$auth.user',this.$auth.user)
      if(this.$auth.user){
        this.getNotifications()
        console.log(process.env.ws_url)
        this.socket = new WebSocket(process.env.ws_url+'/ws/user/online/')
        this.socket.onopen = () => {
          console.log('ws users connected')
          this.socket.send(JSON.stringify({'user_id':this.$auth.user.id,'message':'user online'}))
        }
        this.socket.onmessage = (res) =>{
          console.log('message',JSON.parse(res.data))
          let data = JSON.parse(res.data)
          if (data.event==='chat' && $nuxt.$route.name!=='lk-chats'){
            this.getNotifications()
            this.showNotify(data.message,data.url)
          }
          if(data.event==='order'){
            this.getNotifications()
            this.showNotify(data.message,data.url)
          }
        }
      }
    },
    methods: {
      async getNotifications(){
        const response_messages = await  this.$axios.get('/api/v1/notification/get_messages_count/')
        const response_other = await  this.$axios.get('/api/v1/notification/get_other_count/')
        console.log(response_messages.data['new_messages'])
        this.chatMgsCount = response_messages.data['new_messages']
        this.notifyMgsCount = response_other.data['new_messages']
        //this.notifyMgsCount = response.data.length
        //await this.$axios.post('/api/v1/notification/set_read/')

      },
      showNotify(message,url){
        this.$notify({
          onClick:() => {
            this.notifyClick(url)
          },
          dangerouslyUseHTMLString: true,
          message: `<strong><p style="cursor: pointer"><i style="margin-right: 10px" class="el-icon-chat-line-round"></i>${message}</p></strong>`
        });
        var audio = new Audio(this.chat_sound);
        audio.play();
      },
      notifyClick(url){
        console.log('n click')
        this.$router.push(url)
      },
      logOut(){
        this.socket.send(JSON.stringify({'logout_id':this.$auth.user.id}))
        this.$auth.logout()
      },
    }
  }
</script>
