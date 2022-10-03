import { createContext, useState } from 'react';
import axios from '../utils/axios';

const AiContext = createContext({
  isLoading: false,
  responseData: [],
  getResponseData: () => {},
});

export function AiContextProvider(props) {
  const [isLoading, setIsLoding] = useState([true]);
  const [responseData, setResponseData] = useState([]);

  const responseDataHandler = async () => {
    // console.log('실행2');
    await axios
      .get('auths/trend')
      .then((response) => {
        setResponseData(response.data);
        // console.log(response.data);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const context = {
    isLoading: isLoading,
    responseData: responseData,
    getResponseData: responseDataHandler,
  };

  return (
    <AiContext.Provider value={context}>{props.children}</AiContext.Provider>
  );
}

export default AiContext;
