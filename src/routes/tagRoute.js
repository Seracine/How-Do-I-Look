import express from 'express'

const TagRoute = express.Router()

TagRoute.route('/')
.get((req, res) => {
    res.json({
        tags: []
    })
})

export default TagRoute