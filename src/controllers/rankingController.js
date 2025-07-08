import rankingService from '../services/rankingService.js'

const rankingController = {
    getRankedStyleList: async (req, res) => {
        const queryParams = {
            page: req.query?.page,
            pageSize: req.query?.pageSize,
            rankBy: req.query?.rankBy,
        }
        const rankedStyleList = await rankingService.getRankedStyleList(queryParams)
        res.status(200).json(rankedStyleList)
    },
}

export default rankingController