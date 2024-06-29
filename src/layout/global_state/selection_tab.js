import { ref } from 'vue';

const selectedTabId = ref(false);
const tabs = ref([]);

export function useMenuTab() {
    return { tabs, selectedTabId };
}
