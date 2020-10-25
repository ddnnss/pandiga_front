<template>
    <footer class="footer">
       <div class="container">
         <el-row >
          <el-col :xs="24" :sm="24" :md="24" :lg="6" class="mb-35"><img src="/logo_f.png" alt=""></el-col>
          <el-col ::xs="8" :sm="12" :md="4" :lg="4" class="mb-10">
            <ul class="footer-list">
              <li class="footer-list__item"><nuxt-link class="footer-list__link" to="/about">О сервисе</nuxt-link></li>
              <li class="footer-list__item"><nuxt-link class="footer-list__link" to="/partners">Партнерская программа</nuxt-link></li>


            </ul>
          </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="8" class="mb-10">
            <ul class="footer-list">
              <li class="footer-list__item"><nuxt-link class="footer-list__link" to="/faq">FAQ</nuxt-link></li>
              <li class="footer-list__item"><nuxt-link class="footer-list__link" to="/faq#form">Обратная свзяь</nuxt-link></li>

            </ul>
          </el-col>
           <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <ul class="footer-list">
              <li class="footer-list__item"><a class="footer-list__link" href="">Пользовательское соглашение</a></li>
              <li class="footer-list__item"><a class="footer-list__link" href="">Политика конфиденциальности</a></li>
              <li class="footer-list__item"><a class="footer-list__link" href="">Карта сайта</a></li>
            </ul>
          </el-col>
         </el-row>
       </div>
    </footer>
</template>

<script>
    export default {

    };
</script>
