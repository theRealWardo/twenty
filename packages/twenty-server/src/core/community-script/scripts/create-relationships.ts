/*
import { Script } from '../interface/_global';

type arguments = {
  sourceObject: Record<string, unknown>;
  sourceField: string;
  sourceTargetIdentifier: string;
  targetModel: string;
  targetField: string;
};

export const script: Script<arguments> = {
  name: 'Create Relationships',
  author: 'Core Team',
  description:
    'Create relationships between objects based on existing keys (Similar to VLOOKUP in Google Sheets)',

  arguments: {
    sourceObject: {
      name: 'Source Object',
      description: 'Object where you want to create the relationship',
      placeholder: 'people',
    },
    sourceField: {
      name: 'Source Field',
      description:
        'Field on the source object that that holds the temporary key',
      placeholder: 'companyIdOnSalesforce',
    },
    sourceTargetIdentifier: {
      name: 'Target Identifier on Source Object',
      description: 'Field on the source object that holds the relationship key',
      placeholder: 'people',
    },
    targetModel: {
      name: 'Target object',
      description: 'Object that you want to link to the source object',
      placeholder: 'companies',
    },
    targetField: {
      name: 'Target Field',
      description: 'Field on the target object that holds the temporary key',
      placeholder: 'InOnSalesforce',
    },
  },
};

export const main = ({
  sourceObject,
  sourceField,
  sourceTargetIdentifier,
  targetModel,
  targetField,
}: arguments) => {
  const targetRecord = targetModel.where(
    targetField,
    '=',
    sourceObject.sourceField,
  );

  if (targetRecord) {
    sourceObject.sourceTargetIdentifier = targetRecord.id;
    sourceObject.save();
  }
};
*/
