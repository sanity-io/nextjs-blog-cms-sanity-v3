import {TreeState} from './types'

export function _findPrevItemElement(
  state: TreeState,
  itemElements: HTMLElement[],
  focusedElement: HTMLElement
): HTMLElement | null {
  const idx = itemElements.indexOf(focusedElement)
  const els = itemElements.slice(0, idx)
  const len = els.length

  for (let i = len - 1; i >= 0; i -= 1) {
    const itemKey = els[i].getAttribute('data-tree-key')

    if (!itemKey) {
      continue
    }

    const segments = itemKey.split('/')

    segments.pop()

    const p: string[] = []

    let expanded = true

    for (let j = 0; j < segments.length; j += 1) {
      p.push(segments[j])

      const k = p.join('/')

      if (!state[k]?.expanded) {
        expanded = false
        break
      }
    }

    if (expanded) {
      return els[i]
    }
  }

  return null
}

export function _findNextItemElement(
  state: TreeState,
  itemElements: HTMLElement[],
  focusedElement: HTMLElement
): HTMLElement | null {
  const idx = itemElements.indexOf(focusedElement)
  const els = itemElements.slice(idx)
  const len = itemElements.length

  for (let i = 1; i < len; i += 1) {
    if (!els[i]) {
      continue
    }

    const itemKey = els[i].getAttribute('data-tree-key')

    if (!itemKey) {
      continue
    }

    const segments = itemKey.split('/')

    segments.pop()

    const p: string[] = []

    let expanded = true

    for (let j = 0; j < segments.length; j += 1) {
      p.push(segments[j])

      const k = p.join('/')

      if (!state[k]?.expanded) {
        expanded = false
        break
      }
    }

    if (expanded) {
      return els[i]
    }
  }

  return null
}

export function _focusItemElement(el: HTMLElement): void {
  if (el.getAttribute('role') === 'treeitem') {
    el.focus()
  }

  if (el.getAttribute('role') === 'none') {
    const firstChild = el.firstChild

    if (firstChild && firstChild instanceof HTMLElement) {
      firstChild.focus()
    }
  }
}
