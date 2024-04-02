import { httpClient } from '@/services/api/http-client';
import type { NewClassDto } from '@/services/api/api.models'
import { type KyResponse} from 'ky';

export class PrivateCourseClient {
    public static async planNewClass(privateCourseId: number, payload: NewClassDto): Promise<KyResponse | null> {
		try {
			const request = await httpClient.post(`private-courses/${privateCourseId}/new-class/`, {json: payload});

			return request;
		} catch {
			return null;
		}
    }

	public static async test(): Promise<KyResponse | null> {
		try {
			const request = await httpClient.post(`test/`, { json: { test: 'test' } });

			return request;
		}
		catch {
			return null;
		}
    }
}
