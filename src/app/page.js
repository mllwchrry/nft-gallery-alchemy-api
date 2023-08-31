"use client";

import { useEffect, useMemo, useState } from 'react'
import {NFTCard} from "./components/nftCard"

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageKeys, setPageKeys] = useState(['0'])
  const [areMorePages, setAreMorePages] = useState(true)
  const pageSize = 18
  

  const fetchNFTs = async() => {
    let nfts; 
    const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    if (!collection.length) {
      var requestOptions = {
        method: 'GET'
      };
     
      const fetchURL = `${baseURL}?owner=${wallet}&pageSize=${pageSize}&pageKey=${pageKeys[currentPage - 1]}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&pageSize=${pageSize}&pageKey=${pageKeys[currentPage - 1]}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
      if (!pageKeys.includes(nfts.pageKey))
        setPageKeys([...pageKeys, nfts.pageKey])
      
      setAreMorePages(nfts.pageKey)
    }
  }


  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&pageSize=${pageSize}&pageKey=${pageKeys[currentPage - 1]}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        setNFTs(nfts.nfts)
        if (!pageKeys.includes(nfts.pageKey))
          setPageKeys([...pageKeys, nfts.pageKey])

        setAreMorePages(nfts.pageKey)
      }
    }
  }

  useEffect(() => {
    if (fetchForCollection) {
      fetchNFTsForCollection()
    } else fetchNFTs()
    window.scrollTo(0, 0);
  }, [currentPage])

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection}  className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-red-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setWalletAddress(e.target.value); setCurrentPage(1)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-red-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setCollectionAddress(e.target.value); setCurrentPage(1)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-red-500 text-white bg-red-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            setCurrentPage(1)
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }
        }>Let's go! </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length ? NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          }) : '...'
        }
      </div>
      <div className={`flex gap-5 items-center mt-8 ${NFTs.length ? 'flex' : 'hidden'}`}>
        <button className={`text-white bg-red-500 p-3 rounded-full ${currentPage == 1 ? 'hidden' : 'block'}`}><img src='/next.png' alt='next page' className='w-5 rotate-180' onClick={() => setCurrentPage(currentPage - 1)}/></button>
        <p className={`text-gray-600 text-lg ${areMorePages ? 'block' : 'hidden'}`}>{ currentPage }</p>
        <button className={`text-white bg-red-500 p-3 rounded-full ${areMorePages ? 'block' : 'hidden'}`}><img src='/next.png' alt='next page' className='w-5' onClick={() => setCurrentPage(currentPage + 1)}/></button>
      </div>
    </div>
  )
}

export default Home