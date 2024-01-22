import { Module } from '@nestjs/common';

import { CommunityScriptService } from 'src/core/community-script/community-script.service';
import { AuthModule } from 'src/core/auth/auth.module';

import { CommunityScriptResolver } from './community-script.resolver';

@Module({
  imports: [AuthModule],
  providers: [CommunityScriptResolver, CommunityScriptService],
  exports: [CommunityScriptService],
})
export class CommunityScriptModule {}
