import { httpClient } from './http-client';
import type { InitDataDto } from '@/services/api/api.models'

export class TelegramUserClient{
    public static async validateInitData(payload: InitDataDto): Promise<any> {
        const request = httpClient.get('auth/me', { headers: {
            'Init-Data': payload.initData
        } });
    }
}
