import { useState } from "react";

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

export default DarkModeButton;