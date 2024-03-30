import { createClient } from 'redis';
import env from '../../../env';

export default class RankService {
    getRank = async (range: number) => {
        const client = createClient({
            socket: { port: env.redis.port },
            password: env.redis.password,
        });
        await client.connect();
        const rankList = (await client.zRangeWithScores('rank', 0, -1))
            .reverse()
            .slice(0, range);

        await client.disconnect();
        return rankList;
    };
    setRank = async (storeName: string) => {
        const client = createClient({
            socket: { port: env.redis.port },
            password: env.redis.password,
        });
        await client.connect();
        const storeScore = await client.zScore('rank', storeName);
        await client.zAdd('rank', {
            score: storeScore + 1,
            value: storeName,
        });
        await client.disconnect();
    };
}
