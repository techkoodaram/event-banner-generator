// app/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toPng } from 'html-to-image';
import { toast } from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

type Platform = 'linkedin';
type Theme = 'light';

export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>('https://www.techkoodaram.in/_next/image?url=%2Flogo.png&w=640&q=75');
  const [displayName, setDisplayName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [eventDetails, setEventDetails] = useState({
    eventType: 'Meetup',
    title: 'techKoodaram\'s Builders Day',
    date: 'November 28, 2026',
    venue: 'WisRight Technologies, Tenkasi',
    time: '9.30am to 1.00pm'
  });

  // Fixed values as requested
  const selectedPlatform: Platform = 'linkedin';
  const selectedTheme: Theme = 'light';

  const bannerRef = useRef<HTMLDivElement>(null);

  const platformDimensions = {
    linkedin: { width: 1200, height: 630, label: 'LinkedIn (1200×630)' },
  };

  const previewSize = {
    linkedin: { width: 800, height: Math.round(800 * 627 / 1200) },
  };

  const currentTheme = {
    background: 'bg-white',
    overlay: 'bg-white bg-opacity-0', // removed overlay
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-500',
    badge: 'bg-white text-black font-bold shadow-lg',
    // border: 'border-purple-600', // not used for profile anymore
    glow: 'shadow-[0_4px_14px_rgba(0,0,0,0.1)]'
  };

  const onDropPhoto = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDropLogo = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } = useDropzone({
    onDrop: onDropPhoto,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1
  });

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: onDropLogo,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg'] },
    maxFiles: 1
  });


  const handleDownload = async () => {
    if (!bannerRef.current) return;


    try {
      const dataUrl = await toPng(bannerRef.current, {
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `linkedin-banner-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Downloaded! Feel free to post on LinkedIn or Instagram 🚀');

    } catch (error) {
      console.error('Error downloading:', error);
      toast.error('Failed to download. Please try again.');
    }
  };

  const displayPhoto = photo;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <img src="/techkoodaram-logo.webp" alt="techKoodaram" className="object-contain" width={220} height={23} />
            <span>Banner Generator</span>
          </h1>
          {/* <p className="text-gray-600 text-lg">Create stunning banners for LinkedIn</p> */}
        </div>

        <div className="grid lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
          {/* Input Form */}
          <div className="space-y-6">


            {/* Name Input */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Your Name</h2>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Role Input */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Role</h2>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="E.g. Student/Developer"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Profile Photo Upload */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Profile Photo</h2>
              <p className="text-sm text-gray-500 mb-4">Upload your profile photo to use in the banner.</p>

              <div
                {...getPhotoRootProps()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-cyan-500 hover:bg-slate-50 transition-all"
              >
                <input {...getPhotoInputProps()} />
                {displayPhoto ? (
                  <div className="relative">
                    <img
                      src={displayPhoto}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded-lg shadow-lg"
                    />
                    <p className="mt-2 text-xs text-gray-400">Click to change</p>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Upload Photo</p>
                    <p className="text-xs text-gray-400 mt-1">(JPG, PNG, WebP)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden Fields (kept in DOM but hidden as requested) */}
            <div className="hidden">
              {/* Platform Selection, Theme Selection, Event Details, Logo Upload - all hidden/removed or static */}
              <input type="text" value={eventDetails.eventType} readOnly />
              <input type="text" value={eventDetails.title} readOnly />
              {/* ... other hidden inputs if strictly needed for form submission, but here purely UI */}
            </div>

            <div className="flex flex-col items-center pt-4 space-y-4">
              <button
                onClick={() => {
                  if (!displayName) {
                    toast.error('Please enter your name');
                    return;
                  }
                  handleDownload();
                }}
                className="w-full md:w-auto px-8 py-3 bg-primary-theme hover:bg-primary-theme/90 text-white font-bold rounded-xl shadow-lg transform transition active:scale-95 text-lg flex items-center justify-center gap-2"
              >
                <FiDownload /> Download Banner
              </button>
              <p className="text-green-600 font-medium animate-pulse text-sm text-center">
                Feel free to post this on LinkedIn or Instagram! 🚀
              </p>
            </div>

          </div>

          {/* Hidden Banner Render Area for Generation */}
          <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none" style={{ left: '-9999px' }}>
            <div
              ref={bannerRef}
              className="bg-slate-50 overflow-hidden relative flex flex-row items-center"
              style={{
                width: platformDimensions.linkedin.width,
                height: platformDimensions.linkedin.height
              }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

              {/* Left Section: FACE (45%) */}
              <div className="w-[45%] h-full flex items-center justify-center relative z-10 pl-16">
                {/* Circle Container */}
                <div
                  className="relative w-[480px] h-[480px] rounded-full overflow-hidden shadow-2xl bg-white flex-shrink-0"
                  style={{
                    border: '12px solid #593c27',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  {displayPhoto ? (
                    <img src={displayPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <svg className="w-32 h-32 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section: CONTENT (55%) */}
              <div className="flex-1 h-full flex flex-col justify-center items-start pl-12 pr-16 relative z-10">

                {/* 1. Badge / "I'm Attending" */}
                <div className="inline-block px-4 py-2 bg-[#593c27] text-white text-sm font-bold uppercase tracking-widest rounded-lg mb-8 shadow-sm whitespace-nowrap">
                  I'm Attending
                </div>

                {/* 2. Name & Role */}
                <div className="mb-10">
                  <h2 className="text-6xl font-black text-slate-900 leading-tight mb-2">
                    {displayName || "Your Name"}
                  </h2>
                  {role && (
                    <p className="text-3xl text-slate-500 font-medium">{role}</p>
                  )}
                </div>

                {/* Divider */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-10"></div>

                {/* 3. Event Details */}
                <div className="space-y-3">
                  <h3 className="text-4xl font-bold text-slate-800 leading-tight">
                    {eventDetails.title}
                  </h3>

                  <div className="flex flex-col gap-2 mt-4 text-slate-600 font-medium text-xl">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#593c27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span>{eventDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#593c27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span>{eventDetails.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Logo at bottom right */}
                <div className="absolute bottom-10 right-10 opacity-80">
                  {logo && (
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ height: '32px', width: 'auto' }}
                    />
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} techKoodaram Banner Generator</p>
      </footer>
    </main>
  );
}