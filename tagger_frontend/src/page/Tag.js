import { useState } from "react";
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Select} from "@chakra-ui/react";
import {Box, Grid, VStack} from "@chakra-ui/react";

export default function Tag() {
  function handleSubmit(e) {
    e.preventDefault()
    console.log(e.target.samplecode.value)
    e.target.reset()
    
  }
  async function createSelectItems() {
    let items = [];
    const res = await fetch('https://reqres.in/api/users').then((res) => {res = JSON.parse(res);}).then(res => {for (let i = 0; i <= res.data.length; i++) {             
      items.push(res.data[i]);}   
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
 })
             
    
    return items;
  }  
  return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <VStack spacing={8}>
                <form onSubmit={handleSubmit}>             
                  <FormControl>
                      <FormLabel>Select Commodity</FormLabel>
                      <Select placeholder='Select option' name="commodity">
                        
                      </Select>
                  </FormControl>
                  <FormControl>
                      <FormLabel></FormLabel>
                      <Input type='text' name="samplecode" />
                  </FormControl>
                  
                  <FormControl>
                      
                      <Input type='Submit' />
                  </FormControl>
                </form>
              </VStack>
            </Grid>
    </Box>)
} 