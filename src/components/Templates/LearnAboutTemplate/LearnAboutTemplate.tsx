import { Car } from "@/types/car";
import { Flex, Logo, Spacer, Text, useTheme } from "vcc-ui";

const LearnAbout: React.FC<{car: Car}> = ({ car }) => {
  const theme = useTheme()
  return (
    <Flex extend={{ padding: 16 }}>
      <Logo type="spreadmark" />
      <Text variant="yang" extend={{ color: theme.color.foreground.primary }}>{car.modelName}</Text>
      <Spacer />
      <Text extend={{ color: theme.color.foreground.secondary }}>
        This is the learn page. We can have more information about the car.
      </Text>
    </Flex>
  )
}

export default LearnAbout