const express = require('express');

const router = express.Router();

// any route in here is pre-pended with /auth

router.get('/', (req, res) => {
	res.json({
		message: 'AUTH'
	});
});

// POST /auth/singup

router.post('/singup', (req, res) => {
	 console.log('body', req.body);
	res.json({
		message: 'SINGUP'
	});
});



module.exports = router;