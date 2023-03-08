import Head from 'next/head'
import CarCard from '@/components/Molecules/CarCard/CarCard'
import { ThemePicker, StyleProvider } from 'vcc-ui'
import { GetServerSideProps } from 'next'
import { Car } from '@/types/car'
import { fetchCarList } from '@/lib/cars'
import Carousel from '@/components/Molecules/Carousel/Carousel'

type HomePropTypes = {
  carList: Car[]
}

export const getServerSideProps: GetServerSideProps<HomePropTypes> = async (ctx) => {
  const carList = await fetchCarList()

  return {
    props: {
      carList
    }
  }
}

export default function Home({ carList }: HomePropTypes) {
  console.log(carList)
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <Head>
          <title>Car List</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://www.volvocars.com/static/shared/images/favicons/favicon-32x32.v2.png" />
        </Head>
        <main>
          <Carousel items={carList} renderItem={(car: Car) => <CarCard id={car.id} modelName={car.modelName} bodyType={car.bodyType} modelType={car.modelType} imageUrl={car.imageUrl} />} extractKey={(car: Car) => car.id} />
        </main>
      </ThemePicker>
    </StyleProvider>
  )
}
