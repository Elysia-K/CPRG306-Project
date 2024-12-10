'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter를 가져옴

export default function Page() {
  const router = useRouter(); // useRouter 훅 초기화
  const naomiRef = useRef(null);
  const [naomiWidth, setNaomiWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (naomiRef.current) {
        setNaomiWidth(naomiRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = () => {
    router.push('/components');
  };

  return (
    <main
      style={{
        backgroundColor: '#FFFFF5',
        color: '#575757',
        fontFamily: 'Montserrat-Regular',
        width: '100vw',
        height: '100vh',
        margin: 0,
        overflowY: 'auto',
        fontSize: 'clamp(16px, 2vw, 30px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          maxWidth: '1200px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Yasashii-W01-Bold',
              fontSize: 'clamp(60px, 10vw, 120px)',
            }}
          >
            <h1
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                width: '100%', // 부모의 전체 너비 사용
                maxWidth: `${naomiWidth}px`, // Naomi와 동일한 너비
              }}
            >
              {/* 왼쪽: Jun */}
              <span style={{ flexGrow: 1, textAlign: 'left' }}>Jun</span>

              {/* 오른쪽: & */}
              <span
                style={{ flexGrow: 0, color: '#C35640', textAlign: 'right' }}
              >
                &amp;
              </span>
            </h1>
            <h1 ref={naomiRef} style={{ textAlign: 'center' }}>
              Naomi
            </h1>
          </div>
          <h2 style={{ color: '#C35640', textAlign: 'right' }}>
            Our Fifth Springs
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p>June 28th, 2025 (Sat), 3:00 pm</p>
          <p style={{ color: '#C35640' }}>Kananaskis Mountain Lodge</p>
        </div>

        {/* 원형 버튼 추가 */}
        <div
          style={{
            display: 'flex', // 플렉스 박스 사용
            justifyContent: 'flex-end', // 오른쪽 정렬
            alignItems: 'center', // 세로 중앙 정렬
            width: '100%', // 부모의 너비를 채움
            marginTop: '20px', // 오른쪽 여백
          }}
        >
          <button
            onClick={handleButtonClick} // 버튼 클릭 시 페이지 이동
            style={{
              marginTop: '40px', // 상단 여백
              width: '80px', // 버튼 크기
              height: '80px',
              borderRadius: '50%', // 원형 버튼
              backgroundColor: 'transparent', // 투명 배경
              border: '2px solid #575757', // 기본 테두리 색상
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease, color 0.3s ease', // 부드러운 전환
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C35640'; // 호버 시 테두리 색상 변경
              e.currentTarget.querySelector(
                '.quarter-circle'
              ).style.backgroundColor = '#C35640'; // 호버 시 반원 색상 변경
              e.currentTarget.querySelector('.text').style.color = '#C35640'; // 호버 시 텍스트 색상 변경
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#575757'; // 기본 테두리 색상 복원
              e.currentTarget.querySelector(
                '.quarter-circle'
              ).style.backgroundColor = '#575757'; // 기본 반원 색상 복원
              e.currentTarget.querySelector('.text').style.color = '#575757'; // 기본 텍스트 색상 복원
            }}
          >
            {/* 4분의 1 원 */}
            <div
              className="quarter-circle"
              style={{
                width: '20%', // 쿼터 서클 너비
                height: '100%', // 쿼터 서클 높이
                backgroundColor: '#575757', // 기본 반원 색상
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '0 0 0 0', // 4분의 1 원 모양
                transition: 'background-color 0.3s ease', // 부드러운 전환
              }}
            ></div>

            {/* 텍스트 */}
            <span
              className="text"
              style={{
                transform: 'rotate(90deg)', // 세로로 회전
                color: '#575757', // 기본 텍스트 색상
                fontFamily: 'Montserrat-SemiBold',
                fontSize: '18px',
                letterSpacing: '1px',
                position: 'absolute',
                left: '-3px', // 텍스트를 왼쪽으로 약간 이동
                top: '33%', // 반원의 중심 아래쪽에 배치
                transition: 'color 0.3s ease', // 텍스트 색상 전환
              }}
            >
              NEXT
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
