<script lang="ts" setup>
import { ref, computed } from 'vue';
import { VTextField } from 'vuetify/components/VTextField'
import { VTextarea } from 'vuetify/components/VTextarea';
import { VDialog } from 'vuetify/components/VDialog'
import { VCard } from 'vuetify/components/VCard';
import { VBtn } from 'vuetify/components/VBtn';
import { VSlider } from 'vuetify/components/VSlider';
import { mdiCog, mdiClose } from '@mdi/js/mdi';

import useStore, { DEFAULT_NAME_LIST } from '../store/index';

const store = useStore();

const dialog = ref(store.nameList === DEFAULT_NAME_LIST);
const nameListDetail = computed(() => store.names.length);
</script>

<template>
  <v-dialog v-model="dialog">
    <template #activator="{ props }">
      <v-btn v-bind="props" :icon="mdiCog" class="bg-green">
      </v-btn>
    </template>
    <v-card class="px-8 py-4">
      <template #title>设置</template>
      <template #append><v-btn :icon="mdiClose" color="error" @click="dialog = false;"></v-btn></template>
      <v-textarea v-model="store.nameList" label="抽奖名单（每行一个）" rows="12">
        <template #details>刷新网页后生效；当前 {{ nameListDetail }} 人</template>
      </v-textarea>
      <v-text-field label="获奖人数" type="number" min="1" v-model="store.settings.sampleSize"></v-text-field>
      <v-slider label="缩减率" min="0.01" max="0.9" step="0.001" v-model="store.settings.filterRate" thumb-label="always">
        <template #thumb-label>
          {{ store.settings.filterRate }}
        </template>
      </v-slider>
      <div>
        <p>关于我们</p>
        <p>
          <a href="https://www.freepik.com/search?format=search&last_filter=type&last_value=icon&query=lucky%20draw&type=icon"
            target="_blank">Favicon
            by Freepik</a>
        </p>
        <p><a href="https://github.com/cup113/knock-out-draw" target="_blank">Source Code</a></p>
      </div>
    </v-card>
  </v-dialog>
</template>
