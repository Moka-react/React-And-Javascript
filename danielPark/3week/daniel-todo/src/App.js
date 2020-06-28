import React, { useState } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneItem from './components/PhoneItem';
import './App.css';


function App() {
  const [phones, setPhones] = useState([
    { mfg: 'Apple', product: 'iPhone 11 Pro', isSold: false },
    { mfg: 'Apple', product: 'iPhone 11', isSold: false },
    { mfg: 'Apple', product: 'iPhone XS', isSold: false },
    { mfg: 'Samsung', product: 'Galaxy 20', isSold: false },
    { mfg: 'Samsung', product: 'Galaxy 20e', isSold: false },
    { mfg: 'Samsung', product: 'Galaxy 10 pro', isSold: false },
    { mfg: 'LG', product: 'Velvet', isSold: false }
  ]);

  const addPhone = item => {
    const newPhone = [...phones, item];
    setPhones(newPhone);
  };

  const checkPhone = index => {
    const newPhones = [...phones];
    newPhones[index].isSold = true;
    setPhones(newPhones);
  };

  const removePhone = index => {
    const newPhones = [...phones];
    newPhones.splice(index, 1);
    setPhones(newPhones);
  };

  return (
    <div className="app">
      <h1>Smartphone Stock</h1>
      <div className="phone-list">
        { phones.map((phone, index) => (
          <PhoneItem
            key={index}
            index={index}
            phone={phone}
            checkPhone={checkPhone}
            removePhone={removePhone}
          />
        )) }
        <PhoneForm addPhone={addPhone} />
      </div>
    </div>
  );
}

export default App;
