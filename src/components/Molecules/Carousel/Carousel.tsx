import { IconButton } from 'vcc-ui'
import styles from '@/styles/Carousel.module.scss'
import { useRef } from 'react'
import { usePosition } from '@/hooks/usePosition'

type CarouselPropTypes<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactElement
  extractKey: (item: T) => string
}

const Carousel = <T extends unknown>({ items, renderItem, extractKey }: CarouselPropTypes<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    hasItemsOnLeft,
    hasItemsOnRight,
    scrollRight,
    scrollLeft,
  } = usePosition(ref)

  return (
    <div className={styles['carousel']}>
      <div className={styles['carousel-container']}>
        <div ref={ref} className={styles['carousel-container-inner']}>
          { items.map((item: T) => (
            <div key={extractKey(item)}>
              {renderItem(item)}
            </div>
          )) }
        </div>
      </div>
      <div>
        <IconButton disabled={!hasItemsOnLeft} variant="outline" iconName="navigation-chevronback" aria-label='previous element' onClick={scrollLeft} />
        <IconButton disabled={!hasItemsOnRight} variant="outline" iconName="navigation-chevronforward" aria-label='next element' onClick={scrollRight}/>
      </div>
    </div>
  )
}

export default Carousel