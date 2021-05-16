import React, { useEffect, useState } from 'react'

function useWindowBlur() {
  // State for keeping track of whether key is pressed
  const [blur, setBlur] = useState(false);

  // If pressed key is our target key then set to true
  const blurHandler = ({ type }) => {
    if (type === 'blur') {
      setBlur(true);
    } else {
      setBlur(false);
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('blur', blurHandler);
    window.addEventListener('focus', blurHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('blur', blurHandler);
      window.removeEventListener('focus', blurHandler);
    };
  }); // Empty array ensures that effect is only run on mount and unmount
  return blur;
}
export { useWindowBlur };
