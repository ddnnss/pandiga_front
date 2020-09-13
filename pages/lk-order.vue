<template>

  <section class="lk">
    <div class="container">
      <div class="grid-wrapper">
        <div class="lk-main">
          <p class="section-header f25">Моя заявка</p>
          <div class="order">
            <div class="flex-wrapper">
              <p class="order__text-small">Номер заявки: 01111</p>
              <p class="text-grey fs-14">Июнь 26, 2020 <br>Пятигорск</p>
            </div>
            <div class="order__top">
              <p class="order__top-name"><a href="">Лимузин черный</a></p>
            </div>
            <div class="order__bottom">
              <p class="order__bottom-text">Срок аренды: 10 ч</p>
            </div>
          </div><!--          order-->
          <p class="section-header f25">Предложения от владельцев</p>
           <div class="catalog-item">
            <div class="catalog-item__img">
              <img src="http://placehold.it/240x180" alt="">
              <div class="catalog-item__rating mobile-show">
                <div class="catalog-item__rating-wraper">
                  <p class="catalog-item__rating-p">5.0 </p>
                  <span class="catalog-item__rating-span">1 отзыв</span>
                </div>
                <span class="catalog-item__rating-span">Мин. время заказа:<br> от 1 часа</span>
              </div>
            </div>
            <div class="catalog-item__info">
              <p class="catalog-item__info-title">Volkswagen Touareg, 2007</p>
              <p class="catalog-item__info-subtitle">2.5 л ( 174 л.c.), дизель, автомат, 4WD</p>
              <p class="catalog-item__info-subtitle grey mobile-hide">Мин. время заказа: от 1 часа</p>
              <p class="catalog-item__price-summ mobile-show">1100 руб./ час</p>
              <span class="catalog-item__rating-span mobile-show">Москва Сегодня</span>
              <div class="catalog-item__info-btn">
                <el-button type="primary">Принять </el-button>
                <el-button plain>Отклонить</el-button>
              </div>
            </div>
            <div class="catalog-item__price mobile-hide">
              <p class="catalog-item__price-summ">1100 руб./ час</p>
              <div class="catalog-item__rating ">
                <p class="catalog-item__rating-p">5.0 </p>
                <span class="catalog-item__rating-span">1 отзыв</span>
              </div>
              <span class="catalog-item__rating-span">Москва Сегодня</span>
            </div>
          </div><!--catalog-item-->
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

          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, conquuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'userrr',time:'20.20.2002 12:12',msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quaerat!'},
          {avatar:'http://placehold.it/80',name:'usghjhgrrr',time:'20.20.2002 12:16',msg:'Lorem ipsectetur adipisicing elit. Consequuntur, quaerat!'},



        ]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

