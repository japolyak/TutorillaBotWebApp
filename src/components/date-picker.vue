<template>
	<vue-date-picker
		v-model="date"
		ref="datepicker"
		:locale="locale"
		:format="dateFormat"
		disable-year-select
		month-name-format="long"
		placeholder="Select Date"
		@update:model-value="setTelegramMainButtonState"
	>
		<template #action-row="{ internalModelValue, selectDate }">
			<v-btn text="Cancel" min-width="97" size="small" variant="outlined" @click="closeMenu" />
			<v-btn
				text="Confirm"
				color="#2481cc"
				min-width="97"
				size="small"
				variant="flat"
				:disabled="!confirmationAllowed(internalModelValue)"
				@click="selectDate"
			/>
		</template>
	</vue-date-picker>
<!--	<v-btn text="Test button" color="primary" class="mt-4" @click="planClass" />-->
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted, watchEffect } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { format } from 'date-fns'
import type { DatePickerInstance } from "@vuepic/vue-datepicker"

const datepicker = ref<DatePickerInstance>(null);

const emit = defineEmits(['created']);
const props = defineProps({
    requestFn: {
        type: Function,
        required: true,
    },
});
const { userTimeZone, locale } = useUserStore();

const date = ref<Date | null>(null);
const dateFormat = ref('dd-MM-yyyy HH:mm');

const closeMenu = () => {
	if (datepicker.value != null) datepicker.value.closeMenu();
};

const confirmationAllowed = (value: Date | null) => {
	return value != null;
};

const setTelegramMainButtonState = (): void => {
    if (date.value) {
        if (window.Telegram.WebApp.MainButton.isVisible) return;

        window.Telegram.WebApp.MainButton.show();
        return;
    }

    window.Telegram.WebApp.MainButton.hide();
};

const formatDate = (date: Date | null) => {
	if (date == null) return '';

	return format(date, 'dd.MM.yyyy, HH:mm');
};

const planClass = (): void => {
    if (date.value == null || userTimeZone == null) return;

	const payload = new Date(Date.UTC(
		date.value.getFullYear(),
		date.value.getMonth(),
		date.value.getDate(),
		date.value.getHours() - userTimeZone,
		date.value.getMinutes(),
		date.value.getSeconds()
	));

    props.requestFn(payload);

    window.Telegram.WebApp.MainButton.hide();
    date.value = null;
    emit('created');
};

watchEffect(() => window.Telegram.WebApp.onEvent('mainButtonClicked', planClass));

onMounted(() => window.Telegram.WebApp.MainButton.text = 'Plan class');
</script>

<style lang="scss">
.dp__active_date {
	background: #2481cc;
}


.dp__today {
	border: 1px solid #2481cc;
}

.dp__action_row {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding-inline: 13px;
}
</style>
