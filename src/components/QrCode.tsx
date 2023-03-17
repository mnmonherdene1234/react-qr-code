import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (e: any) => {
    if (qrRef.current) {
      e.preventDefault();
      let canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = `${url}.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
      setUrl("");
    }
  };

  const qrCodeEncoder = (e: any) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas id="qrCode" value={url} size={400} level={"H"} />
  );
  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>URL: </label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="https://domainname.com"
          />
          <button type="submit" disabled={!url}>
            Татах
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
