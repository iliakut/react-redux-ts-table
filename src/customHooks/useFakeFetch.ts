import data from '../data.json';
import { useEffect, useState } from 'react';

const fakePromise = (): Promise<Firm[]> => {
  const delay = Math.random() * 100;
  const isResolve = delay < 50; // 90% success

  return new Promise((resolve, reject) => {
    if (isResolve) {
      resolve(data);
    }

    reject({ error: 'Error fetching data' });
  });
}

type Firm = {
  id: number
  name: string
  budget: number
  budget_spent: number,
  date_of_first_purchase: string
}

type fakeFetch = {
  response: Firm[]
  error: { error: string } | null
  isLoading: boolean
}

const useFakeFetch = (): fakeFetch => {
  const [response, setResponse] = useState<Firm[]>([]);
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