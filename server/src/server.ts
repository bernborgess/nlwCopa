import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap (): Promise<void> {
  const fastify = Fastify({
    logger: true
  })

  console.log('hello')

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/polls/count', async () => {
    const count = await prisma.poll.count()
    return { count }
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

void bootstrap()
