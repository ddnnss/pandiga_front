<template>
  <div >
     <Header/>
    <Nuxt class="main"/>

  </div>
</template>



<script>
    import Header from '@/components/header';
    import Footer from '@/components/footer';
    export default {
        data:function(){
            return{
                isVisible:false,
            }
        },


        components:{
            Header,
            Footer,

        },
        methods: {

        },
    }
</script>

<style>

</style>
