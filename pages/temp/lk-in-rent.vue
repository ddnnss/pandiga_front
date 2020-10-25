<template>

  <section class="lk">
    <div class="container">
      <h3 class="section-header f25">Техника в аренде:</h3>
      <div class="lk-wrapper">
        <div class="lk-main">
          <div class="technique-in-rent">
            <div class="technique-in-rent__wrapper">
              <div class="technique-in-rent__left">
                <p class="technique-in-rent__status is-not-free">Техника взята в аренду</p>
                <p class="technique-in-rent__name">Фургон изометрический</p>
                <p data-left="Осталось 14 дней" class="technique-in-rent__time">Срок аренды до 01.07</p>
              </div>
              <div class="technique-in-rent__right">
                <el-button plain>Посмотреть страницу</el-button>
                <el-button type="primary">Вернуть технику</el-button>

              </div>
            </div>
          </div>

          <div class="technique-in-rent">
            <div class="technique-in-rent__wrapper">
              <div class="technique-in-rent__left">
                <p class="technique-in-rent__status is-not-free">Техника взята в аренду</p>
                <p class="technique-in-rent__name">Фургон изометрический</p>
                <p data-left="Осталось 14 дней" class="technique-in-rent__time">Срок аренды до 01.07</p>
              </div>
              <div class="technique-in-rent__right">
                <el-button plain>Посмотреть страницу</el-button>
                <el-button type="primary">Вернуть технику</el-button>

              </div>
            </div>
            <div class="technique-in-rent__feedback">
              <p class="mb-10">Оставить отзыв:</p>
              <el-input
                class="mb-20"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="Ваш отзыв"
                v-model="textarea2">
              </el-input>
              <el-rate
                class="mb-35"
                v-model="value"
                :texts="['Плохо', 'Удовлетворительно', 'Нормально', 'Хорошо', 'Отлично']"
                show-text>
              </el-rate>
              <el-button type="primary">Оставить отзыв</el-button>
            </div>
          </div>


          <div class="technique-in-rent">
            <div class="technique-in-rent__wrapper">
              <div class="technique-in-rent__left">
                <p class="technique-in-rent__status is-free">Бронирование открыто</p>
                <p class="technique-in-rent__name">Фургон изометрический</p>
              </div>
              <div class="technique-in-rent__right">
                <el-button plain>Посмотреть страницу</el-button>
                <el-button type="primary">Продвинуть технику</el-button>
              </div>
            </div>
            <div class="technique-in-rent__statistic">
              <p class="section-header f25">Статистика</p>
              <el-table
                class="mb-35"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="Просмотры"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Добавлено в избранное"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Взято в аренду">
                </el-table-column>
              </el-table>
              <p class="section-header f25">Отзывы</p>
               <div class="feedback ">
                <div class="feedback__top">
                  <img class="feedback__top-img" src="http://placehold.it/40" alt="">
                  <div class="feedback__top-from">
                    <p class="feedback__top-from-name">Петр Кутузов</p>
                    <p class="feedback__top-from-date">4 октября 2019</p>
                  </div>
                </div>
                <div class="feedback__text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores ducimus eaque facere nisi quo sunt? Accusamus adipisci architecto aut cupiditate fugiat id, iure mollitia officia perferendis placeat quas, repellat sequi!</p>
                </div>
              </div>
              <div class="feedback ">
                <div class="feedback__top">
                  <img class="feedback__top-img" src="http://placehold.it/40" alt="">
                  <div class="feedback__top-from">
                    <p class="feedback__top-from-name">Петр Кутузов</p>
                    <p class="feedback__top-from-date">4 октября 2019</p>
                  </div>
                </div>
                <div class="feedback__text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores ducimus eaque facere nisi quo sunt? Accusamus adipisci architecto aut cupiditate fugiat id, iure mollitia officia perferendis placeat quas, repellat sequi!</p>
                </div>
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
        textarea2:'',
        value: null,
        tableData: [{
          date: '0',
          name: '0',
          address: '0'
        }]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

