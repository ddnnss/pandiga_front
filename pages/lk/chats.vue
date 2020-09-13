<template>

  <section class="lk pt-20">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Техника в Москве</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/lk/' }">Профиль</el-breadcrumb-item>
        <el-breadcrumb-item>Чаты</el-breadcrumb-item>
        {{current_chat_id}}
      </el-breadcrumb>

      <div class="lk-wrapper">
        <div class="lk-main">
          <div class="chat-wrapper">
            <el-card shadow="never" class="chat-users" :body-style="{padding:'0'}">

              <div class="chat-user" v-for="chat in chats" :key="chat.id" @click="openChat(chat.id)">
                <div class="chat-user__img">
                  <img :src="baseUrl+chat.last_message_user_avatar" alt="">

                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">{{chat.last_message_user_name}}</p>
                  <p class="chat-user__info-msg">{{chat.last_message.substring(0,10)}}...</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">{{new Date(chat.updatedAt).toLocaleString()}}</p>
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

                <div  class="chat-content__messages-message" v-for="message in chat_messages">
                  <div class="chat-content__messages-message-img">
                    <img  :src="message.user.avatar" alt="">

                  </div>
                  <div class="chat-content__messages-message-inner">
                    <p class="chat-content__messages-message-inner-name">{{message.user.fullname}}<span>{{new Date(message.createdAt).toLocaleString()}}</span></p>
                    <p class="chat-content__messages-message-inner-text">{{message.message}}</p>
                    <el-card class="bg-main color-white mt-10" v-if="message.isRentMessage" shadow="never">
                      <div v-if="message.rentType" style="display: flex;align-items: center;justify-content: space-between" class="">
                        <p>{{message.rentDate}} хочу арендовать
                          <el-popover
                            placement="top"
                            width="400"
                            trigger="hover">
                            <div class="">
                              <el-avatar shape="square" :size="100" :fit="'cover'" :src="message.rentUnit.images[0].image"></el-avatar>
                              <span>Стоимость аренды {{message.rentUnit.rent_price}} Р</span>
                            </div>

                            <el-link class="color-white text-bold" slot="reference">{{message.rentUnit.name}}</el-link>
                          </el-popover>

                          в период с {{message.rentStartTime}} по {{message.rentEndTime}}</p>
                        <el-button type="info" plain>Принять</el-button>
                      </div>
                      <div v-else style="display: flex;align-items: center;justify-content: space-between" class="">
                        <p>Хочу  взять в аренду
                        <el-popover
                            placement="top"
                            width="400"
                            trigger="hover">

                            <el-link class="color-white text-bold" slot="reference">{{message.rentUnit.name}}</el-link>
                          </el-popover>
                          c {{message.rentStartDate}} по {{message.rentEndDate}}
                        </p>
                        <el-button type="info" plain>Принять</el-button>
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
        baseUrl:'http://localhost:8000',
        chat_messages:[]
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
      startInterval(){
            this.get_chat_interval = setInterval(() => {

             this.openChat(this.current_chat_id)
          }, 3000);
      },
      async openChat(chat_id){
        await this.$axios.get(`/api/v1/chat/get_chat?chat_id=${chat_id}`)
          .then((response) => {
            console.log(response.status);
            this.chat_messages = response.data
            console.log(this.chat_messages)
            this.current_chat_id = chat_id


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
      async sendMgs(){
        await this.$axios.post(`/api/v1/chat/add/${this.current_chat_id}`,{message:this.new_msg})
          .then((response) => {
            console.log(response.status);

            console.log(this.$auth.user)

            this.chat_messages.push({
                createdAt: Date.now(),
                message: this.new_msg,
                user: this.$auth.user
              }
            )
            console.log(this.chat_messages)
            this.new_msg =''
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

