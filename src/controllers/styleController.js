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


}

export default styleController