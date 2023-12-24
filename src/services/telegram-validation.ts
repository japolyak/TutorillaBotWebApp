import { TelegramUserClient } from '@/services/api/telegram-user-client';

export function telegramUserAuthentication(initData: string): void {
    const request = TelegramUserClient.validateInitData(initData);
}
