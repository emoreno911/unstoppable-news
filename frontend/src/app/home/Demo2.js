import { useState } from "react";

const articles = [
    {
        cid: "",
        title: "Actually tbh godard try-hard jianbing vape",
        date: "24 min ago",
        upvotes: 5,
        location: "China",
        user: "0xABCD...7890",
        source: "China News"
    },
    {
        cid: "",
        title: "Tumeric slow-carb polaroid pork",
        date: "55 min ago",
        upvotes: 3,
        location: "US",
        user: "0xABCD...7890",
        source: "LA Times"
    },
    {
        cid: "",
        title: "Forage hell of knausgaard distillery everyday",
        date: "1h ago",
        upvotes: 5,
        location: "Canada",
        user: "0xABCD...7890",
        source: "Otawa News"
    }
]

// https://codepen.io/knyttneve/pen/vYEzXOR
const Post = ({ data, index }) => {
    const { cid, title, date, upvotes, location, user, source} = data;
    return (
        <div className="px-6 py-4 flex items-center border-b border-gray-300">
            <div className="flex items-center text-sm mr-5">
                {index + 1}
            </div>
            <div className="flex flex-col justify-center items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <span className="font-semibold text-xs">{upvotes}</span>
            </div>
            <div className="flex ml-4">
                <div className="flex flex-col pl-4">
                    <h2 className="font-medium text-sm">{title}</h2>
                    <h3 className="text-gray-400 text-sm">{source}</h3>
                </div>
            </div>
            <div className="text-gray-400 flex items-center justify-center text-sm flex-grow py-2">
                {user}
            </div>
            <div className="text-gray-400 flex items-center text-sm ml-auto py-2 leading-none">
                {date}
            </div>
        </div>
    )
}

const DarkModeButton = () => {
    const [isDark, setIsDark] = useState(false);
    const toggleDark = () => {
        const html = window.document.querySelector('html');
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            setIsDark(false);
        }
        else {
            html.classList.add('dark');
            setIsDark(true);
        }
    }

    return (
        <button 
            onClick={() => toggleDark()}
            className="bg-indigo-100 text-indigo-400  w-8 h-8 flex items-center justify-center rounded mr-2"
        >
            <svg stroke="currentColor" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {
                    isDark ?
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    :
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                }
            </svg>
        </button>
    )
}

const Demo = () => {
    const _posts = [...articles, ...articles];

    return (
        <div className="container mx-auto h-screen relative">
            <div className="flex w-full h-full lg:overflow-hidden overflow-auto lg:flex-row flex-col shadow-2xl">
                <div className="w-full flex flex-col bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
                    
                    <div className="overflow-auto flex-grow w-5/6 mx-auto">
                        {
                            _posts.map((data, index) => <Post data={data} index={index} key={index} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo