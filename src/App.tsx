import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import FrameworkSelector from './components/FrameworkSelector';
import CSPGuideDisplay from './components/CSPGuideDisplay';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              CSP Implementation Guide
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Select Your Programming Language
            </h2>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelectLanguage={(languageId) => {
                setSelectedLanguage(languageId);
                setSelectedFramework(null);
              }}
            />
          </section>

          {selectedLanguage && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Choose Your Framework
              </h2>
              <FrameworkSelector
                languageId={selectedLanguage}
                selectedFramework={selectedFramework}
                onSelectFramework={setSelectedFramework}
              />
            </section>
          )}

          {selectedFramework && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. CSP Implementation Guide
              </h2>
              <CSPGuideDisplay frameworkId={selectedFramework} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;