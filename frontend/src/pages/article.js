import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../app/layout";


function Article() {
    const [content, setContent] = useState({title: "", source: "", url: "#"});
    const [htmlContent, setHtmlContent] = useState("");
    const { cid } = useParams();

    useEffect(() => {
        getArticle(cid);
    }, [cid])

    const getArticle = async (id) => {
        const article = await axios.get(`/data/${id}.json`);
        setContent(article.data);
        setHtmlContent(article.data.content);
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
                    <small className="text-sm text-gray-400">Source: <a href={content.url} target="_blank">{content.source}</a></small>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: htmlDecode(htmlContent) }} />
            </div>
        </Layout>
    )
}

export default Article;