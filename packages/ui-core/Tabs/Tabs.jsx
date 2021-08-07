import React, { useCallback, useRef, useState, useMemo } from 'react'
import clsx from 'clsx'
import styles from './Tabs.mdl.css'

const initialSliderStyle = {};
const getTabsCoordinates = ({ tabsNode, value, valueToIndex }) => {
  let tabsMeta
  if (tabsNode) {
    const rect = tabsNode.getBoundingClientRect();
    tabsMeta = {
      left: rect.left,
    }
  }

  let tabMeta = null
  if (tabsNode && value !== false) {
    const children = tabsNode.children

    if (children.length > 0) {
      const tab = children[valueToIndex.get(value)];
      if (process.env.NODE_ENV === 'development' && !tab) {
        console.error(
          [
            `Компонент Tabs: Свойство value: \`${value}\``,
            'в компоненте не соответствует значениям потомков',
            valueToIndex.keys
              ? `Значения потомков: ${Array.from(valueToIndex.keys()).join(', ')}.`
              : null,
          ].join('\n'),
        )
      }

      tabMeta = tab ? tab.getBoundingClientRect() : null

      if (process.env.NODE_ENV === 'development' && tabMeta && tabMeta.width === 0) {
        console.error(
          [
            `Компонент Tabs: Tab со значением (\`${value}\`)`,
            'Отсутствует в структуре документа',
            'или имеет свойство display: none',
          ].join('\n'),
        );
      }
    }
  }
  return { tabsMeta, tabMeta }
}

const Tabs = ({
  children: childrenProp,
  className,
  onChange,
  value,
}) => {
  const [sliderStyle, setSliderStyle] = useState(initialSliderStyle)
  const tabsRef = useRef(null)
  const valueToIndex = useRef(new Map())

  const updateSliderState = useCallback(() => {
    const { tabsMeta, tabMeta } = getTabsCoordinates({
      tabsNode: tabsRef.current,
      value,
      valueToIndex: valueToIndex.current,
    })

    const newIndicatorStyle = {
      transform: tabMeta ? `translatex(${tabMeta.left - tabsMeta.left}px)` : 0,
      width: tabMeta ? tabMeta.width : 0,
    }
    setSliderStyle(newIndicatorStyle)
  }, [value])

  React.useEffect(() => {
    updateSliderState()
  }, [updateSliderState])

  const children = useMemo(() => {
    let childIndex = 0
    return React.Children.map(childrenProp, (child) => {

      const childValue = child.props.value === undefined ? childIndex : child.props.value
      valueToIndex.current.set(childValue, childIndex)
      const selected = childValue === value

      childIndex += 1;
      return React.cloneElement(child, {
        selected,
        onChange,
        value: childValue,
        ...(childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}),
      })
    })
  }, [childrenProp, onChange, value])

  return (
    <div className={clsx(styles.tabs, className)} ref={tabsRef} role="tablist">
      {children}
      <div
        className={styles.tabsSlider}
        style={sliderStyle}
      />
    </div>
  )
}

if (process.env.NODE_ENV === 'development') {
  Tabs.displayName = 'Tabs';
}

export default Tabs
