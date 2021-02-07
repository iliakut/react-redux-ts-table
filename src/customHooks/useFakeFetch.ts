import data from '../data.json';
import { useEffect, useState } from 'react';
import { RowFirm } from '../types/types';

const fakePromise = (): Promise<RowFirm[]> => {
  const delay = Math.random() * 1000;
  const isResolve = delay < 900; // 90% success

  return new Promise((resolve, reject) => {
    if (isResolve) {
      return setTimeout(() => {
        resolve(data);
      }, delay)
    }

    reject({ error: 'Error fetching data' });
  });
}

type fakeFetch = {
  response: RowFirm[]
  error: { error: string } | null
  isLoading: boolean
}

const useFakeFetch = (): fakeFetch => {
  const [response, setResponse] = useState<RowFirm[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fakePromise();
        setResponse(res);
        setIsLoading(false)
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

  }, []);

  return { response, error, isLoading };
}

export default useFakeFetch;