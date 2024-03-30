import { createClient } from 'redis';
import env from '../env';
import logger from './logger';
import { mysql } from './mysql';

export default async function mysqlCron() {
    //mysql에 저장
    console.log('mysqlCron');
    try {
        let rankList = [];
        const client = createClient({
            socket: { port: env.redis.port },
            password: env.redis.password,
        });
        await client.connect();
        rankList = await client.zRangeWithScores('rank', 0, -1);
        await client.flushAll();
        await client.disconnect();
        for (const { value: store_name, score: count } of rankList) {
            const query = `INSERT INTO ranks (store_name, count)VALUES (:store_name, :count)ON DUPLICATE KEY UPDATE count = count + :count;`;
            await mysql.query(query, {
                replacements: { store_name: store_name, count: count },
            });
        }
    } catch (e) {
        logger.err(JSON.stringify(e));
        logger.error(e);
    }
}
