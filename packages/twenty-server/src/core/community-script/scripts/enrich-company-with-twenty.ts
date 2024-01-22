import { Client } from 'twenty-sdk';

import { Script } from 'src/core/community-script/interface/script';

export default async function (client: Client, id: string) {
  const companyRequest = await client.query
    .setOperationType('query')
    .setOperationName('company')
    .setSelectFields(['id', 'domainName', 'createdAt', 'linkedinLink'])
    .setVariables({ filter: { id: { eq: id } } })
    .execute();

  console.log(companyRequest.data);

  const company = companyRequest.data?.companyCollection?.edges?.[0]?.node;

  if (!company) {
    return;
  }

  const enrichedData = await enrichCompanyData(company.domainName);

  await client.query
    .setOperationType('mutation')
    .setOperationName('updateCompany')
    .setSelectFields(['affectedCount', 'records', 'id'])
    .setVariables({ data: enrichedData, id: id })
    .execute();
}

async function enrichCompanyData(domainName: string) {
  const enrichedCompany = await this.httpService.axiosRef.get(
    `https://companies.twenty.com/${domainName}`,
    {
      validateStatus: function () {
        // This ensures the promise is always resolved, preventing axios from throwing an error
        return true;
      },
    },
  );

  if (enrichedCompany.status !== 200) {
    return {};
  }

  return {
    linkedinLinkUrl: `https://linkedin.com/` + enrichedCompany.data.handle,
  };
}

export const config: Partial<Script> = {
  quickAction: {
    label: 'Enrich Company',
    icon: 'enrich',
    objectNameSingular: 'company',
    name: 'enrich-company-with-twenty',
  },
};
