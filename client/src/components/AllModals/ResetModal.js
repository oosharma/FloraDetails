import { Nav, Form, Button, Alert } from "bootstrap-4-react";
import React from "react";
import Modal from "react-bootstrap4-modal";

function ResetModal(props) {
  return (
    <>
      <Modal visible={props.visible} onClickBackdrop={props.toggleResetModal()}>
        <div className="modal-header">
          <h5 className="modal-title">Reset Password</h5>
        </div>
        <div className="modal-body">
          {props.passError && props.passError.msg && (
            <>
              {props.passError.id === "RESET_FAIL_FINAL" ? (
                <Alert danger>
                  {" "}
                  <p>{props.passError.msg.msg}</p>{" "}
                </Alert>
              ) : (
                <></>
              )}
            </>
          )}
          {props.passResetSuccess ? (
            <>
              <Alert primary>
                {" "}
                <p>Password successfully reset</p>{" "}
              </Alert>
              <a onClick={props.handlePassResetSuccessLogin()} href="#">
                Login
              </a>{" "}
            </>
          ) : (
            <>
              <Form>
                <Form.Group>
                  <label htmlFor="resetPass">Password</label>
                  <Form.Input
                    type="password"
                    id="resetPass"
                    name="resetPass"
                    placeholder="Password"
                    value={props.resetPass}
                    //  onChange={props.onChange()}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </div>
        <div className="modal-footer">
          <Button secondary onClick={props.toggleResetModal()}>
            Close
          </Button>
          {props.passResetSuccess ? (
            <></>
          ) : (
            <>
              <Button primary onClick={props.onResetSubmit()}>
                Submit
              </Button>
            </>
          )}
        </div>
      </Modal>
      ;
    </>
  );
}

export default ResetModal;
