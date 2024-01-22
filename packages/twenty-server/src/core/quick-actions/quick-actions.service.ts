import { Injectable } from '@nestjs/common';

import { ObjectMetadataInterface } from 'src/metadata/field-metadata/interfaces/object-metadata.interface';

import { QuickAction } from 'src/core/quick-actions/quick-action.entity';
import { CommunityScriptService } from 'src/core/community-script/community-script.service';

@Injectable()
export class QuickActionsService {
  constructor(private communityScriptService: CommunityScriptService) {}

  async getQuickActions(workspaceId: string) {
    const actions: QuickAction[] = [
      // Later we can add quick actions from other sources than just scripts
    ];

    const scriptActions =
      await this.communityScriptService.getQuickActions(workspaceId);

    actions.push(...scriptActions);

    return actions;
  }

  async handleRequest(
    nameSingular: string,
    id: string,
    workspaceId: string,
    actionName: string,
    objectMetadataItem: ObjectMetadataInterface,
    objectMetadataItemCollection: ObjectMetadataInterface[],
  ) {
    const actions = await this.getQuickActions(workspaceId);

    const action = actions.find(
      (item) =>
        item.objectNameSingular === nameSingular && item.name === actionName,
    );

    if (!action) {
      return;
    }

    if (objectMetadataItem) {
      objectMetadataItemCollection = [objectMetadataItem];
    }

    objectMetadataItemCollection.map((item) => {
      this.communityScriptService.runScript(workspaceId, action.name, {
        id: item.id,
      });
    });
  }
}
