import { useCallback, useEffect, useState } from "react"

export function usePosition(ref: React.RefObject<Element>) {
  const [prevElement, setPrevElement] = useState<Element | null>(null)
  const [nextElement, setNextElement] = useState<Element | null>(null)
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0)
  
  const getElementIndex = useCallback((element: Element): number => {
    const elements = ref.current?.children
    if (elements) {
      let  index = 0
      for (let e of elements) {
        if (element.innerHTML === e.innerHTML) {
          return index
        }
        index++
      }
    }
    return 0
  }, [ref])

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
        setCurrentElementIndex(getElementIndex(visibleElements[0]))
        setPrevElement(getPrevElement(visibleElements))
        setNextElement(getNextElement(visibleElements))
      }
    }
    
    update()

    element.addEventListener('scroll', update, {passive: true})

    return () => {
      element.removeEventListener('scroll', update)
    }
  }, [ref, getElementIndex])

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

  function getElement(list: Element[], at: number): Element | null {
    const sibling = at === 0 ? list[0] : list[at-1].nextElementSibling
    if (sibling instanceof Element) {
      setCurrentElementIndex(at)
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
    scrollLeft,
    getElement,
    scrollToElement,
    currentElementIndex
  }

}