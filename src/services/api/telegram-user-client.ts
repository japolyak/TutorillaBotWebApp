import { httpClient } from './http-client';

export class TelegramUserClient{
    public static async validateInitData(initData: string): Promise<any> {
		try {
			const request = await httpClient.get('auth/me', {headers: {'Init-Data': initData}});
			console.log(Promise.resolve(request.status));
		} catch (error) {
		}
    }
}
