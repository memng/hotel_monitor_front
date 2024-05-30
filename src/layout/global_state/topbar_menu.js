import { ref } from 'vue';

const items = ref([]);
const currentMenu = ref();

export function useRangMenu() {
    return { items, currentMenu };
}
