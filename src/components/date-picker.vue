<template>
    <vue-date-picker v-model="date" @update:model-value="setTelegramMainButtonState" />
    <v-btn text="Test button" color="primary" class="mt-4" @click="planClass" />
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted, watchEffect } from 'vue';

const emit = defineEmits(['created']);
const props = defineProps({
    requestFn: {
        type: Function,
        required: true,
    },
});

const date = ref<Date | null>(null);

const setTelegramMainButtonState = (): void => {
    if (date.value) {
        if (window.Telegram.WebApp.MainButton.isVisible) return;

        window.Telegram.WebApp.MainButton.show();
        return;
    }

    window.Telegram.WebApp.MainButton.hide();
};

const planClass = (): void => {
    if (date.value == null) return;
	console.log(date.value);

    // const request = props.requestFn(date.value.getTime() / 1000);
    const request = props.requestFn(date.value);

    window.Telegram.WebApp.MainButton.hide();
    date.value = null;
    emit('created');
};

watchEffect(() => window.Telegram.WebApp.onEvent('mainButtonClicked', planClass));
onMounted(() => window.Telegram.WebApp.MainButton.text = 'Plan class');
</script>
