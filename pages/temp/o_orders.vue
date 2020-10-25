<template>

  <section class="orders-page">
    <div class="container">
      <div class="section-header__wrapper mb-60">
        <h1 class="section-header text-center ">Заявки на технику - грузовики</h1>
        <el-switch
          v-model="value2"
          active-color="#CC0000"
          active-text="Подписаться на уведомления"
          inactive-color="#CECECE">
        </el-switch>
      </div>
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
          <el-button plain>Предложить технику</el-button>
        </div>
      </div><!--          order-->

           <div class="order">
        <div class="order__top">
          <p class="order__top-name">Лимузин черный</p>
          <p class="order__top-price">9000 руб</p>
        </div>
        <p class="order__text">Нужно добавить все позиции из прайс листа</p>
        <div class="order__middle">
          <img class="order__middle-img" src="http://placehold.it/80" alt="">
          <div class="order__middle-group">
            <p class="order__middle-name">Иван Иванов</p>
            <p class="order__middle-info">Размещено проектов на бирже: 147</p>
          </div>
        </div>
        <div class="order__bottom">
          <p class="order__bottom-text">Осталось: 23 часа 51 минута    Предложений: 1</p>
          <el-button plain>Предложить технику</el-button>
        </div>
      </div><!--          order-->
           <div class="order">
        <div class="order__top">
          <p class="order__top-name">Лимузин черный</p>
          <p class="order__top-price">9000 руб</p>
        </div>
        <p class="order__text">Нужно добавить все позиции из прайс листа</p>
        <div class="order__middle">
          <img class="order__middle-img" src="http://placehold.it/80" alt="">
          <div class="order__middle-group">
            <p class="order__middle-name">Иван Иванов</p>
            <p class="order__middle-info">Размещено проектов на бирже: 147</p>
          </div>
        </div>
        <div class="order__bottom">
          <p class="order__bottom-text">Осталось: 23 часа 51 минута    Предложений: 1</p>
          <el-button plain>Предложить технику</el-button>
        </div>
      </div><!--          order-->
           <div class="order">
        <div class="order__top">
          <p class="order__top-name">Лимузин черный</p>
          <p class="order__top-price">9000 руб</p>
        </div>
        <p class="order__text">Нужно добавить все позиции из прайс листа</p>
        <div class="order__middle">
          <img class="order__middle-img" src="http://placehold.it/80" alt="">
          <div class="order__middle-group">
            <p class="order__middle-name">Иван Иванов</p>
            <p class="order__middle-info">Размещено проектов на бирже: 147</p>
          </div>
        </div>
        <div class="order__bottom">
          <p class="order__bottom-text">Осталось: 23 часа 51 минута    Предложений: 1</p>
          <el-button plain>Предложить технику</el-button>
        </div>
      </div><!--          order-->
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

