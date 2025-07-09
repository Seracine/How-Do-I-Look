import CurationService from '../services/curationService.js';

class CurationController {
    createCuration = async (req, res) => {
        const styleId = parseInt(req.params.styleId);
        const curationBody = {
            ...req.body,
        }

        const curation = await CurationService.createCuration(styleId, curationBody);
        res.status(200).json(curation);
    };

    updateCuration = async (req, res) => {
        const curationId = parseInt(req.params.curationId);
        const styleId = req.params.styleId;
        const curationBody = {
            ...req.body,
        }

        const curation = await CurationService.updateCuration(curationId, styleId, curationBody);
        res.status(200).send(curation);
    };

    deleteCuration = async (req, res) => {
        const curationId = parseInt(req.params.curationId);
        const styleId = req.params.styleId;
        const curationBody = {
            password: req.body.password,
        }

        await CurationService.deleteCuration(curationId, styleId, curationBody);
        res.status(200).send({ message: '큐레이팅 삭제 성공' });
    };

    getCurationList = async (req, res) => {
        const queryParams = {
            page: req.query?.page ? parseInt(req.query?.page) : undefined,
            pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : undefined,
            searchBy: req.query?.searchBy,
            keyword: req.query?.keyword,
        }
        console.log(queryParams);
        const styleId = parseInt(req.params.styleId);

        const curations = await CurationService.getCurationList(styleId, queryParams);
        res.status(200).send(curations);
    };
}


export default new CurationController();