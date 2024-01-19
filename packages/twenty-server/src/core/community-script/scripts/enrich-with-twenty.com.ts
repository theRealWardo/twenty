export default async function (domainName: string) {
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
