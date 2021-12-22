import React from 'react'
import { Modal } from "react-bootstrap"

export default function LoginModal({ visible, close, call }) {
    return (
        <div class="row justify-content-md-center instaPost-box">
    
    <div class="col-lg-6">
    <div class="card ">
            <div class="card-header">
                This option is available for premium plane
                {/* Connect your facebook account ! */}
            </div>
            {/* <div class="card-body">
                <h5 class="card-title">Connect your facebook account !</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a
                onClick={call}
                class="btn btn-primary btn-sm"
                >
                    Connect to Facebook
                </a>
            </div> */}
        </div>
    </div>
    
  </div>
  
        
    )
}


{/* <Modal
show={visible}
onHide={() => close()}
closeButton
backdrop="static"
className="affiliate-model"
>
<Modal.Header closeButton>
    <Modal.Title>Connect your facebook account</Modal.Title>
</Modal.Header>
<Modal.Body>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
    <button
    onClick={call}
    className="btn btn-primary mt-3 w-100"
    >
        Connect to Facebook
    </button>
</Modal.Body>
</Modal> */}