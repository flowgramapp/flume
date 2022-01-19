import React from 'react';
import {calculateCurve} from '../../connectionCalculator';

import styles from './Connection.module.css';

const Connection = ({from, to, id, lineRef, outputNodeId, outputPortName, inputNodeId, inputPortName, stroke}) => {
  const curve = calculateCurve(from, to);
  return (
    <svg className={styles.svg}>
      <path
        data-connection-id={id}
        data-output-node-id={outputNodeId}
        data-output-port-name={outputPortName}
        data-input-node-id={inputNodeId}
        data-input-port-name={inputPortName}
        stroke={stroke}
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        d={curve}
        ref={lineRef}
      />
    </svg>
  );
};

export default Connection;
