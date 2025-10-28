import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PriceBarChart from "../../components/ApexCharts/ApexCharts";
import ReviewPieChart from "../../components/ReviewPieChart/ReviewPieChart";
import './CarDetail.css';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 
  const [car, setCar] = useState(null);
  const [priceData, setPriceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const MIN_LOADING_TIME = 7000; // เวลาโหลดขั้นต่ำ (ms)
  
  useEffect(() => {
    const startTime = Date.now();
    setLoading(true);
    
    fetch(`${BACKEND_URL}/cars/${id}`)
      .then(res => res.json())
      .then(carData => {
        setCar(carData);
        return fetch(`${BACKEND_URL}/cars/${carData.id}/price-data`)
          .then(res => res.json())
          .then(json => setPriceData(json.prices || {})); 
      })
      .catch(err => console.error("Error fetching data:", err))
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;
        if (remaining > 0) {
          setTimeout(() => setLoading(false), remaining);
        } else {
          setLoading(false);
        }
      });
  }, [id]);

  const handleImageError = () => setImageError(true);
  const handleAddToWishlist = () => alert('เพิ่มในรายการโปรดแล้ว! ❤️');
  const handleBuyNow = () => alert('กำลังเปลี่ยนเส้นทางไปหน้าการซื้อ... 🚗');
  const formatPrice = (price) => new Intl.NumberFormat('th-TH').format(price);

  // Loader + spinner
  if (loading) {
    return (
      <div style={{
        padding: '40px', minHeight: '70vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '16px'
      }}>
        <div className="spinner"></div>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>กำลังโหลดข้อมูลรถ...</div>
        <button onClick={() => setLoading(false)} className="btn-primary" style={{ marginTop: '12px' }}>
          ข้ามโหลด
        </button>
      </div>
    );
  }

  if (!car) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="error-boundary">
          <h2>ไม่พบข้อมูลรถยนต์</h2>
          <p>อาจเกิดข้อผิดพลาดในการโหลดข้อมูล</p>
          <button onClick={() => navigate(-1)} className="btn-primary">← กลับหน้าก่อนหน้า</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)' }}>
      <div className="car-detail-container">
        {/* รูปภาพรถ */}
        <div className="car-detail-image">
          {!imageError ? (
            <img src={car.image_url || '/default-car.jpg'} alt={`${car.brand} ${car.model}`} onError={handleImageError} />
          ) : (
            <div style={{
              width: '100%',
              height: '350px',
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#718096',
              fontSize: '1.1rem',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontSize: '3rem' }}>🚗</div>
              <div>รูปภาพไม่พร้อมใช้งาน</div>
            </div>
          )}
          <PriceBarChart priceData={priceData} />
          <ReviewPieChart carId={car.id} />
        </div>

        {/* ข้อมูลรถ */}
        <div className="car-detail-info">
          <h1>{car.brand} {car.model}</h1>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500',
            marginBottom: '16px'
          }}>ปี {car.year}</div>

          <div className="price-tag">฿{formatPrice(car.price_new || car.price_twohand)}</div>

          <div className="car-specs">
            <div className="spec-item"><h4>ราคารถใหม่</h4><p>{car.price_new ? `฿${formatPrice(car.price_new)}` : 'ไม่ระบุ'}</p></div>
            <div className="spec-item"><h4>ราคารถมือสอง</h4><p>{car.price_twohand ? `฿${formatPrice(car.price_twohand)}` : 'ไม่ระบุ'}</p></div>
            <div className="spec-item"><h4>การใช้เชื้อเพลิง</h4><p>{car.fuel_consumption || 'ไม่ระบุ'} กม./ลิตร</p></div>
            <div className="spec-item"><h4>เครื่องยนต์</h4><p>{car.engine || 'ไม่ระบุ'}</p></div>
            <div className="spec-item"><h4>กำลังสูงสุด</h4><p>{car.maximum_power || 'ไม่ระบุ'}</p></div>
            <div className="spec-item"><h4>ประเภท</h4><p>{car.body_type || 'ไม่ระบุ'}</p></div>
          </div>

          <div className="car-features">
            <h3>🌟 คุณสมบัติเด่น</h3>
            <div className="features-grid">
              <div className="feature-tag">ประหยัดน้ำมัน</div>
              <div className="feature-tag">เครื่องยนต์เงียบ</div>
              <div className="feature-tag">ระบบความปลอดภัย</div>
              <div className="feature-tag">ดีไซน์สวยงาม</div>
              <div className="feature-tag">ขับขี่สบาย</div>
              <div className="feature-tag">เทคโนโลยีทันสมัย</div>
            </div>
          </div>

          <div className="car-description">
            <h3>📝 รายละเอียดเพิ่มเติม</h3>
            <p>
              {car.brand} {car.model} ปี {car.year} เป็นรถยนต์ที่ออกแบบมาเพื่อตอบสนองความต้องการในชีวิตประจำวัน
              ด้วยเครื่องยนต์ {car.engine} ที่ให้กำลัง {car.maximum_power} และการใช้เชื้อเพลิง {car.fuel_consumption} กม./ลิตร
              ทำให้เป็นตัวเลือกที่เหมาะสำหรับทั้งการใช้งานในเมืองและการเดินทางระยะไกล
            </p>
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={handleAddToWishlist}>❤️ เพิ่มในรายการโปรด</button>
            <button className="btn-primary" onClick={handleBuyNow}>🛒 หา</button>
            <button className="btn-secondary" onClick={() => navigate(-1)}>← กลับหน้าก่อนหน้า</button>
          </div>
        </div>
      </div>
    </div>
  );
}
