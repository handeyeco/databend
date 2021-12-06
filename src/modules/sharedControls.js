import { Form } from 'react-bootstrap'

export function frequency(extend = {}) {
  const { props, ...rest } = extend
  return {
    Component: Form.Range,
    props: {
      min: 1,
      max: 20000,
      step: 1,
      ...props
    },
    ...rest
  }
}

export function decibel(extend = {}) {
  const { props, ...rest } = extend
  return {
    Component: Form.Range,
    props: {
      min: -100,
      max: 0,
      step: 1,
      ...props
    },
    ...rest
  }
}

export function normal(extend = {}) {
  const { props, ...rest } = extend
  return {
    Component: Form.Range,
    props: {
      min: 0,
      max: 1,
      step: 0.0001,
      ...props
    },
    ...rest
  }
}

export function octave(extend = {}) {
  const { props, ...rest } = extend
  return {
    Component: Form.Range,
    props: {
      min: 1,
      max: 10,
      step: 1,
      ...props
    },
    ...rest
  }
}

export function time(extend = {}) {
  const { props, ...rest } = extend
  return {
    Component: Form.Range,
    props: {
      min: 0.001,
      max: 10,
      step: 0.001,
      ...props
    },
    ...rest
  }
}
