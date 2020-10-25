<template>

  <section class="lk">
    <div class="container">
      <div class="grid-wrapper">
        <div class="lk-main">
          <div class="chat-wrapper">
            <div class="chat-users">
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
              <div class="chat-user">
                <div class="chat-user__img">
                  <img src="http://placehold.it/80" alt="">
                </div>
                <div class="chat-user__info">
                  <p class="chat-user__info-name">user 001</p>
                  <p class="chat-user__info-msg">Добрый день</p>
                </div>
                <div class="chat-user__date">
                  <p class="chat-user__date-p">20.07.20</p>
                </div>
              </div><!--chat-user-->
            </div>
            <div class="chat-content" >
              <div class="chat-content__messages" >
<!--                <div class="chat-content__messages-date" ></div>-->

                <div class="chat-content__messages-message" v-for="message in chat_messages">
                  <div class="chat-content__messages-message-img">
                    <img :src="message.avatar" alt="">
                  </div>
                  <div class="chat-content__messages-message-inner">
                    <p class="chat-content__messages-message-inner-name">{{message.name}}<span>{{message.time}}</span></p>
                    <p class="chat-content__messages-message-inner-text">{{message.msg}}</p>
                     <el-card class="bg-main color-white mt-10" v-if="message.is_rent_msg" shadow="never">
                       <div style="display: flex;align-items: center;justify-content: space-between" class="">
                         <p>{{message.rent_info.user_name}} хочет взять Volvo 123Volvo 123Volvo 123Volvo 123Volvo 123Volvo 123 в аренду.</p>
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
                  v-model="textarea1">
                </el-input>
                <span class="chat-content__send-icon ml">
                  <i class="el-icon-position color-main"></i>
                </span>
              </div>

            </div>
          </div>

        </div><!--        lk-main-->
        <div class="lk-menu">
          <ul class="lk-menu__list">
            <li class="lk-menu__list-item"><a class="lk-menu__list-link linkActive" href="#">Моя техника</a></li>
            <li class="lk-menu__list-item"><a class="lk-menu__list-link" href="#">Сообщения</a></li>
            <li class="lk-menu__list-item"><a class="lk-menu__list-link" href="#">Отзывы</a></li>
            <li class="lk-menu__list-item"><a class="lk-menu__list-link" href="#">Аналитика</a></li>
            <li class="lk-menu__list-item"><a class="lk-menu__list-link" href="#">Тарифы</a></li>
            <li class="lk-menu__list-item"><a class="lk-menu__list-link" href="#">Реферальная система</a></li>

          </ul>
        </div><!--        lk-menu-->
      </div><!--       lk__wrapper-->
    </div>
  </section>




</template>

<script>
  export default {
    data() {
      return {
        textarea1:'',
        chat_messages:[

              {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quaerat!',
              is_rent_msg:true,
                rent_info:{
                user_name:'user_name',


                }
              },
           {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quaerat!',
              is_rent_msg:false,
                rent_info:{
                user_name:'user_name',


                }
              },




        ]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

