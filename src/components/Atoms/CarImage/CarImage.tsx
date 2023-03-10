import { ImageLoader } from 'next/image'
import Image from 'next/legacy/image'

type CarImagePropType = {
  src: string
  alt: string
  width?: number
  height?: number
}

const GCPBucketLoader: ImageLoader = ({ src }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}`
}

const CarImage: React.FC<CarImagePropType> = ({ src, alt, width = 370, height = 300 }) => (<Image src={src} alt={alt} layout='intrinsic' width={width} height={height} loader={GCPBucketLoader} />)

export default CarImage