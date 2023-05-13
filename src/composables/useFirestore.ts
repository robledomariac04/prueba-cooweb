import { DB } from "../services/firebase"

export const useFirestore = () => {
    
    const getReference = (type: "collection" | "document", path:string) => {
        if(type == 'collection'){
            return DB.collection(path)
        } else{
            return DB.doc(path)
        }
    }

    const getCollection = async (path: string) => {
        const reference = await getReference('collection', path)

        const querySnapshot = await reference.get()

        const records: any[] = []

        querySnapshot.forEach((doc:any) => {
            const props = doc.data()
            records.push(props)
        })
        return records
    }

    const addDocument = async (path: string, document: Record<string, any>) => {
        const reference = await getReference('collection', path)
        return await reference.add(document)
    }

    const deleteDocument = async (path: string) => {
        const reference = await getReference('collection', path)
        return await reference.delete(document)
    }

    const updateDocument = async (path: string, document: Record<string, any>) => {
        const reference = await getReference('collection', path)
        return await reference.update(document)
    }

    return {
        getReference,
        getCollection,
        addDocument,
        deleteDocument,
        updateDocument
    }
}