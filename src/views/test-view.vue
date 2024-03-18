<template>
	<v-btn text="Test button" color="primary" class="mt-4" @click="sendRequest" />
</template>

<script setup lang="ts">
import { PrivateCourseClient } from '@/services/api/clients/private-course-client';

const sendRequest = async () => {
    await PrivateCourseClient.test();
};
</script>

<style scoped lang="scss">

</style>
