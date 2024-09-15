/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.get('movies', async (ctx) => {
  ctx.view.share({ movie: 'Movie 1' })
  return ctx.view.render('pages/movies', { movies: 'Movies List' })
})
