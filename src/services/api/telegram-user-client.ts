import { httpClient } from './http-client';

export class TelegramUserClient{
    public static async validateInitData(initData: string): Promise<any> {
        const request = httpClient.get('auth/me', { headers: { 'Init-Data': initData}});
    }
}
