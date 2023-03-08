import { useState } from "react"
import { Grid, Row, Col } from "vcc-ui"

type CarouselPropTypes<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactElement
  extractKey: (item: T) => string
}

const Carousel = <T extends unknown>({ items, renderItem, extractKey }: CarouselPropTypes<T>) => {
  const [page, setPage] = useState<T[]>(items)

  return (
    <Grid>
      <Row>
        { page.map((item: T) => (
          <Col size={3} key={extractKey(item)} data-testid={`item-${extractKey(item)}`}>
            {renderItem(item)}
          </Col>
        )) }
      </Row>
    </Grid>
  )
}

export default Carousel