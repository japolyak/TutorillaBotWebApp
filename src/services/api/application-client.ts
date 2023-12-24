import { httpClient } from './http-client';
import type { NewClassDto } from './api.models'

export class ApplicationClient{
    public static async planNewClass(privateCourseId: number, payload: NewClassDto): Promise<any> {
        const request = httpClient.post(`tutors/private-courses/${privateCourseId}/new-class/`, { json: payload });
    }
}
