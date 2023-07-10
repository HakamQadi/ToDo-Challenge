import Axios from 'axios';
import React, { useState } from 'react';

const Input = (props) => {
  const [data, setData] = useState('');

  const setValue = (e) => {
    const value = e.target.value;
    setData(value);
    sendDataToParent(value);

  };

  const sendDataToParent = (value) => {
    props.myFunc(value);
  };

  // POST data to my server
  const postServerData = async () => {
    try {
      await Axios.post('http://localhost:8080', { text: data });
      setData('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: '50%' }}>
      <input type="text" value={data} onChange={setValue} />
      <input type="submit" value="ADD" onClick={postServerData} />
    </div>
  );
};

export default Input;
