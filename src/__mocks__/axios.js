/*
WARNING: If you use import mockAxios from "../__mocks__/axios";
then you must be careful, because ALL the test will be using the face axios with THIS default data
(defaultdata = {}) and then of course, not all your test component that use real axios would be receive
this response that the correct one of the real axios, so probably its gonna fail some test because some
components must expect another response, not this one, so... for global mock axios it would be a problem maybe.
*/

//Fake data. if you have two axios request and expect distincts data response, then this solution its a problem.
//You must fake all the testing using a diferent mock in each testing.
//const defaultdata = {};
const defaultdata = {};

export default {
    get: jest.fn(() => Promise.resolve({ data: defaultdata }))
};