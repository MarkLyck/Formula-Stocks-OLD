# Formula Stocks

### Elevator pitch
We offer a solid edge based on quantitive information not generally available to the stock market, yielding higher returns obtained with lower risk.

### Basic Features
- Access to stock suggestions, based the users plan.
  - Users will be able to see all stock suggestions for the plans they paid for, these will be updated on a weekly basis.
- Access to the current Formula Stocks portfolio
  - Users will have access to the entire Formula Stocks portfolio, this will be updated on a monthly basis.
- Access to proprietary analysis data on Formula Stocks
  - On suggested stocks, users can also see some of our proprietary data points we use to analyse stocks.
- A subscription based information service
- Free 30 day trial to the Basic plan.

### APIs
- Quandl (stocks API)
- Kinvey (baas)
- Formula Stocks proprietary API

### Data Modeling
- Users Collection
```
{
  email: 'example@email.com',
  plan: 'Basic',
  nextBillingDate: '',
  authtoken: '12345',
}
```
- StockSuggestions Collection
```
{
  "date" : {
      "day" : "4",
      "month" : "4",
      "year" : "2015"
    },
   "name" : "TRANSGLOBE ENERGY   ",
   "ticker" : "TGL.TO",
   "action" : "BUY",
   "suggested_price" : 4.54,
   "percentage_weight" : 66.6663
}
```
- PortfolioStocks Collection
```
{
   "date" : {
      "day" : "4",
      "month" : "4",
      "year" : "2015"
    },
   "name" : "CHINA MOBILE HONG KO",
   "ticker" : "CHL",
   "purchase_price" : 47.3647,
   "latest_price" : 64.69,
   "percentage_weight" : 0,
   "days_owned" : 1465
}
```

### Routes
- /
- /dashboard
- /dashboard/basic/portfolio
- /dashboard/basic/suggestions
- /dashboard/premium/portfolio
- /dashboard/premium/suggestions
- /dashboard/business/portfolio
- /dashboard/business/suggestions
- /dashboard/fund/portfolio
- /dashboard/fund/suggestions
- /dashboard/admin


### Libraries
- JQuery (or other alternative for AJAX calls)
- Stripe
- AmCharts

### Special requirements
- Geolocation (country codes)
- Custom logarithmic graph layout.
- PostMark (newsletter email service)
- FastMail (contact emails)
- 12 updatable JSON files hosted with Amazon Web Services
- Extremely Polished user interface

### Extra possible features
- Mark stocks as bought, and keep track of your stocks.
- Implement a full portfolio system, integrated with Formula Stocks
