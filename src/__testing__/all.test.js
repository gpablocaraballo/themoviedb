import {cleanup} from '@testing-library/react';
import { getMovieDiscoverEndPoint, getMovies, myTrim } from '../components/utilities/utils';

/*
If you want that all your tests (each one of them) use the fake mock axios 
then USE:
Choice A)
import mockAxios from "../__mocks__/axios"; //for global response with exact the same json inside here!

otherwise USE this 2 lines:

CHOICE B)
import axios from "axios";
jest.mock('axios');
*/

//CHOICE B)
import axios from "axios";
jest.mock('axios');


afterEach(cleanup);

/*
TEST: Well, there are very simples test
*/

it('Mock fake testing simulating ajax request', async () => {

  //Response data emulated
  const resdata = {data:{"page":1,"total_results":10000,"total_pages":500,"results":[{"popularity":269.003,"vote_count":2430,"video":false,"poster_path":"/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg","id":583083,"adult":false,"backdrop_path":"/wO5QSWZPBT71gMLvrRex0bVc0V9.jpg","original_language":"en","original_title":"The Kissing Booth 2","genre_ids":[35,10749],"title":"The Kissing Booth 2","vote_average":8.2,"overview":"With college decisions looming, Elle juggles her long-distance romance with Noah, changing relationship with bestie Lee and feelings for a new classmate.","release_date":"2020-07-24"}]}}
  // setup
  /*
  //CHOICE A
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(resdata)
  );
  */

  /*
  //First, by default the new mock axios return undefined, you must put a default data return.

  axios.get('https://www.google.com'); //undefined!!!
  const mydata = await getMovies(1); //undefined too!!!
  */

  //Doing this we put a default value for mock
  axios.get.mockResolvedValue(
    resdata //The data that i must test
  );

  let endpointurl = getMovieDiscoverEndPoint(1);
  const mydata = await getMovies(1);
  
  //console.log("mock result",mydata); //Call the mock axios yeah!!!
  
  expect(mydata).toEqual(resdata);
  
  //IF we use __mock__/axios.js in every test, replace the real axios for the fake one
  //__mock__/axios.js has a default data too, must be the correct want for every test, be carefull.
  //CHOICE A)
  //expect(mockAxios.get).toHaveBeenCalledTimes(1);
  //expect(mockAxios.get).toHaveBeenCalledWith(endpointurl /*,{params: {}}*/);
  
  //CHOICE B) only for this test.
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(endpointurl /*,{params: {}}*/);

});

it('Unit Test (very very simple) fx myTrim ', () => {
    //delete left and right blanks
    expect(myTrim("    HELLO     ")).toBe("HELLO");
});
