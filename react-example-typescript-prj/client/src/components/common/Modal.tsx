interface PaginationBarProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal = ({ isOpen, onClose, imageUrl }: PaginationBarProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      <div className="relative max-w-full max-h-full p-4">
        <button
          className="absolute top-1 right-4 text-white text-6xl leading-none" // 줄간격 X
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Full Screen Modal"
          className="w-full h-full max-w-[600px] p-4 object-contain" // 이미지 크기를 조절하고 비율을 유지하도록 설정했습니다.
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default Modal;
