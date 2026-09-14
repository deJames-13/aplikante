import type React from 'react';

export const CarbonFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#161616] text-[#8d8d8d] text-xs py-3 px-4 border-t border-[#393939] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-white">APLIKANTE</span>
          <span>•</span>
          <span className="font-light">Carbon Design System Compliance (v11)</span>
          <span>•</span>
          <span className="font-['IBM_Plex_Mono'] text-[#a8a8a8]">Django REST API ready</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] font-['IBM_Plex_Mono']">
          <span>Accessibility: WCAG 2.1 AA Compliant</span>
          <span>Zero-Radius Architecture</span>
        </div>
      </div>
    </footer>
  );
};
