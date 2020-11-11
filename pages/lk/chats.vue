<template>

  <section class="lk pt-20">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Техника в Москве</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/lk/profile' }">Профиль</el-breadcrumb-item>
        <el-breadcrumb-item>Чаты</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="lk-wrapper">
        <div class="lk-main">
          <div class="chat-wrapper">
            <el-card shadow="never" class="chat-users" :body-style="{padding:'0'}">

              <div  v-for="chat in chats" :key="chat.id" @click="openChat(chat.id)">

                <div v-if="chat.starter.id === $auth.user.id" class="chat-user" :class="{'chatUnread':chat.isNewMessages}">
                  <div class="chat-user__img">'
                    <img  :src="chat.opponent.avatar" alt="">
                  </div>
                  <div class="chat-user__info">
                    <p class="chat-user__info-name">{{chat.opponent.fullname}}
                      <i style="display: inline-block" class="el-icon-user-solid "
                         :class="{'color-main':!chat.opponent.is_online,'userOnline':chat.opponent.is_online}"></i>
                    </p>
                    <p class="chat-user__info-msg">
                      <img v-if="chat.last_message_user_avatar==='no_ava'" src="/no_ava.svg" class="chat-user__info-msg-img"  alt="">
                      <img class="chat-user__info-msg-img" v-else :src="baseUrl+chat.last_message_user_avatar" alt="">
                      {{chat.last_message.substring(0,10)}}...
                    </p>
                  </div>
                  <div class="chat-user__date">
                    <p class="chat-user__date-p">{{new Date(chat.updatedAt).toLocaleString()}}</p>
                  </div>
                </div>
                <div v-if="chat.opponent.id === $auth.user.id" class="chat-user" :class="{'chatUnread':chat.isNewMessages}">
                  <div class="chat-user__img">
                     <img  :src="chat.starter.avatar" alt="">
                  </div>
                  <div class="chat-user__info">
                    <p class="chat-user__info-name">{{chat.starter.fullname}}
                      <i style="display: inline-block" class="el-icon-user-solid "
                         :class="{'color-main':!chat.starter.is_online,'userOnline':chat.starter.is_online}"></i>
                    </p>
                    <p class="chat-user__info-msg">
                      <img v-if="chat.last_message_user_avatar==='no_ava'" src="/no_ava.svg" class="chat-user__info-msg-img"  alt="">
                      <img class="chat-user__info-msg-img" v-else :src="baseUrl+chat.last_message_user_avatar" alt="">
                      {{chat.last_message.substring(0,10)}}...
                    </p>
                  </div>
                  <div class="chat-user__date">
                    <p class="chat-user__date-p">{{new Date(chat.updatedAt).toLocaleString()}}</p>
                  </div>
                </div>
              </div><!--chat-user-->
            </el-card>
            <div v-if="chat_messages.length === 0" class="chat-content">
              <div class="chat-choose">
                <h3 class="section-header">Выберите чат</h3>
              </div>
            </div>
            <div v-else class="chat-content" >
              <div ref="messagesContainer" class="chat-content__messages" >
                <!--                <div class="chat-content__messages-date" ></div>-->
                <div  class="chat-content__messages-message " :class="{'unread-message': message.isUnread}" v-for="message in chat_messages">
                  <div class="chat-content__messages-message-img">
                    <nuxt-link :to="'/user/'+message.user.id">
                       <img  :src="message.user.avatar" alt="">
                    </nuxt-link>
                  </div>
                  <div class="chat-content__messages-message-inner">
                    <nuxt-link :to="'/user/'+message.user.id">
                      <p class="chat-content__messages-message-inner-name">{{message.user.fullname}}
                      <span>{{new Date(message.createdAt).toLocaleString()}}</span></p>
                    </nuxt-link>
                    <p class="chat-content__messages-message-inner-text">{{message.message}}</p>
                    <el-card class=" mt-10" v-if="message.isRentMessage" shadow="never">
                      <div v-if="message.rentType" style="display: flex;align-items: center;justify-content: space-between" class="">
                        <p>{{message.rentDate}} хочу арендовать
                          <el-popover
                            placement="top"
                            width="350"
                            trigger="hover">
                            <div style="display: flex;align-items: center;justify-content: space-between">
                              <el-avatar shape="square" :size="100" :fit="'cover'" :src="message.rentUnit.images[0].image"></el-avatar>
                              <div class="">
                                <span>Стоимость аренды {{message.rentUnit.rent_price}} Р</span><br>
                              <span>Размещение {{message.rentUnit.city}}</span>
                              </div>


                            </div>
                            <nuxt-link :to="`/catalog/${message.rentUnit.type.name_slug}/${message.rentUnit.name_slug}`" slot="reference" class=" text-bold">{{message.rentUnit.name}}</nuxt-link>
