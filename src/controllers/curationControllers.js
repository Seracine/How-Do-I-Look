import { parse } from 'dotenv';
import curationService from '../services/curationService.js';

const curationControllers = {
    createCuration: async (req, res, next) => {
        const createData = req.body;
        const styleId = parseInt(req.params.styleId);
        try {
            const curation = await curationService.createCuration(createData, styleId);
            res.status(200).json(curation);
        } catch (error) { next(error); }
    },
    updateCuration: async (req, res, next) => {
        const { password, ...updateData } = req.body;
        const curationId = parseInt(req.params.curationId);
        try {
            const curation = await curationService.updateCuration(curationId, password, updateData);
            res.status(200).send(curation);
        } catch (error) { next(error); }
    },
    deleteCuration: async (req, res, next) => {
        const curationId = parseInt(req.params.curationId);
        const password = req.body.password;
        try {
            await curationService.deleteCuration(curationId, password);
            res.status(200).send({ message: '큐레이팅 삭제 성공' });
        } catch (error) { next(error); }
    },
    getCurationList: async (req, res, next) => {
        const queryParams = {
            page: parseInt(req.query?.page),
            pageSize: parseInt(req.query?.pageSize),
            searchBy: req.query?.searchBy,
            keyword: req.query?.keyword,
        }
        const styleId = parseInt(req.params.styleId);
        try {
            const curations = await curationService.getCurationList(styleId, queryParams);
            res.status(200).send(curations);
        } catch (error) { next(error); }
    },
};

export default curationControllers;