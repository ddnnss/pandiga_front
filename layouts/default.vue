<template>
  <div style="display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;"
    >
     <Header/>
    <Nuxt class="main"/>
    <Footer/>
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
