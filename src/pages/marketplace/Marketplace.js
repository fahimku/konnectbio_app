import React, { useEffect } from "react";
import s from "./Marketplace.module.scss";
import { Col, Row } from "react-bootstrap";
import { createBrowserHistory } from "history";
import Box from "./Box";
import { connect } from "react-redux";
import * as markActions from "../../actions/marketPlace"

export const history = createBrowserHistory({
  forceRefresh: true,
});

function Marketplace({getMarketPlace,marketPlace}){

  useEffect(()=>{
    getMarketPlace()
  },[])

  return(
    <div>
        <div className="marketplace-page mt-4">
        <div className="container-fluid">
          <h4 class="page-title">Marketplace</h4>
          <Box/>
        </div>
      </div>
    </div>
  )
}



function mapStateToProps({marketPlace}){
  return {marketPlace}
}
export default connect(mapStateToProps,markActions)(Marketplace);


// class Marketplace extends React.Component {
//   constructor(props) {

//     super(props);

//     this.state = {
//       username: username,
//     };
//   }

//   render() {
//     return (
//       <div className="marketplace-page mt-4">
//         <div className="container-fluid">
//           <h4 class="page-title">Marketplace</h4>
//           <Box/>
//         </div>
//       </div>
//     );
//   }
// }
