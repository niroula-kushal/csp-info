import React from 'react';
import { CSPGuide, cspGuides } from '../data/cspGuides';
import * as Icons from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CSPGuideDisplayProps {
  frameworkId: string;
}

const CSPGuideDisplay: React.FC<CSPGuideDisplayProps> = ({ frameworkId }) => {
  const guide = cspGuides.find((g) => g.frameworkId === frameworkId);

  if (!guide) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <Icons.AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Guide not found</h3>
        <p className="text-gray-500 mt-2">
          We don't have a CSP guide for this framework yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Implementation</h3>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter style={docco}>
          {guide.implementation}
            </SyntaxHighlighter>
            <code className="text-sm"></code>
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Example</h3>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <SyntaxHighlighter language="python" style={docco}>
              {guide.example}
            </SyntaxHighlighter>
            <code className="text-sm"></code>
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Best Practices</h3>
          <ul className="space-y-2">
            {guide.bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icons.CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CSPGuideDisplay;