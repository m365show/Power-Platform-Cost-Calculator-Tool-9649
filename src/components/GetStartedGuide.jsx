import React from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig, getUserId } from '../config/questConfig';

function GetStartedGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <GetStarted
        questId={questConfig.GET_STARTED_QUESTID}
        uniqueUserId={getUserId()}
        accent={questConfig.PRIMARY_COLOR}
        autoHide={false}
      >
        <GetStarted.Header />
        <GetStarted.Progress />
        <GetStarted.Content />
        <GetStarted.Footer />
      </GetStarted>
    </div>
  );
}

export default GetStartedGuide;