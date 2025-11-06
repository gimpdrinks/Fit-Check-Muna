/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { KeyIcon } from './icons';

interface ApiKeyScreenProps {
  onSelectKey: () => void;
  error?: string | null;
}

const ApiKeyScreen: React.FC<ApiKeyScreenProps> = ({ onSelectKey, error }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-brand-light p-4 font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col items-center text-center bg-white shadow-xl rounded-2xl p-8 border border-brand-dark/10">
        <div className="p-4 bg-brand-blue/10 rounded-full mb-6">
            <KeyIcon className="w-10 h-10 text-brand-blue" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark leading-tight">
          API Key Required
        </h1>
        <p className="mt-4 text-md text-brand-dark/70">
          To use this interactive demo, you'll need to use your own Google AI API key. The key is used only for this session to power the AI features.
        </p>

        {error && (
            <div className="bg-brand-red/10 text-brand-red p-3 mt-6 rounded-md text-sm font-medium w-full" role="alert">
                {error}
            </div>
        )}

        <button 
            onClick={onSelectKey} 
            className="w-full mt-8 relative flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-brand-blue rounded-md cursor-pointer group hover:bg-brand-blue/90 transition-colors"
        >
            Select API Key
        </button>
        <p className="text-xs text-brand-dark/50 mt-4">
            For more details on API key usage and billing, please see the{' '}
            <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue hover:underline"
            >
                official documentation
            </a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyScreen;
