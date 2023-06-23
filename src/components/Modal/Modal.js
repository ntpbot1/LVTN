import { Button } from "react-bootstrap";
import { useState } from "react";
function Modal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <ToggleButtonGroup
                className="w-100"
                type="radio"
                name="sdasd"
                defaultValue={type ? 1 : 2}
                onChange={handleType}
              >
                <ToggleButton
                  id="11"
                  value={1}
                  variant="light"
                  className="w-50"
                >
                  Nhà đất bán
                </ToggleButton>

                <ToggleButton
                  id="12"
                  value={2}
                  variant="light"
                  className="w-50"
                >
                  Nhà đất cho thuê
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Thoát
          </Button>
          <Button variant="primary">Sửa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modal;
