import axios from 'axios';

export default async function fetchQuestions(category){

  try{
    
  const res = await axios.get(`https://opentdb.com/api.php?amount=9&category=${category}&difficulty=easy`)
  const res1 = await axios.get(`https://opentdb.com/api.php?amount=4&category=${category}&difficulty=medium`)
  const res2 = await axios.get(`https://opentdb.com/api.php?amount=2&category=${category}&difficulty=hard`)

  const data = res.data.results;
  const data1 = res1.data.results;
  const data2 = res2.data.results;
  const combdata= [ ...data, ...data1, ...data2];
    return combdata;

  }catch(error){
    console.error(error);
    
  }


}