import * as React from "react";
import "./selectMenu.css";
import Popper from "../../../../components/popper/Popper";

export default function SelectMenu({
  items,
  title,
  menuWidth,
  selectedValue,
  changeSelectedValue,
}) {
  const referenceElement = React.useRef();
  const inputRef = React.useRef();
  const [isSelectMenuOpen, setIsSelectMenuOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const selectedItem = items.find((item) => item.id === selectedValue);
  const [filteredData, setFilteredData] = React.useState([]);
  console.log("Filtered data: ", filteredData, items);
  
  console.log("Selected Item: ", selectedItem, title, selectedValue, items, isSelectMenuOpen, filteredData);

  React.useEffect(() => {
    setFilteredData(items)
  },[items])

  function handleFilter(value) {
    const newArr = items?.filter(
      (item) =>
        item?.name
          .toLowerCase()
          .replace(" ", "")
          .indexOf(value.toLowerCase().replace(" ", "")) > -1
    );
    setFilteredData(newArr);
  }
  

  return (
    <div className="select_menu">
      <div className="select_menu_inner" ref={referenceElement}>
        <p
          className="selected"
          onClick={(e) => {
            // e.stopPropagation();
            setIsSelectMenuOpen(!isSelectMenuOpen);
          }}
        >
          <span style={{ display: "flex" }}>
            {title === "country" && (
              <img
                src={`https://flagcdn.com/w20/${selectedItem?.id.toLowerCase()}.png`}
                alt="country_flag"
                style={{ marginRight: "10px" }}
              />
            )}
            {selectedItem?.name}
          </span>
          <span
            className="dropdown_icon"
            style={{
              transform: isSelectMenuOpen ? "rotate(90deg)" : "rotate(0)",
            }}
          ></span>
        </p>
      </div>

      <Popper
        referenceElement={referenceElement.current}
        isSelectMenuOpen={isSelectMenuOpen}
        width={menuWidth}
      >
        {title === "country" && (
          <div className="searchbar">
            <input
              type="text"
              className="search_input"
              ref={inputRef}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleFilter(e.target.value);
              }}
            />
          </div>
        )}
        <ul className="select_menu_items">
          {filteredData.map((item) => {
            return (
              <li
                className={`select_menu_item ${
                  selectedItem?.name === item?.name ? "selected_item" : ""
                }`}
                key={item.id}
                onClick={() => {
                  setSearchText("");
                  changeSelectedValue(item);
                  setIsSelectMenuOpen(!isSelectMenuOpen);
                  setFilteredData(items);
                }}
              >
                {title === "country" && (
                  <img
                    src={`https://flagcdn.com/w20/${item?.id.toLowerCase()}.png`}
                    alt="country_flag"
                    style={{ marginRight: "10px" }}
                  />
                )}
                {item.name}
              </li>
            );
          })}
        </ul>
      </Popper>
    </div>
  );
}
