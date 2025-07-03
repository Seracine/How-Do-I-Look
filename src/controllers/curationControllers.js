import curationService from '../services/curationService.js';

const curationControllers = {
    createCuration: async (req, res) => {
        const createData = req.body;

        const styleId = parseInt(req.params.styleId);
        const curation = await curationService.createCuration(createData, styleId);
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
            } 
        }
    },
    deleteCuration: async (req, res) => {

        res.status(200).send();
    },
    getCurationList: async (req, res) => {

        res.status(200).send();
    },
};

export default curationControllers;