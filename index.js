const express = require('express');
const cors = require('cors');
const app = express();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://qkroggfpfkfrwgxhozid.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcm9nZ2ZwZmtmcndneGhvemlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNzIwNTUsImV4cCI6MjA0NDc0ODA1NX0.QeBCH_JLhXAUVH1JIScQH3zx_N560y-6SsEu0ZSBSmU');


app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API rodando!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
