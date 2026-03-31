import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Sun, Bell, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Home() {
  const navigate = useNavigate();
  const plans = useStore(state => state.plans);
  const resetDraftPlan = useStore(state => state.resetDraftPlan);

  const startNewPlan = () => {
    resetDraftPlan();
    navigate('/new');
  };

  return (
    <div className="min-h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[32px] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
              H
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hi，准备好出发了吗？</h1>
              <p className="text-sm text-gray-500">今天也是适合旅行的一天</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-100"></span>
          </button>
        </div>

        {/* Primary Action */}
        <button 
          onClick={startNewPlan}
          className="w-full bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-200 flex items-center justify-between active:scale-[0.98] transition-transform"
        >
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-1">一键新建方案</h2>
            <p className="text-blue-100 text-sm">AI 智能规划，告别收纳烦恼</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Plus size={28} />
          </div>
        </button>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm active:bg-gray-50">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <Briefcase size={20} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-sm">我的行李箱</div>
              <div className="text-xs text-gray-500">管理尺寸</div>
            </div>
          </button>
          <button className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm active:bg-gray-50">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <Sun size={20} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-sm">热门模板</div>
              <div className="text-xs text-gray-500">一键套用</div>
            </div>
          </button>
        </div>

        {/* Recent Plan */}
        {plans.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900">上次方案</h3>
              <button onClick={() => navigate('/history')} className="text-sm text-blue-600 flex items-center">
                全部 <ChevronRight size={16} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{plans[0].name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {plans[0].suitcaseSize}寸 · {plans[0].scenario} · {plans[0].items.length}件物品
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                再次使用
              </button>
            </div>
          </div>
        )}

        {/* Daily Tip */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">今日收纳小贴士</h3>
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-5 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3 backdrop-blur-sm">
                # 卷装法
              </div>
              <h4 className="font-bold text-lg mb-2">T恤卷装更省空间</h4>
              <p className="text-teal-50 text-sm leading-relaxed">
                将T恤对折后从领口向底部卷起，不仅能节省30%的空间，还能有效减少衣物褶皱。
              </p>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <Briefcase size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
