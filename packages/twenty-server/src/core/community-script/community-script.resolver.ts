import { Resolver, Query } from '@nestjs/graphql';

import { EnvironmentService } from 'src/integrations/environment/environment.service';

import { CommunityScript } from './community-script.entity';

@Resolver()
export class CommunityScriptResolver {
  constructor(private environmentService: EnvironmentService) {}

  @Query(() => CommunityScript)
  async communityScript(): Promise<CommunityScript> {
    const communityScript: CommunityScript = {
      success: true,
    };

    return Promise.resolve(communityScript);
  }
}
