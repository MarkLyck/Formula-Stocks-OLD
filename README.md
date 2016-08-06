# Formula Stocks

### Elevator pitch
We offer a solid edge based on quantitive information not generally available to the stock market, yielding higher returns obtained with lower risk.

### Basic Features
- Access to stock suggestions, based the users plan.
- Access to the current Formula Stocks portfolio
- Access to proprietary analysis data on Formula Stocks
- A subscription based information service

### APIs
- Quandl (stocks API)
- Kinvey (baas)
- Formula Stocks proprietary API

### Data Modeling
- Users Collection
- StockSuggestions Collection
- PortfolioStocks Collection

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
