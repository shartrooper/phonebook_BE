import React from 'react';

const Modal= ({msg}) =>
{
   return msg === null?null:<div style={msg.style}>{msg.message}</div>
}

export default Modal;