import { Resolver, Query } from '@nestjs/graphql';

import { EnvironmentService } from 'src/integrations/environment/environment.service';
import { QuickActionsService } from 'src/core/quick-actions/quick-actions.service';

import { QuickAction } from './quick-action.entity';

@Resolver()
export class CommunityScriptResolver {
  constructor(
    private environmentService: EnvironmentService,
    private quickActionsService: QuickActionsService,
  ) {}

  @Query(() => [QuickAction])
  async quickActions(): Promise<QuickAction[]> {
    const quickActions: QuickAction[] =
      await this.quickActionsService.getQuickActions();

    return Promise.resolve(quickActions);
  }
}
