import { Flex, Spacer,Box, Text, Center, Square, Input, Checkbox, Radio, Select } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useForm } from "react-hook-form"

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

export default function Tag() {
    const onSubmit = (data) => console.log(data)

    return (
        <Box>
            <Input 
        </Box>
    )
}