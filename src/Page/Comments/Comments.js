import { Row, Col, Image, Form, Button, Modal } from "react-bootstrap";
import "./Comments.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../../components/Modal/Modal";
import {
  faBars,
  faEdit,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Comments(props) {
  const infoUser = useSelector((state) => state.login);
  // console.log(infoUser.id);
  //Modal
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => {
    setIdNew("");
    setComment("");
    setIdComment("");
    setShow(false);
  };
  const handleClose1 = () => {
    setIdComment("");
    setIdReply("");
    setReply("");
    setShow1(false);
  };
  const handleShow = (idNew, id, content) => {
    setIdNew(idNew);
    setIdComment(id);
    setComment(content);
    setShow(true);
  };
  const handleShow1 = (idCM, id, content) => {
    setIdComment(idCM);
    setIdReply(id);
    setReply(content);
    setShow1(true);
  };

  //news
  const [idNew, setIdNew] = useState();
  //Comment
  const [idComment, setIdComment] = useState();
  const [comment, setComment] = useState();
  //reply
  const [idReply, setIdReply] = useState();

  const [reply, setReply] = useState();
  const [reply2, setReply2] = useState();

  const [clickReply, setClickReply] = useState({
    index: null,
    value: false,
  });
  const [clickCountReply, setClickCountReply] = useState({
    id: "",
    index: null,
    value: false,
  });
  const [clickReply2, setClickReply2] = useState({ index: "", value: false });
  const [clickMore, setClickMore] = useState({
    id: "",
    index: "",
    value: false,
  });

  const handleClickReply = (index) => {
    // console.log(index);
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
  const handleClickCountReply = (index, id) => {
    // console.log(index);
    if (clickCountReply.value) {
      setClickCountReply({
        ...clickCountReply,
        id: id,
        index: index,
        value: false,
      });
    } else
      setClickCountReply({
        ...clickCountReply,
        id: id,
        index: index,
        value: true,
      });
  };
  const handleClickReply2 = (index) => {
    // console.log(index);
    if (clickReply2.value) {
      setClickReply2({
        ...clickReply2,
        index: index,
        value: false,
      });
    } else
      setClickReply2({
        ...clickReply2,
        index: index,
        value: true,
      });
  };
  const handleClickMore = (index, id) => {
    // console.log(index, id);
    if (clickMore.value) {
      setClickMore({
        ...clickMore,
        id: id,

        index: index,
        value: false,
      });
    } else
      setClickMore({
        ...clickMore,
        id: id,

        index: index,
        value: true,
      });
  };
  return (
    <>
      {infoUser.isLogin ? (
        <Row className="container-comment">
          <Row className="pt-3">
            <Col sm={1}>
              <Image
                roundedCircle={true}
                width={40}
                height={40}
                src={infoUser.img}
              ></Image>
            </Col>
            <Col sm={10}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className=" comment-content"
                  as="textarea"
                  value={comment}
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
                onClick={() => {
                  props.handleComment(props.id && props.id, comment);
                  setComment("");
                }}
              >
                Bình luận
              </Button>
            </Col>
          </Row>
        </Row>
      ) : (
        <Link
          className="text-decoration-none text-dark bg-transparent"
          to={"/dang-nhap"}
        >
          <div className="py-3 comment-check-login">
            <div className="d-flex align-items-center justify-content-center ">
              Bạn cần đăng nhập để bình luận
            </div>
          </div>
        </Link>
      )}

      {props.listComment &&
        props.listComment.map((comment, index) => (
          <Row key={index} className="mt-3 container-list-comment">
            <Row className="pt-3 d-flex align-itms-center">
              <Col md={1}>
                <Image
                  roundedCircle={true}
                  width={40}
                  height={40}
                  src={comment.User.avatar}
                ></Image>
              </Col>
              <Col className="ps-3" md={10}>
                <Row className="list-comment-name">{comment.Comment.name}</Row>
                <Row className="list-comment-date">
                  {comment.Comment.created_date.slice(0, 10)}
                </Row>
              </Col>
              <Col sm={1} className="position-relative">
                <div
                  className="float-end px-2 py-2 d-flex align-items-center justify-content-center list-comment-handle"
                  onClick={() =>
                    handleClickMore(comment.Comment.id, comment.Comment.user_id)
                  }
                >
                  <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </div>
                {clickMore &&
                  clickMore.value == true &&
                  clickMore.index == comment.Comment.id &&
                  comment.Comment.user_id == infoUser.id && (
                    <div className="position-absolute top-100 start-100 shadow-sm translate-middle list-comment-block">
                      <div
                        className="px-2 py-1 block-item"
                        onClick={() =>
                          handleShow(
                            comment.Comment.real_easte_id,
                            comment.Comment.id,
                            comment.Comment.content
                          )
                        }
                      >
                        <FontAwesomeIcon
                          className="pe-2"
                          icon={faEdit}
                        ></FontAwesomeIcon>
                        Chỉnh sửa
                      </div>
                      <div
                        className="px-2 py-1 block-item"
                        onClick={() => {
                          props.handleDeleteComment(
                            comment.Comment.real_easte_id,
                            comment.Comment.id
                          );
                          handleClickMore();
                        }}
                      >
                        <FontAwesomeIcon
                          className="pe-2"
                          icon={faTrash}
                        ></FontAwesomeIcon>
                        Xóa
                      </div>
                    </div>
                  )}
              </Col>
            </Row>

            <Row className="py-2">
              <Col sm={1}></Col>
              <Col sm={11} className="my-2 list-comment-content">
                {comment.Comment.content}
              </Col>
            </Row>
            <Row className="pb-3 d-flex align-items-center">
              <Col lg={1} sm={1}></Col>

              <Col lg={1} sm={1} className="d-flex align-items-center ">
                <div className=" list-comment-click">
                  <FontAwesomeIcon
                    className="px-2 py-2 rounded-circle"
                    icon={faThumbsUp}
                    onClick={() =>
                      props.handleLike(
                        comment.Comment.real_easte_id,
                        comment.Comment.id
                      )
                    }
                  ></FontAwesomeIcon>
                </div>
                <div className="ps-1">{comment.Comment.like}</div>
              </Col>
              <Col lg={1} sm={1} className="ms-2 d-flex align-items-center ">
                <div className="list-comment-click">
                  <FontAwesomeIcon
                    className="px-2 py-2 rounded-circle"
                    icon={faThumbsDown}
                    onClick={() =>
                      props.handleUnLike(
                        comment.Comment.real_easte_id,
                        comment.Comment.id
                      )
                    }
                  ></FontAwesomeIcon>
                </div>
              </Col>

              <Col lg={2} sm={3} className=" list-comment-click">
                <div
                  className="list-comment-click-reply"
                  onClick={() => handleClickReply(index)}
                >
                  Phản hồi
                </div>
              </Col>
            </Row>
            <div className="list-comment-reply pb-3">
              {clickReply &&
                clickReply.value == true &&
                clickReply.index == index && (
                  <Row key={index}>
                    <Col md={1}></Col>
                    <Col md={10} className="container-comment">
                      <Row className="pt-3">
                        <Col sm={1}>
                          <Image
                            roundedCircle={true}
                            width={40}
                            height={40}
                            src={infoUser.img}
                          ></Image>
                        </Col>
                        <Col sm={11}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              className=" comment-content"
                              as="textarea"
                              value={reply}
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
                            onClick={() => {
                              props.handleReply(
                                comment.Comment.real_easte_id,
                                comment.Comment.id,
                                reply
                              );
                              setReply("");
                            }}
                          >
                            Phản hồi
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
            </div>
            <div className="list-comment-totalRep">
              {comment.Comment.totalRep > 0 && (
                <Row>
                  <Col md={1}></Col>
                  <Col
                    md={2}
                    className=" pb-3 totalRep-click"
                    onClick={() => {
                      props.handleGetAllReply(comment.Comment.id);
                      handleClickCountReply(index, comment.Comment.id);
                    }}
                  >
                    {`${comment.Comment.totalRep} Phản hồi`}
                  </Col>
                </Row>
              )}
              {props.listReply &&
                comment.Comment.id == clickCountReply.id &&
                props.listReply.map((reply, index1) => (
                  <Row>
                    <Col md={1}></Col>
                    <Col md={10} className="mb-3 container-comment">
                      <Row className="pt-3  d-flex align-itms-center">
                        <Col md={1}>
                          <Image
                            roundedCircle={true}
                            width={40}
                            height={40}
                            src={reply.User.avatar}
                          ></Image>
                        </Col>
                        <Col className="ps-3" md={10}>
                          <Row className="list-comment-name">
                            {reply.Comment.name}
                          </Row>
                          <Row className="list-comment-date">
                            {reply.Comment.created_date.slice(0, 10)}
                          </Row>
                        </Col>
                        <Col sm={1} className="position-relative">
                          <div
                            className="float-end px-2 py-2 d-flex align-items-center justify-content-center list-comment-handle"
                            onClick={() =>
                              handleClickMore(
                                reply.Comment.id,
                                reply.Comment.user_id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                          </div>
                          {clickMore &&
                            clickMore.value == true &&
                            clickMore.index == reply.Comment.id &&
                            reply.Comment.user_id == infoUser.id && (
                              <div className="position-absolute top-100 start-100 shadow-sm translate-middle list-comment-block">
                                <div
                                  className="px-2 py-1 block-item"
                                  onClick={() =>
                                    handleShow1(
                                      reply.Comment.parent_comment,
                                      reply.Comment.id,
                                      reply.Comment.content
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    className="pe-2"
                                    icon={faEdit}
                                  ></FontAwesomeIcon>
                                  Chỉnh sửa
                                </div>
                                <div
                                  className="px-2 py-1 block-item"
                                  onClick={() => {
                                    props.handleDeleteReply(
                                      reply.Comment.parent_comment,
                                      reply.Comment.id
                                    );
                                    handleClickMore();
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="pe-2"
                                    icon={faTrash}
                                  ></FontAwesomeIcon>
                                  Xóa
                                </div>
                              </div>
                            )}
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col sm={1}></Col>
                        <Col sm={11} className="my-2 list-comment-content">
                          {reply.Comment.content}
                        </Col>
                      </Row>
                      <Row className="pb-3 d-flex">
                        <Col lg={1} sm={1}></Col>
                        <Col
                          lg={1}
                          sm={1}
                          className="d-flex align-items-center "
                        >
                          <div className="list-comment-click">
                            <FontAwesomeIcon
                              className="px-2 py-2 rounded-circle"
                              icon={faThumbsUp}
                              onClick={() =>
                                props.handleLike1(
                                  reply.Comment.parent_comment,
                                  reply.Comment.id
                                )
                              }
                            ></FontAwesomeIcon>
                          </div>
                          <div className="ps-1">{reply.Comment.like}</div>
                        </Col>
                        <Col
                          lg={1}
                          sm={1}
                          className="ms-2 d-flex align-items-center "
                        >
                          <div className="list-comment-click">
                            <FontAwesomeIcon
                              className="px-2 py-2 rounded-circle"
                              icon={faThumbsDown}
                              onClick={() =>
                                props.handleUnLike1(
                                  reply.Comment.parent_comment,
                                  reply.Comment.id
                                )
                              }
                            ></FontAwesomeIcon>
                          </div>
                        </Col>

                        <Col lg={2} sm={3} className=" list-comment-click">
                          <div
                            className="list-comment-click-reply"
                            onClick={() => handleClickReply2(reply.Comment.id)}
                          >
                            Phản hồi
                          </div>
                        </Col>
                      </Row>
                      <div className="list-comment-reply pb-3">
                        {clickReply2 &&
                          clickReply2.value == true &&
                          clickReply2.index == reply.Comment.id && (
                            <Row key={index1}>
                              <Col md={1}></Col>
                              <Col md={10} className="container-comment">
                                <Row className="pt-3">
                                  <Col sm={1}>
                                    <Image
                                      roundedCircle={true}
                                      width={40}
                                      height={40}
                                      src={infoUser.img}
                                    ></Image>
                                  </Col>
                                  <Col sm={11}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="formBasicEmail"
                                    >
                                      <Form.Control
                                        className=" comment-content"
                                        as="textarea"
                                        value={reply2}
                                        style={{ height: "120px" }}
                                        onChange={(e) =>
                                          setReply2(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row className="pb-3 ">
                                  <Col>
                                    <Button
                                      className="float-end list-comment-reply-button"
                                      onClick={() => {
                                        props.handleReply(
                                          comment.Comment.real_easte_id,
                                          reply.Comment.parent_comment,
                                          reply2
                                        );
                                        setReply2("");
                                      }}
                                    >
                                      Phản hồi
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          )}
                      </div>
                    </Col>
                  </Row>
                ))}
            </div>
          </Row>
        ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                as="textarea"
                style={{ height: "120px" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.handleChangeComment(idNew, idComment, comment);
              handleClose();
              handleClickMore();
            }}
          >
            Sửa
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                as="textarea"
                style={{ height: "120px" }}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Thoát
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.handleChangeReply(idComment, idReply, reply);
              handleClose1();
              handleClickMore();
            }}
          >
            Sửa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Comments;
