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
    user_courses = Array( await (await fetchApiJson(`/users/${getUserId()}/sections`)).section)
}

async function fetchCourseId(index){
    console.log(sections.length)
    //return parseInt((await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].id)
    for(i = 0; i < sections.length; i++){
        course_ids.push(parseInt( await (sections[i]).id))
    }
}
async function fetchCourseTitle(index){
    //return (await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].course_title
    for(i = 0; i < sections.length; i++) {
        course_titles.push( await sections[i].course_title)
    }
}
async function fetchSections(){
    return ( await (await fetchApiJson(`/users/${getUserId()}/sections`)).section)
}
window.addEventListener('load', async function () {
    sections = await fetchSections()
    console.log(sections[0])
    get_courses()
    await fetchCourseId()
    await fetchCourseTitle()
    console.log(course_ids)
    console.log(course_titles)
})
