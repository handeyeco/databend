export const channelCount = 4 // r, g, b, a

export const MIX = 'MIX'
export const SPLIT = 'SPLIT'
export const R = 'R'
export const G = 'G'
export const B = 'B'
export const A = 'A'

export const channelOrder = [
  { key: R, display: 'Red' },
  { key: G, display: 'Green' },
  { key: B, display: 'Blue' },
  { key: A, display: 'Alpha' },
]

export function initSharedState() {
  return {
    [SPLIT]: false,
    [R]: true,
    [G]: true,
    [B]: true,
    [A]: true,
    [MIX]: 1,
  }
}
