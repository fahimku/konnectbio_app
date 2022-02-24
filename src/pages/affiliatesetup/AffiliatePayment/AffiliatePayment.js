import React, { useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function AffiliatePayment() {
  const [token, setToken] = useState(null);
  const [submit, setSubmit] = useState(false);

  const stripePromise = loadStripe(
    "pk_test_51KKN8wESMcKchi62cRYwS5o4v1hiIUYZVF4GQRbqcjj8FQ9su5vvWCq1sSbN11MDmBB3LIOCG36oXygjVq2S0GMT00t9ASYQfK"
  );

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async () => {
      // Block native form submission.

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);

      // Use your card Element with other Stripe.js APIs

      const result = await stripe.createToken(cardElement);
      setSubmit(true);
      if (result.error) {
        console.log("[error]", result.error);
        toast.error(result.error.message);
      } else {
        // console.log("[PaymentMethod]", result.token.id);
        console.log("[PaymentMethod]", result);
        stripeTokenHandler(result.token);
      }
    };
    function stripeTokenHandler(token) {
      const paymentData = { token: token.id };

      const response = fetch("/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      // Return and display the result of the charge.
      console.log(response, "response");
      // return response.json();
    }
    const options = {
      iconStyle: "solid",
      hidePostalCode: true,
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    };

    return (
      <>
        <div className="stripe-form-field">
          <CardElement options={options} />
        </div>
        <button
          disabled={!stripe}
          onClick={handleSubmit}
          className="btn btn-primary btn-block"
        >
          Make Payment
        </button>
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">Payment Method</h4>
        <div className="brand_container_main container aff-payment">
          <Row>
            <div className="col-md-4">
              <div className="stripe-card conn-set-inner">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AffiliatePayment;

// import React, { useState } from "react";
// import { Row } from "react-bootstrap";
// import { toast } from "react-toastify";
// import {
//   Elements,
//   CardElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51KKN8wESMcKchi62cRYwS5o4v1hiIUYZVF4GQRbqcjj8FQ9su5vvWCq1sSbN11MDmBB3LIOCG36oXygjVq2S0GMT00t9ASYQfK"
// );

// function AffiliatePayment() {
//   const [key, setKey] = useState("");

//   const handleSubmit = (stripe, elements) => async () => {
//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       console.log("[error]", error);
//       toast.error(error.message);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//       toast.success("Success Payment");
//       // ... SEND to your API server to process payment intent
//     }
//   };
//   const options = {
//     iconStyle: "solid",
//     hidePostalCode: true,
//     style: {
//       base: {
//         color: "#424770",
//         letterSpacing: "0.025em",
//         fontFamily: "Source Code Pro, monospace",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#9e2146",
//       },
//     },
//   };

//   const PaymentForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     return (
//       <>
//         <h4>Card Details</h4>
//         <CardElement
//           hidePostalCode={false}
//           className="sr-input sr-card-element"
//           options={options}
//         />
//         <button
//           onClick={handleSubmit(stripe, elements)}
//           className="btn btn-primary btn-block mt-3"
//         >
//           Make Payment
//         </button>
//       </>
//     );
//   };

//   return (
//     <React.Fragment>
//       <div className="container-fluid">
//         <h4 className="page-title">Payment Method</h4>
//         <div className="brand_container_main container aff-payment">
//           <Row>
//             <div className="col-md-4">
//               <div className="stripe-card conn-set-inner">
//                 <Elements stripe={stripePromise}>
//                   <PaymentForm />
//                 </Elements>
//               </div>
//             </div>
//           </Row>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }
// export default AffiliatePayment;
