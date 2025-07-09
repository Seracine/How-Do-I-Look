import tagService from '../services/tagService.js'

class TagController{
    getPopularTagList = async (req, res) => {
        const popularTags = await tagService.getPopularTagList()
        res.status(200).json(popularTags)
    };
}

export default new TagController();