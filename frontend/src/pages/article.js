import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Web3Storage } from 'web3.storage';
import { web3StorageToken } from '../app/utils';
import Layout from "../app/layout";

const storageClient = new Web3Storage({ token: web3StorageToken });

function Article() {
    const [content, setContent] = useState({title: "", source: "", url: "#"});
    const [htmlContent, setHtmlContent] = useState("");
    const { cid } = useParams();

    useEffect(() => {
        getArticle(cid);
    }, [cid])

    const getArticle = async (cid) => {
        const res = await storageClient.get(cid);
        const files = await res.files();
        const textData = await files[0].text();
        const article = JSON.parse(textData);

        setContent(article);
        setHtmlContent(article.content);
    }

    const htmlDecode = (input) => {
        var a = document.createElement('div');
        a.innerHTML = input;
        return a.childNodes.length === 0 ? "" : a.childNodes[0].nodeValue;
    }
    
    return (
        <Layout>
            <div className="flex-grow px-5 lg:px-0 lg:w-5/6 lg:mx-auto article dark:text-gray-100 max-w-4xl">
                <h3 className="text-3xl py-5">
                    <span className="font-semibold block">{content.title}</span>
                    <small className="text-sm text-gray-400">
                        Source: <a href={content.url} target="_blank">{content.source}</a>
                    </small>
                    <small className="text-sm block">
                        <a href={`https://${cid}.ipfs.w3s.link/file.json`} target="_blank">ipfs link</a>
                    </small>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: htmlDecode(htmlContent) }} />
            </div>
        </Layout>
    )
}

export default Article;