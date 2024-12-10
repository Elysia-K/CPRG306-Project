'use client';

import React, { useEffect, useState, useRef } from 'react';
import Location from './location';
import PhotoGallery from './photos';
import RSVPForm from './rsvp';
import MessageBoard from './message';
import AuthModal from './authModal';
import { auth } from '../_utils/firebase'; // Correct path for firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // For navigation to RSVPListPage

export default function Page() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter(); // Navigation hook

  const sectionRefs = {
    location: useRef(null),
    photoGallery: useRef(null),
    rsvpForm: useRef(null),
    messageBoard: useRef(null),
  };

  const menuNames = {
    location: 'Information',
    photoGallery: 'Our Story',
    rsvpForm: 'RSVP',
    messageBoard: 'Messages',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            setVisibleSections((prev) =>
              prev.includes(sectionName) ? prev : [...prev, sectionName]
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs]);

  useEffect(() => {
    // Firebase Auth listener for current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const scrollToSection = (section) => {
    if (typeof window !== 'undefined') {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have logged out.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToRSVPList = () => {
    router.push('/rsvpListPage'); // Navigate to the RSVP List Page
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFF5',
        color: '#575757',
        fontFamily: 'Montserrat-Regular',
        margin: 0,
        overflowY: 'auto',
        fontSize: 'clamp(16px, 2vw, 30px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Top Menu */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '60px',
          backgroundColor: '#C35640',
          color: '#FFFFF5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          zIndex: 1000,
        }}
      >
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '20px',
          }}
        >
          {Object.keys(sectionRefs).map((section) => (
            <li
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                cursor: 'pointer',
                fontSize: 'clamp(16px, 1.5vw, 24px)',
                fontFamily: 'Montserrat-SemiBold',
                padding: '5px 10px',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#FFFFFF20')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = 'transparent')
              }
            >
              {menuNames[section]}
            </li>
          ))}
          {/* RSVP List Menu: Only visible if logged in */}
          {currentUser && (
            <li
              onClick={navigateToRSVPList}
              style={{
                cursor: 'pointer',
                fontSize: 'clamp(16px, 1.5vw, 24px)',
                fontFamily: 'Montserrat-SemiBold',
                padding: '5px 10px',
                transition: 'background-color 0.3s',
                color: '#FFFFF5',
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#FFFFFF20')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = 'transparent')
              }
            >
              RSVP List
            </li>
          )}
        </ul>
        <div>
          {currentUser ? (
            <button
              onClick={handleLogout}
              style={{
                color: '#FFFFF5',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                color: '#FFFFF5',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Edit
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      {/* Content Sections */}
      <div
        ref={sectionRefs.location}
        data-section="location"
        className={visibleSections.includes('location') ? 'fade-in' : ''}
        style={{ paddingTop: '60px' }}
      >
        <Location />
      </div>

      <div
        ref={sectionRefs.photoGallery}
        data-section="photoGallery"
        className={visibleSections.includes('photoGallery') ? 'fade-in' : ''}
      >
        <PhotoGallery />
      </div>

      <div
        ref={sectionRefs.rsvpForm}
        data-section="rsvpForm"
        className={visibleSections.includes('rsvpForm') ? 'fade-in' : ''}
      >
        <RSVPForm />
      </div>

      <div
        ref={sectionRefs.messageBoard}
        data-section="messageBoard"
        className={visibleSections.includes('messageBoard') ? 'fade-in' : ''}
      >
        <MessageBoard />
      </div>
    </div>
  );
}
