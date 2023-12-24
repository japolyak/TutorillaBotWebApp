import ky, { type KyInstance} from 'ky';

export const httpClient: KyInstance = ky.create({
    prefixUrl: 'http://127.0.0.1:8000/',
});
