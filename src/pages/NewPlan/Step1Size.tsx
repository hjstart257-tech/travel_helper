import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Briefcase, Plane, Luggage } from 'lucide-react';

const sizes = [
  {
    id: '20',
    name: '20寸 登机箱',
    desc: '适合 1-3 天短途出行，可直接登机',
    volume: '约 35-40L',
    icon: Briefcase,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: '24',
    name: '24寸 托运箱',
    desc: '适合 4-7 天中途出行，需托运',
    volume: '约 60-65L',
    icon: Luggage,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    id: '28',
    name: '28寸 大容量',
    desc: '适合 7 天以上长途或家庭出行',
    volume: '约 90-100L',
    icon: Plane,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
];

export default function Step1Size() {
  const navigate = useNavigate();
  const updateDraftPlan = useStore(state => state.updateDraftPlan);
  const draftPlan = useStore(state => state.draftPlan);

  const handleSelect = (sizeId: string) => {
    updateDraftPlan({ suitcaseSize: sizeId as any });
    navigate('/new/scenario');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full overflow-y-auto p-6 pb-24"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">选择行李箱尺寸</h2>
      <p className="text-gray-500 mb-8">合适的箱体是完美收纳的第一步</p>

      <div className="space-y-4">
        {sizes.map((size) => {
          const Icon = size.icon;
          const isSelected = draftPlan.suitcaseSize === size.id;
          
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size.id)}
              className={`w-full text-left p-5 rounded-3xl border-2 transition-all duration-200 flex items-start gap-4 ${
                isSelected ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-100' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${size.color}`}>
                <Icon size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{size.name}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {size.volume}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{size.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-5 rounded-3xl bg-gray-100/50 border border-gray-100 border-dashed">
        <button className="w-full text-center text-gray-500 font-medium py-2 active:text-gray-700">
          + 自定义尺寸
        </button>
      </div>
    </motion.div>
  );
}
