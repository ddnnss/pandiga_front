<template>

  <section class="user-profile">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Техника в Москве</el-breadcrumb-item>
        <el-breadcrumb-item>Автомобили</el-breadcrumb-item>
        <el-breadcrumb-item>Легковые авто</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 class="section-header fg-10 mb-35">Профиль</h1>
      <div class="user-profile__wrapper">
        <div class="user-profile__img">
          <img src="http://placehold.it/200" alt="">
        </div>
        <div class="user-profile__info">
          <p class="user-profile__info-status">Онлайн</p>
          <p class="user-profile__info-name">Иван Иванов</p>
          <p class="user-profile__info-location">Москва</p>
        </div>
        <div class="user-profile__button">
          <el-button class="mb-20" type="primary">Изменить профиль</el-button>
          <p>5 раз сдана техника в аренду<br>5 отзывов получено<br>0 % повторных заказов</p>
        </div>
      </div>
      <h3 class="section-header f25">Техника</h3>
       <div class="technique-cards mb-60">
          <div class="technique-card" :xs="24" :sm="12" :md="8" :lg="8">
           <img class="technique-card__img" src="http://placehold.it/800x500" alt="">
           <p class="technique-card__name">Volkswagen Touareg, 2007</p>
           <p class="technique-card__price">1100 руб./ час </p>
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
      <h3 class="section-header f25">Отзывы</h3>
        <div class="feedback b-border">
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
        <div class="feedback b-border">
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
        <div class="feedback b-border">
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

  </section>




</template>

<script>
  export default {
    data() {
      return {
        radio1: 'New York',
        options: [{
          value: 'Option1',
          label: 'По дате'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: '',
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

