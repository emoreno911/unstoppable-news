import { useState, useRef } from "react";
import sanitizeHtml from 'sanitize-html';
import { useDatacontext } from "../context";
import { getCategories, getArticleParser, htmlDecode, isValidURL } from '../utils';

const sanitizeConfig = { allowedTags: [], allowedAttributes: {img: [ 'src' ]}, disallowedTagsMode: "escape" }

const Form = () => {
    const urlRef = useRef();
    const categoryRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [jsonContent, setJsonContent] = useState({});
    const [previewHtml, setPreviewHtml] = useState("&lt;div class='text-gray-400 text-center p-3'&gt;Nothing Here!&lt;/div&gt;");

    const { data:{ addArticlePending }, fn:{ submitArticle } } = useDatacontext();

    const getPreview = async () => {
        if (isLoading)
            return;

        const url = urlRef.current.value;
        if (isValidURL(url)) {
            setIsLoading(true);
            const res = await getArticleParser(url);
            setIsLoading(false);

            const contentEscaped = sanitizeHtml(res.content, sanitizeConfig);
            const jsonData = {...res, content: contentEscaped};
            setPreviewHtml(contentEscaped);
            setJsonContent(jsonData);
            console.log(jsonData)
        }
        else {
            alert("Please enter a valid URL!");
        }
    }

    const doSubmit = async () => {
        if (isLoading)
            return;

        if (Object.keys(jsonContent).length === 0)
            return;

        const category = categoryRef.current.value;
        const {title, source} = jsonContent;
        const result = await submitArticle(title, source, category, jsonContent);
        
        console.log('doSubmit', result);
    }

    const categories = getCategories();

    return (
        <form action="#" method="POST">
            <div className="sm:overflow-hidden">
              <div className="px-5 lg:px-0 py-5 space-y-6">
    
              <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 lg:col-span-3">
                    <label className="block text-sm font-medium">Category</label>                  
                    <select 
                        name="category"
                        ref={categoryRef}
                        className="capitalize mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-3 rounded-md dark:text-gray-700"
                    >
                        { categories.map(opt => <option key={opt} value={opt}>{opt}</option>) }
                    </select>
                  </div>
    
                  <div className="col-span-6 lg:col-span-3">
                    <label className="block text-sm font-medium">Article URL</label>
                    <input ref={urlRef} type="text" name="articleUrl" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-3 rounded-md"/>
                  </div>
              </div>

              <div className="px-4 py-3 text-right lg:px-0">
                <button    
                    onClick={() => getPreview()}
                    type="button" 
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-400 hover:bg-amber-700 focus:outline-none"
                >
                    { isLoading  ? "Loading..." : "Preview" }
                </button>

                {
                    Object.keys(jsonContent).length > 0 && (
                        <button 
                            disabled={addArticlePending}
                            onClick={() => doSubmit()}
                            type="button" 
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            { addArticlePending ? "Submitting..." : "Submit" }
                        </button>
                    )
                }

              </div>
    
              <div>
                  <label className="block text-sm font-medium"> Article Preview </label>
                  <div className="article dark:text-gray-100 mt-1 py-5 mx-0 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 p-3 rounded-md">
                    <h3 className="text-3xl font-semibold block border-bottom mb-5">{jsonContent.title}</h3>
                    <hr className="my-5" />
                    <div dangerouslySetInnerHTML={{ __html: htmlDecode(previewHtml) }} />
                  </div>
              </div>
    
              </div>
            </div>
        </form>
    )
}

export default Form;