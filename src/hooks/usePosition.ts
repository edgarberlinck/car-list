import { useCallback, useEffect, useState } from "react"

export function usePosition(ref: React.RefObject<Element>) {
  const [prevElement, setPrevElement] = useState<Element | null>(null)
  const [nextElement, setNextElement] = useState<Element | null>(null)
  
  useEffect(() => {
    const element = ref.current
    
    if (!element)
      return
  
    const update = () => {
      const rect = element.getBoundingClientRect()
      const visibleElements = Array.from(element.children).filter((child) => {
        const childRect = child.getBoundingClientRect()
        return rect.left <= childRect.left && rect.right >= childRect.right
      })
      if (visibleElements.length > 0) {
        setPrevElement(getPrevElement(visibleElements))
        setNextElement(getNextElement(visibleElements))
      }
    }
    
    update()

    element.addEventListener('scroll', update, {passive: true})

    return () => {
      element.removeEventListener('scroll', update)
    }
  }, [ref])

  function getPrevElement(list: Element[]): Element | null {
    const sibling = list[0].previousElementSibling
  
    if (sibling instanceof Element) {
      return sibling
    }
  
    return sibling
  }
  
  function getNextElement(list: Element[]): Element | null {
    const sibling = list[list.length - 1].nextElementSibling
    if (sibling instanceof Element) {
      return sibling
    }
    return null
  }

  const scrollToElement = useCallback(
    (element: HTMLElement | null) => {
      const currentNode = ref.current
  
      if (!currentNode || !element) return
  
      let newScrollPosition
  
      newScrollPosition =
        element.offsetLeft +
        element.getBoundingClientRect().width / 2 -
        currentNode.getBoundingClientRect().width / 2
  
      currentNode.scroll({
        left: newScrollPosition,
        behavior: 'smooth',
      })
    },
    [ref],
  )

  const scrollRight = useCallback(() => scrollToElement(nextElement as HTMLElement), [
    scrollToElement,
    nextElement,
  ])
  const scrollLeft = useCallback(() => scrollToElement(prevElement as HTMLElement), [
    scrollToElement,
    prevElement,
  ])

  return {
    hasItemsOnLeft: prevElement !== null,
    hasItemsOnRight: nextElement !== null,
    scrollRight,
    scrollLeft
  }

}