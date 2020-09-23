<template>

  <section class="orders-page">
    <div class="container">

      <el-breadcrumb class="pt-20" separator="/">
        <el-breadcrumb-item :to="{path : '/'}">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/lk/profile/'}">Личный кабинет</el-breadcrumb-item>
        <el-breadcrumb-item >Оповещения</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="orders grid-wrapper">
        <div class="orders-left">

  <el-table
    :data="notifications"
    :row-class-name="checkNotify"
    style="width: 100%">
    <el-table-column
      height="250"
      fixed
      prop="created_at"
      label="Дата">
       <template slot-scope="scope">
        <p> {{new Date(scope.row.created_at).toLocaleString()}}</p>
      </template>
    </el-table-column>


    <el-table-column
      prop="text"
      label="Сообщение">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="Действие">
      <template slot-scope="scope">
        <el-button @click="$router.push(scope.row.url)" type="text" size="small">Перейти</el-button>
        <el-button type="text" size="small">Удалить</el-button>
      </template>
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
    async asyncData({$axios}){
      try{
        const  response_notifications = await $axios.get(`/api/v1/notification/get/`)

        const notifications = response_notifications.data
        console.log(notifications)
        return {notifications}
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
      this.getNotifications()

    },
    watch:{

    },
    computed:{


    },
    methods: {
      checkNotify({row}){
        console.log(row.is_new)
        if (row.is_new){
          return 'isNewNotify'
        }
      },
     async getNotifications(){
        await this.$axios.post('/api/v1/notification/set_read/')
        const response = await  this.$axios.get('/api/v1/notification/get_other_count/')
        console.log(response.data)
        this.notifyMgsCount = response.data['new_messages']
         await this.$axios.post('/api/v1/notification/set_read/')

      }

    }
  }
</script>
<style >
  .el-table .isNewNotify {
    background: #fdf6ec;
  }


</style>
