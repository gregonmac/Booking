(function ()
{
    'use strict';

    angular
            .module('booking.auth')
            .factory('authService', authService);

    authService.$inject = ['$firebaseAuth', 'firebaseDataService', 'partyService', 'projectService', '$q'];

    function authService($firebaseAuth, firebaseDataService, partyService, projectService, $q)
    {
        var firebaseAuthObject = $firebaseAuth();

        var service = {
            firebaseAuthObject: firebaseAuthObject,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            sendWelcomeEmail: sendWelcomeEmail,
            sendPasswordResetEmail: sendPasswordResetEmail,
            confirm: confirm
        };

        return service;

        ////////////

        function register(user)
        {
            if (user.email.endsWith('digitaleo.com')) {
                return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, 'RAND-PWD' + Math.random()).then(
                        function (response)
                        {
                            return firebaseAuthObject.$sendPasswordResetEmail(user.email).then(function ()
                            {
                                var deferred = $q.defer();
                                deferred.resolve(
                                        'Un email de confirmation vous a été envoyé. Consulter votre boite puis choisissez un mot de passe pour votre compte');
                                return deferred.promise;
                            }, function (error)
                            {
                                var deferred = $q.defer();
                                deferred.reject('I don\'t know who are you');
                                return deferred.promise;
                            });
                        });
            } else {
                var deferred = $q.defer();
                deferred.reject('Seul les developpeurs de Digitaleo sont accepter, vous etes dans un club privé');
                return deferred.promise;
            }
        }

        function login(user)
        {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }

        function logout()
        {
            partyService.reset();
            projectService.reset();
            firebaseAuthObject.$signOut();
        }

        function isLoggedIn()
        {
            return firebaseAuthObject.$getAuth();
        }

        function isAdmin()
        {
            return true;
        }

        function sendWelcomeEmail(emailAddress)
        {
            firebaseDataService.emails.push({
                emailAddress: emailAddress
            });
        }

        function sendPasswordResetEmail(emailAddress)
        {
            return firebaseAuthObject.$sendPasswordResetEmail(emailAddress).then(function ()
            {
                console.log('Sent');
                var deferred = $q.defer();
                deferred.reject('Un email à été envoyer pour changer votre mot de passe');
                return deferred.promise;
            }, function (error)
            {
                console.log(error);
                var deferred = $q.defer();
                deferred.reject('I don\'t know who are you');
                return deferred.promise;
            });
        }

        function confirm(code, newPwd)
        {
            firebase.auth().confirmPasswordReset(code, newPassword)
                    .then(function ()
                    {
                       console.log('GOOD') // Success
                    })
                    .catch(function ()
                    {
                       console.log('FAILURE') // Success
                        // Invalid code
                    })
        }

    }

})();