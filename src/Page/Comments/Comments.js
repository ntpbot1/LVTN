import { Row, Col, Image, Form, Button } from "react-bootstrap";
import "./Comments.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Comments(props) {
  const [comment, setComment] = useState();
  const [reply, setReply] = useState();
  const [clickReply, setClickReply] = useState({ index: null, value: false });
  const handleClickReply = (index) => {
    console.log(index);
    if (clickReply.value) {
      setClickReply({
        ...clickReply,
        index: index,
        value: false,
      });
    } else
      setClickReply({
        ...clickReply,
        index: index,
        value: true,
      });
  };
  return (
    <>
      <Row className="container-comment">
        <Row className="pt-3">
          <Col sm={1}>
            <Image
              roundedCircle={true}
              width={40}
              height={40}
              src={props.avatar}
            ></Image>
          </Col>
          <Col sm={11}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className=" comment-content"
                as="textarea"
                style={{ height: "120px" }}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="pb-3 ">
          <Col>
            <Button
              className="float-end"
              onClick={() =>
                props.handleComment(
                  props.listComment && props.listComment[0].real_easte_id,
                  comment
                )
              }
            >
              Bình luận
            </Button>
          </Col>
        </Row>
      </Row>
      {props.listComment &&
        props.listComment.map((comment, index) => (
          <Row key={index} className="mt-3 container-list-comment">
            <Row className="pt-3 d-flex align-itms-center">
              <Col sm={1}>
                <Image
                  roundedCircle={true}
                  width={40}
                  height={40}
                  src=""
                ></Image>
              </Col>
              <Col className="ps-3" sm={10}>
                <Row className="list-comment-name">{comment.name}</Row>
                <Row className="list-comment-date">
                  {comment.created_date.slice(0, 10)}
                </Row>
              </Col>
            </Row>

            <Row className="py-2">
              <Col sm={1}></Col>
              <Col sm={11} className="list-comment-content">
                {comment.content}
              </Col>
            </Row>
            <div className="pb-3 d-flex">
              <div className="d-flex align-items-center ">
                <div className="list-comment-click">
                  <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                </div>
                <div className="ps-1">{comment.like}</div>
              </div>
              <div className="ps-4 d-flex align-items-center ">
                <div className="list-comment-click">
                  <FontAwesomeIcon icon={faThumbsDown}></FontAwesomeIcon>
                </div>
                <div className="ps-1">1</div>
              </div>

              <div className="ps-4 list-comment-click">
                <div
                  className="list-comment-click-reply"
                  onClick={() => handleClickReply(index)}
                >
                  Phản hồi
                </div>
              </div>
            </div>
            <div className="list-comment-reply pb-3">
              {clickReply && clickReply.index == index && (
                <Row key={index} className="container-comment">
                  <Row className="pt-3">
                    <Col sm={1}>
                      <Image
                        roundedCircle={true}
                        width={40}
                        height={40}
                        src={props.avatar}
                      ></Image>
                    </Col>
                    <Col sm={11}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          className=" comment-content"
                          as="textarea"
                          style={{ height: "120px" }}
                          onChange={(e) => setReply(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="pb-3 ">
                    <Col>
                      <Button
                        className="float-end list-comment-reply-button"
                        onClick={() =>
                          props.handleReply(
                            comment.real_easte_id,
                            comment.id,
                            reply
                          )
                        }
                      >
                        Phản hồi
                      </Button>
                    </Col>
                  </Row>
                </Row>
              )}
            </div>
          </Row>
        ))}
    </>
  );
}

export default Comments;
