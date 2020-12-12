import PropTypes from "prop-types"
import React from "react"
import lottie from "lottie-web"
import styles from './Lottie.module.css'

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16)/255,
    parseInt(result[2], 16)/255,
    parseInt(result[3], 16)/255,
    1
  ] : null;
}

const Lottie = ({
  options:{
    loop = true,
    autoplay,
    path,
    rendererSettings
  },
  eventListeners,
  speed,
  segments,
  isStopped,
  width,
  height,
  ariaRole,
  ariaLabel,
  isClickToPauseDisabled,
  title,
  size,
  style
}) => {

  const lottieContainer = React.useRef(null);
  const [error, setError] = React.useState(null);
  const [animationData, setAnimationData] = React.useState(null);
  const [options, setOptions] = React.useReducer((state, newState) => ({...state, ...newState}),
    {
      container: lottieContainer.current,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay !== false,
      rendererSettings,
    }
  );
  const [anim, setAnim] = React.useState(null);

  React.useEffect(() => {
    setOptions({ container: lottieContainer.current })
  }, [lottieContainer])

  //Initialise animation
  React.useEffect(() => {
    if(options.container){
      fetch(path)
        .then((res) => res.json())
        .then((data) => {
          setAnimationData(data);

          const newInstance = lottie.loadAnimation({ ...options, animationData: data });

          setAnim(newInstance);
        })
    }
  }, [options.container]);

  //Watch for state change of animation
  React.useEffect(() => {
    if (anim) {

      if(speed){
        setSpeed();
      }

      if(segments && !autoplay){
        anim.goToAndStop(0, true)
      }

      if(segments.length && autoplay){
        playSegments();
      }
    }
  }, [anim])

  React.useEffect(() => {
    if(anim){
      anim.stop();
    }
  }, [isStopped]);

  const registerEvents = React.useCallback((eventListeners) => {
    eventListeners.forEach((eventListener) => {
      anim.addEventListener(eventListener.eventName, eventListener.callback);
    });
  }, [eventListeners, anim])

  const deRegisterEvents = React.useCallback((eventListeners) => {
    eventListeners.forEach((eventListener) => {
      anim.removeEventListener(eventListener.eventName, eventListener.callback);
    });
  }, [eventListeners, anim])

  React.useEffect(() => {
    registerEvents(eventListeners);
    //componentWillUnmount
    return () => {
      deRegisterEvents(eventListeners);
    }
  });


  const setSpeed = () => {
    anim.setSpeed(speed);
  }

  const setDirection = () => {
    anim.setDirection(direction);
  }

  const play = () => {
    anim.play();
  }

  const playSegments = () => {
    anim.playSegments(segments, options.loop);
  }

  const stop = () => {
    anim.stop();
  }

  const pause = () => {
    if (isPaused && !anim.isPaused) {
      anim.pause();
    } else if (!isPaused && anim.isPaused) {
      anim.pause();
    }
  }

  const destroy = () => {
    anim.destroy();
  }


  const handleClickToPause = () => {
    // The pause() method is for handling pausing by passing a prop isPaused
    // This method is for handling the ability to pause by clicking on the animation
    if (anim.isPaused) {
      anim.play();
    } else {
      anim.pause();
    }
  }


  const getSize = (initial) => {
    return {
      w: `${animationData ? width * size : 0}px`,
      h: `${animationData ? height * size : 0}px`
    }
  }

  const lottieStyles = {
    width: getSize().w,
    height: getSize().h,
    overflow: 'hidden',
    margin: '0 auto',
    outline: 'none',
    ...style,
  }

  const onClickHandler = isClickToPauseDisabled ? () => null : handleClickToPause

  return (
    // Bug with eslint rules https://github.com/airbnb/javascript/issues/1374
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={lottieContainer}
      style={lottieStyles}
      onClick={onClickHandler}
      aria-label={ariaLabel}
      tabIndex="0"
    />
  )

}

Lottie.propTypes = {
  eventListeners: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isStopped: PropTypes.bool,
  isPaused: PropTypes.bool,
  speed: PropTypes.number,
  segments: PropTypes.arrayOf(PropTypes.number),
  direction: PropTypes.number,
  ariaRole: PropTypes.string,
  ariaLabel: PropTypes.string,
  isClickToPauseDisabled: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object,
}

Lottie.defaultProps = {
  eventListeners: [],
  isStopped: false,
  isPaused: false,
  speed: 1,
  ariaRole: 'button',
  ariaLabel: 'animation',
  isClickToPauseDisabled: false,
  title: '',
  size:1
}
export default Lottie
