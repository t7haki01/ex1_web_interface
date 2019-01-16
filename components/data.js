
module.exports = {
    students :[
        {
            Name: "Micheal Owen",
            Address: "Kotkantie 1",
            Class: "LIV02",
            enrolledCourses: [1,2,3],
            Id: 1
        },
        {
            Name: "Micheal Carrick",
            Address: "Torikatu 1",
            Class: "MAN02",
            enrolledCourses: [1,2,3],
            Id: 2
        },
        {
            Name: "Lionel Messi",
            Address: "Isokatu 1",
            Class: "Bar06",
            enrolledCourses: [1,2,3],
            Id: 3
        }
    ],
    courses:[
        {
            Name: "How to kick the freekick",
            Description: "This course explains how to kick the freekick in basic and practice kicking the freekick",
            enrolledStudents: [1,2,3],
            Id: 1
        },
        {
            Name: "JAVA Basic",
            Description: "This course is for the very beginner",
            enrolledStudents: [1,2,3],
            Id: 2
        },
        {
            Name: "Basic Finnish",
            Description: "This course is for the people who wants to learn Finnish language",
            enrolledStudents: [1,2,3],
            Id: 3
        }
    ],
    grades:[
        {
            Course: 1,
            Student: 1,
            Grade: 5,
            Id: 1
        },
        {
            Course: 1,
            Student: 2,
            Grade: 4,
            Id: 2
        },
        {
            Course: 1,
            Student: 3,
            Grade: 3,
            Id: 3
        },
        {
            Course: 2,
            Student: 1,
            Grade: 3,
            Id: 4
        },
        {
            Course: 2,
            Student: 2,
            Grade: 4,
            Id: 5
        },
        {
            Course: 2,
            Student: 3,
            Grade: 5,
            Id: 6
        },
        {
            Course: 3,
            Student: 1,
            Grade: 2,
            Id: 7
        },
        {
            Course: 3,
            Student: 2,
            Grade: 4,
            Id: 8
        },
        {
            Course: 3,
            Student: 3,
            Grade: 5,
            Id: 9
        },
    ]
}