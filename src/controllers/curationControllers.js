import * as curationService from '../services/curationService.js';

export const createCuration = async (req, res) => {
    const curationBody = req.body;

    const styleId = parseInt(req.params.styleId);
    const curation = await curationService.createCuration(curationBody, styleId);
    res.status(201).json(curation);
};

export const updateCuration = async (req, res) => {


    res.status(200).json(updatedCuration);
};

export const deleteCuration = async (req, res) => {

    res.status(204).send();
};

export const getCurationList = async (req, res) => {

    res.status(200).json(curations);
};