import React from 'react';
import { Framework, frameworks } from '../data/frameworks';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface FrameworkSelectorProps {
  languageId: string;
  selectedFramework: string | null;
  onSelectFramework: (frameworkId: string) => void;
}

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
  languageId,
  selectedFramework,
  onSelectFramework,
}) => {
  const filteredFrameworks = frameworks.filter(
    (framework) => framework.languageId === languageId
  );

  if (filteredFrameworks.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <Icons.AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No frameworks found</h3>
        <p className="text-gray-500 mt-2">
          We don't have any frameworks listed for this language yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredFrameworks.map((framework) => {
        const IconComponent = (Icons as Record<string, React.FC<LucideProps>>)[
          framework.icon.charAt(0).toUpperCase() + framework.icon.slice(1)
        ] || Icons.Code;

        return (
          <button
            key={framework.id}
            onClick={() => onSelectFramework(framework.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedFramework === framework.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconComponent className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{framework.name}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FrameworkSelector;