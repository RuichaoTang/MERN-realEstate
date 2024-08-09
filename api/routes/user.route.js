import express from 'express';
import { test } from  '../controllers/user.comtroller.js';

const router = express.Router();

router.get('/te?st', test)

export default router;