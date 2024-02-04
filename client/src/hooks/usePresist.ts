import { useState, useEffect } from 'react';

const usePersist = () => {
  const [presist, setPresist] = useState(
    JSON.parse(localStorage.getItem('persist') || '{}')
  );

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(presist));
  }, [presist]);

  return [presist, setPresist];
};
