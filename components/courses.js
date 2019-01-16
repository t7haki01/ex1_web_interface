const express = require('express');
const router = express.Router();
//referencing the other data in other way than students
// var courses = require('./data')["courses"];
var data = require('./data');
var courses = data.courses;


router.get('/', (req, res) => res.json(courses));

router.get('/:id', (req, res) => {
    var result = "There is no such a course which " + req.params.id + " is id"
    for(var i = 0; i < courses.length; i++){
        if(parseInt(req.params.id) === courses[i].Id){
            result = courses[i];
        }
    }

    res.send(result);
});


router.post('/', (req, res) => {
    var isThere = false;
    //Checking for id, is there already exist or not
    for(var i = 0; i<courses.length; i++){
        if(courses[i].Id === parseInt(req.body.Id)){
            res.send("Id already exist");
            isThere = true;
            break;
        }
    }
    if(isThere === false){
        courses.push(req.body);
        console.log("Successfully courses added!");
        res.send(courses);
    }
});

router.put('/:id', (req, res) => {
    var isThere = false;
    var isAllowed = true;
    //First checking which courses for editing with id
    for(var i = 0; i<courses.length; i++){
        if(courses[i].Id === parseInt(req.params.id)){
            isThere = true;
            //Then checking for when editing the id, it supposed not to same with others
            for(var j = 0; j<courses.length; j++){
                if(parseInt(req.body.Id) !== parseInt(req.params.id) && courses[j].Id === parseInt(req.body.Id)){
                    res.send("Id already exist, same Id not allowed!");
                    isAllowed = false;
                    break;
                }
            }
            if(isAllowed){
                courses[i].Id = parseInt(req.body.Id);
                courses[i].Name = req.body.Name;
                courses[i].Description = req.body.Description;
                var result = courses[i]
            }
        }
    }
    if(isThere && isAllowed){
        console.log("Successfully Editted");
        res.send(result);
    }else{
        res.send("Something went wrong!");
    }
});

router.delete('/:id', function(req, res){
    var isThere = false;
    //Finding courses with id
    for(var i = 0; i<courses.length; i++){
        if(courses[i].Id === parseInt(req.params.id)){
            courses.splice(i,1);
            isThere = true;
        }
    }
    if(isThere){
        res.send("Successfully deleted");
    }else{
        res.send("Something went wrong!");
    }
})

router.post('/:id/addStudents', (req, res) => {
    var isThere = false;
    var isEnrolled = false;
    //First finding which course is with id
    for(var i = 0; i<courses.length; i++){
        if(courses[i].Id === parseInt(req.params.id)){
            isThere = true;
            //Checking is enrolled already or not
            for(var j = 0; j<courses[i].enrolledStudents.length; j++){
                if( courses[i].enrolledStudents[j] === parseInt(req.body.Student)){
                    res.send("Student already enrolled!");
                    isEnrolled = true;
                    break;
                }
            }
            if(!isEnrolled){
                courses[i].enrolledStudents.push(parseInt(req.body.Student));
                var result = courses[i];
            }
        }
    }
    if(isThere && !isEnrolled){
        console.log("Successfully Enrolled");
        res.send(result);
    }else{
        res.send("Something went wrong!");
    }
});

router.get('/:id/students', (req, res) => {
    var isThere = false;
    var result = "There seems like nobody has been enrolled";
    //First checking course with id
    for(var i = 0; i<courses.length; i++){
        if(courses[i].Id === parseInt(req.params.id)){
            isThere = true;
            var enrolledStudents = [];
            for(var j = 0; j<data.students.length; j++){
                if(data.students[j].enrolledCourses.indexOf(parseInt(req.params.id)) !== -1){
                    enrolledStudents.push(data.students[j].Name);
                }
            }
        }
    }
    if(isThere){
        console.log("Successfully found");
        result = "Enrolled students are " + enrolledStudents;
        res.send(result);
    }else{
        res.send(result);
    }
});

router.get('/:id/grades', (req, res) => {
    var gathered = [], result =[];
    for(var i = 0; i<data.grades.length; i++){
        if(data.grades[i].Course === parseInt(req.params.id)){
            gathered.push(data.grades[i]);
        }
    }

    for(var j = 0; j<data.students.length;j++){
        for(var k=0; k<gathered.length; k++){
            if(data.students[j].Id === gathered[k].Student){
                result.push(data.students[j].Name + ": " + gathered[k].Grade);
            }
        }
    }
    res.send(result);
});



module.exports = router