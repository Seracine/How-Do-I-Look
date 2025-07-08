import { parse } from 'dotenv';
import curationService from '../services/curationService.js';

const curationControllers = {
    createCuration: async (req, res) => {
        const { password, ...createData } = req.body;

        const styleId = parseInt(req.params.styleId);
        const curation = await curationService.createCuration(createData, styleId, password);
        res.status(200).json(curation);
    },
    updateCuration: async (req, res) => {
        const { password, ...updateData } = req.body;
        const curationId = parseInt(req.params.curationId);
        try {
            const curation = await curationService.updateCuration(curationId, password, updateData);
            res.status(200).send(curation);
        } catch (error) {
            if (error.message === 'Curation not found') {
                res.status(404).send({ message: '존재하지 않습니다' });
            } else if (error.message === 'Invalid password') {
                res.status(403).send({ message: '비밀번호가 틀렸습니다' });
            } else {
                res.status(400).send({ message: '잘못된 요청입니다' });
            }
        }
    },
    deleteCuration: async (req, res) => {
        const curationId = parseInt(req.params.curationId);
        const password = req.body.password;
        try {
            await curationService.deleteCuration(curationId, password);
            res.status(200).send({ message: '큐레이팅 삭제 성공' });
        } catch (error) {
            if (error.message === 'Curation not found') {
                return res.status(404).send({ message: '존재하지 않습니다' });
            } else if (error.message === 'Invalid password') {
                return res.status(403).send({ message: '비밀번호가 틀렸습니다' });
            } else {
                return res.status(400).send({ message: '잘못된 요청입니다' });
            }
        }
    },
    getCurationList: async (req, res) => {
        try {
            const styleId = parseInt(req.params.styleId);
            const { page = 1, pageSize = 5, searchBy = '', keyword = '' } = req.query;
            const curations = await curationService.getCurationList(styleId, parseInt(page), parseInt(pageSize), searchBy, keyword);
            res.status(200).send(curations);
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: '잘못된 요청입니다' });
        }
    },
};

export default curationControllers;