import React, {useEffect} from 'react';
import './App.css';
import useFakeFetch from './customHooks/useFakeFetch';
import { prepareData } from './helpers/businessHelpers';
import { Alert } from '@material-ui/lab';
import {useDispatch} from 'react-redux';
import { setFirms } from './features/firms/firmsSlice';
import Content from './components/Content';
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {
  const { response, error, isLoading } = useFakeFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.length && !isLoading && !error) {
      const data = prepareData(response)
      
      dispatch(setFirms(data))
    }
  }, [response, error, isLoading, dispatch])

  return (
    <div className="App">
      {
        error
          ? <Alert severity="error">{error.error}</Alert>
          : isLoading
            ? <CircularProgress style={{ marginTop: '30%' }}/>
            : <Content/>
      }
    </div>
  );
}

export default App;
