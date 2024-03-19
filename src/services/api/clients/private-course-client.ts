import { httpClient } from '@/services/api/http-client';
import type { NewClassDto } from '@/services/api/api.models'

export class PrivateCourseClient {
    public static async planNewClass(privateCourseId: number, payload: NewClassDto): Promise<any> {
        const request = httpClient.post(`private-courses/${privateCourseId}/new-class/`, { json: payload });
    }


	public static async test(): Promise<any> {
        const request = await httpClient.post(``, { json: { test: 'test' } });
    }
}
