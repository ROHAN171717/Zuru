import React from 'react';
import './watchProvider.css';
import { Tooltip } from '@mui/material';
import toggleItemInArray from '../../helper';

function WatchProvider({ data, selectedItems, setSelectedItems }) {
  return (
    <div className="ott_wrapper">
      {data?.map((item) => (
        <Tooltip
          key={item.id}
          title={item?.name}
          placement="top"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                top: '5px',
                bgcolor: '#032541',
                fontSize: '15px',
                '& .MuiTooltip-arrow': {
                  color: '#032541',
                },
              },
            },
          }}
        >
          <li
            className={`ott_item ${
              selectedItems.includes(item) ? 'selected' : ''
            }`}
            onClick={() => setSelectedItems(toggleItemInArray(selectedItems, item))}
          >
            <img
              className="item_logo"
              src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
              alt="OTT_logo"
            />
            <div className="tooltip_img_wrapper">
              <span className="tooltip_img" />
            </div>
          </li>
        </Tooltip>
      ))}
    </div>
  );
}

export default WatchProvider;
