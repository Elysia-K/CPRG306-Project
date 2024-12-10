import React, { useState } from 'react';
import { db } from '../_utils/firebase'; // Import Firebase config
import { collection, addDoc } from 'firebase/firestore';

const RSVPForm = () => {
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState(null); // Yes/No 선택
  const [totalAttending, setTotalAttending] = useState(1);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // 최종 제출 상태
  const [error, setError] = useState(''); // 에러 메시지 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 확인 창 상태

  const handleSubmit = () => {
    // 입력값 검증
    if (!guestName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (attendance === null) {
      setError('Please select if you will attend.');
      return;
    }

    setError(''); // 에러 메시지 초기화
    setIsConfirmOpen(true); // 확인 창 열기
  };

  const handleFinalSubmit = async () => {
    try {
      // Save to Firestore
      await addDoc(collection(db, 'RSVP'), {
        guestName,
        attendance,
        totalAttending,
        note,
        timestamp: new Date(), // Add a timestamp
      });

      setIsSubmitted(true); // 최종 제출 완료
      setIsConfirmOpen(false); // 확인 창 닫기

      // Clear the form
      setGuestName('');
      setAttendance(null);
      setTotalAttending(1);
      setNote('');
    } catch (error) {
      console.error('Error saving RSVP:', error);
      setError('Failed to save RSVP. Please try again.');
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
          padding: '20px',
          maxWidth: '600px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Yasashii-W01-Bold',
            fontSize: 'clamp(30px, 5vw, 60px)',
            marginBottom: '10px',
          }}
        >
          KINDLY RESPOND
        </h2>
        <div
          style={{
            width: '80%',
            height: '1px',
            backgroundColor: '#FFFFF5',
            margin: '10px 0',
          }}
        ></div>
        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            textAlign: 'center',
          }}
        >
          Please RSVP by April 25th, 2025
        </p>
      </div>

      {/* 오른쪽 섹션 */}
      <div
        style={{
          flex: 2,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Guest Name */}
        <div style={{ width: '80%', marginBottom: '30px' }}>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Guest Full Name"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: 'clamp(20px, 3vw, 40px)',
              fontFamily: 'Montserrat-SemiBold',
              borderBottom: '1px solid #C35640',
              color: '#888',
              background: '#FFFFF5',
            }}
          />
        </div>

        {/* Attendance Options */}
        <div style={{ width: '80%', marginBottom: '20px' }}>
          <button
            onClick={() => setAttendance('yes')}
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '10px',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 'clamp(15px, 3vw, 30px)',
              border: '2px solid #C35640',
              backgroundColor: attendance === 'yes' ? '#C35640' : '#FFFFF5',
              color: attendance === 'yes' ? '#FFFFF5' : '#C35640',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Yes, I will gladly attend
          </button>
          <button
            onClick={() => setAttendance('no')}
            style={{
              width: '100%',
              padding: '15px',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 'clamp(15px, 3vw, 30px)',
              border: '2px solid #C35640',
              backgroundColor: attendance === 'no' ? '#C35640' : '#FFFFF5',
              color: attendance === 'no' ? '#FFFFF5' : '#C35640',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            No, I will sadly miss out
          </button>
        </div>

        {/* Total Attending */}
        {attendance === 'yes' && (
          <div
            style={{
              width: '80%',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '5px',
            }}
          >
            <span
              style={{
                fontSize: '30px',
                fontFamily: 'Montserrat-SemiBold',
                color: '#C35640',
              }}
            >
              Total Attending
            </span>
            <select
              value={totalAttending}
              onChange={(e) => setTotalAttending(Number(e.target.value))}
              style={{
                border: 'none',
                fontSize: '30px',
                fontFamily: 'Montserrat-SemiBold',
                color: '#C35640',
                backgroundColor: 'transparent',
              }}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Private Note */}
        <div style={{ width: '80%', marginBottom: '20px' }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Leave a private note to the host..."
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '25px',
              fontFamily: 'Montserrat-SemiBold',
              borderBottom: '1px solid #C35640',
              backgroundColor: '#FFFFF5',
            }}
          ></textarea>
        </div>

        {/* Error Message */}
        {error && (
          <p
            style={{
              color: 'red',
              fontSize: '16px',
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: '20px',
            }}
          >
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '150px',
            padding: '10px',
            fontSize: '20px',
            backgroundColor: isSubmitted ? '#C35640' : '#FFFFF5',
            color: isSubmitted ? '#FFFFF5' : '#C35640',
            border: '2px solid #C35640',
            borderRadius: '25px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>

      {/* 확인 모달 */}
      {isConfirmOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: '400px',
              backgroundColor: '#FFFFF5',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: '#C35640', marginBottom: '20px' }}>
              Confirm Your Details
            </h3>
            <p>
              <strong>Name:</strong> {guestName}
            </p>
            <p>
              <strong>Attendance:</strong> {attendance === 'yes' ? 'Yes' : 'No'}
            </p>
            {attendance === 'yes' && (
              <p>
                <strong>Total Attending:</strong> {totalAttending}
              </p>
            )}
            <p>
              <strong>Note:</strong> {note || 'No note provided.'}
            </p>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handleFinalSubmit}
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#C35640',
                  color: '#FFFFF5',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FFFFF5',
                  color: '#C35640',
                  border: '2px solid #C35640',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPForm;
