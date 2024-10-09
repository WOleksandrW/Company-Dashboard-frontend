/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip, Typography } from '@mui/material';

interface IProps {
  children: React.ReactElement<unknown, any>;
  title: string;
}

function TooltipUsage({ children, title }: IProps) {
  return (
    <Tooltip
      title={<Typography variant="body2">{title}</Typography>}
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={2000}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: { offset: [0, -8] }
            }
          ]
        }
      }}>
      {children}
    </Tooltip>
  );
}

export default TooltipUsage;
