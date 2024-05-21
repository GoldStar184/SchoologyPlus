(async function () {
    // Wait for loader.js to finish running
    while (!window.splusLoaded) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    await loadDependencies("custom-processes", ["all", "preload"]);
})();
class data {
    defaultJson = {
        "userId": null,
        "classes": {

        }
    }

    constructor(data = this.defaultJson, userId){
        this.json = data
        this.json.userId = userId
    }
    addClass(key, data){
        this.json.classes[key] = data
    }
    addAssignment(Class, assignment, assignmentData) {
        this.json.classes[Class].assignments[assignment] = assignmentData
    }
    updateAssignmentsGrade(Class, assignment, newGrade){
        this.json.classes[Class].assignments[assignment].grade = newGrade
    }
    getClass(key){
        return this.json.classes[`id${key}`];
    }
    getAssignment(Class, assignment){
        return this.json.classes[Class].assignments[assignment]
    }
    getAssignmentGrade(Class, assignment){
        return this.json.classes[Class].assignments[assignment].grade
    }

}