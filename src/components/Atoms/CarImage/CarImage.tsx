import { ImageLoader } from 'next/image'
import Image from 'next/legacy/image' // Using legacy due some know bugs in other browsers

type CarImagePropType = {
  src: string
  alt: string
}

const GCPBucketLoader: ImageLoader = ({ src }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}`
}

const CarImage: React.FC<CarImagePropType> = ({ src, alt }) => (<Image src={src} alt={alt} layout='intrinsic' width={370} height={300} loader={GCPBucketLoader} />)

export default CarImage