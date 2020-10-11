<template>

  <section class="orders-page">
    <div class="container">

      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item >Партнерская программа</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="orders grid-wrapper">
        <div class="orders-left">
           <el-table
      :data="refferals"
      style="width: 100%">
      <el-table-column
        prop="created_at"
        label="Дата активации кода"
        width="180">
      </el-table-column>
      <el-table-column
        prop="refferal.fullname"
        label="Пользователь"
        width="180">
      </el-table-column>
      <el-table-column
        prop="earned"
        label="Доход">
      </el-table-column>
    </el-table>
        </div>
        <sidebar></sidebar>
      </div>
    </div>
  </section>
</template>

<script>
  import Sidebar from '@/components/Sidebar';
  export default {
     async asyncData({$axios,$auth}){

      try{
        const response_refferals = await $axios.get(`/api/v1/user/get_refferals/`)


        const refferals = response_refferals.data

        console.log(refferals)
        return {refferals}
      }catch (e) {
        throw e
      }

    },

    data() {
      return {

      }
    },
    components:{
      Sidebar,
    },
    mounted() {

    },
    watch:{

    },
    computed:{


    },
    methods: {


    }
  }
</script>

