# Booking
Manage project booking for a dev team

This project contain 
- a RESTFull API to manage project, user, project booking and booking stats
- a GUI 
 - accessible via google connect oauth
   - with optional limitation on email domain 
 - for user
   - to book/cancel booking of project
 - for an administrator to create/update/delete
   - project
    - user

---
# The RestFull API
the api will be accessible via the URN 
<pre>api/</pre>
---
## User Resource
```javascript
{
  ObjectId:507f1f77bcf86cd799439011,
  lastName:"JOBS",
  firstName:"Steeve",
  team:"Pixar"
}
```
### Reading
#### Return a bunch of users, 
limited to 10, the header contain the url to get the next bunch.
<pre>[GET] api/user</pre>
#### Return the detail of a specific user.
<pre>[GET] api/user/:id</pre>
####Search a bunch of users, 
limited to 10, filtered by a search value, the header contain the url to get the next bunch.
<pre>[GET] api/user/search/:search</pre>
####Return the global statistic about a specific user 
on a specific period between **start** date and **end** date.
<pre>[GET] api/user/:id/stats/:start/:end</pre>
```javascript
{
  nbProjectBookingDemand:12, // Number of project booked by user
  nbProjectBooked:8, // Number of project booked and obtained by user
  averageBookedTime:35, // Average time during a project will be block by user
  averageWaitedTime:72 // Average time waited by the user to obtain the booking
}
```
### Writing
#### Adding a new user.
<pre>[POST] api/user</pre>
Body 
```javascript
{
  lastName:"GATES",
  firstName:"Bill",
  team:"Legocity"
}
```
#### Update completely a user.
<pre>[PUT] api/user/:id</pre>
Body 
```javascript
{
  lastName:"GATES",
  firstName:"Bill",
  team:"Lego-city"
}
```
#### Update partialy a user.
<pre>[PATCH] api/user/:id</pre>
Body 
```javascript
{
  team:"Lego-city"
}
```
### Deleting
####Delete a specific user
<pre>[DELETE] api/user/:id</pre>
---

## Project Resource
```javascript
{
  ObjectId:507f1f77bcf86cd799439012,
  name:"project1",
  tags:["GUI","pixar","JS","mongo"]
}
```
### Reading
#### Return a bunch of projects, 
limited to 10, the header contain the url to get the next bunch.
<pre>[GET] api/project</pre>

#### Return the detail of a specific project.
<pre>[GET] api/project/:id</pre>

#### Search a bunch of projects, 
limited to 10, filtered by a search value (name, tags), the header contain the url to get the next bunch.
<pre>[GET] api/project/search/:search</pre>

#### Return the global statistic about a specific project 
on a specific period between **start** date and **end** date.
<pre>[GET] api/project/:id/stats/:start/:end</pre>
```javascript
{
  nbBooked:8, // How many  the project has been booked and obtained by user
  averageBookedTime:35, // Average time during a project will be block by user
  averageWaitedTime:72 // Average time waited by the user to obtain the booking
}
```

### Writing
#### Adding a new project.
<pre>[POST] api/project</pre>
Body 
```javascript
{
  name:"project2",
  tags:["GUI","pixar","JS","mongo"]
}
```

#### Update completely a project.
<pre>[PUT] api/project/:id</pre>
Body 
```javascript
{
  name:"project3",
  tags:["API","legocity","JS","mongo"]
}
```

#### Update partialy a project.
<pre>[PATCH] api/project/:id</pre>
Body 
```javascript
{
  tags:["GUI","legocity","JS","Mysql"]
}
```

### Deleting
#### Delete a specific project
<pre>[DELETE] api/project/:id</pre>

## Booking system
### Add a user in a specific project queue (Book a project for a user)
<pre>[POST] api/project/:id/queue</pre>
Body 
```javascript
{
  user:507f1f77bcf86cd799439065
}
```

### Remove a user in a specific project queue (Cancel booking demand)
<pre>[DELETE] api/project/:id/queue/:id</pre>




