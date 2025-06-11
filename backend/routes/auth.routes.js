const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validate, schemas } = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/register', validate(schemas.register), authController.register);
router.post('/login', validate(schemas.login), authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;