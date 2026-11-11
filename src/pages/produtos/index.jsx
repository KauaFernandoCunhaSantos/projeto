import { useEffect, useState } from "react"
import api from "../../services/api"
import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material"
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

    if(!produtos){
      return<LinearProgress/>
    }
    function mudarPagina(novaPagina){
        setPagina(novaPagina)
    }
    function onPesquisar(appData){
        setProdutoPesquisar(appData.get("produto"))
        
    }
    //excluir
    async function deletar(id){
        try{
        let retorno = await api.delete(`/produtos/${id}`)
        }
        catch(erro){
            console.log(erro.name)
        }
        finally{
            BuscarBanco()
        }
    }
    return <>
    <Stack direction={"row"} sx={{justifyContent:"space-between", alignItems:"end"}}>
        <Stack><h1>produtos</h1>
        <Button>Adicionar Produto</Button>
        </Stack>
        <form action={onPesquisar}>
        <TextField label="Pesquisar" variant="standard" name="produto"/>
        </form>
    </Stack>
        <Tabela produtos={produtos}
                pagina={pagina}
                onMudarPagina={mudarPagina}
                totalPaginas={totalPaginas}
                onDeletar={deletar}
        />
    </>
}