var BitDiamond;
(function (BitDiamond) {
    var Controllers;
    (function (Controllers) {
        var Shared;
        (function (Shared) {
            var Message = (function () {
                function Message($state, $stateParams) {
                    this.$state = $state;
                    this.message = $stateParams['message'];
                    this.title = $stateParams['title'];
                    this.actionState = $stateParams['actionState'];
                    this.actionTitle = $stateParams['actionTitle'];
                    this.hasNoActionTitle = Object.isNullOrUndefined(this.actionTitle);
                }
                Message.prototype.action = function () {
                    if (Object.isNullOrUndefined(this.actionState)) {
                        window.location.href = "/index.html";
                    }
                    else {
                        this.$state.go(this.actionState);
                    }
                };
                return Message;
            }());
            Shared.Message = Message;
            var NavBar = (function () {
                function NavBar() {
                }
                return NavBar;
            }());
            Shared.NavBar = NavBar;
            var SideBar = (function () {
                function SideBar(__account, __notify, __userContext, $location) {
                    var _this = this;
                    this.__account = __account;
                    this.__notify = __notify;
                    this.__userContext = __userContext;
                    this.$location = $location;
                    //load user object
                    this.__userContext.user.then(function (opr) {
                        _this.user = opr;
                    }, function (err) {
                        swal({
                            text: 'Your information could not be retrieved from the server. You will be logged out so you can try loggin in again',
                            title: 'Error',
                            type: 'error'
                        });
                    });
                    //load profile image
                    this.__userContext.profileImageRef.then(function (opr) {
                        _this.profileImageRef = opr;
                    }, function (err) {
                        _this.__notify.warning('we couldn\'t load your profile image...', 'Hey');
                    });
                    //load user roles
                    this.__userContext.userRoles.then(function (opr) {
                        _this.userRoles = opr;
                    }, function (err) {
                        swal({
                            text: 'Your information could not be retrieved from the server. You will be logged out so you can try loggin in again',
                            title: 'Error',
                            type: 'error'
                        });
                        _this.logout();
                    });
                    //load user biodata
                    this.__userContext.userBio.then(function (opr) {
                        _this.userBio = opr;
                    }, function (err) {
                        _this.__notify.warning('we couldn\'t load your bio...', 'Hey');
                    });
                }
                SideBar.prototype.profileImage = function () {
                    //for now
                    if (Object.isNullOrUndefined(this.profileImageRef))
                        return '/content/images/default-user.png';
                    else
                        return this.profileImageRef.Data;
                };
                SideBar.prototype.userNames = function () {
                    if (Object.isNullOrUndefined(this.userBio) && !Object.isNullOrUndefined(this.user))
                        return this.user.UserId;
                    else if (!Object.isNullOrUndefined(this.userBio)) {
                        return (this.userBio.FirstName || '') + ' ' + (this.userBio.LastName || '');
                    }
                    else
                        return "Member";
                };
                SideBar.prototype.getActiveClass = function (moduleName) {
                    return { active: this.isCurrentModule(moduleName) };
                };
                SideBar.prototype.getModuleUrl = function (moduleName) {
                    if (moduleName == 'dashboard')
                        return '/profile/index';
                    else
                        return '/' + moduleName + '/index';
                };
                SideBar.prototype.isCurrentModule = function (moduleName) {
                    var m = window.location.pathname.split('/')[1];
                    switch (m) {
                        case 'profile': return 'dashboard' == moduleName;
                        default: return m == moduleName;
                    }
                };
                SideBar.prototype.logout = function () {
                    this.__account.signout();
                };
                return SideBar;
            }());
            Shared.SideBar = SideBar;
        })(Shared = Controllers.Shared || (Controllers.Shared = {}));
    })(Controllers = BitDiamond.Controllers || (BitDiamond.Controllers = {}));
})(BitDiamond || (BitDiamond = {}));
