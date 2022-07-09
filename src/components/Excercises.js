import React, { useState,useEffect } from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import ExerciseCard from '../components/ExerciseCard'
import { exerciseOptions, fetchData } from '../utils/fetchData';

const Excercises = ({exercises,setExcercises,bodyPart}) => {
  console.log(exercises);
  const [currentPage,setCurrentPage]=useState(1);
  const exercisesPerPage=9;

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExcercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  }; 

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        { currentExercises.map((exercise, idx) => (
          
          // <p >{exercise.name}</p>
          <ExerciseCard key={idx} exercise={exercise} />
        ))}   
      </Stack>
      <Stack mt="100px" alignItems="center">
          {exercises.length>9&&(
            <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length/exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            />
          )}
      </Stack>
    </Box> 
  )
}

export default Excercises