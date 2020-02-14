import { gql } from 'apollo-boost';

export const UPDATE_TREE_NODE = gql`
    mutation UpdateTreeNode ($documentId: ID!, $data: UpdateTreeNodeInput!){
        updateTreeNode(documentId: $documentId, data: $data){
            _id

            treeNode{
                key 
                parent
                documentName

                agencyIssued
                issuedDate
                note
                filesPosition{
                    filesPositionMediaId
                    filesPositionMedia{
                        _id
                        uri
                        type
                    }
                    filesNote 
                }
                nodeMediaId 
                nodeMedia{
                _id
                uri
                type
            }
            }
            
        }
    }   
`