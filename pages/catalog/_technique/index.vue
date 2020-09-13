<template>

   <section class="catalog-page">
     <div class="container">
       <h1 class="section-header text-center mb-60">Каталог техники</h1>

       <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="item in categories" :key="item.id">
            <div class="main-catalog__item " :style="{'background': '#F4F4F4 url('+item.image+')'}">
              <p class="main-catalog__item-title">{{item.name}}</p>

            </div>
            <div class="main-catalog__item-list-wrapper">
                <ul class="main-catalog__item-list">
                <li class="main-catalog__item-list-item" v-for="subcat in item.types">
                  <nuxt-link  :to="subcat.name_slug+'/'">{{subcat.name}}</nuxt-link>
                </li>
              </ul>
            </div>

          </el-col>

        </el-row>
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

    }
  }
</script>

