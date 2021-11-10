import React from "react";
import { Button } from "react-bootstrap";

const PaymentButton = (props) => {
  const userId = props.userId;
  const packageId = props.packageId;

  if (props.paymentMethod === "Micro Influencer" && props.plan === "Monthly")
    return (
      <>
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="micro_influencer_form_monthly"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input
            type="hidden"
            name="x_recurring_payment_type"
            value={props.plan}
          />
          <input type="hidden" name="x_recurring_billing" value="TRUE" />
          <input name="x_recurring_billing_amount" value="10" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-66-1635196"
            type="hidden"
          />
          <input
            type="hidden"
            name="x_login"
            value="WSP-KONNE-j&amp;AXMgDiJw"
          />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16360932572458729698"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-597b90255badd0b17fa5c5dc4fc1ca610e4977ca"
          />
          <input type="hidden" name="x_amount" value="10" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input
            type="hidden"
            name="button_code"
            value="Pay Now Micro Influencer"
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
  else if (
    props.paymentMethod === "Micro Influencer" &&
    props.plan === "Yearly"
  )
    return (
      <>
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="micro_influencer_form_yearly"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input
            type="hidden"
            name="x_recurring_payment_type"
            value={props.plan}
          />
          <input type="hidden" name="x_recurring_billing" value="TRUE" />
          <input name="x_recurring_billing_amount" value="96" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-4-1635197"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-PsjK0gDiRA" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16360933072217852277"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-3b2c1b6bd72fe4f5aa52097adf8279ce0de6f80f"
          />
          <input type="hidden" name="x_amount" value="96" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input
            type="hidden"
            name="button_code"
            value="Pay Now Micro Influencer"
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
        {/* <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="influencer_monthly_form"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input
            type="hidden"
            name="x_recurring_payment_type"
            value={props.plan}
          />

          <input type="hidden" name="x_recurring_billing" value="TRUE" />
          <input name="x_recurring_billing_amount" value="25" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-66-1635196"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-A4sMaADiRQ" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16360934351335682202"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-46df6738dd859aebe5580e85564fef3d49d59221"
          />
          <input type="hidden" name="x_amount" value="25" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input type="hidden" name="button_code" value="Pay Now Influencer" />
        </form> */}
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="influencer_monthly_form"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input
            type="hidden"
            name="x_recurring_payment_type"
            value={props.plan}
          />
          <input type="hidden" name="x_recurring_billing" value="TRUE" />
          <input name="x_recurring_billing_amount" value="10" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-66-1635196"
            type="hidden"
          />
          <input
            type="hidden"
            name="x_login"
            value="WSP-KONNE-j&amp;AXMgDiJw"
          />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16360932572458729698"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-597b90255badd0b17fa5c5dc4fc1ca610e4977ca"
          />
          <input type="hidden" name="x_amount" value="10" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input
            type="hidden"
            name="button_code"
            value="Pay Now Micro Influencer"
          />
        </form>
        <Button
          onClick={() => {
            document.getElementById("influencer_monthly_form").submit();
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
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="influencer_yearly_form"
          method="post"
        >
          <input type="hidden" name="x_user_id" value={userId} />
          <input type="hidden" name="x_package_id" value={packageId} />
          <input
            type="hidden"
            name="x_recurring_payment_type"
            value={props.plan}
          />
          <input type="hidden" name="x_recurring_billing" value="TRUE" />
          <input name="x_recurring_billing_amount" value="96" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-4-1635197"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-PsjK0gDiRA" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16360933072217852277"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-3b2c1b6bd72fe4f5aa52097adf8279ce0de6f80f"
          />
          <input type="hidden" name="x_amount" value="96" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input
            type="hidden"
            name="button_code"
            value="Pay Now Micro Influencer"
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
  else return "";
};
export { PaymentButton };
