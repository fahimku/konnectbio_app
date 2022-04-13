import React, { useState, useEffect } from "react";
import { Col, Row,Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import * as brandActions from "../../../actions/brands";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { ConstructionOutlined } from "@mui/icons-material";

export const history = createBrowserHistory({
    forceRefresh: true,
  });


  let categories = [];
function ModalCategories(
  props,
  { getCatbrands,
    categoryById }
) {
    
        const [loading, setLoading] =  useState(true);
        const [cat_modal, setCat_model] = useState(false);
        const [parent_id, setParent_id] = useState(props.catData.value); 
        const [flag, setFlag] = useState(false);
  
  useEffect(() => {
    
    if(props.catData){
        props.getCatbrands(parent_id).then((res) =>{
        setLoading(false);
    })
    
   
}
  }, [props.catData]);
console.log(parent_id,"---------------")

  const categoryToggleModal = () => {
    
    setCat_model(!cat_modal)
    setFlag(true)
    
  };
let data = props?.categoryById;
//  const  categoryModal = () => {
//   let data = props?.categoryById;
//     if (data) {

//     return (
       
//       <Modal
//         show={cat_modal}
//         onHide={categoryToggleModal}
//         className="categories-modal"
        
//         centered
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           {/* <Modal.Title>Edit Custom Category</Modal.Title> */}
//         </Modal.Header>
//         {/* <form onSubmit={this.onSubmitting}> */}
//         <div className="mb-3">
//           <Col md={12} className="text-center">
//             <div className="fileinput file-profile">
//               <input
//                 accept=".jpg, .jpeg, .png, .webp, .svg"
//                // onChange={(e) => onChangeInputImage(e)}
//                 id="fileupload2"
//                 type="file"
//                 name="file"
//                 className="d-none"
//               />

//               <div className="fileinput-new thumbnail">
//                {loading? 
//                <Loader size="30" />
//                :
//                     <>
//                 {data.map((item, i) =>{
//                   return(
//                   <img
//                     alt="profile-icon"
//                     src={item?.profile_image_url}
//                     style={{ width: "100px", height: "100px" }}
//                     className="img-fluid"
//                   />
//                   )
//                 })
//               }
//               </>
              
//             }
//               </div>
               
//             </div>
//           </Col>
//         </div>
       

//       <div className="mb-3">
//           <Col md={12} className="update-col">
           
//           </Col>
//         </div>
        
//       <div className="mb-3">
//           <Col md={12} className="update-col">
           
//           </Col>
//         </div>
        
//       <div className="mb-3">
//           <Col md={12} className="update-col">
           
//           </Col>
//         </div>
//         <div className="mb-3">
//           <Col md={12} className="update-col">
           
//           </Col>
//         </div>
        
//       <div className="mb-3">
//           <Col md={12} className="update-col">
           
//           </Col>
//         </div>
        
//       <div className="mb-3">
//           <Col md={12} className="update-col">
           
//           </Col>
//         </div>

//       </Modal>
//     );
        
//           }
//   };


    return (

      <div className="fileinput-new thumbnail">
      {loading? 
      <Loader size="30" />
      :
           <>
       {data.map((item, i) =>{
         return(
         <img
           alt="profile-icon"
           src={item?.profile_image_url}
           style={{ width: "100px", height: "100px" }}
           className="img-fluid"
         />
         )
       })
     }
     </>
     
   }
     </div>
      // <>
       
      //   <button
      //    type="disable"
      //     onClick={categoryToggleModal}
          
      //     title="Edit"
      //   ></button>
      //   {categoryModal()}
      // </>
    );
    }  
function mapStateToProps({  getCatbrands,categoryById }) {
  return {  getCatbrands,categoryById };
}
export default connect(mapStateToProps, {
  ...brandActions,
  
})(ModalCategories);
