import axios from "axios";

export const appMetadata = {
	name: "Unstoppable News",
    description: "News from EVERYWHERE and always online",
    icon: "https://res.cloudinary.com/dy3hbcg2h/image/upload/v1652131690/dz-logo-black_c86gzb.png"
}

export const web3StorageToken = process.env.REACT_APP_WEB3STORAGE_KEY;

export const htmlDecode = (input) => {
    var a = document.createElement('div');
    a.innerHTML = input;
    return a.childNodes.length === 0 ? "" : a.childNodes[0].nodeValue;
}

export const isValidURL = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

const backendBaseURL = "http://localhost:5000";

export const request = async ({url, fname, method = 'GET', data = null, _baseURL = null}) => {
	const instance = axios.create();
	const baseURL = _baseURL || backendBaseURL;
	return instance.request({
		baseURL,
		url,
		method,
		data
	})
	.then(response => response.data)
	.catch(err => {
		const { message, response:{data, status} } = err;
		console.log(`request error in %c ${fname}`, 'font-weight:900');
		console.log(message);
		return { err: true, errmsg: message, ...data };
	})
}

export async function getArticleParser(url) {
    const response = await request({
        _baseURL: backendBaseURL,
        url: `/getArticleParser`,
        method: 'POST',
        fname: 'getArticleParser',
        data: {url},
    });

    return response;
}

export const getCategories = () => {
    return [
        "technology", "politics", "education", "health", "economy", "business", "fashion", "entertainment", "sports", "other"
    ]
}

export const splitHexAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(addr.length - 4)}`;
}

export const getArticles = () => {
    return [
        {
            cid: "1",
            title: "Ethereum Merge on track as Goerli test merge successfully finalized ",
            date: "24 min ago",
            upvotes: 5,
            location: "US",
            user: "0xABCD...7890",
            source: "cointelegraph.com"
        },
        {
            cid: "2",
            title: "What Remote Work Debate? They've Been Back at the Office for a While.",
            date: "55 min ago",
            upvotes: 3,
            location: "US",
            user: "0xABCD...7890",
            source: "nytimes.com"
        },
        {
            cid: "3",
            title: "As Government Takes on the Tornado Mixer, It May Reap a Whirlwind",
            date: "1h ago",
            upvotes: 5,
            location: "Canada",
            user: "0xABCD...7890",
            source: "coindesk.com"
        },
        {
            cid: "4",
            title: "TDCX在印度開設辦事處，增強為全球英語國家市場服務的能力 | ASIA TODAY News & Events",
            date: "2h ago",
            upvotes: 2,
            location: "China",
            user: "0xABCD...7890",
            source: "asiatoday.com"
        }
    ]
} 