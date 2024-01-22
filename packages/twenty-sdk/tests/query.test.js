"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./query"));
describe('Query', () => {
    let query;
    beforeEach(() => {
        query = new query_1.default();
    });
    it('should set operation type', () => {
        const type = 'query';
        query.setOperationType(type);
        expect(query['operationType']).toBe(type);
    });
    it('should set operation name', () => {
        const name = 'getUser';
        query.setOperationName(name);
        expect(query['operationName']).toBe(name);
    });
    it('should set select fields', () => {
        const fields = ['id', 'name', 'email'];
        query.setSelectFields(fields);
        expect(query['fields']).toEqual(fields);
    });
    it('should set variables', () => {
        const variables = { id: 1, name: 'John' };
        query.setVariables(variables);
        expect(query['variables']).toEqual(variables);
    });
    it('should get variables', () => {
        const variables = { id: 1, name: 'John' };
        query.setVariables(variables);
        expect(query.getVariables()).toEqual(variables);
    });
    it('should build query without variables', () => {
        const type = 'query';
        const name = 'getUser';
        const fields = ['id', 'name', 'email'];
        query.setOperationType(type);
        query.setOperationName(name);
        query.setSelectFields(fields);
        const expectedQuery = `${type} ${name} { ${fields.join(' ')} }`;
        expect(query.build()).toBe(expectedQuery);
    });
    it('should build query with variables', () => {
        const type = 'mutation';
        const name = 'createUser';
        const fields = ['id', 'name', 'email'];
        const variables = { name: 'John', age: 25 };
        query.setOperationType(type);
        query.setOperationName(name);
        query.setSelectFields(fields);
        query.setVariables(variables);
        const expectedQuery = `${type} ${name} ($name: string, $age: number) { ${fields.join(' ')} }`;
        expect(query.build()).toBe(expectedQuery);
    });
    it('should throw error if operation type or name is not set', () => {
        expect(() => query.build()).toThrowError('Operation type and operation name are required to build the query');
    });
});
