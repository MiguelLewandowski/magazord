import React, { useRef, useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './styles.module.css';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  width?: 'narrow' | 'wide';
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = '',
  width = 'narrow'
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    if (selectRef.current) {
      selectRef.current.blur();
    }
    setIsOpen(false);
  };

  const handleClick = () => {
    if (isOpen) {
      if (selectRef.current) {
        selectRef.current.blur();
      }
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleBlur = () => {
      setIsOpen(false);
    };

    if (selectRef.current) {
      selectRef.current.addEventListener('blur', handleBlur);
    }

    return () => {
      if (selectRef.current) {
        selectRef.current.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const widthClass = width === 'wide' ? styles.languageButton : styles.typeButton;

  return (
    <div className={styles.selectContainer}>
      <select
        ref={selectRef}
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        className={`${styles.selectButton} ${widthClass} ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FaChevronDown className={styles.selectArrow} />
    </div>
  );
};

export default Select;
