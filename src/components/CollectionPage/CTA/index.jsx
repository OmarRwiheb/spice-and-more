import React from 'react';

const CTA = ({ primaryText, secondaryText }) => {
  return (
    <div className="text-center" >
      <button className="px-8 py-3 border-2 border-[#ffb400] text-white rounded-full text-lg font-semibold hover:bg-[#ffb400] transition-colors mr-4">
        {primaryText}
      </button>
      <button className="px-8 py-3 border-2 border-[#ffb400] text-white rounded-full text-lg font-semibold hover:bg-[#ffb400] transition-colors">
        {secondaryText}
      </button>
    </div>
  );
};

export default CTA; 