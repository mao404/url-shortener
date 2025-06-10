import React from "react";
import { useColorMode, Box, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggler: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="center" py={4}>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
}

export default ThemeToggler; 