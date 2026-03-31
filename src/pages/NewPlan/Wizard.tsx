import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Step1Size from './Step1Size';
import Step2Scenario from './Step2Scenario';
import Step3Info from './Step3Info';
import Step4Items from './Step4Items';
import Step5Layout from './Step5Layout';

const steps = [
  { path: '', title: '选择行李箱' },
  { path: 'scenario', title: '出行场景' },
  { path: 'info', title: '行程信息' },
  { path: 'items', title: '添加物品' },
  { path: 'layout', title: '收纳方案' },
];

export default function NewPlanWizard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname.split('/').pop() || '';
  const currentIndex = steps.findIndex(s => s.path === currentPath || (currentPath === 'new' && s.path === ''));
  const currentStep = currentIndex >= 0 ? currentIndex : 0;

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between shadow-sm z-10">
        <button onClick={handleBack} className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="font-semibold text-gray-900">{steps[currentStep]?.title}</div>
        <div className="w-10 text-right text-sm text-gray-400 font-medium">
          {currentStep + 1}/{steps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: `${(currentStep / steps.length) * 100}%` }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="" element={<Step1Size />} />
            <Route path="scenario" element={<Step2Scenario />} />
            <Route path="info" element={<Step3Info />} />
            <Route path="items" element={<Step4Items />} />
            <Route path="layout" element={<Step5Layout />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
