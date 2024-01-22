import { Client } from 'twenty-sdk';
import { v4 as uuidv4 } from 'uuid';

import { capitalize } from 'src/utils/capitalize';
import { isWorkEmail } from 'src/utils/is-work-email';
import { Script } from 'src/core/community-script/interface/script';

export default async function (client: Client, id: string): Promise<void> {
  const personRequest = await client.query
    .setOperationType('query')
    .setOperationName('personCollection')
    .setSelectFields(['id', 'email', 'companyId'])
    .setVariables({ filter: { id: { eq: id } } })
    .execute();

  const person = personRequest.data?.personCollection?.edges?.[0]?.node;

  if (!person) {
    return;
  }

  if (!person.companyId && person.email && isWorkEmail(person.email)) {
    const companyDomainName = person.email.split('@')?.[1].toLowerCase();
    const companyName = capitalize(companyDomainName.split('.')[0]);
    let relatedCompanyId = uuidv4();

    // Query existing company
    const existingCompany = await client.query
      .setOperationType('query')
      .setOperationName('companyCollection')
      .setSelectFields(['id'])
      .setVariables({ filter: { domainName: { eq: companyDomainName } } })
      .execute();

    if (existingCompany.data?.companyCollection?.edges?.length) {
      relatedCompanyId =
        existingCompany.data.companyCollection.edges[0].node.id;
    }

    // Insert into companyCollection
    await client.query
      .setOperationType('mutation')
      .setOperationName('insertIntocompanyCollection')
      .setSelectFields(['affectedCount', 'records', 'id'])
      .setVariables({
        objects: [
          {
            id: relatedCompanyId,
            name: companyName,
            domainName: companyDomainName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })
      .execute();

    // Update personCollection
    await client.query
      .setOperationType('mutation')
      .setOperationName('updatepersonCollection')
      .setSelectFields(['affectedCount', 'records', 'id'])
      .setVariables({
        set: { companyId: relatedCompanyId },
        filter: { id: { eq: person.id } },
      })
      .execute();
  }
}

export const config: Partial<Script> = {
  quickAction: {
    label: 'Email -> Company',
    icon: 'enrich',
    objectNameSingular: 'company',
    name: 'create-company-from-email',
  },
};
