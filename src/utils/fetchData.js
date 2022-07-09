export const exerciseOptions = {
    method: 'GET',
    //url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
        //
      'X-RapidAPI-Key': '8bf31414d4msh8b0924812dfac7dp1125b9jsna70e3610d2da',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  export const youtubeOptions = {
    method: 'GET',
    //url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': '8bf31414d4msh8b0924812dfac7dp1125b9jsna70e3610d2da',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

export const fetchData=async(url,options)=>{
    const response = await fetch(url,options);
    const data =await response.json();

    return data;
}