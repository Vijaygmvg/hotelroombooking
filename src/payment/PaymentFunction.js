import axios from 'axios';
import { bookRoom } from '../Componenets/Utils/ApiFunctions';


const LoadRazorpay = async (roomId,booking,navigate,totalPay) => {

  const amount = totalPay; // ₹500
  try{

  const { data } = await axios.post('http://localhost:8090/api/payments/create-order', { amount });

   console.log(data)
  const options = {
    key: "rzp_test_oBgUtxsvAxDzqB",
    amount: data.amount,
    currency: "INR",
    name: "Your Company",
    description: "Test Transaction",
    order_id: data.id,
    handler: async function (response) {
      const verify = {
        orderId: data.id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        amount: data.amount / 100
      };
   
      const result = await axios.post("http://localhost:8090/api/payments/verify", verify);
      if(result.status===200){
         alert("payment successfull")
         console.log(result.data)
         const confirmationCode=await bookRoom(roomId,booking,result.data.paymentId)
         alert("the booking is cofirmed then checkk you email for the cofirmation message ")
           navigate("/booking-success",{state:{message:confirmationCode}})

      }
      else{
        alert("payment is cancelled ")
      }
    },
    prefill: {
      name: "John Doe",
      email: "john@example.com",
      contact: "8088854774"
    },
    theme: {
      color: "#3399cc"
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  
}
catch(error){
  alert(error.message)
  throw error
  
}
  
};
export default LoadRazorpay
