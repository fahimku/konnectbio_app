import React, { useState } from "react";
import { Button } from "react-bootstrap";

const PaymentButton = (props) => {
  const [userId] = useState(props.userId);
  const [packageId] = useState(props.packageId);
  return (
    <>
      <form
        action="https://demo.globalgatewaye4.firstdata.com/pay"
        id="pay_now_form_ffaab401e0"
        method="post"
      >
        <input type="hidden" name="x_user_id" value={userId} />
        <input type="hidden" name="x_package_id" value={packageId} />
        <input type="hidden" name="x_login" value="WSP-ADM-D-DAwMRwCArg" />
        <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
        <input type="hidden" name="x_fp_sequence" value="1636096318295562651" />
        <input
          type="hidden"
          name="x_fp_hash"
          value="PNB-1.0-2dd1b83fafe52f772268a681945cee554e82e57e"
        />
        <input type="hidden" name="x_amount" value="10" />
        <input type="hidden" name="x_currency_code" value="USD" />
        <input type="hidden" name="x_test_request" value="TRUE" />
        <input type="hidden" name="x_relay_response" value="" />
        <input type="hidden" name="donation_prompt" value="" />
        <input
          type="hidden"
          name="button_code"
          value="Pay Now Influencer Demo Account"
        />
      </form>
      <Button
        onClick={() => {
          document.getElementById("pay_now_form_ffaab401e0").submit();
        }}
        variant={props.variant ? props.variant : "primary"}
      >
        {props.name ? props.name : "Make Payment"}
      </Button>
    </>
  );
};

export { PaymentButton };
