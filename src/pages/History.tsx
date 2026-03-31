import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { format } from 'date-fns';
import { Briefcase, Plane, Luggage, ChevronRight, Trash2 } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const plans = useStore(state => state.plans);
  const deletePlan = useStore(state => state.deletePlan);

  const getIcon = (size: string) => {
    switch(size) {
      case '20': return Briefcase;
      case '28': return Plane;
      default: return Luggage;
    }
  };

  return (
    <div className="min-h-full bg-gray-50 pb-24">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">历史方案</h1>
        <p className="text-sm text-gray-500 mt-1">共 {plans.length} 个收纳方案</p>
      </div>

      <div className="p-6 space-y-4">
        {plans.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Luggage size={32} />
            </div>
            <p className="text-gray-500 font-medium">暂无历史方案</p>
            <button 
              onClick={() => navigate('/new')}
              className="mt-4 text-blue-600 font-medium px-6 py-2 bg-blue-50 rounded-full active:bg-blue-100"
            >
              去新建
            </button>
          </div>
        ) : (
          plans.map(plan => {
            const Icon = getIcon(plan.suitcaseSize);
            return (
              <div key={plan.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {format(plan.createdAt, 'yyyy年MM月dd日')}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(confirm('确定删除此方案吗？')) deletePlan(plan.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                    {plan.suitcaseSize}寸
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                    {plan.scenario}
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                    {plan.tripDays}天
                  </span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                    {plan.items.length}件物品
                  </span>
                </div>

                <button 
                  onClick={() => {
                    // In a real app, this would navigate to a read-only detail view
                    // For MVP, we'll just alert
                    alert('查看详情功能开发中');
                  }}
                  className="w-full flex items-center justify-center gap-1 py-3 bg-gray-50 text-gray-700 rounded-2xl font-medium text-sm active:bg-gray-100 transition-colors"
                >
                  查看方案 <ChevronRight size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
