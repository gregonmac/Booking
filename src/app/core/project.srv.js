(function ()
{
    'use strict';

    angular
            .module('booking.core')
            .factory('projectService', projectService);

    projectService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function projectService($firebaseArray, firebaseDataService)
    {

        var projects = null;

        var service = {
            Project: project,
            getProjects: getProjects,
            getBookedProjects: getBookedProjects,
            getMyProjects: getMyProjects,
            addProject: addProject,
            reset: reset
        };

        return service;

        ////////////

        function project(user)
        {
            this.name = '';
            this.type = '';
            this.queue = [];
        }

        function project(user)
        {
            this.name = '';
            this.type = '';
            this.queue = [];
        }

        function getProjects()
        {
            if (!projects) {
                projects = $firebaseArray(firebaseDataService.projects);
            }
            return projects;
        }

        function getBookedProjects()
        {
            return $firebaseArray(firebaseDataService.projects.orderByChild("booked").equalTo(true));
        }

        function getMyProjects(user)
        {
            var result = [];
            return firebaseDataService.users.child(user.uid).once('value', function (snapshot)
            {
                snapshot.forEach(function (userSnapshot)
                {
                    result.push(userSnapshot.val().project);
                });
                return $firebaseArray(firebaseDataService.projects.child("booked").equalTo(result))
            });
        }

        function addProject(project)
        {
            if (project.type.$$hashKey) delete(project.type.$$hashKey)
            firebaseDataService.projects.push(project);
        }

        function reset()
        {
            if (projects) {
                projects.$destroy();
                projects = null;
            }
        }

    }

})();
