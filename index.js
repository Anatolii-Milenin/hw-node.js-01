const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();

program
  .option(
    "-a, --action <string>",
    "choose action: list, get -i, add -n -e -p, remove -i"
  )
  .option("-i, --id <string>", "user id")
  .option("-n, --name <string>", "user name")
  .option("-e, --email <string>", "user email")
  .option("-p, --phone <string>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await contacts.listContacts();
      break;
    case "get":
      await contacts.getContactById(id);
      break;
    case "add":
      await contacts.addContact(name, email, phone);
      break;
    case "remove":
      await contacts.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
