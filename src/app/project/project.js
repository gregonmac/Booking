/**
 * Created by ganne on 05/11/2016.
 */
(function ()
{
    angular.module('booking.project', [])
            .config(configFunction)
            .controller('projectController', projectController)
            .filter('userProject', projectFilter)
            .filter('name', nameFilter)
            .filter('since', sinceFilter);

    function projectFilter(firebaseDataService)
    {
        return function (projects, user)
        {
            var userProjects = [];
            angular.forEach(projects, function (project)
            {
                angular.forEach(project.queue, function (entry)
                {
                    if (entry.uid === user.uid) {
                        userProjects.push(project)
                    }
                })

            });
            return userProjects;
        };
    }

    function sinceFilter()
    {
        return function (item)
        {
            var delay = moment().diff(moment(item, 'DD-MM-YYYY HH:mm:ss'));
            var d = moment.duration(delay);

            var result = "";
            if (d.get("days") > 0) {
                result += d.get("days") + 'J - ';
            }
            var h = d.get("hours");
            result += (h == 0 ? '00' : (h < 10 ? '0' + h : h)) + ':';
            var m = d.get("minutes");
            result += (m == 0 ? '00' : (m < 10 ? '0' + m : m)) + ':';
            var s = d.get("seconds");
            result += (s == 0 ? '00' : (s < 10 ? '0' + s : s));

            return result;

        };
    }

    function nameFilter()
    {
        return function (item)
        {
            return item.substr(0, item.indexOf('@'));
        };
    }

    projectController.$inject = ['projectService', 'firebaseDataService', 'user', '$http'];

    function projectController(projectService, firebaseDataService, user, $http)
    {
        var vm = this;
        vm.types = [
            {label: 'IHM', class: 'fa-html5'},
            {label: 'CSS', class: 'fa-css3'},
            {label: 'JS', class: 'fa-jsfiddle'},
            {label: 'API', class: 'fa-cogs'},
            {label: 'DB', class: 'fa-database'}
        ];
        vm.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'myPopoverTemplate.html',
            title: 'Title'
        };
        vm.projects = projectService.getProjects();
        vm.newProject = new projectService.Project(user);
        vm.addProject = addProject;
        vm.removeProject = removeProject;
        vm.updateProject = updateProject;
        vm.toggleBooking = toggleBooking;
        vm.importProjects = importProjects;

        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
        }
        else {
            if (Notification) {
                vm.projects.$watch(function (e)
                {
                    if (e.event === 'child_changed')
                        firebaseDataService.projects.child(e.key).once('value', function (snapshot)
                        {
                            var project = snapshot.val();
                            if (project.queue && project.queue.length > 0 && project.queue[0].uid === user.uid) {
                                var message = '';
                                if (project.queue.length > 1) {
                                    message =
                                            "Tu bloques le projet " + project.name + " pour " + (project.queue.length - 1) +
                                            " personne";
                                } else {
                                    message = "Tu as le projet pour toi tout seul, bonne MEP";

                                }
                                var notification = new Notification(project.name, {
                                    body: message,
                                    icon: "content/HermanSilverBackHead.png"
                                });
                                notification.onshow = function ()
                                {
                                    setTimeout(notification.close.bind(notification), 3000);
                                }
                            }
                        });
                });
            }
        }

        vm.isBookedForMe = function (project)
        {
            return project.queue && project.queue.length > 0 && (project.queue[0].uid === user.uid);
        };
        vm.isBooked = function (project)
        {
            return project.queue && project.queue.length > 0 && (project.queue[0].uid !== user.uid);
        };
        vm.user = user;

        function getBookingPosition(project)
        {
            var result = -1;
            angular.forEach(project.queue, function (entry, pos)
            {
                if (entry.uid === user.uid) {
                    result = pos;
                }
            });
            return result;
        }

        function log(action, project)
        {
            var now = moment();
            firebaseDataService.logs
                    .child(now.format('YYYY-MMM'))
                    .child(now.format('DD'))
                    .child(now.format('HH:mm:ss SSS'))
                    .set({
                        action: action, project: project.name, user: user.email
                    })
            ;

        }

        function toggleBooking(project)
        {
            var current = project.queue && project.queue[0].uid;
            var bookingPosition = getBookingPosition(project);
            if (bookingPosition >= 0) {
                realease(bookingPosition, project);
                log((bookingPosition == 0 ? 'Release' : 'Unbook'), project);
            } else {
                take(project);
                log('Book', project);
            }
            if (project.queue && project.queue.length > 0 && project.queue[0] && current !== project.queue[0].uid
            ) {
                project.queue[0].give = moment().format('DD-MM-YYYY HH:mm:ss SSS');
            }

            vm.projects.$save(project);
        }

        function realease(bookingPosition, project)
        {
            project.queue.splice(bookingPosition, 1);

        }

        function take(project)
        {
            if (!project.queue) {
                project.queue = [];
            }
            project.queue.push({
                uid: user.uid,
                user: user.email,
                booked: moment().format('DD-MM-YYYY HH:mm:ss SSS')
            });
        }

        function addProject()
        {
            projectService.addProject(vm.newProject);
            vm.newProject = new projectService.Project(user);
        }

        function importProjects()
        {
            var projects = JSON.parse(vm.import)
            angular.forEach(projects.projects, function (entry)
            {
                projectService.addProject(entry);
            });
        }

        function removeProject(project)
        {
            vm.projects.$remove(project)
        }

        function updateProject(project)
        {
            vm.projects.$save(project);
        }
    }

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider)
    {
        $routeProvider
                .when('/project/management', {
                    templateUrl: 'app/project/main.html',
                    controller: 'projectController',
                    controllerAs: 'vm',
                    resolve: {user: resolveUser}
                })
                .when('/project/booking', {
                    templateUrl: 'app/project/booking.html',
                    controller: 'projectController',
                    controllerAs: 'vm',
                    resolve: {user: resolveUser}
                })
                .when('/project/booked', {
                    templateUrl: 'app/project/booked.html',
                    controller: 'projectController',
                    controllerAs: 'vm',
                    resolve: {user: resolveUser}
                });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService)
    {
        return authService.firebaseAuthObject.$requireSignIn();
    }
})
();
