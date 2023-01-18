<template>
  <div class="d-flex flex-wrap justify-center w-100">
    <UploadListItem v-for="upload in uploads" :upload="upload" />
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import { Upload } from '@/store/api/api';
import { useAppStore } from '@/store/app';
import UploadListItem from './UploadListItem.vue';

const appStore = useAppStore()

export default {
    data: () => {
        return {
            loaded: false,
            uploads: [] as Upload[]
        };
    },
    async mounted() {
        await this.loadUploads();
    },
    methods: {
        async loadUploads() {
            const apiKey = (await appStore.account).apiKey;
            if (!apiKey)
                return;
            const res = await appStore.api.getUploads(apiKey);
            this.uploads = res.data;
            this.loaded = true;
        }
    },
    components: { UploadListItem }
}
</script>
