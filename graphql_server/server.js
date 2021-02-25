const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

let schema = buildSchema(`
 type Query {
     course(id:Int!):Course
     courses(topic:String):[Course]
 },
 type Course {
     id:Int
     title:String
     author:String
     description:String
     topic:String
     url:String
 },
 type Mutation {
     updateCourseTopic(id:Int!,topic:String!):Course
 }
`);

var coursesData = [
    {
        id: 1,
        title: 'MasterClass',
        author: 'MasterClass',
        description: 'An annual MasterClass membership is the best      way to learn cooking skills from some of the world’s best chefs. Each class—from the likes of Alice Waters, Gordon Ramsay, and Dominique Ansel—consists of about a dozen or so pre-recorded videos that range from 10-30 minutes so you can learn at your own pace.',
        topic: 'Cooking',
        url: 'https://www.masterclass.com/?utm_source=Paid&utm_medium=Affiliate&utm_term=Aq-Prospecting&sscid=51k4_7cwbm'
    },
    {
        id: 2,
        title: 'Blueprint',
        author: 'Blueprint',
        description: 'Bluprint now offers more than 100 cooking classes online in addition to their crafting classes. There’s a little bit of something for everyone here whether you’re looking for family-friendly classes, courses for absolute beginners, or deep dives into cheese-making and bread baking.',
        topic: 'Cooking',
        url: 'https://www.mybluprint.com/topic/cook?SSAID=314743&sscid=51k4_7cxri&sasClickId=51k4_7cxri&cr_linkid=ShareASale_Banner_ShareASale&cr_maid=46579&cr_source=ShareASale&cr_medium=ShareASale'
    },
    {
        id: 3,
        title: 'Christina Tosi\'s Baking Club',
        author: 'Christina Tosi',
        description: 'Christina Tosi, the pastry chef behind New York’s Milk Bar empire, is hosting live baking lessons at 2 p.m. ET each day on her Instagram to teach aspiring bakers some new skills. You’ll find recipes for inventive and fun baked goods like French toast muffins and popcorn cupcakes, as well as basics like lemon curd and soft pretzels.',
        topic: 'Baking',
        url: 'https://www.christinatosi.com/recipes'
    }
]



//get course by id
let getCourse = (args) => {
    let id =args.id;
    return coursesData.filter(course => {return course.id ===id;
    })[0];
}

//get courses by topic

let getCourses = (args) => {
    if(args.topic){
        let topic = args.topic;
        return coursesData.filter(course=>course.topic===topic);
    }
    else{return coursesData;
    }
}
//update corse topic by id
let updateCourse = ({id,topic}) => {
    coursesData.map(course => {
        if(course.id===id){
            course.topic=topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id===id)[0];
}
const root ={
    course:getCourse,
    courses:getCourses,
    update:updateCourse
}
let app= express();
app.use('/graphql',express_graphql({
    schema:schema,
    rootValue:root,
    graphiql:true
}))
app.listen(4000, () => console.log('running successfully'));