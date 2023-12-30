import { useSelector, useDispatch } from "react-redux";
import "./Tab.css";
import { toggleTab } from "../redux/reducer/ProductSlice";

function Tabs() {
  const dispatch = useDispatch();
  const { isAllDisplay } = useSelector((state) => state.products);

  const handleTabClick = () => {
    dispatch(toggleTab());
  };

  return (
    <div>
      <button
        onClick={() => handleTabClick()}
        className={isAllDisplay ? "active" : ""}
      >
        전체
      </button>
      <button
        onClick={() => handleTabClick()}
        className={!isAllDisplay ? "active" : ""}
      >
        찜하기
      </button>
    </div>
  );
}

export default Tabs;
