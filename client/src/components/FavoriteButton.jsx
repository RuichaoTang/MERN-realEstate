import { FaStar } from 'react-icons/fa'; // 使用 react-icons 图标库
import { useLocation } from 'react-router-dom';

const FavButtons = () => {
  // 收藏/取消收藏的按钮点击事件
const handleFavorite = async () => {
    const location = useLocation();

    console.log(location); // 打印 URL 相关信息
    

    try {
      const response = await fetch('/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId }),
      });
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="fixed top-16 sm:top-32 left-0 w-full flex justify-center z-50">
      <div className="max-w-6xl w-full flex justify-end items-center">
        {/* 图片按钮 */}
        <button
            onClick={handleFavorite}
          className="bg-yellow-500 text-white p-3 rounded-lg shadow-lg hover:bg-yellow-400 active:scale-95 transition-all duration-200 mr-5"
          title="Save"
        >
          <FaStar className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FavButtons;