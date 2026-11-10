import { useEffect, useState } from "react"
import api from "../../services/api"
import { Box, LinearProgress, Stack, TextField } from "@mui/material"
import Tabela from "./tabela"

export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [pagina, setPagina] = useState(1)
    const [produtoPesquisar, setProdutoPesquisar] = useState(null)
    async function BuscarBanco() {
        let params = { _page: pagina, _per_page: 5 }
        if(produtoPesquisar){
             params["nome:contains"]=produtoPesquisar;
        }
        try{
        let retorno = await api.get("/produtos", { params: params })
        setTotalPaginas(retorno.data.pages)
        setProdutos(retorno.data.data)
        console.log(retorno.data.data)
        }
        catch(erro){
            console.log(erro.name)
        }
    }

    useEffect(() => {
        BuscarBanco()
    }, [pagina, produtoPesquisar])

    // if(!produtos){
    //     return<LinearProgress/>
    // }
    function mudarPagina(novaPagina){
        setPagina(novaPagina)
    }
    function onPesquisar(appData){
        setProdutoPesquisar(appData.get("produto"))
        
    }
    return <>
    <Stack direction={"row"} sx={{justifyContent:"space-between"}}>
        <h1>produtos</h1>
        <form action={onPesquisar}>
        <TextField label="Pesquisar" variant="standard" name="produto"/>
        </form>
    </Stack>
        <Tabela produtos={produtos}
                pagina={pagina}
                onMudarPagina={mudarPagina}
                totalPaginas={totalPaginas}
        />
    </>
}