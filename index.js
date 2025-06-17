// Grab page elements: form, text input, and table body
const form = document.getElementById('guest-form');
const input = document.getElementById('guest-name');
const tableBody = document.querySelector('#guest-table tbody');

const MAX_COUNT = 10;

// Called when user adds a guest
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const guestName = input.value.trim();
  if (!guestName) {
    alert('Please enter a name.');
    return;
  }
  if (tableBody.rows.length >= MAX_COUNT) {
    alert('You can only add up to 10 guests.');
    return;
  }

  addRow(guestName);
  input.value = '';
});

// Build and append a new row to the table
function addRow(name) {
  const row = tableBody.insertRow();

  // Name cell
  const nameCell = row.insertCell();
  nameCell.textContent = name;

  // Time cell
  const timeCell = row.insertCell();
  timeCell.textContent = new Date().toLocaleTimeString();

  // Category cell
  const categoryCell = row.insertCell();
  const select = document.createElement('select');
  ['Friend', 'Family', 'Colleague'].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.append(opt);
  });
  categoryCell.append(select);

  // RSVP cell
  const rsvpCell = row.insertCell();
  const rsvpBtn = document.createElement('button');
  rsvpBtn.textContent = 'Going';
  rsvpBtn.addEventListener('click', () => {
    rsvpBtn.textContent = rsvpBtn.textContent === 'Going'
      ? 'Not Going'
      : 'Going';
  });
  rsvpCell.append(rsvpBtn);

  // Edit cell the contents being entered
  const editCell = row.insertCell();
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Name';
  editBtn.addEventListener('click', () => {
    const newName = prompt('Update name:', nameCell.textContent);
    if (newName && newName.trim()) nameCell.textContent = newName.trim();
  });
  editCell.append(editBtn);

  // Delete cell after checking is not authetic
  const deleteCell = row.insertCell();
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Remove';
  delBtn.addEventListener('click', () => row.remove());
  deleteCell.append(delBtn);
}
