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
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import fetcher from "../services/api";
import { useNavigate } from "react-router-dom";

const ShareFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      share: "",
      startDate: "2022-01-01",
      endDate:
        new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date().getDate()).padStart(2, "0"),
      days: null,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Enviando dados:", data);
    try {
      const response = await fetcher.post("/api/shares", {
        ticker: data.share,
        start: data.startDate,
        end: data.endDate,
        days: data.days,
      });

      console.log("Resposta recebida:", response);

      navigate("/prediction-results");

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
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Heading
              fontSize={"xxx-large"}
              textAlign={"center"}
              color={"green.600"}
            >
              Stock Market Predictions
            </Heading>
            <Text fontSize={"xl"} color={"black"}>
              Input the name of the share that you want to predict.
            </Text>

            <FormControl
              id="share"
              isRequired
              isInvalid={errors.share}
              color={"black"}
            >
              <FormLabel>Share</FormLabel>
              <Select
                placeholder="Select a share"
                {...register("share", { required: "Share is required" })}
              >
                <option value="ELET3.SA">ELET3.SA</option>
                <option value="ELET6.SA">ELET6.SA</option>
                <option value="ELPL3.SA">ELPL3.SA</option>
                <option value="NEOE3.SA">NEOE3.SA</option>
                <option value="CPFE3.SA">CPFE3.SA</option>
                <option value="EQTL3.SA">EQTL3.SA</option>
                <option value="CMIG3.SA">CMIG3.SA</option>
                <option value="CMIG4.SA">CMIG4.SA</option>
                <option value="PETR3.SA">PETR3.SA</option>
                <option value="PETR4.SA">PETR4.SA</option>
                <option value="CGAS5.SA">CGAS5.SA</option>
                <option value="RAIZ4.SA">RAIZ4.SA</option>
                <option value="CSAN3.SA">CSAN3.SA</option>
                <option value="SMTO3.SA">SMTO3.SA</option>
                <option value="AGRO3.SA">AGRO3.SA</option>
              </Select>
              {errors.share && (
                <Text color="red.500">{errors.share.message}</Text>
              )}
            </FormControl>

            <FormControl
              id="days"
              isRequired
              isInvalid={errors.days}
              color={"black"}
            >
              <FormLabel>Number of days</FormLabel>
              <Select
                placeholder="Select number of days"
                {...register("days", {
                  required: "Number of days is required",
                })}
              >
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
              </Select>
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
                  color={"black"}
                >
                  <FormLabel>Start Date</FormLabel>
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
                  color={"black"}
                >
                  <FormLabel>End Date</FormLabel>
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
                bg={"green.600"}
                color={"white"}
                _hover={{
                  bg: "green.700",
                }}
              >
                Predict
              </Button>
            </Stack>
            {errors.apiError && (
              <Text color="red.500">{errors.apiError.message}</Text>
            )}
            <Stack pt={2}>
              <Text align={"center"} color={"black"}>
                Farinha Limers Ltd. ©
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ShareFormPage;
