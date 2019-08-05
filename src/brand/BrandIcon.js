import React from 'react';

export default function (props) {
  if(props.brand === "OwlAir"){
    return (
      <svg viewBox="0 0 24 24" {...props} width="24px" height="24px">
         <g data-name="Layer 2">
           <g data-name="Layer 1">
             <path d="M12 .86A11.14 11.14 0 1 1 .86 12 11.16 11.16 0 0 1 12 .86M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0z" fill="currentColor" />
             <path
               d="M18 6.3l-.28 1.11-2.6 2.88.28 2.41.28 2 .28 2-1.16 1.21-2.14-5.39-4 3c-.09.09-.19.19-.28.19l.74 2-.93.93-.84-2.14-.09-.09-1 .74-.1-.15.84-.86-.28-.28L5 14.94l1-.84 2 1.11c0-.09.09-.09.09-.19l3.34-4-.09-.09L6 7.88 7.18 7l2 .46 2 .46 2.6.65 2.78-2.27z"
               fill="currentColor"
             />
           </g>
         </g>
       </svg>
    )
  }
  return null;
}
