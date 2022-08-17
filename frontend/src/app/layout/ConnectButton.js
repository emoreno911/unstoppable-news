import { useEffect } from "react"
import { useMoralis } from "react-moralis"


export default function ConnectButton() {
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } = useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
                // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return (
        <div className="flex flex-row">
            {account ? (
                <div title={account} className="uppercase bg-indigo-100 text-indigo-400 h-8 flex items-center justify-center rounded px-3 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        {account.slice(0, 6)}...{account.slice(account.length - 4)}
                    </span>
                </div>
            ) : (
                <button
                    onClick={async () => {
                        // await walletModal.connect()
                        await enableWeb3()
                        // depends on what button they picked
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                            // window.localStorage.setItem("connected", "walletconnect")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                    className="uppercase bg-indigo-100 text-indigo-400 h-8 flex items-center justify-center rounded px-3 ml-2"
                >
                    Connect
                </button>
            )}
        </div>
    )
}