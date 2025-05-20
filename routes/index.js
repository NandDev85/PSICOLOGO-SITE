const express = require('express');
const router = express.Router();

// Página inicial
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Alex Ferreira - Psicólogo Clínico',
    active: { home: true }
  });
});

// Sobre
router.get('/sobre', (req, res) => {
  res.render('sobre', {
    title: 'Sobre Alex Ferreira',
    active: { sobre: true }
  });
});

// Áreas de Atuação
router.get('/areas', (req, res) => {
  res.render('areas', {
    title: 'Áreas de Atuação',
    active: { areas: true }
  });
});

// Por que Fazer Terapia
router.get('/terapia', (req, res) => {
  res.render('terapia', {
    title: 'Por que Fazer Terapia?',
    active: { terapia: true }
  });
});

// Como Podemos Ajudar
router.get('/ajuda', (req, res) => {
  res.render('ajuda', {
    title: 'Como Posso Te Ajudar',
    active: { ajuda: true }
  });
});

// Processos Terapêuticos
router.get('/processos', (req, res) => {
  res.render('processos', {
    title: 'Processos Terapêuticos',
    active: { processos: true }
  });
});

// Depoimentos
router.get('/depoimentos', (req, res) => {
  res.render('depoimentos', {
    title: 'Depoimentos',
    active: { depoimentos: true }
  });
});

// Contato
router.get('/contato', (req, res) => {
  res.render('contato', {
    title: 'Contato',
    active: { contato: true }
  });
});

// Agendamento
router.get('/agendamento', (req, res) => {
  res.render('agendamento', {
    title: 'Agendamento',
    active: { agendamento: true }
  });
});

module.exports = router;