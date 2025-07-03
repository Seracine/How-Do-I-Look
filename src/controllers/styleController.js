import styleService from '../services/styleService.js'

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
        const style = await styleService.createStyle(styleBody)
        res.status(201).json(style)
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
        const styleId = Number(req.params.styleId)
        try {
            const style = await styleService.updateStyle(styleId, styleBody)
            res.status(200).json(style)
        } catch (e) {
            switch (e.message) {
                case "E403":
                    res.status(403).json({ message: "비밀번호가 틀렸습니다" })
                    break;
                case "E404":
                    res.status(404).json({ message: "존재하지 않습니다" })
                    break;
            }
        }
    },

    deleteStyle: async (req, res) => {
        const styleBody = {
            password: req.body.password,
        }
        const styleId = Number(req.params.styleId)
        try {
            const style = await styleService.deleteStyle(styleId, styleBody)
            res.status(200).json({ message: "스타일 삭제 성공" })
        } catch (e) {
            switch (e.message) {
                case "E403":
                    res.status(403).json({ message: "비밀번호가 틀렸습니다" })
                    break;
                case "E404":
                    res.status(404).json({ message: "존재하지 않습니다" })
                    break;
            }
        }
    },
}

export default styleController