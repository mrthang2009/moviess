import styles from "./SearchBox.module.scss";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleInputChange = () => {
    const newValue = event.target.value;
    setSearchValue(newValue);
  };

  const handleKeyPress = () => {
    if (event.key === "Enter") {
      // Nếu nhấn Enter, thực hiện chuyển trang
      navigate(`/tim-kiem?keyword=${searchValue.replace(/\s+/g, "-")}`);
    }
  };

  const handleSearchClick = () => {
    // Thực hiện chuyển trang khi nhấn vào biểu tượng tìm kiếm
    navigate(`/tim-kiem?keyword=${searchValue.replace(/\s+/g, "-")}`);
  };
  return (
    <>
      <div className={styles.search_box}>
        <input
          type="text"
          name="search_input"
          id="search_input"
          placeholder="Tìm kiếm phim"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Bắt lấy sự kiện khi nhấn phím Enter
        />
        <i onClick={handleSearchClick}>
          <FiSearch />
        </i>
      </div>
      {/* <a className={styles.user} href="">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qcl_uYPM2DjJL_WO1G5gCt5VNdKyN-KezA&usqp=CAU"
          alt=""
        />
      </a> */}
    </>
  );
};

export default SearchBox;
