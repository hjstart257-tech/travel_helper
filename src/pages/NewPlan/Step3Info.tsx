import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Step3Info() {
  const navigate = useNavigate();
  const updateDraftPlan = useStore(state => state.updateDraftPlan);
  const draftPlan = useStore(state => state.draftPlan);

  const [days, setDays] = useState(draftPlan.tripDays || 3);
  const [name, setName] = useState(draftPlan.name || '');

  const handleNext = () => {
    updateDraftPlan({ 
      tripDays: days,
      name: name || `出行-${new Date().toLocaleDateString()}`
    });
    navigate('/new/items');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col p-6"
    >
      <div className="flex-1 overflow-y-auto pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">设置行程信息</h2>
        <p className="text-gray-500 mb-8">帮助我们更精准地预估所需物品数量</p>

        <div className="space-y-6">
          {/* Plan Name */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-3">方案名称 (可选)</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：三亚五日游"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Trip Days */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              旅行天数
            </label>
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-2 border border-gray-200">
              <button 
                onClick={() => setDays(Math.max(1, days - 1))}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-600 active:scale-95"
              >
                -
              </button>
              <div className="text-xl font-bold text-gray-900">{days} <span className="text-sm font-normal text-gray-500">天</span></div>
              <button 
                onClick={() => setDays(Math.min(30, days + 1))}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-600 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Destination Type (Mock) */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" />
              目的地类型 (可选)
            </label>
            <div className="flex flex-wrap gap-2">
              {['城市', '海岛', '山地', '雪地'].map(type => (
                <button key={type} className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 active:bg-gray-100">
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-8 bg-gray-50">
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          下一步
        </button>
      </div>
    </motion.div>
  );
}
