// __mocks__/axios.js
const Axios = {
    get: jest.fn(() => Promise.resolve({ data: 'mocked data' })),
    // ...add other mock methods as needed
};
export default Axios
