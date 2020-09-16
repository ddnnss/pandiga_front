import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'


export default ({ store }, inject) => {
  Vue.use(VueNativeSock, 'ws://localhost:8000/ws/notifications/room1/', {
    format: 'json',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    store: store,
    connectManually: true
  })
}
