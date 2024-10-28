import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import Sampler from 'random-sampler';
import { computed, ref } from 'vue';

export class Person {
    public name: string;
    public won: boolean;
    public selected: boolean;

    constructor(name: string) {
        this.name = name;
        this.won = false;
        this.selected = false;
    }
}

export const DEFAULT_NAME_LIST = "张三\n李四\n王五"

const useStore = defineStore('index', () => {
    const nameList = useLocalStorage('KD_nameList', DEFAULT_NAME_LIST);
    const settings = useLocalStorage('KD_settings', {
        sampleSize: 1,
        filterRate: 0.25,
        fontSizeMultiplier: 1.8,
        nameWidth: 10,
    });
    const names = computed({
        get() {
            return nameList.value.split('\n').map(name => name.trim()).filter(name => name.length > 0);
        },
        set(value) {
            nameList.value = value.join('\n');
            people.value = names.value.map(name => new Person(name));
        }
    });
    const people = ref(names.value.map(name => new Person(name)));
    const peopleShowed = ref(people.value);
    const sampler = new Sampler();
    const fontSize = ref(16);

    async function start() {
        fontSize.value = 16;
        peopleShowed.value = people.value.filter(person => !person.won);
        let round = 0;
        while (peopleShowed.value.length > settings.value.sampleSize) {
            round++;
            await new Promise(resolve => setTimeout(resolve, 1500));
            const target = Math.max(1, Math.floor(peopleShowed.value.length * settings.value.filterRate));
            for (let i = 0; i < round * round + 2; i++) {
                const selection = new Set(
                    sampler.sample(peopleShowed.value, target)
                    .map(person => person.name));
                for (const person of peopleShowed.value) {
                    person.selected = selection.has(person.name);
                }
                await new Promise(resolve => setTimeout(resolve, 150 + 500 / (round * round + 1)));
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            peopleShowed.value = peopleShowed.value.filter(person => person.selected);
            peopleShowed.value.forEach(person => person.selected = false);
            fontSize.value = Math.round(fontSize.value * settings.value.fontSizeMultiplier);
        }
        peopleShowed.value.forEach(person => {
            person.won = true;
            person.selected = true;
        });
    }

    return {
        nameList,
        names,
        settings,
        people,
        peopleShowed,
        fontSize,
        start,
    }
});

export default useStore;
