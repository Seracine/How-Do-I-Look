import StyleService from '../services/styleService.js'

class StyleController{
    postStyle = async (req, res) => {
        const styleBody = {
            nickname: req.body.nickname,
            title: req.body.title,
            content: req.body.content,
            password: req.body.password,
            categories: req.body.categories,
            tags: req.body.tags,
            imageUrls: req.body.imageUrls,
        }
        const style = await StyleService.createStyle(styleBody);
        res.status(201).json(style);
    };

    putStyle = async (req, res) => {
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
        const style = await StyleService.updateStyle(styleId, styleBody);
        res.status(200).json(style);
    };

    deleteStyle = async (req, res) => {
        const styleBody = {
            password: req.body.password,
        }
        const styleId = parseInt(req.params.styleId);

        const style = await StyleService.deleteStyle(styleId, styleBody);
        res.status(200).json({ message: "스타일 삭제 성공" });
    };

    getStyleList = async (req, res) => {
        const queryParams = {
            page: req.query?.page,
            pageSize: req.query?.pageSize,
            sortBy: req.query?.sortBy,
            searchBy: req.query?.searchBy,
            keyword: req.query?.keyword,
            tag: req.query.tag,
        }
        const styleList = await StyleService.getStyleList(queryParams);
        res.status(200).json(styleList);
    };

    getStyle = async (req, res) => {
        const styleId = parseInt(req.params.styleId);

        const style = await StyleService.getStyle(styleId);
        res.status(200).json(style);

    };
}

export default new StyleController();
