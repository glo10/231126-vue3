import http from 'node:http'
import { writeFile, readFile} from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const TICKETS_FILE = join(__dirname, 'tickets.json')
const PORT = 3000

const VALID_TYPES = [
  'bug',
  'reclammation',
  'ma commande',
  'facture',
  'livraison',
  'mon compte',
  'mes accès',
  'autre',
]

async function readTickets() {
  try {
    const content = await readFile(TICKETS_FILE, 'utf-8')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(TICKETS_FILE, '[]\n', 'utf-8')
      return []
    }
    throw error
  }
}

async function saveTicket(ticketData) {
  const tickets = await readTickets()
  const newTicket = {
    id: `T-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: String(ticketData.title).trim(),
    email: String(ticketData.email).trim(),
    type: ticketData.type,
    isUrgent: Boolean(ticketData.isUrgent),
    message: String(ticketData.message).trim(),
    orderId: ticketData.orderId || null,
  }

  tickets.push(newTicket)
  await writeFile(TICKETS_FILE, JSON.stringify(tickets, null, 2) + '\n', 'utf-8')
  return newTicket
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (url.pathname === '/admin/tickets' && req.method === 'GET') {
    try {
      const tickets = await readTickets()
      sendJson(res, 200, { tickets })
    } catch (error) {
      sendJson(res, 500, { error: 'Erreur lors de la lecture des tickets.' })
    }
    return
  }

  if (url.pathname === '/support' && req.method === 'POST') {
    let rawBody = ''

    req.on('data', (chunk) => {
      rawBody += chunk.toString('utf-8')
      if (rawBody.length > 1_000_000) {
        req.destroy()
      }
    })

    req.on('end', async () => {
      try {
        const body = JSON.parse(rawBody || '{}')

        if (!body.title || String(body.title).trim().length < 10) {
          sendJson(res, 400, { error: 'Le titre doit contenir au moins 10 caractères.' })
          return
        }
        if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())) {
          sendJson(res, 400, { error: 'Adresse email invalide.' })
          return
        }
        if (!VALID_TYPES.includes(body.type)) {
          sendJson(res, 400, { error: 'Type de demande invalide.' })
          return
        }
        if (!body.message || String(body.message).trim().length < 30) {
          sendJson(res, 400, { error: 'Le message doit contenir au moins 30 caractères.' })
          return
        }

        const saved = await saveTicket(body)
        sendJson(res, 201, { message: 'Ticket enregistré.', ticket: saved })
      } catch (error) {
        sendJson(res, 400, { error: 'JSON invalide ou erreur de traitement.' })
      }
    })
    return
  }

  sendJson(res, 404, { error: 'Route non trouvée.' })
})

server.listen(PORT, () => {
  console.log(`Serveur support démarré sur http://localhost:${PORT}`)
})