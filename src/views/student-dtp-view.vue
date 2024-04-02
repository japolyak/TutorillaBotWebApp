<template>
    <date-picker :request-fn="sendRequest" />
</template>

<script setup lang="ts">
import DatePicker from '@/components/date-picker.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { PrivateCourseClient } from '@/services/api/clients/private-course-client';
import type { NewClassDto } from '@/services/api/api.models'
import { useActionSnackbarStore } from '@/stores/snackbar-store';

const route = useRoute();
const { showSnackbar } = useActionSnackbarStore();

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

const sendRequest = async (planedDate: Date): Promise<void> => {
    if (privateCourseId.value == null) return;

    const payload: NewClassDto = {
        date: planedDate,
        sources: []
    };

    const response = await PrivateCourseClient.planNewClass(privateCourseId.value, payload);

	if (response?.status !== 201) {
		showSnackbar({
			message: 'Error occurred',
			status: 'error',
		});
		return;
	}

	showSnackbar({
		message: 'Class scheduled successfully!',
		status: 'success',
	});
};
</script>
