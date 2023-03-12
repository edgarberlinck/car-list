import LearnAbout from "@/components/Templates/LearnAboutTemplate/LearnAboutTemplate"
import { fetchCarById } from "@/lib/cars"
import { Car } from "@/types/car"
import { GetServerSideProps } from "next"
import { StyleProvider, ThemePicker } from "vcc-ui"

type LearnPageProps = {
  car: Car | undefined
}

export const getServerSideProps: GetServerSideProps<LearnPageProps> = async (ctx) => {
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

export default function Learn({ car }: LearnPageProps) {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <LearnAbout car={car as Car} />
      </ThemePicker>
    </StyleProvider>
  )
}