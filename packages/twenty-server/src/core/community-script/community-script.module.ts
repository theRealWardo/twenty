import { Module } from '@nestjs/common';

import { CommunityScriptResolver } from './community-script.resolver';

@Module({
  providers: [CommunityScriptResolver],
})
export class CommunityScriptModule {}
