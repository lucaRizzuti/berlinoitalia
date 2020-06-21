function parseMarkdown() {
    var items = document.getElementsByClassName('parse-as-markdown');

    for (var i = 0; i < items.length; i++) {
        items[i].innerHTML = marked(items[i].textContent);
    }
}

parseMarkdown();
