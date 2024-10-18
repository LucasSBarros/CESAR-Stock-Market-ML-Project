import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Flex,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Line } from "react-chartjs-2";
import fetcher from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PredictionPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchLatestPrediction = async () => {
      try {
        const response = await fetcher.get("/api/shares");
        console.log("Dados recebidos do backend:", response);

        if (Array.isArray(response) && response.length > 0) {
          const latestPrediction = response[response.length - 1];
          setData(latestPrediction);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar previsão:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPrediction();
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!data) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Heading>Nenhum dado disponível</Heading>
      </Flex>
    );
  }

  const { prediction, end, ticker } = data;

  const startDate = new Date(end);
  startDate.setDate(startDate.getDate() + 1);

  const dates = prediction.map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date.toISOString().replace(/T.*/, "").split("-").reverse().join("-");
  });

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `Predicted Stock Price for ${ticker}`,
        data: prediction,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.900")}
      width="100%"
    >
      <Box
        rounded={"lg"}
        bg={bgColor}
        boxShadow={"2xl"}
        p={8}
        mt={8}
        maxW="75%"
        minH="80vh"
        mx="auto"
        width="100%"
      >
        <IconButton
          icon={<ArrowBackIcon boxSize={8} />}
          aria-label="Back"
          onClick={handleBackClick}
          variant="ghost"
          position="relative"
          top="45px"
          left="20px"
          color="green.500"
          size="lg"
        />

        <Heading
          as="h2"
          size="xl"
          mb={8}
          textAlign="center"
          color={"green.600"}
        >
          Prediction Results for {ticker}
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          alignItems="center"
          width="100%" // Garante que o Flex ocupe o espaço disponível no Box
        >
          <Box width="600px" height="400px" display="flex" alignItems="center">
            <Line data={chartData} />
          </Box>

          <Box flex={1} overflowX="auto" maxH="50rem">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>Date</Th>
                  <Th textAlign={"center"}>Predicted Value (R$)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dates.map((date, index) => (
                  <Tr key={index}>
                    <Td textAlign={"center"}>{date}</Td>
                    <Td textAlign={"center"}>{prediction[index].toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PredictionPage;
