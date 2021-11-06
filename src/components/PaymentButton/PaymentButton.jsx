import React from "react";
import {Button} from "react-bootstrap";

const PaymentButton = (props) => {
  const userId = props.userId;
  const packageId = props.packageId;

  if (props.paymentMethod === "Micro Influencer" && props.plan === "Monthly")
    return (
      <>
        <form
          action="https://demo.globalgatewaye4.firstdata.com/pay"
          id="micro_influencer_form_monthly"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input type="hidden" name="x_login" value="WSP-ADM-D-DAwMRwCArg" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="1636096318295562651"
          />
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
            document.getElementById("micro_influencer_form_monthly").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );

  else if (props.paymentMethod === "Micro Influencer" && props.plan === "Yearly")
    return (
      <>
        <form
          action="https://demo.globalgatewaye4.firstdata.com/pay"
          id="micro_influencer_form_yearly"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input type="hidden" name="x_login" value="WSP-ADM-D-DAwMRwCArg" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16362069291731848312"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-db26d195390c07e3c9dba80f59b66c206a034cce"
          />
          <input type="hidden" name="x_amount" value="96" />
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
            document.getElementById("micro_influencer_form_yearly").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );
  else if (props.paymentMethod === "Influencer" && props.plan === "Monthly")
    return (
      <>
        <form
          action="https://demo.globalgatewaye4.firstdata.com/pay"
          id="pay_now_form_9b6937f3b6"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input type="hidden" name="x_login" value="WSP-ADM-D-DAwMRwCArg" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16362069852407135726"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-f22c04df051c5efdcd602dea180bda9024ddd320"
          />
          <input type="hidden" name="x_amount" value="25" />
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
            document.getElementById("pay_now_form_9b6937f3b6").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );
  else if (props.paymentMethod === "Influencer" && props.plan === "Yearly")
    return (
      <>
        <form
          action="https://demo.globalgatewaye4.firstdata.com/pay"
          id="influencer_yearly_form"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input type="hidden" name="x_login" value="WSP-ADM-D-DAwMRwCArg" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16362088123952108431"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-7db3a69570641487f5e2fdcb4d4a811e31273c06"
          />
          <input type="hidden" name="x_amount" value="240" />
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
            document.getElementById("influencer_yearly_form").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );
  else return ('');
};
export {PaymentButton};