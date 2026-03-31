import { Settings, ChevronRight, HelpCircle, Shield, Bell, Luggage } from 'lucide-react';

export default function Profile() {
  return (
    <div className="min-h-full bg-gray-50 pb-24">
      {/* Header / User Info */}
      <div className="bg-white px-6 pt-16 pb-8 rounded-b-[40px] shadow-sm">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl shadow-inner border-4 border-white">
            旅行
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">旅行者_8921</h1>
            <p className="text-sm text-gray-500 bg-gray-100 inline-block px-3 py-1 rounded-full">
              收纳达人 Lv.2
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">已创建方案</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">收藏模板</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">28</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">阅读文章</div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Luggage Management */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Luggage size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">我的行李箱</div>
                <div className="text-xs text-gray-500 mt-0.5">管理您的常用箱体尺寸</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Settings Group */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div className="font-medium text-gray-900">通知设置</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          
          <div className="h-px bg-gray-100 mx-4"></div>
          
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div className="font-medium text-gray-900">隐私与安全</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          
          <div className="h-px bg-gray-100 mx-4"></div>
          
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center">
                <HelpCircle size={20} />
              </div>
              <div className="font-medium text-gray-900">帮助与反馈</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          
          <div className="h-px bg-gray-100 mx-4"></div>
          
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center">
                <Settings size={20} />
              </div>
              <div className="font-medium text-gray-900">通用设置</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        <button className="w-full py-4 text-red-500 font-medium bg-white rounded-2xl shadow-sm border border-gray-100 active:bg-red-50 transition-colors">
          退出登录
        </button>
      </div>
    </div>
  );
}
