"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const client_1 = __importDefault(require("../src/client"));
jest.mock('axios');
describe('Client', () => {
    let client;
    let axiosInstance;
    let query;
    beforeEach(() => {
        axiosInstance = {
            post: jest.fn(),
        };
        jest.mock('axios', () => axiosInstance);
        client = new client_1.default('apiKeyAuth');
        query = client.query;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create an instance of Client', () => {
        expect(client).toBeInstanceOf(client_1.default);
    });
    it('should initialize axios instance with base URL and authorization header', () => {
        expect(axios_1.default.create).toHaveBeenCalledWith({
            baseURL: 'https://api.twenty.com/graphql',
            headers: {
                Authorization: 'Bearer apiKeyAuth',
            },
        });
    });
    describe('executeQuery', () => {
        it('should build the query and execute the request', async () => {
            const builtQuery = 'query { id name email }';
            const variables = { id: 1, name: 'John' };
            const responseData = { data: 'response data' };
            jest.spyOn(query, 'build').mockReturnValue(builtQuery);
            jest.spyOn(query, 'getVariables').mockReturnValue(variables);
            axiosInstance.post.mockResolvedValue({ data: responseData });
            const result = await client.executeQuery();
            expect(query.build).toHaveBeenCalled();
            expect(query.getVariables).toHaveBeenCalled();
            expect(axiosInstance.post).toHaveBeenCalledWith('/', {
                query: builtQuery,
                variables,
            });
            expect(result).toBe(responseData);
        });
        it('should throw an error if the request fails', async () => {
            const error = new Error('Request failed');
            jest.spyOn(query, 'build').mockReturnValue('query { id name email }');
            jest
                .spyOn(query, 'getVariables')
                .mockReturnValue({ id: 1, name: 'John' });
            axiosInstance.post.mockRejectedValue(error);
            await expect(client.executeQuery()).rejects.toThrow(error);
        });
    });
});
