import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyB7f4NdTYvpvQiR-FA7-voit_a3tH3daik',
	authDomain: 'gym-app-d4a4f.firebaseapp.com',
	projectId: 'gym-app-d4a4f',
	storageBucket: 'gym-app-d4a4f.appspot.com',
	messagingSenderId: '680579670786',
	appId: '1:680579670786:web:0962e8dac96b446859d81b',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
