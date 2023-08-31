export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                <div className="flex gap-4">
                    <p className="text-gray-600" >{`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 5)}`}</p>
                    <img src="/copy.png" alt="copy" className="w-5 h-5 cursor-pointer" onClick={
                        () => { navigator.clipboard.writeText(nft.contract.address) }
                    }/>
                </div>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
            </div>
            <div className="flex justify-center my-1">
                <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-4 bg-red-500 w-[80%] text-center rounded-m text-white cursor-pointer">View on etherscan</a>
            </div>
        </div>

    </div>
    )
}