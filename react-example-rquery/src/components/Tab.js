
import "./Tab.css";
import { useFavorite, useSetFavorite } from '../query/Favorite';

function Tabs() {
  const { data: favorite } = useFavorite();
  const setFavoriteMutation = useSetFavorite();

  const handleTabClick = () => {
    setFavoriteMutation.mutate(!favorite);
  };

  return (
    <div>
      <button
        onClick={() => handleTabClick()}
        className={!favorite ? "active" : ""}
      >
        전체
      </button>
      <button
        onClick={() => handleTabClick()}
        className={favorite ? "active" : ""}
      >
        찜하기
      </button>
    </div>
  );
}

export default Tabs;
