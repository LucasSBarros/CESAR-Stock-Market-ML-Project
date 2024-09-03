import React from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import fetcher from "../services/api";

const ScheduleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      share: "VALE",
      startDate: "2021-01-01",
      endDate: "2024-09-02",
      days: 60,
    },
  });
  const [prediction, setPrediction] = React.useState(null);

  const onSubmit = async (data) => {
    console.log("Enviando dados:", data);
    setPrediction(null);
    try {
      const response = await fetcher.post("/api/shares", {
        ticker: data.share,
        start: data.startDate,
        end: data.endDate,
        days: data.days,
      });

      console.log("Resposta recebida:", response);
      setPrediction(response.data);
      reset();
    } catch (err) {
      console.error("Erro ao fazer requisição:", err);
      setError("apiError", {
        type: "manual",
        message: err?.response?.data?.error || "Erro ao fazer requisição",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("black")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.700")}
          boxShadow={"xl"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Heading
              fontSize={"xxx-large"}
              textAlign={"center"}
              color={"green.400"}
            >
              Stock Market Predictions
            </Heading>
            <Text fontSize={"xl"} color={"white"}>
              Input the name of the share that you want to predict.
            </Text>

            <FormControl
              id="share"
              isRequired
              isInvalid={errors.share}
              color={"white"}
            >
              <FormLabel>Share</FormLabel>
              <Input
                type="text"
                {...register("share", { required: "Share is required" })}
              />
              {errors.share && (
                <Text color="red.500">{errors.share.message}</Text>
              )}
            </FormControl>

            <FormControl
              id="days"
              isRequired
              isInvalid={errors.days}
              color={"white"}
            >
              <FormLabel>Number of days</FormLabel>
              <Input
                type="number"
                {...register("days", {
                  required: "Number of days is required",
                })}
              />
              {errors.days && (
                <Text color="red.500">{errors.days.message}</Text>
              )}
            </FormControl>

            <HStack>
              <Box>
                <FormControl
                  id="startDate"
                  isRequired
                  isInvalid={errors.startDate}
                  width={"196px"}
                  color={"white"}
                >
                  <FormLabel>Inicial Date</FormLabel>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                  />
                  {errors.startDate && (
                    <Text color="red.500">{errors.startDate.message}</Text>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  id="endDate"
                  isRequired
                  isInvalid={errors.endDate}
                  width={"196px"}
                  color={"white"}
                >
                  <FormLabel>Final Date</FormLabel>
                  <Input
                    type="date"
                    {...register("endDate", {
                      required: "End date is required",
                    })}
                  />
                  {errors.endDate && (
                    <Text color="red.500">{errors.endDate.message}</Text>
                  )}
                </FormControl>
              </Box>
            </HStack>

            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                Predict
              </Button>
            </Stack>
            {errors.apiError && (
              <Text color="red.500">{errors.apiError.message}</Text>
            )}
            <Stack pt={6}>
              <Text align={"center"} color={"white"}>
                Do you want to see other predictions already made?
                <br />
                <Link color={"green.400"}>Other predictions.</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ScheduleForm;
