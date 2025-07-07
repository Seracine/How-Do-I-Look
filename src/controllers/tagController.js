import tagService from '../services/tagService.js'

const tagController = {
    getPopularTags: async (req, res) => {
        const popularTags = await tagService.getPopularTags()
        res.status(200).json(popularTags)
    },
}

export default tagController