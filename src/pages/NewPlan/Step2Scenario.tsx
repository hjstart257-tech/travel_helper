import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Briefcase, Baby, Coffee, Tent } from 'lucide-react';

const scenarios = [
  {
    id: 'business',
    name: '商务差旅',
    desc: '注重效率，正装/电子设备优先',
    icon: Briefcase,
    color: 'bg-slate-100 text-slate-700',
  },
  {
    id: 'family',
    name: '家庭亲子',
    desc: '多品类，应急物品随取随用',
    icon: Baby,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'leisure',
    name: '个人休闲',
    desc: '轻装出行，高频物品放开口',
    icon: Coffee,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'outdoor',
    name: '户外露营',
    desc: '装备重，重心平衡优先',
    icon: Tent,
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export default function Step2Scenario() {
  const navigate = useNavigate();
  const updateDraftPlan = useStore(state => state.updateDraftPlan);
  const draftPlan = useStore(state => state.draftPlan);

  const handleSelect = (scenarioId: string) => {
    updateDraftPlan({ scenario: scenarioId as any });
    navigate('/new/info');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full overflow-y-auto p-6 pb-24"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">选择出行场景</h2>
      <p className="text-gray-500 mb-8">AI 将根据场景为您定制专属收纳策略</p>

      <div className="grid grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = draftPlan.scenario === scenario.id;
          
          return (
            <button
              key={scenario.id}
              onClick={() => handleSelect(scenario.id)}
              className={`text-left p-5 rounded-3xl border-2 transition-all duration-200 flex flex-col items-start gap-4 ${
                isSelected ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-100' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${scenario.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{scenario.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{scenario.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
