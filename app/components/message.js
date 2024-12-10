import React, { useState, useEffect } from 'react';
import { db, auth } from '../_utils/firebase'; // Firebase 설정을 가져오는 모듈
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인한 사용자

  useEffect(() => {
    // Firestore 메시지 로드
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePostMessage = async () => {
    if (name.trim() === '') {
      setError('Please enter your name.');
      return;
    }
    if (newMessage.trim() === '') {
      setError('Please write a message.');
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        name,
        message: newMessage,
        timestamp: new Date(),
      });

      setNewMessage('');
      setName('');
      setError('');
    } catch (err) {
      console.error('Error adding message:', err);
      setError('Failed to post the message.');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete the message.');
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
          Leave a Message
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
          Share your heartfelt congratulations with the couple!
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
        {/* 메시지 목록 */}
        <div
          style={{
            width: '80%',
            height: '60%',
            marginBottom: '20px',
            overflowY: 'auto',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  border: '1px solid #C35640',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                  backgroundColor: '#F9F9F9',
                  textAlign: 'left',
                  position: 'relative',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: '16px',
                    color: '#C35640',
                    margin: '0 0 5px 0',
                  }}
                >
                  <strong>{msg.name}</strong>
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: '16px',
                    color: '#333',
                    margin: 0,
                  }}
                >
                  {msg.message}
                </p>
                {currentUser?.uid === 'tzAPu1FYPuUnZMlvVVzbA0Jy6By2' && (
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#C35640',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontFamily: 'Montserrat-SemiBold',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
          ) : (
            <p
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: '16px',
                color: '#888',
              }}
            >
              No messages yet. Be the first to leave one!
            </p>
          )}
        </div>

        {/* 이름과 메시지 입력 */}
        <div
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '10px',
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={{
              width: '30%',
              height: '50px',
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Montserrat-SemiBold',
              borderBottom: '1px solid #C35640',
              backgroundColor: '#FFFFF5',
            }}
          />
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            style={{
              width: '70%',
              height: '50px',
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Montserrat-SemiBold',
              borderBottom: '1px solid #C35640',
              resize: 'none',
              backgroundColor: '#FFFFF5',
            }}
          ></textarea>
        </div>

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

        <button
          onClick={handlePostMessage}
          style={{
            width: '150px',
            padding: '10px',
            fontSize: '16px',
            fontFamily: 'Montserrat-SemiBold',
            backgroundColor: '#C35640',
            color: '#FFFFF5',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default MessageBoard;
