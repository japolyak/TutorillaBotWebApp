<template>
    <date-picker :request-fn="sendRequest" />
</template>

<script setup lang="ts">
import DatePicker from '@/components/date-picker.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ApplicationClient } from '@/services/api/application-client';
import type { NewClassDto } from '@/services/api/api.models'

const route = useRoute();

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

const sendRequest = (planedDate: number): void => {
    if (privateCourseId.value == null) return;

    const payload: NewClassDto = {
        date: planedDate,
        sources: []
    };

    const request = ApplicationClient.planNewClass(privateCourseId.value, payload);
};
</script>
