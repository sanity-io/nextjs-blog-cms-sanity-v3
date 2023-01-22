import React from 'react'
import type {PortableTextReactComponents} from '../types'
import {unknownTypeWarning} from '../warnings'

const hidden = {display: 'none'}

export const DefaultUnknownType: PortableTextReactComponents['unknownType'] = ({
  value,
  isInline,
}) => {
  const warning = unknownTypeWarning(value._type)
  return isInline ? <span style={hidden}>{warning}</span> : <div style={hidden}>{warning}</div>
}

export const DefaultUnknownMark: PortableTextReactComponents['unknownMark'] = ({
  markType,
  children,
}) => {
  return <span className={`unknown__pt__mark__${markType}`}>{children}</span>
}

export const DefaultUnknownBlockStyle: PortableTextReactComponents['unknownBlockStyle'] = ({
  children,
}) => {
  return <p>{children}</p>
}

export const DefaultUnknownList: PortableTextReactComponents['unknownList'] = ({children}) => {
  return <ul>{children}</ul>
}

export const DefaultUnknownListItem: PortableTextReactComponents['unknownListItem'] = ({
  children,
}) => {
  return <li>{children}</li>
}
