import React from 'react'
// import LineGraph from './components/LineGraph.jsx'

class Performance extends React.Component {
  render() {
    const graphs = [
          {
            id: "market",
            lineColor: "#49494A",

            bullet: "square",
            bulletBorderAlpha: 1,
            bulletColor: "#FFFFFF",
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: "market",
            "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">S&P 500</span><span class=\"balloon-value\">[[marketBalloon]]</span></div>",
          },
          {
            id: "premium",
            lineColor: "#FFFFFF",

            bullet: "square",
            bulletBorderAlpha: 1,
            bulletColor: "#FFFFFF",
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: "premium",
            balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Premium</span><span class=\"balloon-value\">[[premiumBalloon]]</span></div>"
          },
          {
            id: "business",
            lineColor: "#FFFFFF",

            bullet: "square",
            bulletBorderAlpha: 1,
            bulletColor: "#FFFFFF",
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: "business",
            "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Business</span><span class=\"balloon-value\">[[businessBalloon]]</span></div>",
          },
          {
            id: "fund",
            lineColor: "#fff",

            bullet: "square",
            bulletBorderAlpha: 1,
            bulletColor: "#FFF",
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: "fund",
            "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Fund</span><span class=\"balloon-value\">[[fundBalloon]]</span></div>",
          }
        ]

    return (
      <section className="performance">
        <h2 className="title">Performance</h2>
        <div className="divider"/>
        <h3 className="subtitle">The below results are shown below, for the unleveraged performance in %, of 3 strategies since 2009 launch, with DJIA as a baseline</h3>
        {/* <LineGraph graphs={graphs} data={[]}/> */}
      </section>
    )
  }
}

export default Performance
