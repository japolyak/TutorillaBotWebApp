import { type InitDataDto } from '@/services/api/api.models';

export function telegramUserAuthentication(initData: string): void {
    const payload: InitDataDto = { initData }
    console.log(payload);
}
