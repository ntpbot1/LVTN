import newsApi from "../../api/newsApi";
import "./DetailNew.scss";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
function DetailNew() {
  const [detailNew, setDetailNew] = useState();
  useEffect(() => {
    getDetailNew();
  }, []);
  const getDetailNew = async () => {
    try {
      const res = await newsApi.getDetailNew(sessionStorage.getItem("id-new"));
      setDetailNew(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="detai-new-container">
        {detailNew && (
          <div className="container">
            <div className="fs-1 py-3 new-title">{detailNew.title}</div>
            <div className="new-info">
              <div className="d-flex align-items-center new-info-author">
                <div>Được đăng bởi</div>
                <div className="ps-2 author-name">{detailNew.author}</div>
              </div>
              <div className="new-info-create-date">{`Ngày đăng: ${detailNew.created_date.slice(
                8,
                10
              )}/${detailNew.created_date.slice(
                5,
                7
              )}/${detailNew.created_date.slice(0, 4)}`}</div>
            </div>
            <div className="py-3 new-description">{`${detailNew.description}`}</div>
            <div className="py-3 new-thumbnail">
              <Image
                roundedCircle={false}
                className="w-100"
                src={detailNew.thumbnail}
              ></Image>
            </div>
            <div className="py-3 new-content">{`${detailNew.content.replaceAll(
              "\\r\\n",
              ""
            )}`}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailNew;
