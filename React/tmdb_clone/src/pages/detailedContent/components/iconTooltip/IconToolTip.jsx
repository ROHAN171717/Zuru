import { Tooltip } from '@mui/material';
import './iconToolTIp.css';
import React from 'react';

function IconToolTip({ title, icon }) {
  return (
    <Tooltip
      title={title}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: '#032541',
            fontSize: '15px',
            '& .MuiTooltip-arrow': {
              color: '#032541',
            },
          },
        },
      }}
    >
      <span className="img_wrapper">
        <img src={icon} alt="thumbnails_list" />
      </span>
    </Tooltip>
  );
}

export default IconToolTip;
