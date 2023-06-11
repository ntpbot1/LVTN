import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./News.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";
import SearchProduct from "../SearchProduct/SearchProduct";
import { useState } from "react";
function News() {
  const listNews = [
    {
      id: 1,
      title: "Nhà bán khu vực Đức Hòa, Long An 1",
      price: 2.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 2,
      title: "Nhà bán khu vực Đức Hòa, Long An 2",
      price: 3.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 3,
      title: "Nhà bán khu vực Đức Hòa, Long An 3",
      price: 4.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 4,
      title: "Nhà bán khu vực Đức Hòa, Long An 4",
      price: 5.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
    {
      id: 5,
      title: "Nhà bán khu vực Đức Hòa, Long An 5",
      price: 6.1,
      acreage: "108",
      address: "Đức Hòa, Long An",
      date: "05/06/2023",
    },
  ];
  const newsFilter = listNews.filter((post) => {
    return post.price == 2.1 || post.price < 3.2;
  });
  const [img, setImg] = useState(
    "https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
  );
  const [title, setTitle] = useState(listNews[0].title);
  const [date, setDate] = useState(listNews[0].date);
  // console.log(listNews[0]);
  const handleOnMouseOver = (title, date) => {
    setTitle(title);
    setDate(date);
  };
  //   const handleOnMouseOut = (title) => {
  //     console.log("out");
  //   };
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
                  src="https://blog.rever.vn/hubfs/Blog%20images/PhuLH/bannhapho.jpg"
                ></Image>
                <div>{title}</div>
                <div>{date}</div>
              </Col>
              <Col lg={4} className="list-news">
                {listNews.map((news) => (
                  <Row
                    className="fs-6 py-2 item-news"
                    onMouseOver={() => handleOnMouseOver(news.title, news.date)}
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
