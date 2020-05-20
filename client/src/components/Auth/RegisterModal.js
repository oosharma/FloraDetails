import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "bootstrap-4-react";

export default class RegisterModal extends Component {
  render() {
    return (
      <div>
        {/* Button trigger Modal */}
        <Button primary data-toggle="modal" data-target="#exampleModal">
          Launch modal
        </Button>

        {/* Modal */}
        <Modal id="exampleModal" fade>
          <Modal.Dialog>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
                <Modal.Close>
                  <span aria-hidden="true">&times;</span>
                </Modal.Close>
              </Modal.Header>
              <Modal.Body>Modal body text goes here.</Modal.Body>
              <Modal.Footer>
                <Button secondary data-dismiss="modal">
                  Close
                </Button>
                <Button primary>Save changes</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  }
}
export default { RegisterModal };
