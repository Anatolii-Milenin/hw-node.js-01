const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
let contactsDataBase;

async function parseContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data.toString());
}

async function listContacts() {
  try {
    const list = await parseContacts();
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    console.table(sortedList);
    return sortedList;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await parseContacts();
    const contactsFilter = contacts.filter(
      (contact) => contact.id === contactId
    );
    if (contactsFilter.length > 0) {
      console.table(contactsFilter);
      return contactsFilter[0];
    }
    console.log(null);
    return null;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await parseContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      const removedContact = contacts.splice(contactIndex, 1)[0];

      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log(`Contact with the id ${contactId} has been removed.`);
      console.table([removedContact]);
      return removedContact;
    } else {
      console.log(null);
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await parseContacts();
    const contact = {
      id: (Math.floor(Math.random() * 100000) + contacts.length).toString(),
      name,
      email,
      phone,
    };

    if (!name || !email || !phone) {
      console.log(
        "Please provide all arguments (name, email, phone) to add a contact"
      );
      return null;
    }

    contacts.push(contact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`${name} has been added to your contacts.`);
    console.table([contact]);
    return contact;
  } catch (error) {
    console.log("Oops, something went wrong:", error.message);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
