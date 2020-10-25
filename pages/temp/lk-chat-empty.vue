<template>

   <section class="lk">
     <div class="container">
      <div class="lk-wrapper">
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
            <div class="chat-content">
              <div class="chat-choose">
                <h3 class="section-header">Выберите чат</h3>
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
        catalog:[
          {
            'catalog_name':'Автомобили',
            'catalog_image': 'http://placehold.it/230x180',
            'subcats':[
              {'subcat_name':'Легковые авто',
                'subcat_link':'link1'
              },
              {'subcat_name':'Легковые авто1',
                'subcat_link':'link2'
              },
              {'subcat_name':'Легковые авто1',
                'subcat_link':'link3'
              },
            ]
          }, //end catalog item
          {
            'catalog_name':'Автомобили',
            'catalog_image': 'http://placehold.it/230x180',
            'subcats':[
              {'subcat_name':'Легковые авто',
                'subcat_link':'link1'
              },
              {'subcat_name':'Легковые авто1',
                'subcat_link':'link2'
              },
              {'subcat_name':'Легковые авто1',
                'subcat_link':'link3'
              },
            ]
          }, //end catalog item
        ]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

