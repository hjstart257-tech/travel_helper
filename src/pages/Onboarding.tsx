import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, LayoutDashboard, Maximize, Briefcase } from 'lucide-react';
import { useStore } from '@/store/useStore';

const slides = [
  {
    title: 'AI 拍照识物',
    description: '拍一张照，AI 秒识物品并给出布局方案',
    icon: Camera,
    color: 'bg-blue-500',
  },
  {
    title: '智能布局规划',
    description: '科学的三维收纳布局图与操作指引，所见即所得',
    icon: LayoutDashboard,
    color: 'bg-indigo-500',
  },
  {
    title: '多尺寸适配',
    description: '20/24/28寸均有专属分区比例规则',
    icon: Maximize,
    color: 'bg-purple-500',
  },
  {
    title: '场景个性定制',
    description: '商务差旅、家庭亲子、个人出游，不同出行类型对应不同策略',
    icon: Briefcase,
    color: 'bg-pink-500',
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const setHasSeenOnboarding = useStore(state => state.setHasSeenOnboarding);

  const handleNext = () => {
    if (current === slides.length - 1) {
      setHasSeenOnboarding(true);
      navigate('/', { replace: true });
    } else {
      setCurrent(c => c + 1);
    }
  };

  const Icon = slides[current].icon;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center px-8"
          >
            <div className={`w-40 h-40 rounded-full ${slides[current].color} flex items-center justify-center text-white mb-12 shadow-2xl`}>
              <Icon size={80} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{slides[current].title}</h1>
            <p className="text-gray-500 text-lg leading-relaxed">{slides[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          {current === slides.length - 1 ? '开始体验' : '下一步'}
        </button>
        
        {current < slides.length - 1 && (
          <button
            onClick={() => {
              setHasSeenOnboarding(true);
              navigate('/', { replace: true });
            }}
            className="w-full mt-4 text-gray-400 font-medium py-2 active:text-gray-600"
          >
            跳过
          </button>
        )}
      </div>
    </div>
  );
}
