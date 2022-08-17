import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { Web3Storage } from 'web3.storage'
import { abi, contractAddress } from "./constants";
import {
	web3StorageToken
} from './utils';

const storageClient = new Web3Storage({ token: web3StorageToken });

const DataContext = createContext();
export const useDatacontext = () => useContext(DataContext);

const DataContextProvider = (props) => { 
	const perPage = 10;
	const [currentCursor, setCurrentCursor] = useState(0);
	const [articleList, setArticleList] = useState([]);
	const [isEndOfList, setIsEndOfList] = useState(false);

	const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis();
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex);

	useEffect(() => {
		setTimeout(() => {
			updateArticleList();
			console.log(chainIdHex)
		}, 500);
	}, [])

	useEffect(() => {
        if (isWeb3Enabled) {
			console.log('web3 enabled!!!');
        }
    }, [isWeb3Enabled])

	const { runContractFunction: fetchItems } = useWeb3Contract({
        abi,
        contractAddress,
		chainId: 'rinkeby',
        functionName: "fetchItemsBw",
        params: {cursor: currentCursor, howMany: perPage},
    })

	async function updateArticleList() {
		const _response = await fetchItems();
		const _articles = _response[0];
		const _cursor = _response[1].toNumber();

		const articles = _articles.map(article => {
			const [cid, title, source, date, category, user, upvotes] = article.split('||');
			return { cid, title, source, date, category, user, upvotes };
		})

		console.log(articles)
		setCurrentCursor(_cursor);
		setArticleList(articles);
	}

	async function moreArticleList() {
		const _response = await fetchItems();
		const _articles = _response[0];
		const _cursor = _response[1].toNumber();

		const articles = _articles.map(article => {
			const [cid, title, source, date, category, user, upvotes] = article.split('||');
			return { cid, title, source, date, category, user, upvotes };
		})

		console.log(articles, _cursor);
		setCurrentCursor(_cursor);
		setArticleList(prev => {
			const res = [...prev, ...articles];
			return res;
		})

		if (articles.length === 0) {
			setIsEndOfList(true);
			setCurrentCursor(0);
		}
	}

	// Upvote
	const {
		runContractFunction: upvote,
	} = useWeb3Contract();

	async function upvoteArticle(cid) {
		try {
			let options = {
				abi,
				contractAddress,
				functionName: "upvote",
				//msgValue: entranceFee,
				params: { cid }
			}

			const voteSuccess = async (tx) => {
				//await tx.wait(1);
				setArticleList(prev => {
					const k = prev.findIndex(a => a.cid === cid);
					const votes = parseInt(prev[k].upvotes);
					prev[k].upvotes = votes + 1;
					return prev;
				});
			}
	
			await upvote({
				params: options,
				// onComplete:
				// onError:
				onError: handleError,
				onSuccess: voteSuccess
			})

		} catch (error) {
			console.log(error);
			dispatch({
				type: "error",
				message: error.message,
				title: "Submmit Notification",
				position: "topR",
				icon: "bell",
			})
		}
	}


	// Submit article functions
	const {
		runContractFunction: addArticle,
		data: txResponse,
		isLoading,
		isFetching: addArticlePending,
	} = useWeb3Contract();

	async function submitArticle(title, source, category, jsonContent) {
		if (addArticlePending)
			return;

		// generate json file and upload to web3.storage
		const json = JSON.stringify(jsonContent);
		const blob = new Blob([json], { type: 'application/json' });
		const file = new File([ blob ], 'file.json', { type: 'application/json' });

		try {
			const rootCid = await storageClient.put([file]);
			console.log(rootCid);

			// store in blockchain
			const date = Date.now();
			let dataParams = {
				cid: rootCid,
				date: date.toString(),
				title,
				source,
				category,
				user: account
			};

			let options = {
				abi,
				contractAddress,
				functionName: "addItem",
				//msgValue: entranceFee,
				params: dataParams
			}

			console.log(dataParams);
			setCurrentCursor(0);

			await addArticle({
				params: options,
				// onComplete:
				// onError:
				onSuccess: handleSuccess,
				onError: handleError,
			})

			return true;
		} catch (error) {
			console.log(error);
			dispatch({
				type: "error",
				message: error.message,
				title: "Submmit Notification",
				position: "topR",
				icon: "bell",
			})
			return false
		}
	}

	const dispatch = useNotification();

	const handleError = (err) => {
		console.log(err)
		dispatch({
            type: "error",
            message: err.data.message,
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
	}

    const handleSuccess = async (tx) => {
        await tx.wait(1);
        updateArticleList();
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const data = {
		isEndOfList,
		articleList,
		addArticlePending
	}

	const fn = {
		isMobile,
		submitArticle,
		moreArticleList,
		upvoteArticle
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;