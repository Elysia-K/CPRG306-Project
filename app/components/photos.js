import React, { useState } from 'react';

const PhotoGallery = () => {
  const photos = [
    '/img/photo1.png',
    '/img/photo2.jpeg',
    '/img/photo3.jpeg',
    '/img/photo4.jpeg',
    '/img/photo5.jpeg',
    '/img/photo6.jpeg',
    '/img/photo7.jpeg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 사진의 인덱스

  const goToNextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length); // 다음 사진으로 이동
  };

  const goToPreviousPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    ); // 이전 사진으로 이동
  };

  const handleImageClick = (e) => {
    const imageWidth = e.target.offsetWidth; // 이미지의 너비
    const clickX = e.nativeEvent.offsetX; // 클릭 위치 (이미지 내에서)

    if (clickX < imageWidth / 2) {
      // 왼쪽 클릭 -> 이전 사진으로 이동
      goToPreviousPhoto();
    } else {
      // 오른쪽 클릭 -> 다음 사진으로 이동
      goToNextPhoto();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFF5',
        position: 'relative', // For absolute positioning of arrows
      }}
    >
      {/* 왼쪽 섹션 */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#C35640',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFFFF5',
          padding: '10px',
          maxWidth: '600px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Yasashii-W01-Bold',
            fontSize: 'clamp(30px, 5vw, 60px)',
            margin: '0 0 20px 0',
          }}
        >
          OUR STORY
        </h2>
        <div
          style={{
            width: '80%',
            height: '1px',
            backgroundColor: '#FFFFF5',
            margin: '10px 0',
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          {photos.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)} // 클릭하면 해당 사진으로 이동
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? '#FFFFF5' : '#FFFFF5',
                opacity: currentIndex === index ? 1 : 0.5, // 선택된 인디케이터 강조
                margin: '0 5px',
                cursor: 'pointer',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 오른쪽 섹션 */}
      <div
        style={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative', // To position arrows within this section
        }}
      >
        {/* 왼쪽 화살표 */}
        <div
          onClick={goToPreviousPhoto}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#FFF',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          &#8249; {/* Left arrow symbol */}
        </div>

        {/* 사진 */}
        <img
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          onClick={handleImageClick} // 사진 클릭 이벤트 처리
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer', // 클릭 가능한 커서
          }}
        />

        {/* 오른쪽 화살표 */}
        <div
          onClick={goToNextPhoto}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#FFF',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          &#8250; {/* Right arrow symbol */}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
