(async function () {
    // Wait for loader.js to finish running
    while (!window.splusLoaded) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    await loadDependencies("user_stuff", ["all", "preload"]);
})();
let sections = []
let data1 = {
    "sections": null,

}

let usersData = null
let sectionsSorted = []
async function getSections(){
    sections = ( await (await fetchApiJson(`/users/${getUserId()}/sections`)).section)
    usersData = new data(undefined, getUserId())
}
function imToLzyToNameThisRn2() {
    for(let i = 0; i < sections.length; i++){
        for(let x = 0; x < sections.length; x++) {
            if(sections[x].section_title.includes(`(${i+1})`)){
                sectionsSorted.push(sections[x])
            }
        }
    }
}
async function imToLazyToNameThisRn(){
    if(parseInt(Setting.getValue("numberOfClasses")) > sections.length){
        await Setting.setValue("numberOfClasses", `${sections.length}`)
    }
    if(Setting.getValue("numberOfClasses") != null) {
        for(let i = 0; i < parseInt(Setting.getValue("numberOfClasses")); i++){

            usersData.addClass(`id${sectionsSorted[i].id}`, {
                "id": sectionsSorted[i].id,
                "CourseTitle": sectionsSorted[i].section_title,
                "assignments": {

                }
            })
        }
    } else {
        for(let i = 0; i < sections.length; i++){
            usersData.addClass(`id${sectionsSorted[i].id}`, {
                "id": sectionsSorted[i].id,
                "CourseTitle": sectionsSorted[i].section_title,
                "assignments": {

                }
            })
        }
    }

}
async function imToLazyToNameThisRn3(){
    for(let i = 0; i < parseInt(Setting.getValue("numberOfClasses")); i++) {
        let assignments = await (await fetchApiJson(`users/${getUserId()}/grades?section_id=${sectionsSorted[i].id}`)).section[0].period[0].assignment
        //let assignments2 = await (await fetchApiJson(`/sections/${sectionsSorted[i].id}/assignments`)).assignment
        //await (await fetchApiJson(`users/${getUserId()}/grades?section_id=6874278866`)).section[0].period[0]
        for(let x = 0; x < assignments.length; x++) {
            let tempData = {
                "assignmentId": assignments[x].assignment_id,
                "grade": assignments[x].grade,
                "maxPoints": assignments[x].max_points
            }
            usersData.addAssignment(`id${sectionsSorted[i].id}`, `id${assignments[x].assignment_id}`, tempData)
        }
    }

}
window.addEventListener('load', async function () {
    await getSections()
    await imToLzyToNameThisRn2()
    await imToLazyToNameThisRn()
    await imToLazyToNameThisRn3()
    console.log(usersData.json)
});
