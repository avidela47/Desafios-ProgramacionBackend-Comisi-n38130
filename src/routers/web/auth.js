import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    //Si la sesion no existe, redirigir a login, sino redirigir a home
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/home')
    } else {
        res.sendFile(process.cwd() + '/views/login.html')
    }

})

authWebRouter.get('/login', (req, res) => {
    //Si ya existe una sesion, redirigir al home
         const nombre = req.session?.nombre
      if (nombre) {
          res.redirect('/home')
      } else {
        res.sendFile(process.cwd() + '/views/login.html')
      }
   
})

authWebRouter.get('/logout', (req, res) => {
    //Obtener el nombre del usuario

    const nombre = req.session?.nombre
    //Eliminar la sesion con destroy
    //Renderizar la plantilla con el nombre de usuario

    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(process.cwd() + '/views/pages/logout.ejs', { nombre })
            } else {
                res.redirect('/home')
            }
        })
    } else {
        res.redirect('/home')
    }
   
})


authWebRouter.post('/login', (req, res) => {
    console.log(req.body);
    //Guardar el nombre que viene en el body en la sesion.
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})



export default authWebRouter