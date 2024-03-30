import logger from '../../../lib/logger';
import httpStatus from 'http-status';
import RankService from './rank.service';
import { Result } from '../../../common/result';

export default class RankController {
    list = async (req, res, next) => {
        const range = req.query?.range ? parseInt(req.query?.range, 10) : 10;
        let result;
        let response;

        try {
            result = await new RankService().getRank(range);
            response = Result.ok<JSON>(result).toJson();
        } catch (e: any) {
            logger.err(JSON.stringify(e));
            logger.error(e);

            response = Result.fail<Error>(e).toJson();
        }

        logger.res(httpStatus.OK, response, req);
        res.status(httpStatus.OK).json(response);
    };

    setRank = async (req, res, next) => {
        const storeName = req.body?.storeName;
        let result;
        let response;

        try {
            result = await new RankService().setRank(storeName);
            response = Result.ok<JSON>(result).toJson();
        } catch (e: any) {
            logger.err(JSON.stringify(e));
            logger.error(e);

            response = Result.fail<Error>(e).toJson();
        }

        logger.res(httpStatus.OK, response, req);
        res.status(httpStatus.OK).json(response);
    };
}
