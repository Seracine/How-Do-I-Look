import styleService from '../services/styleService.js'
import { Prisma } from '@prisma/client'; // errorHandler에서 리팩토링 할때 제거
const styleController = {
    postStyle: async (req, res) => {
        const styleBody = {
            nickname: req.body.nickname,
            title: req.body.title,
            content: req.body.content,
            password: req.body.password,
            categories: req.body.categories,
            tags: req.body.tags,
            imageUrls: req.body.imageUrls,
        }
        const style = await styleService.createStyle(styleBody);
        res.status(201).json(style);
    },

    putStyle: async (req, res) => {
        const styleBody = {
            nickname: req.body.nickname,
            title: req.body.title,
            content: req.body.content,
            password: req.body.password,
            categories: req.body.categories,
            tags: req.body.tags,
            imageUrls: req.body.imageUrls,
        }
        const styleId = parseInt(req.params.styleId);
        try {
            const style = await styleService.updateStyle(styleId, styleBody);
            res.status(200).json(style);
        } catch (e) {
            switch (e.message) {
                case "E403":
                    res.status(403).json({ message: "비밀번호가 틀렸습니다" });
                    break;
                case "E404":
                    res.status(404).json({ message: "존재하지 않습니다" });
                    break;
            }
        }
    },

    deleteStyle: async (req, res) => {
        const styleBody = {
            password: req.body.password,
        }
        const styleId = parseInt(req.params.styleId);
        try {
            const style = await styleService.deleteStyle(styleId, styleBody);
            res.status(200).json({ message: "스타일 삭제 성공" });
        } catch (e) {
            switch (e.message) {
                case "E403":
                    res.status(403).json({ message: "비밀번호가 틀렸습니다" });
                    break;
                case "E404":
                    res.status(404).json({ message: "존재하지 않습니다" });
                    break;
            }
        }
    },

    getStyleList: async (req, res) => {
        const queryParams = {
            page: req.query?.page,
            pageSize: req.query?.pageSize,
            sortBy: req.query?.sortBy,
            searchBy: req.query?.searchBy,
            keyword: req.query?.keyword,
            tag: req.query.tag,
        }
        const styleList = await styleService.getStyleList(queryParams);
        res.status(200).json(styleList);
    },

    getStyle: async (req, res) => {
        const styleId = parseInt(req.params.styleId);
        try {
            const style = await styleService.getStyle(styleId);
            res.status(200).json(style);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2025') { //API 명세서에는 없긴하나 있어야 할 로직으로 보임
                res.status(404).json({ message: "존재하지 않습니다" });
            }
        }
    }
}

export default styleController