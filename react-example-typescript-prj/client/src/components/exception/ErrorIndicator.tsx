import { useNavigate } from "react-router-dom";

interface ErrorIndicatorProps {
  errorMessage: unknown | null;
}

const ErrorIndicator = ({ errorMessage }: ErrorIndicatorProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // 홈 경로로 이동
  };

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex flex-col justify-center items-center h-[500px] "
      role="alert"
    >
      <div>
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">
          {String(errorMessage) || "알수 없는 에러가 발생 했습니다."}
        </span>
      </div>
      <div>
        <button
          onClick={handleGoHome}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default ErrorIndicator;
