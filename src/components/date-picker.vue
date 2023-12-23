<template>
    <div class="px-4 pt-4">
        <vue-date-picker v-model="date" @update:model-value="setTelegramMainButtonState" />

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
            <v-btn text="Test" color="primary" @click="planNewClass" />
        </template>
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ApplicationClient } from '@/services/api/application-client';
import type { NewClassDto } from '@/services/api/api.models';

interface Item {
    title: string;
    value: string | null;
    include: boolean;
}

const date = ref<Date>(null);
const applicationTheme = ref<string | null>(null);

// Assignment
const setAssignment = ref(false);
const items = ref<Array<Item>>([
    { title: 'Hurra 1', value: null, include: false },
    { title: 'Hurra 2', value: null, include: false },
    { title: 'Hurra 3', value: null, include: false },
    { title: 'Czas na czasownik', value: null, include: false },
    { title: 'Umiesz zdasz', value: null, include: false },
    { title: 'Megatest', value: null, include: false },
    { title: 'Dodatkowe', value: null, include: false },
]);

const route = useRoute();

const elementTheme = computed(() => applicationTheme.value === 'dark' ? 'dark-theme' : 'bright-theme');
const textareaBgColor = computed(() => applicationTheme.value === 'dark' ? '#f1f1f1' : '');

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

const setTelegramMainButtonState = (): void => {
    if (date.value) {
        if (window.Telegram.WebApp.MainButton.isVisible) return;

        window.Telegram.WebApp.MainButton.show();
        return;
    }

    window.Telegram.WebApp.MainButton.hide();
};

const planNewClass = (): void => {
    if (privateCourseId.value == null || date.value == null) return;

    const payload: NewClassDto = {
        date: date.value.getTime() / 1000,
        sources: []
    };

    if (setAssignment.value) {
        payload.sources = items.value
            .filter((item: Item) => item.include && item.value)
            .map((item: Item) => ({ title: item.title, assignment: item.value }));
    }
    const request = ApplicationClient.planNewClass(privateCourseId.value, payload);

    window.Telegram.WebApp.MainButton.hide();
    date.value = null;
    setAssignment.value = false;
    items.value.forEach((item: Item) => {
        item.value = null;
        item.include = false;
    });
};

watchEffect(() => window.Telegram.WebApp.onEvent('mainButtonClicked', planNewClass));

onMounted(() => {
    window.Telegram.WebApp.MainButton.text = 'Plan class';
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
