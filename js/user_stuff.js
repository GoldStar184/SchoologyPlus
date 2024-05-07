(async function () {
    // Wait for loader.js to finish running
    while (!window.splusLoaded) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    await loadDependencies("user_stuff", ["all"]);
})();

let data = {
    "sections": null,
    "courseIds": [],
    "courseTitles": [],
    "AssignmentIds": [],
    "Assignments": []
}
//frame = document.querySelector("iframe[src*=session-tracker]").src.split("?")[1].split("=")[1]
async function fetchCourseId(){
    console.log(data.sections.length)
    //return parseInt((await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].id)
    for(i = 0; i < data.sections.length; i++){
        data.courseIds.push(parseInt( await (data.sections[i]).id))
    }
}
async function fetchCourseTitle(){
    //return (await fetchApiJson(`/users/${getUserId()}/sections`)).section[index].course_title
    for(i = 0; i < data.sections.length; i++) {
        data.courseTitles.push( await data.sections[i].course_title)
    }
}
async function fetchSections(){
    data.sections = await (await fetchApiJson(`/users/${getUserId()}/sections`)).section
    //data.sections.push( await (await fetchApiJson(`/users/${getUserId()}/sections`)).section)
}
async function getAssignmentIds(){
    //for(i = 0; i < sections.length; i++) {
        //var temp_name_1 = Array(await (await fetchApiJson(`/sections/${course_ids[i]}/assignments`)).assignment)
        //for(x = 0; x < temp_name_1.length; x++) {
            //AssignmentIds[0][i].push(await (await fetchApiJson(`/sections/${course_ids[i]}/assignments`)).assignment)
            //var temp_array_1 = []
            //for(z = 0; z < temp_name_1.length; z++) {
                //temp_array_1.push(parseInt(temp_name_1[z]))
            //}
            //AssignmentIds[x][i].push(temp_array_1)
        //}
        //AssignmentIds[0][i].push(await fetchApiJson(`/sections/${course_ids[i]}/assignments`).assignment)

    //}
    for(i = 0; i < data.sections.length; i++){
        let temp_name_1 = await (await fetchApiJson(`/sections/${data.courseIds[i]}/assignments`)).assignment
        data.Assignments.push(temp_name_1)
        let temp_array_1 = []
        for(x = 0; x < temp_name_1.length; x++){
            temp_array_1.push(temp_name_1[x].id)
        }
        data.AssignmentIds.push(temp_array_1)
    }

}
async function getListOfAssignments(){

}
async function getAssignmentGrades(){

}
window.addEventListener('load', async function () {
    await fetchSections()//collides with get assignmentIds
    await fetchCourseId()
    await fetchCourseTitle()
    await getAssignmentIds()//collides with fetch sections
    console.log(data.courseIds)
    console.log(data.courseTitles)
    console.log(data)
});
