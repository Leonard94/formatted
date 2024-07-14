import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const NAMES = ['Елена!', 'Дарина!', 'Рустам!'];

export const SplashScreen = () => {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentNameIndex((prevIndex) => (prevIndex + 1) % NAMES.length);
        setIsAnimating(false);
      }, 300);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.splash}>
      <div className={styles.text}>
        Хорошего дня,
        <div className={styles.name_wrapper}>
          <span className={isAnimating ? styles.flyOut : styles.flyIn}>
            {NAMES[currentNameIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};