const path = require('path');
const express = require('express');
const ejs = require('ejs');

const app = express();

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const { error } = require('console');

//*Define port
const port = 3000;
//*Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//*Setup handlebars engine and vies location
app.set('view engine', 'ejs');
app.set('views', viewsPath);
ejs.render(partialsPath);

//* Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Etarley Taveras',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Etarley Taveras',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: "We're here to help you!",
    name: 'Etarley Taveras',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    page: 'Help article',
    title: '404',
    name: 'Etarley Taveras',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    page: 'Page',
    title: '404',
    name: 'Etarley Taveras',
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
