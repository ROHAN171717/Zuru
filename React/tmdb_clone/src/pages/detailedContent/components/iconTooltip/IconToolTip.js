import { Tooltip } from "@mui/material";
import React from "react";

const IconToolTip = ({ title, icon }) => {
  return (
    <Tooltip
      title={title}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#032541",
            fontSize: "15px",
            "& .MuiTooltip-arrow": {
              color: "#032541",
            },
          },
        },
      }}
    >
      <a href="/xyz">
        <img src={icon} alt="thumbnails_list" />
      </a>
    </Tooltip>
  );
};

export default IconToolTip;
