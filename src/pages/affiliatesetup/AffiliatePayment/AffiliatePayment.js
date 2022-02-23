import React, { useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

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
    "pk_test_51HdnA0CzoXTs4pdTKGKwgQdbqjBXHpbBZu5E3Xxws4rV2h20K6rYUjVog6hkCywV1qc8kdC4twoydJrYB2bLh6NF00yaSGchxC"
  );
  const appearance = {
    theme: "stripe",
  };

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
      } else {
        console.log("[PaymentMethod]", result.token.id);
      }
    };

    return (
      <>
        <div className="stripe-form-field">
          <CardElement hidePostalCode={true} />
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
