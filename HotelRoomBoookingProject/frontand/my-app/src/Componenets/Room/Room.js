import React from 'react'
import { useState,useEffect } from 'react';
import { getAllRooms } from '../Utils/ApiFunctions';
import RoomCard from './RoomCard';
import RoomFilter from '../Common/RoomFilter';
import RoomPaginator from '../Common/RoomPaginator';
function Room() {

    const [data,setData]=useState([]);
    const [error,setError]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [roomsPerPage]=useState(6)
    const [filterdData,setFilterdData]=useState([])
    useEffect(()=>{
            setIsLoading(true)
            getAllRooms().then((data1)=>{
                
                setData(data1)
                setFilterdData(data1)
                
                
                
                setIsLoading(false)
            }).catch((err)=>{
                console.log(err.message)
                setIsLoading(false)
                setError(err.message)
    })
    },[])
    useEffect(()=>{
        console.log(data)
    },[data])
    if(isLoading){
        return<div>it is loading </div>
    }
    if(error){
        return<div>Eroor : {error}</div>
    }
    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber)

    }
    const totalPage=Math.ceil(filterdData.length/roomsPerPage)
    const renderRooms=()=>{
        const startIndex=(currentPage-1)*roomsPerPage
        const endIndex=startIndex+roomsPerPage
        console.log(filterdData.slice(startIndex,endIndex))
        return filterdData.slice(startIndex,endIndex).map((room)=>(
        
           
        <RoomCard key={room.id} room={room}/>

        ))
        

    }

  return (
    <div>


        <div>
        <RoomFilter data={data} setFilteredData={setFilterdData}/>
        </div>
        <div>
            <RoomPaginator currentPage={currentPage} totalPages = {totalPage} onPageChange={handlePageChange}/>
        </div>
        <div>
            {renderRooms()}
        </div>
        <div>
            <RoomPaginator currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange}/>
        </div>

    </div>
  )
}

export default Room