'use strict';

/**
 * @ngdoc function
 * @name 1664App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the 1664App
 */
angular.module('booking')
        .controller('MainCtrl', function ($scope)
        {
            this.village = {
                name: 'Southpark',
                bugCounter: {
                    urgent: 18,
                    normal: 6,
                    low: 43
                }
            };

            this.projects = [
                {name: 'MK2', category: 'IHM', class: 'green', stack: []},
                {name: 'slbeo', category: 'IHM', class: 'purple', stack: ['Greg', 'Mario']},
                {name: 'messengeo', category: 'API', class: 'red', stack: ['Greg']},
                {name: 'MK2', category: 'DB', class: 'green', stack: []},
                {name: 'slbeo', category: 'DB', class: 'purple', stack: ['JC','Delia', 'Mario']},
                {name: 'messengeo', category: 'DB', class: 'red', stack: ['Greg']},
            ];

            this.currentUser = 'Greg';
            var action = function (project)
            {
                var position = project.stack.indexOf(this.currentUser);
                if (position === -1) {
                    project.stack.push(this.currentUser);
                } else {
                    project.stack.splice(position, 1);
                }
                this.lastProject = null;
            };

            this.action = action;
        });
