import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore, LayoutBlock, PackingPlan } from '@/store/useStore';
import { generatePackingSteps } from '@/lib/gemini';
import { Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react';

export default function Step5Layout() {
  const navigate = useNavigate();
  const draftPlan = useStore(state => state.draftPlan);
  const addPlan = useStore(state => state.addPlan);
  const resetDraftPlan = useStore(state => state.resetDraftPlan);
  
  const [isGenerating, setIsGenerating] = useState(true);
  const [layout, setLayout] = useState<LayoutBlock[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [strategies, setStrategies] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const generate = async () => {
      try {
        // 1. Mock Layout Algorithm (Greedy approach based on size)
        // In a real app, this would be a complex 2D bin packing algorithm
        const generatedLayout: LayoutBlock[] = draftPlan.items?.map((item, index) => {
          // Simple mock positioning
          return {
            itemId: item.id,
            zone: item.category === '鞋履' ? '底部重物区' : '主收纳区',
            x: (index % 2) * 0.5,
            y: Math.floor(index / 2) * 0.2,
            width: 0.4,
            height: 0.15,
            rotation: 0
          };
        }) || [];
        setLayout(generatedLayout);

        // 2. Call Gemini for steps and strategies
        if (draftPlan.items && draftPlan.items.length > 0) {
          const result = await generatePackingSteps(
            draftPlan.items, 
            draftPlan.suitcaseSize || '20', 
            draftPlan.scenario || 'general'
          );
          setSteps(result.steps || []);
          setStrategies(result.strategies || []);
          setSuggestions(result.suggestions || []);
        }
      } catch (error) {
        console.error("Failed to generate layout:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generate();
  }, [draftPlan]);

  const handleSave = () => {
    const newPlan: PackingPlan = {
      id: Math.random().toString(36).substr(2, 9),
      name: draftPlan.name || `出行方案-${new Date().toLocaleDateString()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      suitcaseSize: draftPlan.suitcaseSize as any,
      scenario: draftPlan.scenario as any,
      tripDays: draftPlan.tripDays || 3,
      items: draftPlan.items || [],
      layout: layout,
    };
    
    addPlan(newPlan);
    resetDraftPlan();
    navigate('/');
  };

  if (isGenerating) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <Loader2 size={48} className="animate-spin text-blue-600 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI 正在规划布局</h2>
        <p className="text-gray-500">正在计算重心平衡与空间利用率...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Visual Layout Area (Mock) */}
        <div className="bg-gray-200 h-80 relative m-6 rounded-[40px] border-8 border-gray-300 shadow-inner overflow-hidden flex flex-col">
          <div className="absolute top-4 left-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            {draftPlan.suitcaseSize}寸 行李箱
          </div>
          
          {/* Mock Zones */}
          <div className="flex-1 border-b-2 border-dashed border-gray-300 relative p-2">
            <span className="absolute top-2 right-2 text-xs text-gray-400">主收纳区</span>
            <div className="flex flex-wrap gap-2 mt-6">
              {draftPlan.items?.filter(i => i.category !== '鞋履').map(item => (
                <div key={item.id} className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-2 text-xs text-blue-700 font-medium backdrop-blur-sm">
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="h-24 relative p-2">
            <span className="absolute top-2 right-2 text-xs text-gray-400">底部重物区</span>
            <div className="flex flex-wrap gap-2 mt-6">
              {draftPlan.items?.filter(i => i.category === '鞋履').map(item => (
                <div key={item.id} className="bg-indigo-500/20 border border-indigo-500/50 rounded-lg p-2 text-xs text-indigo-700 font-medium backdrop-blur-sm">
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategies */}
        <div className="px-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {strategies.map((strategy, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                {strategy}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="px-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Step-by-Step 装箱指南</h3>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="mx-6 bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertCircle size={18} />
              AI 追加建议
            </h3>
            <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
              {suggestions.map((sug, i) => <li key={i}>{sug}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Save size={20} />
          保存并完成
        </button>
      </div>
    </div>
  );
}
