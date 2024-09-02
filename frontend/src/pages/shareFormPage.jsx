import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'


const ScheduleForm = () => {

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('blackAlpha.900')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'xxx-large'} textAlign={'center'} color={'green.400'}>
            Stock Market Predictions
          </Heading>
          <Text fontSize={'xl'} color={'white'}>
            Input the name of the share that you want to predict.
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white')}
          boxShadow={'xl'}
          p={8}>
          <Stack spacing={4}>
            

            <FormControl id="share" isRequired>
              <FormLabel>Share</FormLabel>
              <Input type="text" />
            </FormControl>

            <HStack>
              <Box>
                <FormControl id="Data de início" isRequired>
                  <FormLabel>Data inicial</FormLabel>
                  <Input type="date" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Data final" isRequired>
                  <FormLabel>Data final</FormLabel>
                  <Input type="date" />
                </FormControl>
              </Box>
            </HStack>
            
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}>
                Predict
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'green.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default ScheduleForm;
