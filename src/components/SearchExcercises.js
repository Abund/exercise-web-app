import React,{useEffect,useState} from 'react';
import {Box,Button,Stack,TextField,Typography} from '@mui/material'
import { exerciseOptions,fetchData } from '../utils/fetchData';
import HorizontalScrollbar from '../components/HorizontalScrollbar'


const SearchExcercises = ({setExcercises,bodyPart,setBodyPart}) => {
  const [search, setSearch] = useState('');
  //const [excercises,setExcercises]=useState('');
  const [bodyParts, setBodyParts] = useState([]);
 
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
 
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData=await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);
      console.log(exerciseData);

      const searchedExercises =exerciseData.filter(
        (excercise)=> excercise.name.toLowerCase().includes(search)
        || excercise.equipment.toLowerCase().includes(search)
        || excercise.target.toLowerCase().includes(search)
        || excercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch('');
      setExcercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px"
    justifyContent="center" p="20px">
      <Typography
      sx={{fontSize:{lg:'44px',xs:'30px'}}}
      mb="50px" textAlign="center">
        Awesome Excercises you <br/>Should Know
      </Typography>
      <Box position ="relative" mb="72px">
        <TextField
        value={search}
        sx={{input:{
            fontWeight:'700',border:'none',borderRadius:'4px'},
          width:{
            lg:'800px',
            xs:'350px'
          },
        backgroundColor:'#fff',borderRadius:'40px'}}
        height="76px" 
        onChange={(e)=>{ setSearch(e.target.value.toLowerCase())}} placeholder="Search Excercises"
        type="text"/>
        <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts}  bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  )
}

export default SearchExcercises