// Get the form, input, and list from the page
const form = document.getElementById('guest-form');
const input = document.getElementById('guest-name');
const list = document.getElementById('guest-list');

// When the form is submitted
form.addEventListener('submit', function(e) {
  // Stop page reload
  e.preventDefault();

  // Limit the list to 10 names
  if (list.children.length >= 10) {
    alert('Limit reached.');
    return;
  }

  // Create list item and name
  const li = document.createElement('li');
  const nameSpan = document.createElement('span');
  nameSpan.textContent = input.value;

  // Add the time when the guest was added
  const time = document.createElement('small');
  time.textContent = new Date().toLocaleTimeString();

  // Add RSVP toggle
  const rsvp = document.createElement('button');
  rsvp.textContent = 'Attending';
  rsvp.addEventListener('click', () => {
    rsvp.textContent = rsvp.textContent === 'Attending' ? 'Not Attending' : 'Attending';
  });

  // Create category selector
  const cat = document.createElement('select');
  ['Friend', 'Family', 'Colleague'].forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    cat.appendChild(opt);
  });

  // Add edit button to change the name
  const edit = document.createElement('button');
  edit.textContent = 'Edit';
  edit.addEventListener('click', () => {
    const newName = prompt('Update name:', nameSpan.textContent);
    if (newName) nameSpan.textContent = newName;
  });

  // Add remove button to delete the guest
  const del = document.createElement('button');
  del.textContent = 'Remove';
  del.addEventListener('click', () => {
    li.remove();
  });

  // Put everything inside the list item
  li.append(nameSpan, ' ', time, ' ', cat, ' ', rsvp, ' ', edit, ' ', del);
  list.appendChild(li);

  // Clear the input
  input.value = '';
});
