import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import * as affiliateDepositActions from "../../../actions/affiliateDeposit";
import Loader from "../../../components/Loader/Loader";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
import {
  useStripe,
  ElementsConsumer,
  CardElement,
  useElements,
  Elements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";



function AffiliateDeposit({makePayment,affiliatePayment}) {
  const [showCard, setShowCard] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    setPaymentLoading(true);
    makePayment().then((res) => {
      setPaymentLoading(false);
    });
  }, []);

  // const stripePromise = loadStripe(
  //   "pk_test_51KKN8wESMcKchi62cRYwS5o4v1hiIUYZVF4GQRbqcjj8FQ9su5vvWCq1sSbN11MDmBB3LIOCG36oXygjVq2S0GMT00t9ASYQfK"
  // );
  // const stripePromise = loadStripe("");
  // const options = {
  //   iconStyle: "solid",
  //   hidePostalCode: true,
  //   style: {
  //     base: {
  //       color: "#424770",
  //       letterSpacing: "0.025em",
  //       fontFamily: "Source Code Pro, monospace",
  //       "::placeholder": {
  //         color: "#aab7c4",
  //       },
  //     },
  //     invalid: {
  //       color: "#9e2146",
  //     },
  //   },
  // };

  const paymentMethod = () => { 
  
    if(affiliatePayment?.success == true){
      let data = affiliatePayment?.message;   
      window.open(data,"_self")
    }
    else{
      
    }
  }
  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();

      // const { stripe, elements } = this.props;
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardNumberElement);
      const result = await stripe.createToken(card);
      if (result.error) {
        console.log(result.error.message);
        toast.error(result.error.message);
      } else {
        console.log(result.token);
        toast.success("Successfully");
      }
    };
    return (
      <div>
        {/* <div class="product-info">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h4 className="product-price">$999</h4>
        </div> */}
        <form onSubmit={handleSubmit}>
          <label className="col-md-12">
            Card number
            <CardNumberElement
              // options={options}
              // onReady={() => {
              //   console.log("CardNumberElement [ready]");
              // }}
              // onChange={(event) => {
              //   console.log("CardNumberElement [change]", event);
              //   setError(event.complete ? true : false);
              // }}
              // onBlur={() => {
              //   console.log("CardNumberElement [blur]");
              // }}
              // onFocus={() => {
              //   console.log("CardNumberElement [focus]");
              // }}
              // className="form-control"
            />
          </label>
          <label className="col-md-12">
            Expiration date
            <CardExpiryElement
              // options={options}
              // onReady={() => {
              //   console.log("CardNumberElement [ready]");
              // }}
              // onChange={(event) => {
              //   console.log("CardNumberElement [change]", event);
              // }}
              // onBlur={() => {
              //   console.log("CardNumberElement [blur]");
              // }}
              // onFocus={() => {
              //   console.log("CardNumberElement [focus]");
              // }}
              // className="form-control"
            />
          </label>
          <label className="col-md-12">
            CVC
            <CardCvcElement
              // options={options}
              // onReady={() => {
              //   console.log("CardNumberElement [ready]");
              // }}
              // onChange={(event) => {
              //   console.log("CardNumberElement [change]", event);
              // }}
              // onBlur={() => {
              //   console.log("CardNumberElement [blur]");
              // }}
              // onFocus={() => {
              //   console.log("CardNumberElement [focus]");
              // }}
              // className="form-control"
            />
          </label>
          {/* <label className="col-md-12 text-danger">{error}</label> */}
          <label className="col-md-12">
            <button
              type="submit"
              disabled={!stripe}
              className="btn btn-block btn-primary mt-2"
            >
              Save
            </button>
          </label>
          {/* <CardElement />
          <button disabled={!stripe} className="btn-pay">
            Save
          </button> */}
        </form>
      </div>
    );
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#303238",
        fontSize: "16px",
        fontFamily: "sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  };
  return (
    <React.Fragment>
      {paymentLoading ?  <Loader /> :
      
      <div className="affiliate-wallet">
        <h5>Deposit Amount</h5>
        <p>Make a deposit amount</p>
        <button
          className="btn btn-primary btn-block"
          onClick={() => paymentMethod()}
        >
          Make Deposit
        </button>
      </div>
      }

      {/* <Modal
        className="addbio-modal"
        show={showCard}
        onHide={() => setShowCard(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body> */}
          {/* <ElementsConsumer stripe={stripePromise}>
            {({ stripe, elements }) => (
              <CheckoutForm stripe={stripe} elements={elements} />
            )}
          </ElementsConsumer> */}
          {/* <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Modal.Body>
      </Modal> */}
    </React.Fragment>
  );
}

function mapStateToProps({ affiliatePayment }) {
  return {
    affiliatePayment
    
  };
}

export default connect(mapStateToProps, { ...affiliateDepositActions })(
  AffiliateDeposit
);

