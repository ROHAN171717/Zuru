import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// function valuetext(value) {
//   return `Rated ${value}`;
// }

function RangeSlider({ values }) {
  const handleChange = (event, newValue) => {
    values.setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Slider
        value={values.val}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={values.valueLabelFormate(values.val)}
        marks={values.marks}
        min={values.min}
        max={values.max}
        step={values.step}
        sx={{
          width: '90%',
          '& .MuiSlider-track': {
            color: '#01b4e4',
          },
          '& .MuiSlider-rail': {
            color: '#a4a4a4',
          },
          '& .MuiSlider-thumb': {
            color: '#01b4e4',
            width: 14,
            height: 14,
          },
          '& .MuiSlider-mark': {
            height: 10,
            color: '#a4a4a4',
          },
        }}
      />
    </Box>
  );
}

export default RangeSlider;
