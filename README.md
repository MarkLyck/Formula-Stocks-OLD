# Formula Stocks

### Elevator pitch
What if it was possible to predict some of the next years’ winners in the stock market, at an 84-95% success rate? Would you invest?

### Basic Features
- Access to stock suggestions, based the users plan.
  - Users will be able to see all stock suggestions for the plans they paid for, these will be updated on a weekly basis.
- Access to the current Formula Stocks portfolio
  - Users will have access to the entire Formula Stocks portfolio, this will be updated on a monthly basis.
- Access to proprietary analysis data on Formula Stocks
  - On suggested stocks, users can also see some of our proprietary data points we use to analyze stocks.
- A subscription based information service
- Free 30 day trial to the Basic plan.

### APIs
- [Quandl](https://Quandl.com/)
- Kinvey (baas)
- Formula Stocks proprietary API
- [Free Geo api](https://github.com/fiorix/freegeoip)

### Data Modeling
- Users Collection
```
{
  email: 'example@email.com',
  firstname: 'Mark',
  lastname: 'Lyck',
  country: 'DK',
  ip_address: '127.0.0.1',
  plan: 'Basic',
  nextBillingDate: '',
  trialExpires: '',
  stripe_id: '',
  sub_id: '',
  authtoken: '12345',
  company: 'Microsoft',


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
- Posts Collection (optional)
```
{
   author: 'Mark Lyck',
   posted: 'date',
   title: 'Title',
   body: '<html>'
}
```

### Routes
- /
- /products
- /resources
- /blog
- /about-us
- /legal
- /dashboard/
- /dashboard/basic/portfolio
- /dashboard/basic/suggestions
- /dashboard/premium/portfolio
- /dashboard/premium/suggestions
- /dashboard/business/portfolio
- /dashboard/business/suggestions
- /dashboard/fund/portfolio
- /dashboard/fund/suggestions
- /dashboard/admin
- /dashboard/admin/api
- /dashboard/admin/users
- /dashboard/admin/new-blog
- /dashboard/admin/newsletter

### User flow
- read what we do
- read about our products
- sign up for free trial
- go to portfolio and see performance
- go to suggestions and assess stocks
- upgrade to a better plan to access better stock suggestions

### Libraries
- JQuery
- Underscore
- [Stripe](https://stripe.com/) (payment system)
- [AmCharts](https://www.amcharts.com/) (financial charts)
- [dropzonejs](http://www.dropzonejs.com/) (drag and drop file upload)
- [moment](http://momentjs.com/) (date formatting)
- [react-html-parser](https://github.com/wrakky/react-html-parser) (optional for blogs)

### Frameworks
- React
- Backbone

### Special requirements
- Custom logarithmic graph layout.
- MaiLgun / Nodemailer / PostMark (newsletter email service)
- FastMail (contact emails)
- 12 updatable JSON files hosted with Amazon Web Services
- Extremely Polished user interface

### Extra possible features
- Mark stocks as bought, and keep track of your stocks.
- Implement a full portfolio system, integrated with Formula Stocks
- blog system w/ rich media formatting
