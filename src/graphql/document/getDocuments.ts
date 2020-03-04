import { gql } from 'apollo-boost';
export const GET_DOCUMENTS = gql`
    query GetDocuments ($limit: Int!, $query:String, $skip: Int, $status:Status, $documentType: DocumentType){
        getDocuments(limit: $limit, query: $query, skip:$skip, status: $status, documentType: $documentType){
            total
            documents {
                _id 
                partnerName
                partnerCode 
                projectCode
                projectName
                projectCategory
                investDecideDepartment
                investor
                investorRepresent
                documentType
                cmsUserId
                reviewer{
                    fullName
                }
                cmsUser{
                    fullName
                }
                treeNode{
                    key
                    parent
  					agencyIssued
  					issuedDate
  					documentName
                    note
                    nodeMediaId
                    nodeMedia{
                            _id
                            uri
                            type
                        }
                    filesPosition{
                        filesNote
                        filesPositionMediaId
                        filesPositionMedia{
                            _id
                            uri
                            type
                        }
                    }
                }
                status 
                createdBy 
                createdAt 
                updatedAt
                updatedBy  
                
            }
        }
    }
`
export const GET_DOCUMENT = gql`
    query GetDocument($_id: ID!){
        getDocument(_id: $_id){
            _id 
                partnerName
                partnerCode 
                projectCode
                projectName
                projectCategory
                investDecideDepartment
                investor
                investorRepresent
                documentType
                cmsUserId
                reviewer{
                    fullName
                }
                cmsUser{
                    fullName
                }

            treeNode{
                    key
                    parent
  					agencyIssued
  					issuedDate
  					documentName
                    note
                    nodeMediaId
                    nodeMedia{
                            _id
                            uri
                            type
                        }
                    filesPosition{
                        filesNote
                        filesPositionMediaId
                        filesPositionMedia{
                            _id
                            uri
                            type
                        }
                    }
                }
        }
    }
`