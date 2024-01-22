import { Resolver, Query } from '@nestjs/graphql';

import { QuickActionsService } from 'src/core/quick-actions/quick-actions.service';
import { AuthWorkspace } from 'src/decorators/auth-workspace.decorator'; // Import the AuthWorkspace decorator

import { QuickAction } from './quick-action.entity';

@Resolver()
export class QuickActionsResolver {
  constructor(private quickActionsService: QuickActionsService) {}

  @Query(() => [QuickAction])
  async quickActions(
    @AuthWorkspace() workspaceId: string,
  ): Promise<QuickAction[]> {
    // Add the workspaceId parameter with the AuthWorkspace decorator
    const quickActions: QuickAction[] =
      await this.quickActionsService.getQuickActions(workspaceId); // Pass the workspaceId argument here

    return Promise.resolve(quickActions);
  }
}
