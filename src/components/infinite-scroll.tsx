import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';

export default function InfiniteScrollComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(AppContext);
  const { params, isLoading } = state;

  useEffect(() => {
    const options = {
      oot: document.body,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading) {
        const newParams = { ...params };
        newParams.page = newParams.page ? newParams.page + 1 : 1;
        dispatch({ type: 'LOAD_IMAGES', payload: newParams });
      }
    }, options);

    let current = containerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [containerRef, params, dispatch, isLoading]);

  return (
    <>
      <div
        style={{
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2.125rem',
        }}
        ref={containerRef}
      >
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
}
