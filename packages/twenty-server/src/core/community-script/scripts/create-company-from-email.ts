import { Client } from 'twenty-sdk';

import { ObjectMetadataInterface } from 'src/metadata/field-metadata/interfaces/object-metadata.interface';

import { capitalize } from 'src/utils/capitalize';
import { isWorkEmail } from 'src/utils/is-work-email';
import { v4 as uuidv4 }  from 'uuid';

export default async function(
  client: Client,
  id: string,
  workspaceId: string,
  objectMetadataItemCollection: ObjectMetadataInterface[],
): Promise<void> {
    const personObjectMetadata = objectMetadataItemCollection.find(
        (item) => item.nameSingular === 'person',
      );
  
      if (!personObjectMetadata) {
        return;
      }
    
      // Query the person
      const personRequest = await client.query
        .setOperationType('query')
        .setOperationName('personCollection')
        .selectFields(['id', 'email', 'companyId'])
        .setVariables({ filter: { id: { eq: id } } })
        .executeQuery();
  
      const person = personRequest.data?.personCollection?.edges?.[0]?.node;
  
      if (!person) {
        return;
      }
  
      
    if (!person.companyId && person.email && isWorkEmail(person.email)) {
        const companyDomainName = person.email.split('@')?.[1].toLowerCase();
        const companyName = capitalize(companyDomainName.split('.')[0]);
        let relatedCompanyId = uuidv4();
  
        const companyObjectMetadata = objectMetadataItemCollection.find(
          (item) => item.nameSingular === 'company',
        );
  
        if (!companyObjectMetadata) {
          return;
        }
  
        // Query existing company
        const existingCompany = await client.query
          .setOperationType('query')
          .setOperationName('companyCollection')
          .selectFields(['id'])
          .setVariables({ filter: { domainName: { eq: companyDomainName } } })
          .executeQuery();
  
        if (existingCompany.data?.companyCollection?.edges?.length) {
          relatedCompanyId = existingCompany.data.companyCollection.edges[0].node.id;
        }
  
        // Insert into companyCollection
        await client.query
          .setOperationType('mutation')
          .setOperationName('insertIntocompanyCollection')
          .selectFields(['affectedCount', 'records', 'id'])
          .setVariables({ objects: [{ id: relatedCompanyId, name: companyName, domainName: companyDomainName, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }] })
          .executeQuery();
  
        // Update personCollection
        await client.query
          .setOperationType('mutation')
          .setOperationName('updatepersonCollection')
          .selectFields(['affectedCount', 'records', 'id'])
          .setVariables({ set: { companyId: relatedCompanyId }, filter: { id: { eq: person.id } } })
          .executeQuery();
      }
    }
}  