import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import CloseOutlined from "../../assets/icons/close-outlined.svg";

const Modal = ({ title, children, footer, isOpen, closeModal, confirm }) => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    setBodyHeight(bodyRef.current.scrollHeight);
  });

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();

      if (event.key === "Escape") {
        closeModal();
      }
    });
  });

  useEffect(() => {
    document.addEventListener(
      "click",
      (event) => {
        if (event.target.matches(".modal")) {
          closeModal();
        }
      },
      false
    );
  });

  return (
    <div
      className="modal"
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <div className="modal-container">
        <div className="modal-header">
          {title}
          <button className="button-close-modal" onClick={closeModal}>
            <img src={CloseOutlined} alt="close" />
          </button>
        </div>
        <div
          className="modal-body"
          style={{ overflowY: bodyHeight > 300 ? "auto" : "hidden" }}
          ref={bodyRef}
        >
          {children}
        </div>
        <div className="modal-footer">
          {footer ? (
            footer
          ) : (
            <button
              className="footer-button approve-button"
              onClick={() => confirm(true)}
            >
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
