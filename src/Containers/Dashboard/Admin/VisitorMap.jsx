/* eslint-disable */
import React from 'react'

const VisitorMap = ({ images }) => (
  React.createElement(AmCharts.React, {
    "class":"map",
    "type": "map",
    "theme": "light",
    "projection": "eckert6",
    "dataProvider": {
      "map": "worldLow",
      "getAreasFromMap": true,
      "images": images,
    },
    "areasSettings": {
      "autoZoom": true,
      "rollOverColor": "#cccccc",
      "rollOverOutlineColor": "#8c8c8c",
      "selectedColor": "#cccccc",
      "outlineColor": "#8c8c8c",
      "color": "#515156",
    },
    "zoomControl": {
      "buttonIconColor": "#8c8c8c",
    }
  })
)

export default VisitorMap
