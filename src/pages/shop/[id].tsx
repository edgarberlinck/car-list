import ShopCar from "@/components/Templates/ShopCar/ShopCar"
import { fetchCarById } from "@/lib/cars"
import { Car } from "@/types/car"
import { GetServerSideProps } from "next"
import { StyleProvider, ThemePicker } from "vcc-ui"

type ShopCarPageProps = {
  car: Car | undefined
}

export const getServerSideProps: GetServerSideProps<ShopCarPageProps> = async (ctx) => {
  const id = ctx.params?.id
  const car = await fetchCarById(id as string)

  if (!car) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      car
    }
  }
}

export default function Shop({ car }: ShopCarPageProps) {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <ShopCar car={car as Car} />
      </ThemePicker>
    </StyleProvider>
  )
}