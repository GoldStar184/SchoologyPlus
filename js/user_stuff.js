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
async function something(){
    return Array((await fetchApiJson(`/users/${getUserId()}/sections`)).section)
}
window.addEventListener('load', function () {
    console.log(something())
    get_courses()
    get_course_ids()
    console.log(course_ids)
    console.log(course_titles)
})
