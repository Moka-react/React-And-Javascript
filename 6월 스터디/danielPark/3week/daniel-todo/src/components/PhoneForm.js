import React, { useState } from 'react';

function PhoneForm({ addPhone }) {
  const [value, setValue] = useState({ mfg: '', product: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (!value.mfg || !value.product) return;
    addPhone(value);
    setValue({ mfg: '', product: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="mfg">mfg: </label>
      <input
        name="mfg"
        id="mfg"
        type="text"
        className="input"
        value={value.mfg}
        placeholder="Enter manufacturer"
        onChange={e => setValue({ ...value, mfg: e.target.value })}
      />
      <label htmlFor="product">product: </label>
      <input
        name="product"
        id="product"
        type="text"
        className="input"
        value={value.product}
        placeholder="Enter product"
        onChange={e => setValue({ ...value, product: e.target.value })}
      />
      <input type="submit"/>
    </form>
  );
}

export default PhoneForm
