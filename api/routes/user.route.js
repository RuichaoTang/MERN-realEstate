import express from 'express';
import { test, updateUser, deleteUser, getUserListings, getUser, toggleFavorite, getFavorites } from  '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/te?st', test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
router.post('/favorite', toggleFavorite);
router.get('/:id/favorites', getFavorites);

export default router;