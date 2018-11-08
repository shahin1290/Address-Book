const storage = window.localStorage
const renderContacts = () => {

  const contacts = JSON.parse(storage.getItem('contacts'))

  // Select the container we will use to list the contacts 
  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''

    // render the contacts
    const ul = document.createElement('div')
    ul.className += 'flex justify-start'
    // For every contact in our array of contacts, we will
    // create a li element that will contain a card with
    // all the information of the contact
    contacts.forEach(contact => {
      let li = document.createElement('div')
      li.className += 'flex-1 p-5'
      li.innerHTML = `
        <div class="card max-w-sm rounded overflow-hidden shadow-lg">
          <div class="content">
            <h1>${ contact.name }</h1>
            <h2>${ contact.company }</h2>
            <p>${ contact.notes }</p> 
            ${ contact.email } | 
            <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
          </div>
        </div>
     `
      // Add the contact's li to the unordered list we created earlier
      ul.appendChild(li)
    })

    // Lastly, append the list to the contact-list container.
    div.appendChild(ul) 
  } else { 
    div.innerHTML = '<p>You have no contacts in your address book</p>' 
  }
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()

    // Select form object from the DOM
    const addContactForm = document.querySelector('.new-contact-form')

    
  
    // Register an event to listen for form submission
    addContactForm.addEventListener('submit', event => {
      // Disable default behavior when submitting form
      event.preventDefault()

      const storage = window.localStorage
      // const contacts = JSON.parse(storage.getItem('contacts'))


      // Get all inputs elements from the form
      const {
        name,
        email,
        phone,
        company,
        notes,
        twitter,
      } = addContactForm.elements
  
      // Create contact object
      const contact = {
        id: Date.now(),
        name: name.value,
        email: email.value,
        phone: phone.value,
        company: company.value,
        notes: notes.value,
        twitter: twitter.value,
      }
  
    // console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
    let contacts = JSON.parse(storage.getItem('contacts')) || []

    contacts.push(contact)

    storage.setItem('contacts', JSON.stringify(contacts))
    // storage.setItem('contacts', JSON.stringify([contact]))
    renderContacts()

    addContactForm.reset()

    })
   
  })