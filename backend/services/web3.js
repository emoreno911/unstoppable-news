const { extract } = require('article-parser/dist/cjs/article-parser.js')

require('dotenv').config();

async function requestArticleParser(url) {
    try {
        const res = await extract(url);
        return res;
    } catch (error) {
        console.log(error);
        return { error: true }
    }
}

module.exports = {
    requestArticleParser
}