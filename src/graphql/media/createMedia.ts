import { gql } from 'apollo-boost';
export const UPLOAD_FILE = gql`
    mutation Upload_file($file: Upload!, $dimensions: PhotoDimensionsInput!){
        uploadPhoto(file: $file, dimensions: $dimensions){
            _id
            uri
            type 
        }
    }   
`