const express = require('express')
const router = express.Router()
const { authenticateJWT } = require('../middlewares/auth.middleware')

router.get(
    '/',
    (req, res, next) => authenticateJWT(req, res, next, true),
    require('../controllers/posts/getPosts.controller')
)
router.get(
    '/recommend',
    (req, res, next) => authenticateJWT(req, res, next, true),
    require('../controllers/posts/recommend.controller')
)
router.get(
    '/recommend/:id',
    (req, res, next) => authenticateJWT(req, res, next, true),
    require('../controllers/posts/recommend.controller')
)
router.get(
    '/self/:username',
    (req, res, next) => authenticateJWT(req, res, next, true),
    require('../controllers/posts/listSelfPosts.controller')
)

router.post('/create', authenticateJWT, require('../controllers/posts/createPost.controller'))

router.get('/bookmark', authenticateJWT, require('../controllers/posts/listBookmark.controller'))
router.get('/:id', require('../controllers/posts/getPostsDetail.controller.js'))
router.put('/:id/bookmark', authenticateJWT, require('../controllers/posts/bookmark.controller'))

router.put('/update', authenticateJWT, require('../controllers/posts/updatePost.controller'))
router.put('/toggle-vote', authenticateJWT, require('../controllers/posts/toggleVote.controller'))
router.put('/add-view', authenticateJWT, require('../controllers/posts/addView.controller'))
router.delete('/:id', authenticateJWT, require('../controllers/posts/deletePost.controller'))

module.exports = router
