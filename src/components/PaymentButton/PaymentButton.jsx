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
  else if (props.paymentMethod === "Business" && props.plan === "Monthly")
    return (
      <>
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="business_monthly_form"
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
          <input name="x_recurring_billing_amount" value="250" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-66-1635196"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-b3XpvADicw" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16367013122040926962"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-32b74ccb36a303611f908bc9af0741b2c37eb060"
          />
          <input type="hidden" name="x_amount" value="250" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input type="hidden" name="button_code" value="Pay Now Business" />
        </form>
        <Button
          onClick={() => {
            document.getElementById("business_monthly_form").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );
  else if (props.paymentMethod === "Business" && props.plan === "Yearly")
    return (
      <>
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="business_yearly_form"
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
          <input name="x_recurring_billing_amount" value="2400" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-4-1635197"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-WvNkbwDidA" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16367017143994275992"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-b2a6e900e0eb00006ffe1939fad9c613886d63b6"
          />
          <input type="hidden" name="x_amount" value="2400" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input type="hidden" name="button_code" value="Pay Now Business" />
        </form>
        <Button
          onClick={() => {
            document.getElementById("business_yearly_form").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );
  else if (props.paymentMethod === "Business Plus" && props.plan === "Monthly")
    return (
      <>
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="business_plus_monthly_form"
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
          <input name="x_recurring_billing_amount" value="1000" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-66-1635196"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-xHt90wDidQ" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="16367017703705857302"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-e3406647d27be9c18aacb93e8496e73c3c89357f"
          />
          <input type="hidden" name="x_amount" value="1000" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input
            type="hidden"
            name="button_code"
            value="Pay Now Business Plus"
          />
        </form>
        <Button
          onClick={() => {
            document.getElementById("business_plus_monthly_form").submit();
          }}
          variant={props.variant ? props.variant : "primary"}
        >
          {props.name ? props.name : "Make Payment"}
        </Button>
      </>
    );
  else if (props.paymentMethod === "Business Plus" && props.plan === "Yearly")
    return (
      <>
        <form
          action="https://checkout.globalgatewaye4.firstdata.com/pay"
          id="business_plus_yearly_form"
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
          <input name="x_recurring_billing_amount" value="9600" type="hidden" />
          <input
            name="x_recurring_billing_id"
            value="MB-KONNE-4-1635197"
            type="hidden"
          />
          <input type="hidden" name="x_login" value="WSP-KONNE-R2KueQDidg" />
          <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
          <input
            type="hidden"
            name="x_fp_sequence"
            value="1636701860747350271"
          />
          <input
            type="hidden"
            name="x_fp_hash"
            value="PNB-1.0-a7d6d815f858b0014116b358528da5b5d0dff29a"
          />
          <input type="hidden" name="x_amount" value="9600" />
          <input type="hidden" name="x_currency_code" value="USD" />
          <input type="hidden" name="x_test_request" value="FALSE" />
          <input type="hidden" name="x_relay_response" value="" />
          <input type="hidden" name="donation_prompt" value="" />
          <input
            type="hidden"
            name="button_code"
            value="Pay Now Business Plus"
          />
        </form>
        <Button
          onClick={() => {
            document.getElementById("business_plus_yearly_form").submit();
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
