import React, { useEffect, useRef } from 'react';

const CircularText = ({ text = '• SCROLL DOWN • SCROLL DOWN ' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const container = textRef.current;
    const characters = text.split('');
    container.innerHTML = '';

    characters.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.position = 'absolute';
      span.style.left = '50%';
      span.style.top = '0';
      span.style.transformOrigin = '0 70px';
      span.style.transform = `rotate(${(360 / characters.length) * i}deg)`;
      container.appendChild(span);
    });
  }, [text]);

  return (
    <div className="circle-wrapper -z-10">
      <div className="circle-rotating-text">
        <p ref={textRef} className="circular-text" />
      </div>
      <div className="center-arrow">↓</div>
    </div>
  );
};

export default CircularText;
