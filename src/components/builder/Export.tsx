import React from 'react';
import { Portfolio } from '../../types';
import { Download, Globe, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Props {
  portfolio: Portfolio;
}

export function Export({ portfolio }: Props) {
  const exportAsWebsite = async () => {
    // Create a deployable version of the portfolio
    const deployData = {
      portfolio,
      timestamp: new Date().toISOString(),
    };

    // Download as a JSON file that can be used to deploy
    const dataStr = JSON.stringify(deployData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-${portfolio.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = async () => {
    const element = document.querySelector('.portfolio-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element as HTMLElement);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${portfolio.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadSource = () => {
    const portfolioData = {
      ...portfolio,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };

    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-source.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={exportAsWebsite}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors group"
          >
            <Globe className="h-8 w-8 mb-3 group-hover:text-blue-500" />
            <span className="font-medium">Export as Website</span>
            <span className="text-sm text-gray-500 mt-1">Get deployable version</span>
          </button>

          <button
            onClick={exportAsPDF}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors group"
          >
            <FileText className="h-8 w-8 mb-3 group-hover:text-blue-500" />
            <span className="font-medium">Export as PDF</span>
            <span className="text-sm text-gray-500 mt-1">Download PDF version</span>
          </button>

          <button
            onClick={downloadSource}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors group"
          >
            <Download className="h-8 w-8 mb-3 group-hover:text-blue-500" />
            <span className="font-medium">Download Source</span>
            <span className="text-sm text-gray-500 mt-1">Get source files</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Tips</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Website export includes all your portfolio data in a deployable format</li>
          <li>PDF export creates a professional document suitable for sharing</li>
          <li>Source download includes all your portfolio data for backup or transfer</li>
        </ul>
      </div>
    </div>
  );
}