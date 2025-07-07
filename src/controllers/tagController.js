import tagService from '../services/tagService.js'

const tagController = {
    getPopularTagList: async (req, res) => {
        const popularTags = await tagService.getPopularTagList()
        res.status(200).json(popularTags)
    },
}

export default tagController