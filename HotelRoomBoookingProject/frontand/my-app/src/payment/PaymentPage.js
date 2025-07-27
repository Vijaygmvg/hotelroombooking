import React from 'react'
import LoadRazorpay from './PaymentFunction'

function PaymentPage() {
    const handlepayment=async function(){
        try{
       const res=await LoadRazorpay()
       console.log(res)
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div>

        <div><button className='bg-green-300 mx-auto text-black h-[10vh] w-[20vw]' onClick={handlepayment}>
            proceed payment
            </button></div>
    </div>
  )
}

export default PaymentPage