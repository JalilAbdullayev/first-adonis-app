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

router.on('/').render('pages/home').as('home')
router
  .get('movies/:slug', async (ctx) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.html`)
    const movie = await fs.readFile(url, 'utf-8')
    return ctx.view.render('pages/movies/show', { movie })
  })
  .as('movies.show')
