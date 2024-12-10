import React from 'react';

const Location = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row', // 좌우 배치
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFF5', // 배경 색상
      }}
    >
      {/* 왼쪽 섹션 */}
      <div
        style={{
          flex: 1, // 동일한 비율
          backgroundColor: '#C35640',
          color: '#FFFFF5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          maxWidth: '600px', // 명시적으로 최대 너비 설정
        }}
      >
        <h2
          style={{
            fontFamily: 'Yasashii-W01-Bold',
            fontSize: 'clamp(30px, 5vw, 60px)',
            margin: '0 0 20px 0',
          }}
        >
          JUNE 28, 2025
        </h2>
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#FFFFF5',
            margin: '10px 0',
          }}
        ></div>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', margin: '5px 0' }}>
          Ceremony 3:00 PM
        </p>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', margin: '5px 0' }}>
          Dinner & Celebration 5:00 PM
        </p>
      </div>

      {/* 오른쪽 섹션 */}
      <div
        style={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#C35640',
            fontSize: 'clamp(20px, 3vw, 30px)',
            marginBottom: '5px',
            marginTop: '50px',
          }}
        >
          Kananaskis Mountain Lodge
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '70px' }}>
          1 Centennial Dr, Kananaskis Village, AB T0L 2A0
        </p>
        <div style={{ width: '100%', flex: 1, margin: 0 }}>
          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.31349133659!2d-115.14883358793149!3d50.91791765347753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5370ca3eb3ef0f85%3A0x8daf32360bd6168f!2sKananaskis%20Mountain%20Lodge%2C%20Autograph%20Collection!5e0!3m2!1sen!2sca!4v1733661867883!5m2!1sen!2sca"
            style={{
              border: 0,
              width: '100%',
              height: '550px',
            }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
