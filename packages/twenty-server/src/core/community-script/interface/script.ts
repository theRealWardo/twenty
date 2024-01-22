import { QuickAction } from 'src/core/quick-actions/quick-action.entity';

export type Script = {
  name: string;
  author: string;
  quickAction?: QuickAction;
};
