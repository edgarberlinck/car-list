import { Car } from "@/types/car";
import { Flex, Logo, Spacer, Text, useTheme } from "vcc-ui";

const BuyCar: React.FC<{car: Car}> = ({ car }) => {
  const theme = useTheme()
  return (
    <Flex extend={{ padding: 16 }}>
      <Logo type="spreadmark" />
      <Text variant="yang" extend={{ color: theme.color.foreground.primary }}>{car.modelName}</Text>
      <Spacer />
      <Text extend={{ color: theme.color.foreground.secondary }}>
        We can buy this car at this page.
      </Text>
    </Flex>
  )
}

export default BuyCar