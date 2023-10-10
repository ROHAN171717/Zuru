import * as React from "react";
import "./selectMenu.css";
import { usePopper } from "react-popper";
import { Portal } from "../portal/Portal";
import WatchProvider from "../watchProvider/WatchProvider";

export default function SelectMenu({ items, title, menuWidth = 230, region = '', setRegion = '' }) {
  // console.log(items);

  // const [referenceElement, setReferenceElement] = React.useState();
  // const [popperElement, setPopperElement] = React.useState();

  const [isSelectMenuOpen, setIsSelectMenuOpen] = React.useState(false);
  const [filteredItems, setFilteredItems] = React.useState(items);


  const referenceElement = React.useRef();
  const popperElement = React.useRef();

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 0],
          },
        },
      ],
    }
  );

  const [selectedCategory, setSelectedCategory] = React.useState(
    items[0]?.name || items[0]?.english_name
  );

  function handleFilter(value) {
    const newArr = items.filter(
      (item) =>
        item.english_name
          .toLowerCase()
          .replace(" ", "")
          .indexOf(value.toLowerCase().replace(" ", "")) > -1
    );
    setFilteredItems(newArr);
  }

  return (
    <div>
      <div className="select_menu" ref={referenceElement}>
        <div className="select_menu_inner">
          <p
            className="selected"
            onClick={(e) => {
              e.stopPropagation();
              setIsSelectMenuOpen(!isSelectMenuOpen);
            }}
          >
            <span style={{ display: "flex" }}>
              {title === "country" && (
                <img
                  src={`https://flagcdn.com/w20/${region.toLowerCase()}.png`}
                  style={{ marginRight: "10px" }}
                />
              )}
              {selectedCategory}
            </span>
            <span
              className="dropdown_icon"
              style={{
                transform: isSelectMenuOpen ? "rotate(90deg)" : "rotate(0)",
              }}
            ></span>
          </p>
        </div>
      </div>

      <Portal>
        <div
          ref={popperElement}
          className="select_menu_items_wrapper"
          style={{
            display: isSelectMenuOpen ? "block" : "none",
            width: menuWidth,
            ...styles.popper,
          }}
          {...attributes.popper}
        >
          {title === "country" && (
            <div className="searchbar">
              <input
                type="text"
                className="search_input"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>
          )}
          <ul className="select_menu_items">
            {filteredItems.map((item) => {
              const value = item.value || item.iso_3166_1;
              const name = item.name || item.english_name;
              return (
                <li
                  className={`select_menu_item ${
                    selectedCategory === name ? "selected_item" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    {
                      title === "country" &&
                        setRegion(item.iso_3166_1);
                    }
                    setSelectedCategory(name);
                    setIsSelectMenuOpen(!isSelectMenuOpen);
                  }}
                >
                  {title === "country" && (
                    <img
                      src={`https://flagcdn.com/w20/${item?.iso_3166_1.toLowerCase()}.png`}
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  {name}
                </li>
              );
            })}
          </ul>

        </div>
      </Portal>
    </div>
  );
}
