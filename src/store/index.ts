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

const useStore = defineStore('index', () => {
    const nameList = useLocalStorage('KD_nameList', "");
    const names = computed({
        get() {
            return nameList.value.trimEnd().split('\n');
        },
        set(value) {
            nameList.value = value.join('\n');
            people.value = names.value.map(name => new Person(name))
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
        while (peopleShowed.value.length > 1) {
            round++;
            await new Promise(resolve => setTimeout(resolve, 1500));
            const target = Math.max(1, Math.floor(peopleShowed.value.length / 4));
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
            fontSize.value *= 1.5;
        }
        peopleShowed.value[0].won = true;
        peopleShowed.value[0].selected = true;
    }

    return {
        nameList,
        people,
        peopleShowed,
        fontSize,
        start,
    }
});

export default useStore;
