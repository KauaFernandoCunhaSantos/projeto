import { Navigate, Outlet, Route, Routes, useLocation } from "react-router"
import Menu from "../menu/Menu"
import Clientes from "../../pages/clientes/index.jsx"
import Produtos from "../../pages/produtos/index.jsx"
import Vendas from "../../pages/vendas/index.jsx"
import Home from "../../pages/home/index.jsx"
import { useEffect, useState } from "react"
import api from "../../services/api.js"
import { LinearProgress } from "@mui/material"

function RotaSegura(props){
    if(props.usuario){
        return <Outlet/>
    }else{
        return <Navigate to="/" replace />
    }
}
export default function Principal(){
    const [carregando, setCarregando] = useState(true)
    const local =  useLocation()
    const [usuario, setUsuario] = useState(null)
    async function logar(user){
        try{
          let retorno = await api.post("/auth/login/", user);
          console.log(retorno.data)
          await verificarAutenticacao()
         
          return true

        }
        catch(erro){
            console.log("ou deu erro ou o login ta errado")
            console.log(erro.name)
            return false
        }

    }

    async function logOut(){
        let retorno = await api.post("/auth/logout")
                  console.log(retorno.data)
        verificarAutenticacao()
        setUsuario(false)
    }
    
    
    async function verificarAutenticacao() {
        setCarregando(true)
        try {
            let retorno = await api.get("/auth/me")
            setUsuario(retorno.data)
        }

        catch (erro) {
            console.log(erro.name)
            setUsuario(null)
        }
        finally {
            setCarregando(false)
        }

    }

    useEffect(() => {
        verificarAutenticacao()
    }, [local.pathname])

    if(carregando){
       return <LinearProgress/>
    }


    return<><Menu usuario={usuario} onLogar={logar} logOut={logOut}/>
    
    <Routes>
        <Route index element={<Home />}/>

        <Route element={<RotaSegura usuario={usuario}/>}>
        <Route path="/Clientes" element={<Clientes/>}/>
        <Route path="/Produtos" element={<Produtos/>}/>
        <Route path="/Vendas" element={<Vendas/>}/>
        </Route> 
    </Routes>
    </>
}