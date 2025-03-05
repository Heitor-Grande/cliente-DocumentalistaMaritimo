interface aquaviarioType {

    id?: string

    nome?: string

    inscricaoAtual?: string

    inscricaoAntiga?: string

    situacao?: "Ativo" | "Inativo"

    dataInscricao?: string

    cpf?: string

    identidade?: string

    nacionalidade?: string

    naturalidade?: string

    dataNascimento?: string

    sexo?: "Masculino" | "Feminino"

    altura?: string

    corDosOlhos?: string

    competencia?: string

    dataCategoria?: string

    DataDaValidade?: string

    email?: string

    senha?: string

    confirmarSenha?: string
}

export default aquaviarioType