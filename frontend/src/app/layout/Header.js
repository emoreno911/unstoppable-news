import { Link } from "react-router-dom";
import ConnectButton from "./ConnectButton";
import DarkModeButton from "./DarkModeButton";

function Header() {
    return (
        <div className="p-5 md:p-8 shadow-md relative bg-white dark:bg-gray-900">
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex items-center">
                    <Link to="/">
                        <img src="/un-logo-w.PNG" className="w-10 h-10 block rounded object-cover object-top hidden dark:block" />
                        <img src="/un-logo-b.PNG" className="w-10 h-10 block rounded object-cover object-top dark:hidden" />
                    </Link>         
                    <div className="text-indigo-600 dark:text-indigo-300 ml-3">
                        <h1 className="font-medium text-lg">Unstoppable News</h1>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">News from EVERYWHERE and always online</p>
                    </div>
                </div>
                <div className="flex mt-3 md:mt-0 md:ml-auto">
                    <DarkModeButton />
                    <Link to="/submit">
                        <span className="uppercase bg-indigo-100 text-indigo-400 h-8 flex items-center justify-center rounded px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg> 
                            Submit
                        </span>
                    </Link>
                    <ConnectButton />
                </div>
            </div>
            
            {/* <div className="mt-6 flex">
            <button className="bg-indigo-500 text-white py-2 text-sm px-3 rounded focus:outline-none">New Contact</button>
            <button className="ml-4 text-gray-600 py-2 text-sm px-3 rounded focus:outline-none border border-gray-400">New Task</button>
            <div className="relative ml-auto flex-1 pl-8 sm:block hidden">
                <input placeholder="Search" type="text" className="w-full border rounded border-gray-400 h-full focus:outline-none pl-4 pr-8 text-gray-700 text-sm text-gray-500" />
                <svg stroke="currentColor" className="w-4 h-4 absolute right-0 top-0 mt-3 mr-2 text-gray-500" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                </svg>
            </div>
            </div> */}
        </div>
    )
}

export default Header;