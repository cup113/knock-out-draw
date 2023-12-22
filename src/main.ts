import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

createApp(App).use(createPinia()).use(createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        }
    }
})).mount('#app');
