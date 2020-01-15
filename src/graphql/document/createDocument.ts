import { gql } from 'apollo-boost';

export const CREATE_DOCUMENT = gql`
    mutation CreateDocument($data: CreateDocumentInput!){
        createDocument(data: $data){
            _id
        }
    }
`

