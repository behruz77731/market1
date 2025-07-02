const searchInput = document.getElementById('searchInput');
const userCards = document.getElementById('userCards');
const toggleButton = document.getElementById('toggleMode');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const cards = userCards.getElementsByClassName('card');
  Array.from(cards).forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(filter) ? '' : 'none';
  });
});

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
 




const translations = {
  ru: {
    title: "Привет",
    description: "Выберите язык из списка выше"
  },
  uz: {
    title: "Salom",
    description: "Yuqoridagi roʻyxatdan tilni tanlang"
  }
};

function changeLanguage() {
  const lang = document.getElementById("languageSelect").value;
  document.getElementById("title").textContent = translations[lang].title;
  document.getElementById("description").textContent = translations[lang].description;
}
