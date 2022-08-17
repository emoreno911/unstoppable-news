import Layout from "../app/layout";
import ListItem from "../app/home/ListItem";
import { useDatacontext } from "../app/context";


function Home() {
    const { 
        data:{ articleList, isEndOfList }, 
        fn:{ moreArticleList, upvoteArticle } 
    } = useDatacontext();

    return (
        <Layout>
            <div className="table w-full px-3 py-5 lg:w-5/6 lg:mx-auto">
                {
                    articleList.map((data, index) => (
                        <ListItem 
                            index={index} 
                            key={index}
                            data={data}
                            onUpvote={upvoteArticle} 
                        />
                    ))
                }
            </div>
            <div className="w-full px-3 pb-5 lg:w-5/6 lg:mx-auto">
                {
                    !isEndOfList && (
                        <button    
                            onClick={() => moreArticleList()}
                            type="button" 
                            className="bg-indigo-100 text-indigo-400 h-8 flex items-center justify-center rounded px-4 my-5"
                        >
                            Load More...
                        </button>
                    )
                }
            </div>
        </Layout>
    )
}

export default Home;