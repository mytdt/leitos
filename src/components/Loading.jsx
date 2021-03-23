import React from 'react';

import './Loading.scss';

const Loading = () => (
  <div className="loading-container">
    <div className="loading-header" />

    {/* <div className="loading-select" /> */}

    <div className="loading-info">
      <div className="info-left">
        <div className="info-value" />
      </div>
      <div className="info-right">
        <div className="info-value" />
      </div>
      <div className="info-left">
        <div className="info-value" />
      </div>
    </div>

    <div className="loading-link" />
  </div>
);

export default Loading;
