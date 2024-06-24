import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Tarefa from "../../models/Tarefa"
import * as enums from '../../utils/enums/Tarefa'

type TarefasState = {
    itens: Tarefa[]
}

const initialState: TarefasState = {
    itens: [
        {
            id: 1, 
            descricao: 'Estudar JavaScript revendo exercício do módulo 7',
            prioridade: enums.Prioridade.NORMAL,
            status: enums.Status.CONCLUIDA,
            titulo: 'Estudar JavaScript',
        },
        {
            id: 2, 
            descricao: 'Estudar TypeScript revisando conteúdo',
            prioridade: enums.Prioridade.IMPORTANTE,
            status: enums.Status.PENDENTE,
            titulo: 'Novo módulo de TypeScript',
        },
        {
            id: 3, 
            descricao: 'Estudar React novo projeto',
            prioridade: enums.Prioridade.URGENTE,
            status: enums.Status.PENDENTE,
            titulo: 'Aula Prática de React.js',
        },
    ]
}

const tarefaSlice = createSlice({
    name: 'tarefas',
    initialState,
    reducers: {
        remover: (state, action: PayloadAction<number>) => {
            state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
        },
        editar: (state, action: PayloadAction<Tarefa>) => {
            const indexDaTarefa = state.itens.findIndex(
                (t) => t.id === action.payload.id
            )

            if (indexDaTarefa >= 0) {
                state.itens[indexDaTarefa] = action.payload
            } 
        },
        cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
            const tarefaJaExiste = state.itens.find(
                (tarefa) =>
                    tarefa.titulo.toLocaleLowerCase() === action.payload.titulo.toLocaleLowerCase()
            )

            if (tarefaJaExiste) {
                alert('Já existe uma tarefa com este nome')
            } else {
                const ultimaTarefa = state.itens[state.itens.length - 1]

                const tarefaNova = {
                    ...action.payload,
                    id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
                }
                state.itens.push(tarefaNova)
            }
        },
        alteraStatus: (state, action: PayloadAction<{ id:number; finalizado: boolean }>) => {
            const indexDaTarefa = state.itens.findIndex(
                (t) => t.id === action.payload.id
            )

            if (indexDaTarefa >= 0) {
                state.itens[indexDaTarefa].status = action.payload.finalizado ? enums.Status.CONCLUIDA : enums.Status.PENDENTE
            } 
        }
    }
})

export const { remover, editar, cadastrar,  } = tarefaSlice.actions
export default tarefaSlice.reducer