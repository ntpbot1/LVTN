import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./News.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";
import SearchProduct from "../SearchProduct/SearchProduct";
import { useState, useEffect } from "react";
import newsApi from "../../api/newsApi";
function News() {
  const navigate = useNavigate();
  const [listNews, setListNews] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [thumbnail, setThumbnail] = useState();
  // console.log(listNews[0]);
  const handleOnMouseOver = (title, date, img) => {
    setTitle(title);
    setDate(date);
    setThumbnail(img);
  };
  //   const handleOnMouseOut = (title) => {
  //     console.log("out");
  //   };
  const handleClick = (id) => {
    sessionStorage.setItem("id-new", id);
    navigate("/chi-tiet-tin-tuc");
  };
  // if (listNews !== null) {
  //   setTitle(listNews[0].title);
  //   setDate(listNews[0].created_date.slice(0, 10));
  //   setThumbnail(listNews[0].thumbnail);
  // }
  useEffect(() => {
    getAllNews();
  }, []);
  const getAllNews = async () => {
    try {
      let res = await newsApi.getAll();
      setListNews(res.data);
      setTitle(res.data.title);
      setDate(res.data.created_date);
      setThumbnail(res.data.thumbnail);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <div className="home-content">
        <div className="py-5 px-5 home-container ">
          <div className="fs-3 home-container-title">Tin Tức</div>
          <div className="home-news pt-5">
            <Row>
              <Col lg={5}>
                <Image
                  className="w-100 rounded"
                  roundedCircle={false}
                  //   width={450}
                  height={300}
                  src={thumbnail}
                ></Image>
                <div className="pt-2">{title}</div>
                <div>
                  {date &&
                    `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(
                      0,
                      4
                    )}`}
                </div>
              </Col>
              <Col lg={4} className="list-news">
                {listNews.map((news) => (
                  <Row
                    className="fs-6 py-2 item-news"
                    onMouseOver={() =>
                      handleOnMouseOver(
                        news.title,
                        news.created_date.slice(0, 10),
                        news.thumbnail
                      )
                    }
                    onClick={() => handleClick(news.id)}
                    //   onMouseOut={handleOnMouseOut}
                  >
                    <div>{news.title}</div>
                  </Row>
                ))}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
