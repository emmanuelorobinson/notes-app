const { default: chalk } = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();

    //const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title == title)

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('New notes added'));
    }
    else {
        console.log(chalk.red.inverse('Note title taken'));
    }

}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(notesToKeep);
    }
    else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

const listNote = () => {
    const notes = loadNotes();

    console.log(chalk.green.inverse("Your notes"));

    notes.forEach(element => {
        console.log(element.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const findNote = notes.find((note) => note.title === title);

    if (findNote) {
        console.log(chalk.green.inverse(`${findNote.title}`));
        console.log(`Body: ${findNote.body}`);
    }
    else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
};