<!--                            <el-link  ></el-link>-->
                          </el-popover>
                          в период с {{message.rentStartTime}} по {{message.rentEndTime}}</p>
<!--                        <el-button v-if="!$auth.user.is_customer" type="info" plain>Принять</el-button>-->
                      </div>
                      <div v-else style="display: flex;align-items: center;justify-content: space-between" class="">
                        <p>Хочу  взять в аренду
                          <el-popover
                            placement="top"
                            width="400"
                            trigger="hover">
                            <div class="">
                              <el-avatar shape="square" :size="100" :fit="'cover'" :src="message.rentUnit.images[0].image"></el-avatar>
                              <span>Стоимость аренды {{message.rentUnit.rent_price}} Р</span>
                            </div>
                            <el-link class=" text-bold" slot="reference">{{message.rentUnit.name}}</el-link>
                          </el-popover>
                          c {{message.rentStartDate}} по {{message.rentEndDate}}
                        </p>
<!--                        <el-button type="info" plain>Принять</el-button>-->
                      </div>
                    </el-card>

                  </div>
                </div>
              </div>
              <div class="chat-content__send">
                <span class="chat-content__send-icon mr">
                  <i class="el-icon-upload2"></i>
                </span>
                <el-input
                  type="textarea"
                  autosize
                  placeholder="Напишите сообщение..."
                  v-model="new_msg">
                </el-input>
                <span class="chat-content__send-icon ml">
                  <el-link :disabled="new_msg===''" @click="sendMgs" style="font-size: 25px" :underline="false" icon="el-icon-s-promotion color-main"></el-link>

                </span>
              </div>

            </div>

          </div>

        </div><!--        lk-main-->

      </div><!--       lk__wrapper-->
    </div>
  </section>




</template>

<script>
  export default {
    async asyncData({$axios}){
      try{
        const  response_chats = await $axios.get(`/api/v1/chat/all/`)
        const chats = response_chats.data
        console.log('chats',chats)
        return {chats }
      }catch (e) {
        throw e
      }

    },
    data() {
      return {
        new_msg:'',
        get_chat_interval:'',
        current_chat_id:0,
        baseUrl:process.env.img_url,
        chat_messages:[],
        socket:null
      }
    },
    updated() {

      this.$nextTick(() => this.scrollToEnd());
    },
    mounted() {

    },
    methods: {
      scrollToEnd: function () {
        var content = this.$refs.messagesContainer;
        content.scrollTop = content.scrollHeight

      },
      async getChats(){
        const  response_chats = await this.$axios.get(`/api/v1/chat/all/`)
        this.chats = response_chats.data
      },
      async openChat(chat_id){
        try{
          this.socket.close()
        }catch (e) {
          console.log('not connected')
        }
        this.socket = new WebSocket(`${process.env.ws_url}/ws/chat/${chat_id}`)
        const opened_chat = await this.$axios.get(`/api/v1/chat/get_chat?chat_id=${chat_id}`)
        console.log(opened_chat)
        if (this.$auth.user.id === opened_chat.data.opponent.id ){
          console.log('not startter')
          await this.$axios.post(`/api/v1/chat/set_chat_read/${chat_id}`)
        }
        const response = await this.$axios.get(`/api/v1/chat/get_chat_messages?chat_id=${chat_id}`)
        if (response.status === 200){
          console.log(response.status);
          this.chat_messages = response.data
          console.log(this.chat_messages)
          this.current_chat_id = chat_id
          await this.$axios.post(`/api/v1/chat/set_chat_read/${chat_id}`)
          this.getChats()
        }else{
          console.log('chat error')
        }

        this.socket.onmessage = (res) =>{
          this.getChats()
          console.log('message in chat',JSON.parse(res.data))
          let data = JSON.parse(res.data)['message']

          console.log('get chats')
          if(data.chat === this.current_chat_id){
            this.chat_messages.push({
                createdAt: Date.now(),
                message: data.message,
                isUnread: this.$auth.user.id === opened_chat.data.opponent.id ? false : true,
                user:{
                  fullname:data.user.fullname,
                  avatar:this.baseUrl+data.user.avatar
                }
              }
            )
          }

        }
      },
      async sendMgs(){
        await this.$axios.post(`/api/v1/chat/add/${this.current_chat_id}`,{message:this.new_msg})
          .then((response) => {
            console.log(response.status);
            // this.chat_messages.push({
            //     createdAt: Date.now(),
            //     message: this.new_msg,
            //     user: this.$auth.user
            //   }
            // )
            console.log(this.chat_messages)
            this.new_msg =''
            this.getChats()
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
      }

    }
  }
</script>

