import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './circularProgressbar.css';

function CircularProgressBar({ percentage, variant }) {
  return (
    <div className={`circular_progressbar ${variant}`}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={3}
        strokeWidth={7}
        styles={buildStyles({
          backgroundColor: '#081c22',
          textColor: '#fff',
          pathColor:
            percentage <= 25
              ? '#388E3C'
              : percentage <= 50
                ? '#66BB6A'
                : percentage <= 75
                  ? '#8BC34A'
                  : '#FFF176',
          trailColor: '#6F6F6F',
        })}
      />
    </div>
  );
}

CircularProgressBar.defaultProps = {
  variant: 'default',
};

export default CircularProgressBar;
