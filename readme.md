/auth/register
POST : Register new user
/auth/login
POST : Create a token, save it in the current user
/auth/current
GET : Current user
/auth/logout
GET : Remove token from current user

/contacts
GET : Get all contacts
POST : Create a new contact
/contacts/:contactId
GET : Get a contact
PUT : Update a contact
DELETE : Delete a contact
/contacts/:contactId/favorite
PATCH : Update the favorite field
