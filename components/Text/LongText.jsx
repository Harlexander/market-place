"use client"
import React, { useState } from 'react'

const LongText = ({text, maxChars}) => {
    const [showAll, setShowAll] = useState(false);
  
    if (text.length <= maxChars) {
      return <span>{text}</span>;
    }
  
    return (
      <div onClick={() => setShowAll(!showAll)} style={{whiteSpace : "pre-line"}}>
        {showAll ? text : `${text.substr(0, maxChars)}..... `}
        <button className='text-blue-500 px-5' >
          {showAll ? 'View less' : 'View more'}
        </button>
      </div>
    );
}

export default LongText