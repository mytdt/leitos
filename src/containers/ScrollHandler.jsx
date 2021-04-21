import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { throttle } from 'throttle-debounce';

const throttleTime = 150;

const handleScroll = throttle(throttleTime, false, () => {
  const doc = document.documentElement
    || document.body.parentNode
    || document.body;
  const scrollTop = (window.pageYOffset !== undefined)
    ? window.pageYOffset
    : doc.scrollTop;

  const mobileLimit = 1;
  const othersLimit = 200;
  const isMobile = window.matchMedia('( max-width : 480px )').matches || false;
  const limitToHideTitle = isMobile ? mobileLimit : othersLimit;

  if (scrollTop > limitToHideTitle) {
    document.querySelector('.header .bar').classList.remove('transparent');
    document.querySelector('.header .title').classList.add('hide');
    document.querySelector('.header .subtitle').classList.add('hide');

    return;
  }

  document.querySelector('.header .bar').classList.add('transparent');
  document.querySelector('.header .title').classList.remove('hide');
  document.querySelector('.header .subtitle').classList.remove('hide');
});

const ScrollHandler = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return null;
};

export default ScrollHandler;
