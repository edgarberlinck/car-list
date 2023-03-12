import { GetServerSideProps } from 'next'
import { Car } from '@/types/car'
import { fetchBodyTypes, fetchCarList } from '@/lib/cars'
import HomeTemplate from '@/components/Templates/HomeTemplate/HomeTemplate'

type HomePropTypes = {
  carList: Car[]
  bodyTypes: string[]
}

export const getServerSideProps: GetServerSideProps<HomePropTypes> = async (ctx) => {
  const bodyType = (ctx.query?.bodyType ?? 'all') as string
  
  const carList = await fetchCarList({ bodyType })
  const bodyTypes = await fetchBodyTypes()
  return {
    props: {
      carList,
      bodyTypes
    }
  }
}

export default function Home({ carList, bodyTypes }: HomePropTypes) {
  return (
    <HomeTemplate carList={carList} bodyTypes={bodyTypes} />
  )
}
