<template>
    <date-picker :request-fn="sendRequest" @created="resetAssignment" />

    <v-switch v-model="setAssignment" label="Set assignment" color="primary" hide-details :class="elementTheme" />

    <template v-if="setAssignment">
        <div v-for="(item, index) in items" :key="index">
            <v-switch
                v-model="item.include"
                :label="item.title"
                color="primary"
                hide-details
                :class="elementTheme"
                :key="`${index}-switch`"
                @update:modelValue="!item.include ? item.value = null : null"
            />
            <v-textarea
                v-if="item.include"
                v-model="item.value"
                variant="outlined"
                hide-details
                rows="1"
                :bg-color="textareaBgColor"
                auto-grow
                :key="`${index}-textarea`"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
import DatePicker from '@/components/date-picker.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { PrivateCourseClient } from '@/services/api/clients/private-course-client';
import type { NewClassDto } from '@/services/api/api.models'

interface Item {
    title: string;
    value: string | null;
    include: boolean;
}

const route = useRoute();

const setAssignment = ref(false);
const applicationTheme = ref<string | null>(null);

const items = ref<Array<Item>>([
    { title: 'Hurra 1', value: null, include: false },
    { title: 'Hurra 2', value: null, include: false },
    { title: 'Hurra 3', value: null, include: false },
    { title: 'Czas na czasownik', value: null, include: false },
    { title: 'Umiesz zdasz', value: null, include: false },
    { title: 'Megatest', value: null, include: false },
    { title: 'Dodatkowe', value: null, include: false },
]);

const elementTheme = computed(() => applicationTheme.value === 'dark' ? 'dark-theme' : 'bright-theme');
const textareaBgColor = computed(() => applicationTheme.value === 'dark' ? '#f1f1f1' : '');

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

const sendRequest = (planedDate: Date): void => {
    if (privateCourseId.value == null) return;

    const payload: NewClassDto = {
        date: planedDate,
        sources: []
    };

    if (setAssignment.value) {
        payload.sources = items.value
            .filter((item: Item) => item.include && item.value)
            .map((item: Item) => ({ title: item.title, assignment: item.value  as string }));
    }

    const request = PrivateCourseClient.planNewClass(privateCourseId.value, payload);
};

const resetAssignment = () => {
    setAssignment.value = false;
    items.value.forEach((item: Item) => {
        item.value = null;
        item.include = false;
    });
};

onMounted(() => {
    applicationTheme.value = window.Telegram.WebApp.themeParams.secondary_bg_color === '#1c1c1d' ? 'dark' : 'bright';
});
</script>

<style lang="scss">
.dark-theme {
    .v-label {
        color: #f1f1f1;
    }
}

.bright-theme {
    .v-label {
        color: #1c1c1d;
    }
}
</style>
