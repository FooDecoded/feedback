import React from 'react'

export default function Modal(props){
    let {showModal, toggleModal, headerText} = props;
    return (
    // <div className={`modal${showModal ? "modal-active" : ""}`}>
    //     <div className="modal-content">
    //         <span onClick={toggleModal} className="close">&times;</span>
    //         <p>Some text in the Modal..</p>
    //         {props.children}
    //     </div>
    // </div>
        <div className={`modale ${showModal ? "opened" : ""}`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-header">
                    <h2>{headerText}</h2>
                    <i onClick={toggleModal} className="fa fa-times close-modal" aria-hidden="true"></i>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
    </div>
    )
}

