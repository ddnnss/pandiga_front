<template>

  <section class="item-page">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Техника в Москве</el-breadcrumb-item>
        <el-breadcrumb-item>Автомобили</el-breadcrumb-item>
        <el-breadcrumb-item>Легковые авто</el-breadcrumb-item>
        <el-breadcrumb-item>Volkswagen Touareg, 2007</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row >
        <el-col :sm="8" :md="12" :lg="12"><carousel :starting-image="2" :images="images"></carousel></el-col>
        <el-col :sm="14" :md="10" :lg="10" :offset="2" class="item-info">
          <div class="item-info__top">
            <el-tag class="item-info__top-status" type="success" effect="dark"> Cвободен </el-tag>
            <div class="catalog-item__rating ">
              <p class="catalog-item__rating-p">5.0 </p>
              <span class="catalog-item__rating-span">1 отзыв</span>
            </div>
          </div>
          <div class="item-info__middle">
            <h1 class="item-info__middle-title section-header">Volkswagen Touareg, 2007</h1>
            <div class="item-info__middle-group">
              <p class="item-info__middle-price">900 руб/час</p>
              <p class="item-info__middle-text">Мин. время заказа: от 1 часа</p>
            </div>
            <div class="item-info__middle-group">
              <el-button type="primary">Взять в аренду</el-button>
              <el-button plain>Написать</el-button>
            </div>
            <p>2.5 л ( 174 л.c.), дизель, автомат, 4WD</p>
          </div>
          <div class="item-info__bottom">
            <p class="text-bold fs-14 mb-10">Показать на карте:</p>
            <img src="/map1.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row class="item-description" :gutter="20">
        <el-col :sm="8" :md="8" :lg="8">
          <div class="item-owner">
            <p class="item-owner__title">О владельце:</p>
            <div class="item-owner__group">
              <img class="item-owner__img" src="http://placehold.it/100" alt="">
              <div class="item-owner__group-inner">
                <p class="item-owner__name">Иван Иванов</p>
                <div class="catalog-item__rating mb-10">
                  <p class="catalog-item__rating-p">5.0 </p>
                  <span class="catalog-item__rating-span">1 отзыв</span>
                </div>
                <p class="item-owner__location">Москва</p>
              </div>

            </div>
            <div class="item-owner__btn">
              <el-button type="primary">Написать</el-button>
              <el-button plain>Оставить отзыв</el-button>
            </div>
          </div>
        </el-col>
        <el-col :sm="14" :md="16" :lg="16">
          <el-tabs stretch="true" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Описание" name="first">
              <p>Без пробега из Европы, машина в идеальном состоянии в родной краске. Пробег оригинальный 200% можно проверить по статистике обслуживания через дилера- база единая, можно считать по датчикам и убедиться в этом, уверен что в России нет ни одной такой машины где был бы настоящий не скрученный пробег. По приезду заменил масла и фильтра, абсолютно никаких вложений. Двигатель 2.0 дизель, расход в городе 5, 5л. Про трассу вообще молчу. Без всяких преувеличений, это достойный надёжный и экономичный автомобиль который собран для внутреннего рынка Европы. Сборка Германия. Салон чистый аккуратный, без потёртостей и дырок, как новый. Машина пригнана и поставлена на учёт. Ждет нового владельца. Любые проверки у дилера. В гаражи не поеду. Состояние нового авто. Кого реально интересует
 этот автомобиль, звоните будем договариваться! До 22 июня хорошая скидка, делайте предложения!</p>
            </el-tab-pane>
            <el-tab-pane label="Характеристики" name="second">
              <ul  style="columns: 2; width: 80%">
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>
                <li class="item-description__feature"><p>Название: <span>Характеристикa</span></p></li>

              </ul>
            </el-tab-pane>
            <el-tab-pane label="Отзывы" name="third">
              <div class="feedback__header">
                <p class="color-main">1 отзыв о Volkswagen Touareg </p>
                 <el-button plain>Оставить отзыв</el-button>
              </div>
              <div class="feedback">
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
              <div class="feedback">
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
              <div class="feedback">
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
            </el-tab-pane>

          </el-tabs>

        </el-col>
      </el-row>
      <img class="mb-60" src="/map2.png" alt="">
    </div>
  </section>




</template>

<script>
  import Carousel from '@/components/Carousel.vue';
  import { loadYmap } from 'vue-yandex-maps'
  import { yandexMap, ymapMarker } from 'vue-yandex-maps'

  export default {
    components: {
      Carousel,
      yandexMap,
      ymapMarker
    },
    data() {
      return {
        images: [
          {
            id: '1',
            big: 'http://placehold.it/1200x800',
            thumb: 'http://placehold.it/300x300'
          },
          {
            id: '2',
            big: 'http://placehold.it/600x600',
            thumb: 'http://placehold.it/300x300'
          }
        ],
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

