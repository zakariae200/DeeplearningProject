import { gql } from 'apollo-angular'

const GET_ANSWERS = gql`        
query {
  questions {
      id
      answer
      score
    }
} 
`

const CREATE_QUESTION = gql`
mutation($id: String!, $answer: String!) {
  createQuestion(id: $id, answer: $answer) {
    id
    answer
    score
  }
}
`
export { GET_ANSWERS, CREATE_QUESTION }