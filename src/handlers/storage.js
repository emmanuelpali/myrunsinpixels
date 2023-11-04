import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";

const Storage = {
    uploadFile: (picture) => {
        return new Promise(async resolve => {
            try {
                const pictureRef = ref(storage, `images/${picture.title}`)
                uploadBytes(pictureRef, picture.file).then(snapshot => {
                    resolve({ path: snapshot.metadata.fullPath, name: snapshot.title})
                })
            } catch (error) {
                console.log(error);
            }
        })
    },

    downloadUrl: (media) => {
        return new Promise(async resolve => {
            try {
                const mediaRef = ref(storage, media.path)
                const fileURL = await getDownloadURL(mediaRef)
                resolve(fileURL)
            } catch (error) {
                console.log(error, 'failed to download url');
            }
        })
    }
}

export default Storage;