import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuickActionsService } from 'src/core/quick-actions/quick-actions.service';
import { WorkspaceQueryRunnerModule } from 'src/workspace/workspace-query-runner/workspace-query-runner.module';
import { CommunityScriptModule } from 'src/core/community-script/community-script.module';
import { QuickActionsResolver } from 'src/core/quick-actions/quick-actions.resolver';

@Module({
  imports: [WorkspaceQueryRunnerModule, HttpModule, CommunityScriptModule],
  controllers: [],
  providers: [QuickActionsService, QuickActionsResolver],
  exports: [QuickActionsService],
})
export class QuickActionsModule {}
