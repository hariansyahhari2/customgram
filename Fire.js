import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyBX2_ntQCp-wzldI_ETFjEJ_VLXQDKtVyM",
    authDomain: "customgram-93d8b.firebaseapp.com",
    databaseURL: "https://customgram-93d8b.firebaseio.com",
    projectId: "customgram-93d8b",
    storageBucket: "customgram-93d8b.appspot.com",
    messagingSenderId: "102155200883",
    appId: "1:102155200883:web:218ad5f4d4905552f73d06"
  };

class Fire {
    
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }
    addPost = async({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`)

        return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timeStamp: this.timeStamp,
                image: remoteUri
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(filename).put(file)

            upload.on('state_changed', snapshot => {}, err => {
                rej(err)
            },
            async() => {
                const url = await upload.snapshot.ref.getDownloadURL()
                res(url)
            }
            )
        })
    }
    
    createUser = async user => {
        let remoteUri= null

        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            })

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`)

                db.set({avatar: remoteUri}, {merge: true})
            }
        }
        catch (error) {
            alert(error)
        }
    }

    signOut = () => {
        firebase.auth().signOut()
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
    
    get timeStamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire