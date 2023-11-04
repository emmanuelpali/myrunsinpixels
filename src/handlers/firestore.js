import { serverTimestamp, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

const Firestore = {
    //get data from firebase
    readDocs: (...args) => {
        //array to stored fetched data from firebase
        let storedRuns = []
        const ref = collection(db, "runs")
        return new Promise(async resolve => {
            try {
                const rundata = await getDocs(ref)
                rundata.forEach(run => {
                    const singleRun = {...run.data(), id: run.id}
                    storedRuns.push(singleRun)
                    
                })
                resolve(storedRuns)
            } catch (error) {
                console.log(error, ' Could not fetch data');
            }
        })
    },
    // write data to firebase
    writeDoc: (...args) => {
        const [inputs, collection_name] = args
        return new Promise(async resolve => {
            const randomIndex = Math.floor(Math.random() * 1000000)
            try {
                const docRef = doc(db, collection_name, `${randomIndex}`);
                await setDoc(docRef, {title: inputs.title,user: inputs.user, description: inputs.description, path: inputs.path, createdAt: serverTimestamp() });
                resolve('new doc successfully inserted')
            } catch (error) {
                console.log('failed to upload image to database');
            }
        })
    }
}

export default Firestore;