import React from 'react';
import { useSearchParams } from 'react-router-dom';

const AccessCode = () => {
  const [searchParams] = useSearchParams();

  return (
    <section className='access-code'>
      <p className='access-code__code'>{searchParams.get('code')}</p>
    </section>
  );
}

export default AccessCode;