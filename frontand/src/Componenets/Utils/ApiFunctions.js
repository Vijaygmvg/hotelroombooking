import axios from 'axios';
import moment from 'moment';

export const api=axios.create({
    baseURL:process.env.REACT_APP_BASEURL
})
export const getHeader=()=>{
    const token=localStorage.getItem("token")
    return {
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
    }

}

export async function addRoom(photo,roomType,roomPrice){
 const formData=new FormData();
 formData.append("photo",photo);
 formData.append("roomType",roomType);
 formData.append("roomPrice",roomPrice);

 const response=await api.post("room/add/new-room",formData)
 console.log(response);
 if(response.status===200)
    return true;
else return false;
}

export async function getRoomTypes(){
    try{
       const response=await api.get("/room/room-types")

       return response.data

    }
    catch(e){
        console.log(e);
        return [];

    }
}

//this function is to fetch    all the rooms from the databse 

export async function getAllRooms(){
    try{
      const result=await api.get("room/all-rooms")
      console.log(result.data)
      return result.data;
    }
    catch(error){
        console.log(error)
        throw new Error("error in fetching rooms ");

    }

    }
    export async function deleteRoom(roomId){
        try{
            const result=await api.delete(`room/delete/room/${roomId}`)
            return result.data

        }
        catch(err){
                 throw new Error(`error in deleteing room ${err.message}`)
        }
    }

    export async function updateRoom(roomId,roomData){
        const formData=new FormData();
        formData.append("roomType",roomData.roomType)
        formData.append("roomPrice",roomData.roomPrice)
        formData.append("photo",roomData.photo)
        try{
        const response=await api.put(`/room/room/update/${roomId}`,formData)
        return response
        }
        catch(err){
            throw new Error("there is error in updation "+err.message)
        }

    }


    //this isthe funcion which is used to fetch the room by the roomId

    export async function getRoomById(roomId){
             try{
                    const result=await api.get(`/room/room/${roomId}`)
                    return result.data
             }
             catch(err){
                  throw new Error("error Fetching room "+err.message)
             }
    }


    /*this is the function book a room it will save new booking in the database */
    export async function bookRoom(roomId,booking){
        try{
               console.log(booking)
               const response=await api.post(`/bookings/room/${roomId}/booking`,booking)
               return response.data;

        }
        catch(err){
            
              if(err.response&&err.response.data){
                throw new Error(err.response.data);
              }
              else{
                throw new Error("Error booking rom :"+err.message)
                
              }

        }
    }


    // this function gewt all bookings from the database 
    export async function getAllBookings(){
        try{

            const result=await api.get("/bookings/all-bookings")
            return result.data;
        }
        catch(err){

           throw new Error("error in fetching  bookings "+err.message)

            }

        }

        //this function get booking by the confirmationCode 
        export async function getBookingByConfirmationCode(confirmationCode){
            try{
               const result=await api.get(`bookings/confirmation/${confirmationCode}`)
                
               return result.data
            }
            catch(err){
                console.log(err)
                if(err.response&&err.response.data){
                  
                    throw new Error(err.response.data)
                }
                else{
                    throw new Error("error find in booking "+err.message)
                }

            }

        }
        


        //this function is used to cancel the booking 
        export async function cancelBooking(bookingId){
            try{
                const result=await api.delete(`/bookings/booking/${bookingId}/delete`)
                return result.data
            }
            catch(err){
                    throw new Error("error in canceling the booking ")
            }
        }

        export async function checkAvailableRooms(checkInDate,checkOutDate,roomType){
            
            try{
                const checkInDate1=moment(checkInDate).format("YYYY-MM-DD").trim()
                const checkOutDate1=moment(checkOutDate).format("YYYY-MM-DD").trim()
                console.log(checkInDate1)
                console.log(checkOutDate1)
                 const result=await api.get(`room/available-rooms`, {
                    params: {
                        checkInDate: checkInDate1,
                        checkOutDate: checkOutDate1,
                        roomType: roomType,
                    },
                })
                console.log(result.data)
                   return result.data
            }
            catch(err){
                if(err.response&&err.response.data){
                    console.log(err.response.data)
                    throw new Error(err.response.data)
                }
                else{
                    console.log(err.message)
                    throw new Error("error occured"+err.message)
                }

            }        
        
        }
    
  export async function registerUser(registration){
    try{

        const response=await api.post("/auth/register-user",registration)
        return response.data
    }
    catch(err){

        if(err.respose&&err.response.data){
            throw new Error(err.response.data)
        }
        else{
          throw new Error("error in registration"+err.message())
        }

    }
  }
  export async function loginUser(login){
    try{

        const response=await api.post("/auth/login",login)
       if(response.status>=200&&response.status<300){
        return response.data
       }
       else{
        return null;
       }
    }
    catch(err){

        console.log(err)
        return null 

    }
  }
//   export async function getUserProfile(userId,token){
//     try{
//         const response=api.fetch(`users/profile/profile/${userId}`,{
//             header:getHeader()

//         })
//         return response.data

//     }
//     catch(err){
//         throw err

//     }
//   }
  export async function deleteUser(userId){
    try{
        const response=await api.delete(`users/delete/${userId}`,{
            headers:getHeader()
        })
        return response.data

    }
    catch(err){
        return err.message

    }
  }
  export async function getUser(userId,token){
     
    try{
        const response=await api.get(`/users/${userId}`,{
            headers:getHeader()
        })
        return response.data

    }
    catch(err){
        throw err

    }
  }
  export async function getBookingByUserId(userId,token){

    try{
          const response=await api.get(`/bookings/user/${userId}/bookings`,{
            headers:getHeader()
        })
        
          if(response.status==404){
            return [];
          }
          else{
            return response.data
          }

    }
    catch(err){
        console.log(err)
        
        throw err;

    }

  }
    
