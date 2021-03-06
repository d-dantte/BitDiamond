﻿
module BitDiamond.Controllers.Shared {


    export class Message {
        message: string;
        title: string;
        actionState: string;
        actionTitle: string;
        hasNoActionTitle: boolean;

        $state: ng.ui.IStateService;

        action() {
            if (Object.isNullOrUndefined(this.actionState)) {
                window.location.href = "/index.html";
            }
            else {
                this.$state.go(this.actionState);
            }
        }

        constructor($state, $stateParams) {
            this.$state = $state;

            this.message = $stateParams['message'];
            this.title = $stateParams['title'];
            this.actionState = $stateParams['actionState'];
            this.actionTitle = $stateParams['actionTitle'];
            this.hasNoActionTitle = Object.isNullOrUndefined(this.actionTitle);
        }
    }


    export class NavBar {

        exchangeRate: number;

        notifications: Models.INotification[];
        notificationCount: number;

        get hasSeenNotifications(): boolean {
            if (Object.isNullOrUndefined(this.notifications)) return true;
            return this.notifications.length == 0;
        }
        displayTime(time: Apollo.Models.JsonDateTime): string {
            if (Object.isNullOrUndefined(time)) return '';
            else return time.toMoment().format('YYYY/M/D  H:m');
        }

        __userContext: Utils.Services.UserContext;
        __systemNotification: Services.Notification;
        __xe: Services.XE;
        $q: ng.IQService;
        $interval: ng.IIntervalService;

        constructor(__systemNotification, __userContext, __xe, $q, $interval) {
            this.__systemNotification = __systemNotification;
            this.__userContext = __userContext
            this.__xe = __xe;
            this.$q = $q;
            this.$interval = $interval;
            var ex = () => {
                this.__xe.getCurrentRate().then(r => this.exchangeRate = r);
            };
            ex();
            this.$interval(ex, 60000);

            this.__systemNotification.getUnseenNotificaftions().then(opr => {
                this.notifications = opr.Result.slice(0, 5).map(n => {
                    n.CreatedOn = new Apollo.Models.JsonDateTime(n.CreatedOn);
                    n.ModifiedOn = new Apollo.Models.JsonDateTime(n.ModifiedOn);
                    return n;
                });
                this.notificationCount = opr.Result.length;
            }, err => {
                this.notificationCount = 0;
                this.notifications = [];
            });
        }
    }


    export class SideBar {

        user: Pollux.Models.IUser;
        userRoles: string[];
        userBio: Pollux.Models.IBioData;
        profileImageRef: Pollux.Models.IUserData;
        currentYear: number;

        __account: Services.Account;
        __notify: Utils.Services.NotifyService;
        __userContext: Utils.Services.UserContext;
        __xe: Services.XE;

        $location: ng.ILocationService;
        $interval: ng.IIntervalService;

        exchangeRate: number;

        profileImage() {
            //for now
            if (Object.isNullOrUndefined(this.profileImageRef)) return '/content/images/default-user.png';
            else return this.profileImageRef.Data;
        }
        userNames() {
            if (Object.isNullOrUndefined(this.userBio) && !Object.isNullOrUndefined(this.user)) return this.user.UserId;
            else if (!Object.isNullOrUndefined(this.userBio)) {
                return (this.userBio.FirstName || '') + ' ' + (this.userBio.LastName || '');
            }
            else return "Member";
        }

        getActiveClass(moduleName: string): any {
            return { active: this.isCurrentModule(moduleName) };
        }
        getModuleUrl(moduleName: string): string {
            if (moduleName == 'dashboard') return '/profile/index';
            else if (moduleName == 'family-tree') return '/referrals/index';
            else if (moduleName == 'news') return '/posts/index';
            else return '/' + moduleName + '/index';
        }

        private isCurrentModule(moduleName: string): boolean {
            var m = window.location.pathname.split('/')[1];
            switch (m) {
                case 'profile': return 'dashboard' == moduleName;
                case 'referrals': 'family-tree' == moduleName;
                default: return m == moduleName;
            }
        }



        logout() {
            this.__account.signout();
        }


        constructor(__account, __notify, __userContext, __xe, $interval, $location) {

            this.__account = __account;
            this.__notify = __notify;
            this.__userContext = __userContext;
            this.$location = $location;
            this.__xe = __xe;
            this.$interval = $interval;

            this.currentYear = moment().year();

            var ex = () => {
                this.__xe.getCurrentRate().then(r => this.exchangeRate = r);
            };
            ex();
            this.$interval(ex, 60000);

            //load user object
            this.__userContext.user.then(opr => {
                this.user = opr;
            }, err => {
                swal(<ISweetAlertConfig>{
                    text: 'Your information could not be retrieved from the server. You will be logged out so you can try loggin in again',
                    title: 'Error',
                    type: 'error'
                });
            });

            //load profile image
            this.__userContext.profileImageRef.then(opr => {
                this.profileImageRef = opr;
            }, err => {
                this.__notify.warning('we couldn\'t load your profile image...', 'Hey');
            });

            //load user roles
            this.__userContext.userRoles.then(opr => {
                this.userRoles = opr;
            }, err => {
                swal(<ISweetAlertConfig>{
                    text: 'Your information could not be retrieved from the server. You will be logged out so you can try loggin in again',
                    title: 'Error',
                    type: 'error'
                });
                this.logout();
            });

            //load user biodata
            this.__userContext.userBio.then(opr => {
                this.userBio = opr;
            }, err => {
                this.__notify.warning('we couldn\'t load your bio...', 'Hey');
            });
            
        }
    }
}