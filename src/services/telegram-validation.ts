import { TelegramUserClient } from '@/services/api/clients/telegram-user-client';
import type { NavigationGuardNext } from 'vue-router';

export async function telegramUserAuthentication(initData: string, next: NavigationGuardNext): Promise<void> {
	if (!initData) {
        next(false);
        return;
    }

    const request = await TelegramUserClient.validateInitData(initData);
    next();
}
