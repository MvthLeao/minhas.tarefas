import BotaoAdicionar from "../../components/BotaoAdicionar"
import BarraLateral from "../../styles/containers/BarraLateral"
import ListaTarefas from "../../styles/containers/ListaTarefas"

const Home = () => (
    <>
        <BarraLateral mostrarFiltros />
        <ListaTarefas />
        <BotaoAdicionar />
    </>
)

export default Home