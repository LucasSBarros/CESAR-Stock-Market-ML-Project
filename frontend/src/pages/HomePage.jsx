import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usando o useNavigate em vez de useHistory
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  Link,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaChartBar } from "react-icons/fa";
import logo from "../assets/Lemon_sunglasses2.png";
import andreImg from "../assets/andre.jpeg"; // Importando as imagens dos membros
import biaImg from "../assets/bia.jpeg";
import jereImg from "../assets/jere.jpeg";
import jrImg from "../assets/jr.jpeg";
import jvImg from "../assets/jv.png";
import lucasImg from "../assets/lucas.jpeg";
import nathaliaImg from "../assets/nathalia.jpeg";

const teamMembers = [
  {
    name: "André Bacelar",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: andreImg,
    github: "https://github.com/volundr1704",
    linkedin: "https://www.linkedin.com/in/andré-bacelar-72a41a1a6/",
  },
  {
    name: "Beatriz Vilarim",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: biaImg,
    github: "https://github.com/beatriz-vilarim",
    linkedin: "https://www.linkedin.com/in/beatrizvilarim/",
  },
  {
    name: "Jeremias Oliveira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: jereImg,
    github: "https://github.com/Jeremias333",
    linkedin: "https://www.linkedin.com/in/jeremias-oliveira/",
  },
  {
    name: "João Ricardo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: jrImg,
    github: "https://github.com/Trutzys",
    linkedin:
      "https://www.linkedin.com/in/joão-ricardo-leitão-barros-892096251/",
  },
  {
    name: "João Victor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: jvImg,
    github: "https://github.com/joao-victor",
    linkedin: "https://www.linkedin.com/in/joao-victor/",
  },
  {
    name: "Lucas Barros",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: lucasImg,
    github: "https://github.com/LucasSBarros",
    linkedin:
      "https://www.linkedin.com/in/lucas-silvestre-de-barros-99a0a3211/",
  },
  {
    name: "Nathália Couto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    img: nathaliaImg,
    github: "https://github.com/nathaliaacouto",
    linkedin: "https://www.linkedin.com/in/nathalia-vcouto/",
  },
];

const HomePage = () => {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  const navigate = useNavigate(); // Usando useNavigate para redirecionar

  const handlePredictClick = () => {
    navigate("/stock-market-prediction"); // Redireciona para a rota desejada
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} p={8}>
      {/* Seção da imagem grande e título */}
      <VStack mt={80} spacing={8} align="center">
        <Heading size="4xl" color="green.600">
          FarinhaLimers
        </Heading>
        <Image src={logo} alt="Logo FarinhaLimers" />
      </VStack>

      {/* Seção Sobre Nós */}
      <VStack mt={80} spacing={4} align="center">
        <Heading size="3xl">About Us</Heading>
        <Text maxW="700px" textAlign="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </Text>
      </VStack>

      {/* Seção Comece Agora com botão */}
      <Flex justify="center" mt={80} align="center" gap={14}>
        <Heading size="4xl" fontWeight="bold">
          Start <br /> Now!
        </Heading>
        <Button
          colorScheme="green"
          width="320px"
          height="80px"
          fontSize="2xl"
          px={12}
          py={8}
          leftIcon={<FaChartBar />}
          onClick={handlePredictClick} // Redireciona para a rota
        >
          Predict!
        </Button>
      </Flex>

      <Box bg="green.600" p={8} borderRadius="md" mt={80}>
        {/* Título "Nosso time" centralizado */}
        <Heading size="2xl" textAlign="center" color="white" mb={8}>
          Our Team
        </Heading>

        {/* Seção dos membros */}
        <Flex justify="center" align="center">
          {/* Botões com os nomes dos membros */}
          <VStack align="center" spacing={4}>
            {teamMembers.map((member, index) => (
              <Button
                key={index}
                variant={
                  selectedMember.name === member.name ? "solid" : "outline"
                }
                colorScheme="whiteAlpha"
                onClick={() => setSelectedMember(member)}
                width="200px"
              >
                {member.name}
              </Button>
            ))}
          </VStack>

          {/* Nome e descrição do membro selecionado */}
          <VStack align="center" spacing={4} mx={32} color="white" maxW="500px">
            <Heading>{selectedMember.name}</Heading>
            <Text textAlign="center">{selectedMember.description}</Text>
          </VStack>

          {/* Imagem do membro e links para GitHub e LinkedIn */}
          <VStack align="center" spacing={4} color="white">
            <Image
              src={selectedMember.img}
              alt={selectedMember.name}
              boxSize="250px"
              borderRadius="md"
            />
            <HStack spacing={4}>
              <Link href={selectedMember.github} isExternal>
                <IconButton
                  icon={<FaGithub />}
                  aria-label="GitHub"
                  colorScheme="whiteAlpha"
                />
              </Link>
              <Link href={selectedMember.linkedin} isExternal>
                <IconButton
                  icon={<FaLinkedin />}
                  aria-label="LinkedIn"
                  colorScheme="whiteAlpha"
                />
              </Link>
            </HStack>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomePage;