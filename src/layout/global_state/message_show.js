import { ref } from 'vue';

const message = ref();

export function useMessage() {
    return { message };
}
