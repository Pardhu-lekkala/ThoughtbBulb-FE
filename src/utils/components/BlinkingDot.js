import React from "react";

import styles from "../../styles/componentStyles/blinkingDot.module.css";

function BlinkingDot({ toolTipText }) {
  return (
    <div className={styles.tooltip}>
      <svg height="100" width="100" className={styles.blinking}>
        <circle cx="50" cy="50" r="10" fill="red" />
        Sorry, your browser does not support inline SVG.
      </svg>
      <span className={styles.tooltiptext}>{toolTipText}</span>
    </div>
  );
}

export default BlinkingDot;
