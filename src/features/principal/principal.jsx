import { Route, Routes } from "react-router"
import Menu from "../menu/Menu"
import Clientes from "../../pages/clientes/index.jsx"
import Produtos from "../../pages/produtos/index.jsx"
import Vendas from "../../pages/vendas/index.jsx"
import Home from "../../pages/home/index.jsx"
import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../services/api.js"
export default function Principal(){
    const [logado, setLogado] = useState(false)
    async function logar(user){
        try{
          let retorno = await api.post("/auth/login/", user);
          setLogado(true)
          console.log("funciona")
          return true

        }
        catch(erro){
            console.log("ou deu erro ou o login ta errado")
            console.log(erro)
            return false
        }

    }

    async function logOut(){
        let retorno = await api.post("/auth/logout")
        setLogado(false)
    }
    
    return<><Menu logado={logado} onLogar={logar} logOut={logOut}/>
    
    <Routes>
        <Route index element={<Home />}/>

        {logado&&<>
        <Route path="/Clientes" element={<Clientes/>}/>
        <Route path="/Produtos" element={<Produtos/>}/>
        <Route path="/Vendas" element={<Vendas/>}/>
         </>}       
    </Routes>
    </>
}