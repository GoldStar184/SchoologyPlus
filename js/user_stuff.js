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
var sections = []
//frame = document.querySelector("iframe[src*=session-tracker]").src.split("?")[1].split("=")[1]
async function get_courses(){
    user_courses = (await fetchApiJson(`/users/${getUserId()}/sections`)).section
}
async function get_course_ids(){
    for(i = 0; i < 14; i++){
        course_ids.push(await fetchCourseId(i))
        course_titles.push(await fetchCourseTitle(i))
    }
}
async function fetchCourseId(index){
    //return parseInt((await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].id)
    return parseInt(somethinging[index].id)
}
async function fetchCourseTitle(index){
    //return (await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].course_title
    return somethinging[index].course_title
}
async function fetchSomething(){
    return Array(fetchApiJson(`/users/${getUserId()}/sections`))
}
window.addEventListener('load', function () {
    sections = fetchSomething()
    console.log(sections[0])
    get_courses()
    get_course_ids()
    console.log(course_ids)
    console.log(course_titles)
})
