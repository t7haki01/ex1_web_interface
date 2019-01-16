const express = require('express');
const router = express.Router();
var data = require('./data');
var students = data.students;


router.get('/', (req, res) => res.json(students));

router.get('/:id', (req, res) => {
    var result = "There is no such a student whoes " + req.params.id + " is id"
    for(var i = 0; i < students.length; i++){
        if(parseInt(req.params.id) === students[i].Id){
            result = students[i];
        }
    }
    res.send(result);
});

router.post('/', (req, res) => {
    var isThere = false;
    //Checking for id, is there already exist or not
    for(var i = 0; i<students.length; i++){
        if(students[i].Id === parseInt(req.body.Id)){
            res.send("Id already exist");
            isThere = true;
            break;
        }
    }
    if(isThere === false){
        students.push(req.body);
        console.log("Successfully students added!");
        res.send(students);
    }
});

router.post('/:id/addCourses', (req, res) => {
    var isThere = false;
    var isEnrolled = false;
    //First finding which student is with id
    for(var i = 0; i<students.length; i++){
        if(students[i].Id === parseInt(req.params.id)){
            isThere = true;
            //Checking is enrolled already or not
            for(var j = 0; j<students[i].enrolledCourses.length; j++){
                if( students[i].enrolledCourses[j] === parseInt(req.body.Course)){
                    res.send("Course already enrolled!");
                    isEnrolled = true;
                    break;
                }
            }
            if(!isEnrolled){
                students[i].enrolledCourses.push(parseInt(req.body.Course));
                for(var k = 0; k<data.courses.length;k++){
                    if(parseInt(req.body.Course)===data.courses[k].Id){
                        data.courses[k].enrolledStudents.push(parseInt(req.params.id));
                    }
                }
                var result = students[i];
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

router.put('/:id', (req, res) => {
    var isThere = false;
    var isAllowed = true;
    //First checking which students for editing with id
    for(var i = 0; i<students.length; i++){
        if(students[i].Id === parseInt(req.params.id)){
            isThere = true;
            //Then checking for when editing the id, it supposed not to same with others
            for(var j = 0; j<students.length; j++){
                if(parseInt(req.body.Id) !== parseInt(req.params.id) && students[j].Id === parseInt(req.body.Id)){
                    res.send("Id already exist, same Id not allowed!");
                    isAllowed = false;
                    break;
                }
            }
            if(isAllowed){
                students[i].Id = parseInt(req.body.Id);
                students[i].Name = req.body.Name;
                students[i].Class = req.body.Class;
                students[i].Address = req.body.Address;
                var result = students[i]
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

router.get('/:id/courses', (req, res) => {
    var isThere = false, isEnrolled = false;
    var result = "There seems like nothing have enrolled or student is not exist";
    //First checking which students with id
    for(var i = 0; i<students.length; i++){
        if(students[i].Id === parseInt(req.params.id)){
            isThere = true;
            var enrolledCourses = [];
            for(var j = 0; j<data.courses.length; j++){
                if(data.courses[j].enrolledStudents.indexOf(parseInt(req.params.id)) !== -1){
                    enrolledCourses.push(data.courses[j].Name);
                    isEnrolled = true;
                }
            }
        }
    }
    if(isThere && isEnrolled){
        console.log("Successfully found");
        result = "Enrolled courses are " + enrolledCourses;
        res.send(result);
    }else{
        res.send(result);
    }
});

router.get('/:id/grades', (req, res) => {
    var gathered = [], result =[];
    for(var i = 0; i<data.grades.length; i++){
        if(data.grades[i].Student === parseInt(req.params.id)){
            gathered.push(data.grades[i]);
        }
    }

    for(var j = 0; j<data.courses.length;j++){
        for(var k=0; k<gathered.length; k++){
            if(data.courses[j].Id === gathered[k].Course){
                result.push(data.courses[j].Name + ": " + gathered[k].Grade);
            }
        }
    }
    res.send(result);
});

router.delete('/:id', function(req, res){
    var isThere = false;
    //Finding students with id
    for(var i = 0; i<students.length; i++){
        if(students[i].Id === parseInt(req.params.id)){
            students.splice(i,1);
            isThere = true;
        }
    }
    if(isThere){
        res.send("Successfully deleted");
    }else{
        res.send("Something went wrong!");
    }
})

module.exports = router