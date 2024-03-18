import { TelegramUserClient } from '@/services/api/clients/telegram-user-client';
import type { NavigationGuardNext } from 'vue-router';

export function telegramUserAuthentication(initData: string, next: NavigationGuardNext): void {
	if (!initData) {
        next(false);
        return;
    }

    const request = TelegramUserClient.validateInitData(initData);
    next();
}
