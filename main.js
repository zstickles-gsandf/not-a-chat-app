 // Initialize Firebase
const config = {
	apiKey: "AIzaSyBgs6tMskLTFnLjIx3g77tCgqKtUIUAlZk",
	authDomain: "sl-chat-22bf3.firebaseapp.com",
	databaseURL: "https://sl-chat-22bf3.firebaseio.com",
	projectId: "sl-chat-22bf3",
	storageBucket: "",
	messagingSenderId: "710698717273"
};
firebase.initializeApp(config);

const db = firebase.database().ref();
const auth = firebase.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();

let username = null;

// Get Elements
const $message = document.getElementById('message');
const $postBtn = document.getElementById('post');
const $loginBtn = document.getElementById('login');
const $chat = document.getElementById('chat');

// When a user clicks on the post button
$postBtn.addEventListener('click', () => {
	const username = $username.value;
	const message = $message.value;
	db.push({ username, message });
	$message.value = '';
});

// When a user clicks on the login button
$loginBtn.addEventListener('click', () => {
	auth.signInWithPopup(authProvider); // promise
});

// When a new message is recieved, add it
db.on('child_added', (snapshot) => {
	const content = snapshot.val();
	const $name = document.createElement('b');
	const $text = document.createElement('span');
	const $entry = document.createElement('div');
	$name.textContent = content.username + ':';
	$text.textContent = ' ' + content.message;
	$entry.appendChild($name);
	$entry.appendChild($text);
	$chat.appendChild($entry);
});

// When the user authentication status changes
auth.onAuthStateChanged((data) => {
	if (data) {
		username = data.displayName;
		$loginBtn.textContent = `Logged in as ${username}`;
		$loginBtn.disabled = true;
		$message.style.display = block;
		$postBtn.style.display = block;
	}
});
