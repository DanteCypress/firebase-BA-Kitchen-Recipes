const list = document.querySelector("ul");
const form = document.querySelector("form");
const addRecipe = recipe => {
  let time = recipe.posted_at.toDate();
  let html = `
    <li>
    <div>${recipe.title}</div>
    <div>${time} <div>

    </li>
    `;
  list.innerHTML += html;
};

console.log(form.recipe.value);

//get docs
db.collection("recipes")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());

      addRecipe(doc.data());
    });
  })
  .catch(err => {
    console.log(err);
  });

//add docs
form.addEventListener("submit", e => {
  e.preventDefault();
  console.log("hi");

  const now = new Date();
  const recipe = {
    title: form.recipe.value,
    posted_at: firebase.firestore.Timpstamp.fromDate(now)
  };
  db.collection("recipes")
    .add(recipe)
    .then(() => {
      console.log("recipe added");
    })
    .catch(err => {
      console.log("err");
    });
});
