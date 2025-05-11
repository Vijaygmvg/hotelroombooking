import React from 'react'
import { useState } from 'react'
import RoomCard from '../Room/RoomCard'
import RoomPaginator from '../Common/RoomPaginator'

export default function RoomSearchResult({results,onClearSearch}) {
    const[currentPage,setCurrentPage]=useState(1)
    const[resultsPerPage]=useState(3)
    const totalResults=results.length 
    const totalPages=Math.ceil(totalResults/resultsPerPage)

    const handlePageChange=(pageNumber)=>{
          setCurrentPage(pageNumber)
    
    }
    const startIndex=(currentPage-1)*resultsPerPage
    const endIndex=startIndex+resultsPerPage
    const paginatedResult=results.slice(startIndex,endIndex)


  return (
    <div>
      {results.length>0?(
        <>
        <h5 className="text-center"> Search Result </h5>
        <div className="flex flex-col ">
          <div>
          {paginatedResult.map((room)=>(
            <RoomCard kay={room.id} room={room}/>
          ))}
          </div>
          </div>
          <div>
            <div>
            {totalResults>resultsPerPage&&(
              <RoomPaginator currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}/>
            )}
            </div>
            <button varient="secondary" onCLick={onClearSearch}>
      clear search 
     </button>
          </div>
          </>
      ):<p></p>}
    
    </div>
  )
}
