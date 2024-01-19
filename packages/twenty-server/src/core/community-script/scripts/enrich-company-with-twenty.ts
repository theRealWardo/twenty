import { Client } from 'twenty-sdk/dist/client';

import {
  ObjectMetadataInterface,
  ObjectMetadataInterface,
} from 'src/metadata/field-metadata/interfaces/object-metadata.interface';

export default async function (
  id: string,
  workspaceId: string,
  objectMetadataItem: ObjectMetadataInterface,
) {
  const client = new Client('your-api-key');

  const companyRequest = await client.query
    .setOperationType('query')
    .setOperationName('companyCollection')
    .selectFields(['id', 'domainName', 'createdAt', 'linkedinLinkUrl'])
    .setVariables({ filter: { id: { eq: id } } })
    .executeQuery();

  const company = companyRequest.data?.companyCollection?.edges?.[0]?.node;

  if (!company) {
    return;
  }

  const enrichedData = await this.enrichCompanyData(company.domainName);

  await client.query
    .setOperationType('mutation')
    .setOperationName('updatecompanyCollection')
    .selectFields(['affectedCount', 'records', 'id'])
    .setVariables({ set: enrichedData, filter: { id: { eq: id } } })
    .executeQuery();
}
