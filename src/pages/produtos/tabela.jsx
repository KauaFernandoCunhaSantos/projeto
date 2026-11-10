import { Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";

export default function Tabela(props){
    return<>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Estoque</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.produtos.map((produto)=><TableRow key={produto.id}>
                    <TableCell>{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.valor}</TableCell>
                    <TableCell>{produto.estoque}</TableCell>
                </TableRow>)}
            </TableBody>
            
               
            
        </Table>
         <Pagination count={props.totalPaginas} page={props.pagina} onChange={(evento, novaPagina)=>props.onMudarPagina(novaPagina)}/>

    </>
}