import { Router } from 'express'

const productosWebRouter = new Router()

//Interceptar con middleware o con if, para restringir home si no hay sesion--------actualizado-*+++*------------------
productosWebRouter.get('/home', (req, res) => {
const nombre = req.session?.nombre
    if (nombre) {
              //Cambiar el nombre de usuario-------------------actualizado-*+++*------------------
  
        res.render(process.cwd() + '/views/pages/home.ejs',  { nombre: req.session.nombre })
    } else {
      res.sendFile(process.cwd() + '/views/login.html')
    }
    //-------------------------------------------------------*+++*------------------
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(process.cwd() + '/views/productos-vista-test.html')
})

export default productosWebRouter