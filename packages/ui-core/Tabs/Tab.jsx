import React, { useCallback } from 'react';
import styles from './Tabs.mdl.css'

const Tab = React.forwardRef(function Tab({
  children,
  onChange,
  onClick,
  selected,
  value,
  'aria-controls': ariaControls,
}, ref) {
  const handleClick = useCallback((event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  }, [onChange, onClick, selected, value]);

  return (
    <button
      aria-controls={ariaControls}
      aria-selected={selected}
      className={styles.tab}
      onClick={handleClick}
      ref={ref}
      role="tab"
      tabIndex={selected ? 0 : -1}
      value={value}
    >
      {children}
    </button>
  );
});

if (process.env.NODE_ENV === 'development') {
  Tab.displayName = 'Tab';
}

export default Tab;