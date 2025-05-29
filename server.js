require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Configuração do Handlebars
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de segurança
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://maps.googleapis.com',
          'https://www.google.com'
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://fonts.googleapis.com'
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://maps.gstatic.com',
          'https://maps.googleapis.com',
          'https://www.google.com'
        ],
        fontSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://fonts.gstatic.com',
          'data:'
        ],
        connectSrc: [
          "'self'",
          'https://maps.googleapis.com'
        ],
        frameSrc: [
          "'self'",
          'https://www.google.com',
          'https://www.google.com/maps'
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    }
  })
);

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || '*'
}));

// Limitar requisições para evitar spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', require('./routes/index'));
app.use('/mail', require('./routes/mail'));

// Inicia o servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
  console.log('Ambiente:', process.env.NODE_ENV || 'development');
});