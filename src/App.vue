<script setup lang="ts">
import { computed } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VExpansionPanels, VExpansionPanel } from 'vuetify/components';

import useStore from './store/index';
import Person from './components/Person.vue';

import Settings from './components/Settings.vue';

const store = useStore();

const countWon = computed(() => store.people.filter(p => p.won).length);
const reductionPath = computed(() => {
  let remaining = store.people.filter(people => !people.won).length;
  const result = [remaining];
  while (remaining > store.settings.sampleSize) {
    remaining = Math.max(Math.floor(remaining * store.settings.filterRate), store.settings.sampleSize);
    result.push(remaining);
  }
  return result.join("→");
});
</script>

<template>
  <div class="pa-4">
    <div class="d-flex" style="gap: 2rem; align-items: center;">
      <Settings></Settings>
      <v-text-field label="标题" style="min-width: 300px;"></v-text-field>
      <v-expansion-panels style="max-width: 40rem;">
        <v-expansion-panel title="详细信息">
          <template #text>
            <div>已得奖人数：{{ countWon }} / {{ store.names.length }} 人</div>
            <div>抽奖人数路径：{{ reductionPath }}</div>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="text-center">
      <v-btn @click="store.start()" class="bg-cyan-lighten-2" size="x-large">抽奖</v-btn>
    </div>
    <div class="d-flex flex-wrap mt-4 justify-center">
      <Person v-for="person in store.peopleShowed" :key="person.name" :person="person" class="ma-1 text-center">
      </Person>
    </div>
  </div>
</template>
