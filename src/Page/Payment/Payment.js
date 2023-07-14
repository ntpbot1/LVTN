import { Container, Image } from "react-bootstrap";
import "./Payment.scss";
import iconSuccess from "../../assets/images/success-icon-10.png";
function Payment() {
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
                <div>Chuyển khoản NH NCB</div>
              </div>
              <div className="py-1 d-flex justify-content-between">
                <div>Thời gian</div>
                <div>14/07/2023</div>
              </div>
              <div className="py-1 d-flex justify-content-between">
                <div>Mã giao dịch</div>
                <div>14065283</div>
              </div>
              {/* <div className="py-1 d-flex justify-content-between">
                <div>Phí thanh toán</div>
                <div>14.000đ</div>
              </div> */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Payment;
