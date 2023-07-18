import { Container, Image } from "react-bootstrap";
import "./Payment.scss";
import iconSuccess from "../../assets/images/success-icon-10.png";
import { useParams } from "react-router-dom";
function Payment() {
  const { cost, bank, date, code } = useParams();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <>
      <div className="d-flex align-items-center home-payment">
        <Container>
          <div className="pb-4 d-flex justify-content-center payment-title">
            THANH TOÁN THÀNH CÔNG
          </div>
          <div className="d-flex justify-content-center pb-3 payment-icon">
            <Image width={80} height={80} src={iconSuccess}></Image>
          </div>
          <div className="pb-5 d-flex justify-content-center payment-message">
            Cảm ơn quý khách đã thực hiện giao dịch.
          </div>
          <div className="d-flex justify-content-center">
            <div className="notify">
              <div className="notify-title">Thông tin giao dịch:</div>
              <div className="py-1 d-flex justify-content-between">
                <div>Hình thức thanh toán</div>
                <div>{`Chuyển khoản NH ${bank}`}</div>
              </div>
              <div className="py-1 d-flex justify-content-between">
                <div>Thời gian</div>
                <div>{`${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(
                  0,
                  4
                )} ${date.slice(11)}`}</div>
              </div>
              <div className="py-1 d-flex justify-content-between">
                <div>Mã giao dịch</div>
                <div>{code}</div>
              </div>
              <div className="py-1 d-flex justify-content-between">
                <div>Phí thanh toán</div>
                <div>{VND.format(cost / 100)}</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Payment;
