
**WARNING: Please do not use this yet. This is not production ready**


# Twenty Typescript SDK

Generic SDK to interact with the Twenty API.

This is useful if you build an application that works with multiple workspace.
For people that are building something specifically for a given workspace - we'll build a CLI to generate static types (not planned yet / community contributions welcome!).


## Usage

```
const client = new Client('your-api-key');
client.query.setOperationType('mutation')
  .setOperationName('createCompany')
  .setSelectFields(['id', 'name'])
  .setVariables({ 
    name: 'Company Name', 
    address: 'Company Address' 
  });

client.executeQuery()
  .then(data => console.log(data))
  .catch(error => console.error(error));

```
