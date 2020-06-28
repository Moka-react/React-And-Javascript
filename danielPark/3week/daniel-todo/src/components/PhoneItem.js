import React from 'react';

function PhoneItem ({ phone, index, checkPhone, removePhone }) {
  return (
    <div
      className="phone"
      style={{ textDecoration: phone.isSold ? "line-through" : "" }}
    >{phone.mfg}, {phone.product}
      <div>
        <button onClick={() => checkPhone(index)}>Sold</button>
        <button onClick={() => removePhone(index)}>X</button>
      </div>
    </div>
  )
}

export default PhoneItem
