import React, { useState } from 'react';
import Joyride from 'react-joyride';

const JoyrideTutorial = () => {
  const [runTutorial, setRunTutorial] = useState(true);

  const steps = [
    {
      target: '.step-1',
      content: 'Step 1: This is the first step of the tutorial.',
    },
    {
      target: '.step-2',
      content: 'Step 2: This is the second step of the tutorial.',
    },
    {
      target: '.step-3',
      content: 'Step 3: This is the final step of the tutorial.',
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if ([Joyride.STATUS.FINISHED, Joyride.STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
    }
  };

  return (
    <div>
      <h1>React Joyride Tutorial</h1>
      <button onClick={() => setRunTutorial(true)}>Start Tutorial</button>
      <div className="step-1">Step 1 Content</div>
      <div className="step-2">Step 2 Content</div>
      <div className="step-3">Step 3 Content</div>
      <Joyride
        steps={steps}
        run={runTutorial}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
      />
    </div>
  );
};

export default JoyrideTutorial;
