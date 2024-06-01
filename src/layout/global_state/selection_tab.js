import { ref } from 'vue';

const selectedTabId = ref();
const tabs = ref([]);

export function useMenuTab() {
    return { tabs, selectedTabId };
}
