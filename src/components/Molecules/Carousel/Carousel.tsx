import { IconButton } from 'vcc-ui'
import styles from '@/styles/Carousel.module.scss'
import { useCallback, useRef } from 'react'
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
    currentElementIndex,
    getElement,
    scrollToElement
  } = usePosition(ref)
  
  const handleDotClick = useCallback((index: number) => {
    scrollToElement(getElement((ref.current?.children ?? []) as Element[], index) as HTMLElement)
  }, [ref, getElement, scrollToElement])

  return (
    <div className={styles['carousel']} role="region" aria-label="Carousel">
      <div className={styles['carousel-container']}>
        <div ref={ref} className={styles['carousel-container-inner']}>
          { items.map((item: T) => (
            <div key={extractKey(item)}>
              {renderItem(item)}
            </div>
          )) }
        </div>
      </div>
      <div className={styles['carousel-navigator']}>
        <IconButton disabled={!hasItemsOnLeft} variant="outline" iconName="navigation-chevronback" aria-label='previous element' onClick={scrollLeft} />
        <IconButton disabled={!hasItemsOnRight} variant="outline" iconName="navigation-chevronforward" aria-label='next element' onClick={scrollRight}/>
      </div>
      <div className={styles['carousel-dots']}>
          { Array.from(items).map((_, index) => <div key={index} onClick={() => handleDotClick(index)} className={index === currentElementIndex ? styles['dot--selected'] : styles['dot']} />) }
      </div>
    </div>
  )
}

export default Carousel