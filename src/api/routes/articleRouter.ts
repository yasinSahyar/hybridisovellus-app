import express from 'express';

import {
  articlesGet,
  articleGet,
  articlePost,
  articlePut,
  articleDelete,
} from '../controllers/articleController';

const router = express.Router();

// Define the routes and attach the controllers
router.route('/').get(articlesGet).post(articlePost);
router.route('/:id').get(articleGet).put(articlePut).delete(articleDelete);

export default router;
