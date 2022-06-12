function turnStringToCamelCase(string: string) {
    const words = string.split(" ").map((word, index) => {
        let newWord = word;

        if (/[/]+/.test(word)) {
            newWord = word
                .split("/")
                .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
                .join("Or");
        }

        if (/[-]+/.test(word)) {
            newWord = word
                .split("-")
                .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
                .join("");
        }

        if (index === 0) {
            newWord = newWord = newWord[0].toLowerCase() + newWord.substr(1);
        } else {
            newWord = newWord = newWord[0].toUpperCase() + newWord.substr(1);
        }

        return newWord;
    });

    return words.join("");
}

export { turnStringToCamelCase }