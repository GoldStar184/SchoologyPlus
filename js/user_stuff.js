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
var somethinging = []
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
    return parseInt((await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].id)
}
async function fetchCourseTitle(index){
    return (await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].course_title
}
async function something(){
    return await fetchApiJson(`/users/${getUserId()}/sections`).then((data) => {
        return data.section;
    })    //return await Promise.all((await fetchApiJson(`/users/${getUserId()}/sections`)).section)

}
window.addEventListener('load', async function () {
    somethinging = await something()

    console.log(somethinging)
    console.log(somethinging[0])
    await get_courses()
    await get_course_ids()
    console.log(course_ids)
    console.log(course_titles)
})
