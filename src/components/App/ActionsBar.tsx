import React from 'react';
import { Box, Button } from 'wix-style-react';
import DataHooks from './DataHooks';

export type ActionsBarProps = {
  onClearClicked: () => void;
  onSubmitClicked: () => void;
  disabled: boolean;
};

export default ({
  onClearClicked,
  onSubmitClicked,
  disabled,
}: ActionsBarProps) => (
  <Box>
    <Box marginRight="12px">
      <Button
        dataHook={DataHooks.CLEAR_BUTTON}
        priority="secondary"
        onClick={onClearClicked}
      >
        Clear
      </Button>
    </Box>
    <Button
      dataHook={DataHooks.SUBMIT_BUTTON}
      disabled={disabled}
      onClick={onSubmitClicked}
    >
      Submit
    </Button>
  </Box>
);
