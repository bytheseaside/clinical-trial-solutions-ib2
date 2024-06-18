// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BreakpointOverrides } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    // This property is defined only for new shard folder
    // shared_v1 folder doesn't use the rule
    xxs: true;
  }
}
