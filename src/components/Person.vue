<script lang="ts" setup>
import type { Person } from '../store/index';
import { VChip } from 'vuetify/components/VChip'
import useStore from '../store/index';

defineProps<{ person: Person }>();
const store = useStore();

</script>

<template>
    <v-chip class="person h-auto" :class="{ selected: person.selected }"
        :style="{'--size': store.fontSize }"><div>{{ person.name }}</div></v-chip>
</template>

<style scoped>
.person.selected {
    background-color: yellow;
}

.person {
    font-size: calc(var(--size) * 1px) !important;
    overflow: hidden;
    transition: background-color 300ms ease-in-out, width 500ms ease-in-out;
    background-color: white;
}

.person>div {
    width: 8em;
    text-align: center;
}
</style>
