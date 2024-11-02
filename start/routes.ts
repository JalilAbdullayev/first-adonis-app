/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import app from '@adonisjs/core/services/app'
import * as fs from 'node:fs/promises'
import { Exception } from '@adonisjs/core/exceptions'
import { MarkdownFile } from '@dimerapp/markdown'
import { toHtml } from '@dimerapp/markdown/utils'

router.on('/').render('pages/home').as('home')
router
  .get('movies/:slug', async (ctx) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.md`)
    try {
      const file = await fs.readFile(url, 'utf-8')
      const md = new MarkdownFile(file)
      await md.process()
      const movie = toHtml(md).contents
      ctx.view.share({ movie })
    } catch (error) {
      throw new Exception(`Could not find a movie called ${ctx.params.slug}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
    return ctx.view.render('pages/movies/show')
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
