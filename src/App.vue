<script setup lang="ts">
import useStore from './store/index';
import Person from './components/Person.vue';
import { VTextarea } from 'vuetify/components/VTextarea';
import { VBtn } from 'vuetify/components/VBtn';
import { VDialog } from 'vuetify/components/VDialog'
import { VCard } from 'vuetify/components/VCard';
import { ref } from 'vue';
import { mdiCog } from '@mdi/js/mdi';

const store = useStore();
const dialog = ref(true);
</script>

<template>
  <div class="pa-4">
    <div>
      <v-dialog v-model="dialog">
        <template #activator="{ props }">
          <v-btn v-bind="props" :icon="mdiCog" class="bg-green">
          </v-btn>
        </template>
        <v-card class="px-8 py-4">
          <template #title>设置</template>
          <template #subtitle>点击设置框外任意点退出</template>
          <v-container></v-container>
          <v-textarea v-model="store.nameList" label="抽奖名单（每行一个）" rows="12"></v-textarea>
          <div>
            <p>关于我们</p>
            <p>
              <a
                href="https://www.freepik.com/search?format=search&last_filter=type&last_value=icon&query=lucky%20draw&type=icon" target="_blank">Favicon
                by Freepik</a>
            </p>
            <p><a href="https://github.com/cup113/knock-out-draw" target="_blank">Source Code</a></p>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-btn @click="store.start()" class="bg-cyan-lighten-2" size="x-large">抽奖</v-btn>
    </div>
    <div class="d-flex flex-wrap mt-4 justify-center">
      <Person v-for="person in store.peopleShowed" :key="person.name" :person="person" class="ma-1 text-center"></Person>
    </div>
  </div>
</template>
