<template>

  <section class="orders-page">
    <div class="container">

        <h1 class="section-header mb-60">Предложить технику</h1>


      <div class="orders grid-wrapper">
        <div class="orders-left">
             <div class="order">
        <div class="order__top">
          <p class="order__top-name"><a href="">Лимузин черный</a></p>
          <p class="order__top-price">9000 руб</p>
        </div>
        <p class="order__text">Нужно добавить все позиции из прайс листа</p>
        <div class="order__middle">
          <img class="order__middle-img" src="http://placehold.it/80" alt="">
          <div class="order__middle-group">
            <p class="order__middle-name"><a href="">Иван Иванов</a></p>
            <p class="order__middle-info">Размещено проектов на бирже: 147</p>
          </div>
        </div>
        <div class="order__bottom">
          <p class="order__bottom-text">Осталось: 23 часа 51 минута    Предложений: 1</p>

        </div>
      </div><!--          order-->

      <h3 class="section-header f25">Какую технику предложить</h3>
           <div class="technique-cards mb-60">
          <div class="technique-card" :xs="24" :sm="12" :md="8" :lg="8">
           <img class="technique-card__img" src="http://placehold.it/800x500" alt="">
           <p class="technique-card__name">Volkswagen Touareg, 2007</p>
           <p class="technique-card__price mb-20">1100 руб./ час </p>
            <el-button class="full-w" plain>Предложить технику</el-button>
         </div> <div class="technique-card" :xs="24" :sm="12" :md="8" :lg="8">
           <img class="technique-card__img" src="http://placehold.it/800x500" alt="">
           <p class="technique-card__name">Volkswagen Touareg, 2007</p>
           <p class="technique-card__price">1100 руб./ час </p>
         </div> <div class="technique-card" :xs="24" :sm="12" :md="8" :lg="8">
           <img class="technique-card__img" src="http://placehold.it/800x500" alt="">
           <p class="technique-card__name">Volkswagen Touareg, 2007</p>
           <p class="technique-card__price">1100 руб./ час </p>
         </div>
       </div>
        </div>
        <div class="orders-right bg-grey h-fit p-20-15">
          <div class="section-header f25">Каталог техники</div>
          <ul class="mb-20">
            <li class="mb-10"><a href="#">категория 1 (8)</a></li>
            <li class="mb-10"><a href="#">категория 1 (8)</a></li>
            <li class="mb-10"><a href="#">категория 1 (8)</a></li>
            <li class="mb-10"><a href="#">категория 1 (8)</a></li>
          </ul>
          <div class="filter-group mb-20">
              <p class="filter-group__title">Бюджет</p>
              <div class="filter-group__row">
                <el-input class="filter-select" placeholder="от руб" v-model="input"></el-input>
                <el-input class="filter-select" placeholder="до" v-model="input"></el-input>
              </div>
            </div>
           <el-button type="primary">Искать</el-button>
        </div>
      </div>





    </div>
  </section>




</template>

<script>
  export default {
    data() {
      return {
        value2:false,

      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

