'use client';

import React, { useEffect, useState } from 'react';
import { db, auth, initializeAnalytics } from '../_utils/firebase'; // Import analytics initialization
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import * as XLSX from 'xlsx';

export default function Page() {
  const [rsvpList, setRsvpList] = useState([]);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Firebase Analytics 초기화
    const initialize = async () => {
      await initializeAnalytics();
    };
    initialize();
  }, []);

  useEffect(() => {
    // Firebase Auth 상태 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Firestore에서 RSVP 데이터 가져오기
    if (typeof window !== 'undefined') {
      const q = query(collection(db, 'RSVP'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedRSVPs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRsvpList(fetchedRSVPs);
        },
        (err) => {
          console.error('Error fetching RSVP data:', err);
          setError('Failed to load RSVP list. Please try again later.');
        }
      );

      return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 제거
    }
  }, []);

  const handleDelete = async (id) => {
    if (!currentUser) {
      alert('You must be logged in to delete RSVP entries.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this RSVP?'
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'RSVP', id));
        alert('RSVP successfully deleted.');
      } catch (err) {
        console.error('Error deleting RSVP:', err);
        alert('Failed to delete RSVP. Please try again.');
      }
    }
  };

  const exportToExcel = () => {
    if (rsvpList.length === 0) {
      alert('No RSVP data to export.');
      return;
    }

    // Prepare data for Excel
    const worksheet = XLSX.utils.json_to_sheet(
      rsvpList.map((item) => ({
        Name: item.guestName,
        Attendance: item.attendance === 'yes' ? 'Yes' : 'No',
        TotalAttending: item.totalAttending || '-',
        Note: item.note || '-',
        Timestamp: item.timestamp?.toDate().toLocaleString() || '-',
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVP List');

    // Export Excel file
    XLSX.writeFile(workbook, 'RSVP_List.xlsx');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        backgroundColor: '#FFFFF5',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 'clamp(24px, 4vw, 36px)',
          color: '#C35640',
          marginBottom: '10px',
        }}
      >
        RSVP List
      </h1>
      {error && (
        <p
          style={{
            color: 'red',
            fontSize: '16px',
            fontFamily: 'Montserrat-SemiBold',
          }}
        >
          {error}
        </p>
      )}
      {rsvpList.length > 0 && (
        <button
          onClick={exportToExcel}
          style={{
            marginBottom: '10px',
            padding: '5px 10px',
            fontSize: '12px',
            fontFamily: 'Montserrat-Bold',
            backgroundColor: '#C35640',
            color: '#FFFFF5',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Export to Excel
        </button>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {rsvpList.length > 0 ? (
          rsvpList.map((rsvp) => (
            <div
              key={rsvp.id}
              style={{
                marginBottom: '15px',
                padding: '15px',
                borderBottom: '1px solid #C35640',
                position: 'relative',
              }}
            >
              {currentUser && (
                <button
                  onClick={() => handleDelete(rsvp.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#C35640',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  title="Delete RSVP"
                >
                  ✕
                </button>
              )}
              <p
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: '16px',
                  color: '#C35640',
                  marginBottom: '5px',
                }}
              >
                <strong>Name:</strong> {rsvp.guestName}
              </p>
              <p
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: '14px',
                  color: '#333',
                  marginBottom: '5px',
                }}
              >
                <strong>Attendance:</strong>{' '}
                {rsvp.attendance === 'yes' ? 'Yes' : 'No'}
              </p>
              {rsvp.attendance === 'yes' && (
                <p
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: '14px',
                    color: '#333',
                    marginBottom: '5px',
                  }}
                >
                  <strong>Total Attending:</strong> {rsvp.totalAttending}
                </p>
              )}
              <p
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <strong>Note:</strong>{' '}
                {rsvp.note && rsvp.note.trim()
                  ? rsvp.note
                  : 'No note provided.'}
              </p>
            </div>
          ))
        ) : (
          <p
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: '16px',
              color: '#888',
              textAlign: 'center',
            }}
          >
            No RSVPs received yet.
          </p>
        )}
      </div>
    </div>
  );
}
