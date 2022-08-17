import { Link } from "react-router-dom";
import { formatDistance } from 'date-fns';
import { splitHexAddress } from "../utils";

const ListItem = ({ data, index, onUpvote }) => {
    const { cid, title, date, upvotes, category, user, source} = data;

    return (
        <div className="px-6 table-row border-b border-gray-300">
            <div className="table-cell align-middle text-sm py-5 px-2 w-12">
                {index + 1}
            </div>
            <div className="table-cell align-middle text-sm">
                <button 
                    onClick={() => onUpvote(cid)}
                    className="flex flex-col justify-center items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="font-semibold text-xs">{upvotes}</span>
                </button>
            </div>
            <div className="table-cell align-middle ml-4 py-3 md:py-0">
                <div className="flex flex-col pl-4">
                    <Link to={`/article/${cid}`}>
                        <h3 className="font-medium text-sm underline">{title}</h3>
                    </Link>
                    <h4 className="text-gray-400 text-sm">{source}</h4>
                    <small className="text-xs text-gray-400 md:hidden">
                        By {splitHexAddress(user)} {formatDistance(new Date(parseInt(date)), new Date(), { addSuffix: true })}
                    </small>
                </div>
            </div>
            <div className="capitalize text-center text-gray-400 hidden md:table-cell align-middle justify-center text-sm flex-grow py-2 px-5">
                {category}
            </div>
            <div className="text-right text-gray-400 hidden md:table-cell align-middle text-sm ml-auto py-2 leading-none">
                <span>{splitHexAddress(user)}</span>
                <small className="block">{formatDistance(new Date(parseInt(date)), new Date(), { addSuffix: true })}</small>
            </div>
        </div>
    )
}

export default ListItem