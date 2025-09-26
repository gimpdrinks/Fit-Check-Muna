/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-3 px-4 md:px-8 bg-brand-light/80 backdrop-blur-md border-b border-brand-dark/10 sticky top-0 z-40">
      <div className="flex items-center gap-4">
          <img 
            src="https://res.cloudinary.com/dbylka4xx/image/upload/v1751883360/AiForPinoys_Logo_ttg2id.png" 
            alt="AiForPinoys Logo" 
            className="h-10" 
          />
          <div className="w-px h-8 bg-gray-200" />
          <h1 className="text-2xl font-serif tracking-widest text-brand-dark">
            Fit Check Muna Tayo
          </h1>
      </div>
    </header>
  );
};

export default Header;