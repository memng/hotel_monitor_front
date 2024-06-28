import { ref } from 'vue';

const message = ref();

export function useAuthMessage() {
    return { message };
}
