import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="h-screen relative">
            <div className="flex w-full h-full overflow-hidden flex-row shadow-2xl">
                <div className="w-full flex flex-col bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
                    <Header />
                    <div className="overflow-auto flex-grow w-full">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;