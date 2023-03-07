import { Flex, Text, useTheme } from "vcc-ui"
import style from '@/styles/CarCard.module.css'
import CarImage from "@/components/Atoms/CarImage/CarImage"
import NavLink from "@/components/Atoms/NavLink/NavLink"

type CarCardPropType = {
  id: string
  modelName: string
  bodyType: string
  modelType: string
  imageUrl: string
}

const CarCard: React.FC<CarCardPropType> = ({ id, modelName, bodyType, modelType, imageUrl }) => {
  const theme = useTheme()
  
  return (
    <div className={style['card-wrapper']}>
      <Text variant='columbus' subStyle='emphasis' extend={{ color: theme.color.foreground.secondary }}>{bodyType}</Text>
      <Flex className={style['car-description']}>
        <Text subStyle='emphasis'>{modelName}</Text>
        <Text variant='columbus' subStyle='standard' extend={{ color: theme.color.foreground.secondary }}>{modelType}</Text>
      </Flex>
      
      <div className={style['card-image-wrapper']}>
        <CarImage src={imageUrl} alt={modelName} />
      </div>

      <Flex className={style['card-controls']}>
        <NavLink href={`/learn/${id}`}>Learn</NavLink>
        <NavLink href={`/shop/${id}`}>Shop</NavLink>
      </Flex>
    </div>
  )
}

export default CarCard