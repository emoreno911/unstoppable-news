const express = require('express');
const { 
    requestArticleParser
} = require('../services/web3');

const router = express.Router();

router.post('/getArticleParser', async (request, response) => {
	const { url } = request.body;
    const result = await requestArticleParser(url);
    response.json({url, ...result});
});

module.exports = router