import CarCard from "@/components/Molecules/CarCard/CarCard"
import Carousel from "@/components/Molecules/Carousel/Carousel"
import { Car } from "@/types/car"
import Head from "next/head"
import { useRouter } from "next/router"
import { Flex, Radio, RadioGroup, StyleProvider, ThemePicker, View } from "vcc-ui"

type HomeTemplatePropType = {
  carList: Car[]
  bodyTypes: string[]
}

const HomeTemplate: React.FC<HomeTemplatePropType> = ({ carList, bodyTypes }) => {
  const router = useRouter()
  const selectedBodyType: string = (router.query?.bodyType ?? 'all') as string

  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <Head>
          <title>Car List</title>
          <meta name="description" content="Demo car list application" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://www.volvocars.com/static/shared/images/favicons/favicon-32x32.v2.png" />
        </Head>
        <main>
          <Flex extend={{ gap: '1rem' }}>
            <Flex>
              <RadioGroup
                legend="Body Type"
                name="bodyType"
                value={selectedBodyType}
                onChange={ (e) => router.push(`/?bodyType=${e.target.value}`) }
              >
                <View spacing={0.5}>
                  <Radio key='all' value='all' label='All' aria-label="all" />
                  { bodyTypes.map((bodyType: string) => <Radio key={bodyType} value={bodyType} label={bodyType} aria-label={bodyType} />) }
                </View>
              </RadioGroup>
            </Flex>
            <Carousel items={carList} renderItem={(car: Car) => <CarCard id={car.id} modelName={car.modelName} bodyType={car.bodyType} modelType={car.modelType} imageUrl={car.imageUrl} />} extractKey={(car: Car) => car.id} />
          </Flex>
        </main>
      </ThemePicker>
    </StyleProvider>
  )
}

export default HomeTemplate