import { FaArrowLeft } from 'react-icons/fa'; // 使用 react-icons 图标库


const BackButton = () => {
  const goBack = () => {
    window.history.back(); // 返回上一个页面
  };


  return (
    
        <button
          onClick={goBack}
          className="text-white p-3 rounded-full shadow-lg bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-800 transition-all duration-300 active:scale-95"
          title="Go Back"
        >
          <FaArrowLeft className="w-6 h-6" />
        </button>
   
  );
};

export default BackButton;