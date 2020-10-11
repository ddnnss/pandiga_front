<template>
   <el-card class="orders-right bg-grey h-fit  sticky-block mobile-hide" :body-style="{ width: '100%' }">
          <ul class="lk-menu__list">
                <li class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/profile/'">Профиль</nuxt-link> </li>
                <li class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/notifications/'">Оповещения</nuxt-link> </li>

                <li class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/chats/'">Сообщения</nuxt-link> </li>
                <li v-if="this.$auth.user.is_customer" class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/favorite/'">Избранное</nuxt-link> </li>

                <li v-if="this.$auth.user.is_customer" class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/orders/'">Мои заявки на технику</nuxt-link> </li>
                <li v-else class="lk-menu__list-item"><nuxt-link class="lk-menu__list-link" :to="'/lk/apply/'">Мои предложения</nuxt-link> </li>
                <li class="lk-menu__list-item"> <nuxt-link class="lk-menu__list-link" :to="'/lk/refferal/'">Партнерская программа</nuxt-link></li>
                <li class="lk-menu__list-item"> <nuxt-link class="lk-menu__list-link" :to="'/lk/balance/'">Баланс</nuxt-link></li>

          </ul>
        </el-card>
</template>

<script>
    export default {

    };
</script>
