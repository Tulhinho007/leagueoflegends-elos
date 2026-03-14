// js/db.js
// Inicializa o cliente Supabase.
// As credenciais chegam via /api/config (Vercel Serverless Function).
// Em desenvolvimento local, crie um arquivo .env na raiz com as variáveis.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

async function getConfig() {
  try {
    // Em produção, busca as chaves da Serverless Function
    const res = await fetch('/api/config');
    if (!res.ok) throw new Error('config endpoint failed');
    return await res.json();
  } catch {
    // Fallback para desenvolvimento local (nunca commitar valores reais aqui)
    console.warn('[db.js] Usando config de fallback local — não commitar no Git!');
    return {
      url: 'https://yqpwnlxzbytlzndtrpkz.supabase.co',
      key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcHdubHh6Ynl0bHpuZHRycGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTcyOTEsImV4cCI6MjA4ODgzMzI5MX0.ow59ofZ9QkUpaVaekn-QH-nKbmpjv-v1lgJcZAybWko',
    };
  }
}

let _db = null;

export async function getDB() {
  if (_db) return _db;
  const { url, key } = await getConfig();
  _db = createClient(url, key);
  return _db;
}
