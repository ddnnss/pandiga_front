<template>

  <section class="lk">
    <div class="container">
      <div class="lk-wrapper">
        <div class="lk-main">
          <div class="lk-parnter">
            <p class="mb-20">Скопируйте промо-код и сообщите его своим друзьям и знакомым. Все, кто будут регистрироваться по вашему промо-коду получат скидку, а вы будете получать регулярное вознаграждение</p>
            <div class="mb-35">
              <el-button type="primary">Ввести код</el-button>
              <el-button plain>Вывести средства</el-button>
            </div>

            <p class="section-header f25">Ваш код: 53773662</p>
            <p class="section-header f25">Ваш доход: 0 руб</p>

          </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="Дата"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Партнеры"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Начисления"
              width="180">
            </el-table-column>

          </el-table>


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
        tableData: [
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
          {date: '2016-05-03', name: 'user01', address: '100 руб' },
        ]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

