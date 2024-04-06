<template>
    <date-picker
		:request-fn="sendRequest"
		@created="() => {
			if (isTutor) assignmentRef?.resetAssignment();
		}"
	/>
	<assignment v-if="isTutor" ref="assignmentRef" :application-theme="applicationTheme"  />
</template>

<script setup lang="ts">
import DatePicker from '@/components/date-picker.vue';
import Assignment from '@/components/assignment.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { PrivateCourseClient } from '@/services/api/clients/private-course-client';
import type { NewClassDto } from '@/services/api/api.models'
import { useActionSnackbarStore } from '@/stores/snackbar-store';
import { useUserStore } from '@/stores/user-store';

const route = useRoute();
const { showSnackbar } = useActionSnackbarStore();
const { isTutor } = useUserStore();

const applicationTheme = ref<string | null>(null);
const assignmentRef = ref<InstanceType<typeof Assignment> | null>(null);

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseIdFromRoute = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseIdFromRoute) ? null : privateCourseIdFromRoute;
});

const sendRequest = async (planedDate: Date | null): Promise<void> => {
    if (privateCourseId.value == null || planedDate == null) return;

    const payload: NewClassDto = {
        date: planedDate,
        sources: []
    };

    if (assignmentRef.value != null && assignmentRef.value.setAssignment) {
        payload.sources = assignmentRef.value.items
            .filter((item) => item.include && item.value)
            .map((item) => ({ title: item.title, assignment: item.value  as string }));
    }

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

onMounted(() => {
    applicationTheme.value = window.Telegram.WebApp.themeParams.secondary_bg_color === '#1c1c1d' ? 'dark' : 'bright';
});
</script>
