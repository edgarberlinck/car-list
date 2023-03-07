import { Link as VCCLink, Block, Text } from "vcc-ui"
import Image from 'next/legacy/image' // Using legacy due some know bugs in other browsers
import Link from 'next/link'
import style from '@/styles/CarCard.module.css'

type CarCardPropType = {
  id: string
  modelName: string
  bodyType: string
  modelType: string
  imageUrl: string
}

const CarCard: React.FC<CarCardPropType> = ({ id, modelName, bodyType, modelType, imageUrl }) => (
  <div className={style['card-wrapper']}>
    {/* <Block> */}
      <Text subStyle='standard'>{bodyType}</Text>
      <Text subStyle='emphasis'>{modelName}</Text>
      <Text subStyle='standard'>{modelType}</Text>
    {/* </Block> */}
    <div>
      <Image src={imageUrl} alt={modelName} layout='intrinsic' width={350} height={300} />
    </div>
    <div className={style['card-controls']}>
      <VCCLink arrow="right">
        <Link href={`/learn/${id}`}>Learn</Link>
      </VCCLink>
      <VCCLink arrow="right">
        <Link href={`/shop/${id}`}>Shop</Link>
      </VCCLink>
    </div>
  </div>
)

export default CarCard