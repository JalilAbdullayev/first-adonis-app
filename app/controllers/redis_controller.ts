import type { HttpContext } from '@adonisjs/core/http'
import cache from '#services/cache_service'

export default class RedisController {
  public async destroy({ response, params }: HttpContext) {
    await cache.delete(params.slug)
    return response.redirect().back()
  }

  public async flush({ response }: HttpContext) {
    await cache.flushDb()
    return response.redirect().back()
  }
}
