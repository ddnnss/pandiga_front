<template>

   <section class="catalog-page">

     <div class="container">
       <h1 class="section-header text-center mb-60">Каталог техники</h1>
       <div class="main-catalog__wrapper">
         <div class="main-catalog__item-wrapper" v-for="(item,iindex) in categories" :key="item.id">
            <div class="main-catalog__item " :style="{'background': '#F4F4F4 url('+item.image+')'}">
              <p class="main-catalog__item-title">{{item.name}}</p>

            </div>
            <div class="main-catalog__item-list-wrapper" :ref="'cat_'+iindex" :class="{'list-sliced':item.types.length > catShow }">
                <ul class="main-catalog__item-list">
                <li  class="main-catalog__item-list-item" v-for="(subcat,index) in item.types">
                  <nuxt-link  :to="subcat.name_slug+'/'">{{subcat.name}}</nuxt-link>
                </li>

              </ul>
            </div>
            <p @click="removeClass(iindex)" class="show-btn" :ref="'show_btn'+iindex" v-if="item.types.length > catShow">Показать остальные {{item.types.length - catShow}} категорий</p>
          </div>
       </div>

     </div>
   </section>




</template>

<script>
  export default {
    async fetch({store}){
      if (store.getters['categories/categories'].length === 0){
        await store.dispatch('categories/fetchCategories')
      }
    },
    data() {
      return {
        value1: '',
        catShow:4,
        listSliced:true,
        radio: '',
        options: [],
        value: [],
        list: [],
        loading: false,


      }
    },
    computed:{
      categories(){
        return this.$store.getters['categories/categories']
      }
    },
    mounted() {

    },
    methods: {
      removeClass(index){
        this.$refs[`cat_${index}`][0].classList.remove('list-sliced')
        this.$refs[`show_btn${index}`][0].classList.add('is-hidden')
      }

    }
  }
</script>

