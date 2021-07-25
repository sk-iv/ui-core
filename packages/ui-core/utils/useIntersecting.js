import React from 'react'

const useIntersecting = (refs, options = {}) => {
  const { threshold = 0, rootMargin = '0px' } = options
  const [intersecting, setIntersecting] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting ? entry.target : null)
    },
    {
      rootMargin,
      threshold,
    })

    let elements = [];

    if (refs.current instanceof HTMLElement) {
      elements = [refs.current];
    }
    // NodeList в обычный массив
    if (refs.current.length) {
      elements = Array.from(refs.current);
    }

    elements.forEach((ref) => {
      observer.observe(ref)
    })

    return () => {
      elements.forEach((ref) => observer.unobserve(ref))
    }
  }, [threshold, rootMargin, refs])

  return intersecting
}

export default useIntersecting
