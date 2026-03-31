import { useState } from 'react';
import { Search, Star, Download } from 'lucide-react';

const templates = [
  { id: 1, name: '极简商务差旅 (3天)', category: '商务差旅', size: '20寸', items: 12, uses: 1240, rating: 4.9 },
  { id: 2, name: '海岛度假亲子游 (5天)', category: '家庭亲子', size: '28寸', items: 45, uses: 3850, rating: 4.8 },
  { id: 3, name: '周末短途露营 (2天)', category: '户外露营', size: '24寸', items: 28, uses: 890, rating: 4.7 },
  { id: 4, name: '冬季滑雪装备包', category: '特殊场景', size: '28寸', items: 18, uses: 560, rating: 4.9 },
  { id: 5, name: '女生精致出游 (7天)', category: '个人出游', size: '24寸', items: 35, uses: 5200, rating: 4.9 },
];

const categories = ['全部', '商务差旅', '家庭亲子', '个人出游', '户外露营', '特殊场景'];

export default function Templates() {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t => 
    (activeTab === '全部' || t.category === activeTab) &&
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-full bg-gray-50 pb-24">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">模板库</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索模板名称或场景..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === cat 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filteredTemplates.map(template => (
          <div key={template.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-gray-900 text-lg">{template.name}</h3>
              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-md text-xs font-bold">
                <Star size={12} className="fill-amber-500" />
                {template.rating}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">{template.category}</span>
              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">{template.size}</span>
              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">{template.items}件物品</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 font-medium">
                {template.uses.toLocaleString()} 次使用
              </div>
              <button className="flex items-center gap-1 text-blue-600 font-medium text-sm bg-blue-50 px-4 py-2 rounded-full active:bg-blue-100 transition-colors">
                <Download size={16} /> 一键应用
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
