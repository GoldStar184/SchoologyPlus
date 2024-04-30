(async function () {
    // Wait for loader.js to finish running
    while (!window.splusLoaded) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    await loadDependencies("user_stuff", ["preload"]);
})();

var user_courses;
var course_ids = []
var course_titles = []
var your_mother = []
var balls = [[32,64],[128, 256]]
//frame = document.querySelector("iframe[src*=session-tracker]").src.split("?")[1].split("=")[1]
async function get_courses(){
    user_courses = (await fetchApiJson(`/users/${getUserId()}/sections`)).section
}
async function get_course_ids(){
    for(i = 0; i < 14; i++){
        course_ids.push(fetchCourseId(i))
        course_titles.push(fetchCourseTitle(i))
    }
}
async function fetchCourseId(index){
    return parseInt((await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].id)
}
async function fetchCourseTitle(index){
    return (await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].course_title
}
async function fetchSomething(){
    return Array(fetchApiJson(`/users/${getUserId()}/sections`))
}
window.addEventListener('load', function () {
    your_mother = fetchSomething()
    console.log(your_mother[0])
    console.log(balls[0][1])
    console.log(balls[1][0])
    get_courses()
    get_course_ids()
    console.log(course_ids)
    console.log(course_titles)
})
