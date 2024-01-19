import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuickActionsService } from 'src/core/quick-actions/quick-actions.service';
import { WorkspaceQueryRunnerModule } from 'src/workspace/workspace-query-runner/workspace-query-runner.module';
import { CommunityScriptService } from 'src/core/community-script/community-script.service';

@Module({
  imports: [WorkspaceQueryRunnerModule, HttpModule],
  controllers: [],
  providers: [QuickActionsService, CommunityScriptService],
  exports: [QuickActionsService, CommunityScriptService],
})
export class QuickActionsModule {}
