import Image from 'next/legacy/image' // Using legacy due some know bugs in other browsers

type CarImagePropType = {
  src: string
  alt: string
}

const CarImage: React.FC<CarImagePropType> = ({ src, alt }) => (<Image src={src} alt={alt} layout='intrinsic' width={370} height={300} />)

export default CarImage