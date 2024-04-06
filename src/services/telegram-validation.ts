import { TelegramUserClient } from '@/services/api/clients/telegram-user-client';
import type { NavigationGuardNext } from 'vue-router';
import { useUserStore } from '@/stores/user-store';

export async function telegramUserAuthentication(initData: string, next: NavigationGuardNext): Promise<void> {
	useUserStore();
	if (!initData) {
        next(false);
        return;
    }
	const { setUser } = useUserStore();

    const request = await TelegramUserClient.validateInitData(initData);
    if (request) {
		setUser(request);
		next();
	}
}
