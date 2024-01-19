import { Injectable } from '@nestjs/common';

import { ObjectMetadataInterface } from 'src/metadata/field-metadata/interfaces/object-metadata.interface';

import { QuickAction } from 'src/core/quick-actions/quick-action.entity';

@Injectable()
export class QuickActionsService {
  constructor() {}

  async getQuickActions() {
    const actions: QuickAction[] = [
      {
        label: 'Enrich w/ Twenty ',
        objects: ['company'],
        icon: 'IconClick',
        scriptName: 'enrichCompany',
      },
      {
        label: 'Email -> Company',
        objects: ['person'],
        icon: 'IconClick',
        scriptName: 'createCompanyFromEmail',
      },
    ];

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
    const actions = await this.getQuickActions();

    const action = actions.find(
      (item) =>
        item.objects.includes[nameSingular] && item.scriptName === actionName,
    );

    if (!action) {
      return;
    }

    await this[action.scriptName](
      id,
      workspaceId,
      objectMetadataItemCollection,
    );
  }
}
