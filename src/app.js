const storage = window.localStorage
const renderContacts = () => {

  const contacts = JSON.parse(storage.getItem('contacts'))

  // Select the container we will use to list the contacts 
  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''

    // render the contacts
    const ul = document.createElement('div')
    ul.className += 'flex flex-wrap justify-around'
    // For every contact in our array of contacts, we will
    // create a li element that will contain a card with
    // all the information of the contact
    contacts.forEach(contact => {
      let li = document.createElement('div')
      li.className += ' p-5 border-l-4 border-solid border-black hover:bg-grey-darker m-5'
      li.innerHTML = `
        <div class="card w-125px min-h-80px rounded overflow-auto shadow-lg bg-grey-lighter">
          <div class="content m-1 ">
            <h1 class= "m-1 underline">${ contact.name }</h1>
            <h2 class= "m-1">${ contact.company }</h2>
            <p class= "m-1">${ contact.notes }</p> 
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

    document.querySelector('.add-contact').addEventListener('click', function(){
      document.querySelector('#form-wrapper').className -= 'invisible'
      document.querySelector('#add-contact-wrapper').className += 'invisible'
    })

    // Select form object from the DOM
    const addContactForm = document.querySelector('.new-contact-form')

    // Register an event to listen for form submission
    addContactForm.addEventListener('submit', event => {
      // Disable default behavior when submitting form
      event.preventDefault()

      const storage = window.localStorage
      // const contacts = JSON.parse(storage.getItem('contacts'))

      document.querySelector('#form-wrapper').className -= 'invisible'
      document.querySelector('#add-contact-wrapper').className += 'invisible'
      
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