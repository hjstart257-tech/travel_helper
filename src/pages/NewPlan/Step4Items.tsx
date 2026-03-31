import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { Camera, X, Check, Plus, Loader2, Trash2 } from 'lucide-react';
import { useStore, Item } from '@/store/useStore';
import { recognizeItemsFromImage } from '@/lib/gemini';

export default function Step4Items() {
  const navigate = useNavigate();
  const updateDraftPlan = useStore(state => state.updateDraftPlan);
  const draftPlan = useStore(state => state.draftPlan);
  
  const [items, setItems] = useState<Item[]>(draftPlan.items || []);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      processImage(imageSrc);
    }
  }, [webcamRef]);

  const processImage = async (imageSrc: string) => {
    setIsRecognizing(true);
    try {
      const recognized = await recognizeItemsFromImage(
        imageSrc, 
        draftPlan.scenario || 'general', 
        'unknown'
      );
      
      const newItems: Item[] = recognized.map((item: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: item.item_name,
        category: item.category,
        sizeLevel: item.size_level,
        quantity: 1,
        isHighFrequency: item.priority === 'high',
        isFragile: item.is_fragile,
        isLiquid: item.is_liquid,
        isWrinkleProne: item.is_wrinkle_prone,
        aiConfidence: item.confidence,
        imageUri: imageSrc
      }));
      
      setItems(prev => [...prev, ...newItems]);
    } catch (error) {
      console.error(error);
      alert('识别失败，请重试或手动添加');
    } finally {
      setIsRecognizing(false);
      setIsCameraOpen(false);
      setCapturedImage(null);
    }
  };

  const handleNext = () => {
    updateDraftPlan({ items });
    navigate('/new/layout');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">添加物品</h2>
        <p className="text-gray-500 mb-6">拍照让 AI 自动识别，或手动添加</p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
              <Camera size={32} />
            </div>
            <p className="text-gray-500 font-medium">还没有添加任何物品</p>
            <p className="text-sm text-gray-400 mt-1">点击下方按钮开始拍照识别</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                {item.imageUri ? (
                  <img src={item.imageUri} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    <Plus size={20} />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-1 flex gap-2">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.category}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.sizeLevel}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-12">
        <div className="flex gap-3">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 active:bg-blue-50 transition-colors"
          >
            <Camera size={24} />
            拍照识别
          </button>
          <button
            onClick={handleNext}
            disabled={items.length === 0}
            className={`flex-1 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all ${
              items.length > 0 
                ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            生成方案
          </button>
        </div>
      </div>

      {/* Camera Overlay */}
      <AnimatePresence>
        {isCameraOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="absolute inset-0 z-50 bg-black flex flex-col"
          >
            <div className="flex justify-between items-center p-6 text-white absolute top-0 w-full z-10">
              <button onClick={() => setIsCameraOpen(false)} className="p-2 bg-black/50 rounded-full backdrop-blur-md">
                <X size={24} />
              </button>
              <div className="font-medium bg-black/50 px-4 py-1 rounded-full backdrop-blur-md">
                对准物品拍照
              </div>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
              {capturedImage ? (
                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
              ) : (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "environment" }}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Scanning Overlay */}
              {isRecognizing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                  <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
                  <p className="text-lg font-medium">AI 正在识别物品...</p>
                  <p className="text-sm text-gray-300 mt-2">请稍候，这可能需要几秒钟</p>
                </div>
              )}
            </div>

            {!isRecognizing && !capturedImage && (
              <div className="p-8 pb-12 flex justify-center bg-black">
                <button 
                  onClick={capture}
                  className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition-transform"></div>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
