const functions = require('firebase-functions');

const wordMap = [
  { bad: 'shit', good: 'poo' },
  { bad: 'fuck', good: 'fork' },
  { bad: 'ass', good: 'butt' },
];

function cleanUp(str) {
  return wordMap.reduce((acc, word) => {
    return acc.replace(word.bad, word.good);
  }, str.toLowerCase());
}

exports.sanitizePost = functions.database
  .ref('posts/{pushId}')
  .onWrite((e) => {
    const post = e.data.val();
    if (post.clean) {
      return;
    }
    console.log('cleaning up post', post);
    post.clean = true;
    post.message = cleanUp(post.message);
    return e.data.ref.set(post)
  });
