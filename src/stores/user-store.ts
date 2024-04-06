import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { type UserDto, Role } from '@/services/api/api.models';


export const useUserStore = defineStore('user-store', () => {
	const user = ref<UserDto | null>(null);

	const isTutor = computed(() => user.value?.is_tutor ?? false);

	const setUser = (payload: UserDto | null) => {
		if (payload == null) {
			user.value = null;
			return;
		}

		user.value = payload;
	}

    return {
		isTutor,
		setUser,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
