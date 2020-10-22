// custom hook
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import API from '../api-service';

function useFetch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState('');
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setErrorLoading('');
      const fetchedData = await API.getMovies(token).catch((err) =>
        setErrorLoading(err),
      );
      setData(fetchedData);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return [data, isLoading, errorLoading];
}

export default useFetch;
