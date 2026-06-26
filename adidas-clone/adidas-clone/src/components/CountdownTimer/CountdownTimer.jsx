import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CountdownTimer.css';

function getTimeLeft() {
  // Sale ends 3 days from now
  const saleEnd = new Date();
  saleEnd.setDate(saleEnd.getDate() + 3);
  saleEnd.setHours(23, 59, 59, 0);

  const diff = saleEnd - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section">
      <p className="countdown-eyebrow">Limited Time Offer</p>
      <h2 className="countdown-heading">
        Sale Ends In — <span>Hurry Up!</span>
      </h2>

      <div className="countdown-timer">
        <div className="timer-unit">
          <span className="timer-number">{pad(timeLeft.days)}</span>
          <span className="timer-label">Days</span>
        </div>
        <span className="timer-colon">:</span>
        <div className="timer-unit">
          <span className="timer-number">{pad(timeLeft.hours)}</span>
          <span className="timer-label">Hours</span>
        </div>
        <span className="timer-colon">:</span>
        <div className="timer-unit">
          <span className="timer-number">{pad(timeLeft.minutes)}</span>
          <span className="timer-label">Minutes</span>
        </div>
        <span className="timer-colon">:</span>
        <div className="timer-unit">
          <span className="timer-number">{pad(timeLeft.seconds)}</span>
          <span className="timer-label">Seconds</span>
        </div>
      </div>

      <Link to="/home" className="countdown-cta">Shop the Sale</Link>
    </section>
  );
}
