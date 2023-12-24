import { type InitDataDto } from '@/services/api/api.models';
import { TelegramUserClient } from '@/services/api/telegram-user-client';

export function telegramUserAuthentication(initData: string): void {
    const payload: InitDataDto = { initData };

    const request = TelegramUserClient.validateInitData(payload);

    console.log(request);
}
