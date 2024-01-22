import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';

import path from 'path';

import { Client } from 'twenty-sdk';
import { v4 as uuidv4 } from 'uuid';

import { QuickAction } from 'src/core/quick-actions/quick-action.entity';
import { EnvironmentService } from 'src/integrations/environment/environment.service';
import completeWithAi from 'src/core/community-script/scripts/complete-with-ai';
import createCompanyFromEmail from 'src/core/community-script/scripts/create-company-from-email';
import enrichCompanyWithTwenty from 'src/core/community-script/scripts/enrich-company-with-twenty';

@Injectable()
export class CommunityScriptService {
  private scripts: any;
  private scriptsDir = path.join(__dirname, './scripts');
  private client: Client;

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async getClient(workspaceId) {
    if (!this.client) {
      const token = await this.generateShortLivedToken(workspaceId);

      if (!token) {
        throw new Error('No token');
      }

      const baseUrl =
        this.environmentService.getServerUrl() ||
        `${this.request.protocol}://${this.request.get('host')}`;

      const graphqlServerURL = baseUrl + '/graphql';

      this.client = new Client(token.token, graphqlServerURL);
    }

    return this.client;
  }

  async getScripts() {
    if (!this.scripts) {
      this.scripts = await this.loadScripts();
    }

    return this.scripts;
  }

  async getQuickActions(workspaceId: string): Promise<QuickAction[]> {
    if (!workspaceId) {
      // TODO: implement feature flags
    }

    const quickActions: QuickAction[] = [
      {
        label: 'Enrich company',
        objectNameSingular: 'company',
        name: 'enrichCompanyWithTwenty',
        icon: 'IconWand',
      },
    ];

    return quickActions;
  }

  private async loadScripts() {
    const scripts = {
      completeWithAi: completeWithAi,
      createCompanyFromEmail: createCompanyFromEmail,
      enrichCompanyWithTwenty: enrichCompanyWithTwenty,
    };

    return scripts;
  }

  async runScript(workspaceId: string, scriptName: string, scriptParams: any) {
    const scripts = await this.getScripts();

    const script = scripts[scriptName];

    if (!script) {
      return;
    }
    const client = await this.getClient(workspaceId);

    return script(client, scriptParams);
  }

  private generateShortLivedToken(workspaceId: string) {
    const jwtPayload = {
      sub: workspaceId,
    };
    const secret = this.environmentService.getAccessTokenSecret();

    const expiresIn = 1000; // ms

    const token = this.jwtService.sign(jwtPayload, {
      secret,
      expiresIn,
      jwtid: uuidv4(),
    });

    return { token };
  }
}
