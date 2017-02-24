﻿
module BitDiamond.Services {

    export class Account {

        registerUser(targetUser: string, referrer: string, credential: Pollux.Models.ICredential): ng.IPromise<Utils.Operation<Pollux.Models.IUser>> {
            return this.__transport.post<Utils.Operation<Pollux.Models.IUser>>('/api/accounts/users', {
                TargetUser: targetUser,
                Referrer: referrer,
                Credential: credential
            });
        }

        registerAdmin(targetUser: string, credential: Pollux.Models.ICredential): ng.IPromise<Utils.Operation<Pollux.Models.IUser>> {
            return this.__transport.post<Utils.Operation<Pollux.Models.IUser>>('/api/accounts/admins', {
                TargetUser: targetUser,
                Credential: credential
            });
        }

        deactivateUser(targetUser: string): ng.IPromise<Utils.Operation<void>> {
            return this.__transport.put<Utils.Operation<void>>('/api/accounts/users/deactivate', {
                TargetUser: targetUser
            });
        }

        blockUser(targetUser: string): ng.IPromise<Utils.Operation<void>> {
            return this.__transport.put<Utils.Operation<void>>('/api/accounts/users/block', {
                TargetUser: targetUser
            });
        }

        requestUserActivation(targetUser: string): ng.IPromise<Utils.Operation<void>> {
            return this.__transport.put<Utils.Operation<void>>('/api/accounts/users/activations', {
                TargetUser: targetUser
            });
        }

        verifyUserActivation(targetUser: string, token: string): ng.IPromise<Utils.Operation<Pollux.Models.IUser>> {
            return this.__transport.put<Utils.Operation<Pollux.Models.IUser>>('/api/accounts/users/activations/verify', {
                TargetUser: targetUser,
                Token: token
            });
        }

        requestPasswordReset(targetUser: string): ng.IPromise<Utils.Operation<void>> {
            return this.__transport.put<Utils.Operation<void>>('/api/accounts/users/credentials/reset-tokens', {
                TargetUser: targetUser,
                Metadata: {
                    Name: 'Password',
                    Access: Pollux.Models.Access.Secret
                }
            });
        }

        verifyPasswordReset(targetUser: string, token: string, $new: string): ng.IPromise<Utils.Operation<Pollux.Models.IUser>> {
            return this.__transport.put<Utils.Operation<Pollux.Models.IUser>>('/api/accounts/users/credentials/reset-tokens/verify', {
                TargetUser: targetUser,
                Token: token,
                New: <Pollux.Models.ICredential>{
                    Value: Utils.ToBase64String(Utils.ToUTF8EncodedArray($new)),
                    Metadata: {
                        Name: 'Password',
                        Access: Pollux.Models.Access.Secret
                    }
                }
            });
        }



        modifyBiodata(data: Pollux.Models.IBioData): ng.IPromise<Utils.Operation<Pollux.Models.IBioData>> {
            return this.__transport.put<Utils.Operation<Pollux.Models.IBioData>>('/api/accounts/biodata', data);
        }

        getBiodata(): ng.IPromise<Utils.Operation<Pollux.Models.IBioData>> {
            return this.__transport.get<Utils.Operation<Pollux.Models.IBioData>>('/api/accounts/biodata');
        }



        modifyContactdata(data: Pollux.Models.IContactData): ng.IPromise<Utils.Operation<Pollux.Models.IContactData>> {
            return this.__transport.put<Utils.Operation<Pollux.Models.IContactData>>('/api/accounts/contacts', data);
        }

        getContactdata(): ng.IPromise<Utils.Operation<Pollux.Models.IContactData>> {
            return this.__transport.get<Utils.Operation<Pollux.Models.IContactData>>('/api/accounts/contacts');
        }



        addData(data: Pollux.Models.IUserData[]): ng.IPromise<Utils.Operation<Pollux.Models.IUserData>> {
            return this.__transport.post<Utils.Operation<Pollux.Models.IUserData>>('/api/accounts/userdata', {
                Data: data
            });
        }

        modifyData(data: Pollux.Models.IUserData[]): ng.IPromise<Utils.Operation<Pollux.Models.IUserData>> {
            return this.__transport.put<Utils.Operation<Pollux.Models.IUserData>>('/api/accounts/userdata', {
                Data: data
            });
        }

        removeData(names: string[]): ng.IPromise<Utils.Operation<Pollux.Models.IUserData>> {
            return this.__transport.delete<Utils.Operation<Pollux.Models.IUserData>>('/api/accounts/userdata', {
                Names: names
            });
        }

        getUserData(): ng.IPromise<Utils.Operation<Pollux.Models.IUserData[]>> {
            return this.__transport.get<Utils.Operation<Pollux.Models.IUserData[]>>('/api/accounts/userdata');
        }

        getUserDataByName(name: string): ng.IPromise<Utils.Operation<Pollux.Models.IUserData>> {
            return this.__transport.get<Utils.Operation<Pollux.Models.IUserData>>('/api/accounts/userdata/filter', {
                Name: name
            });
        }

        updateProfileImage(data: Utils.EncodedBinaryData, oldUrl: string): ng.IPromise<Utils.Operation<string>> {
            return this.__transport.get<Utils.Operation<string>>('/api/accounts/userdata/filter', {
                Image: data,
                OldImageUrl: oldUrl
            });
        }


        getUserRoles(): ng.IPromise<Utils.Operation<string[]>>{
            return this.__transport.get<Utils.Operation<string[]>>('/api/accounts/users/roles');
        }

        getUser(): ng.IPromise<Utils.Operation<Pollux.Models.IUser>>{
            return this.__transport.get<Utils.Operation<Pollux.Models.IUser>>('/api/accounts/users/current');
        }


        signin(email: string, password: string): ng.IPromise<Utils.Operation<void>> {
            var oldToken = JSON.parse(window.localStorage.getItem(Utils.Constants.Misc_OAuthTokenKey)) as IBearerTokenResponse;
            var config: ng.IRequestShortcutConfig = { headers: {}};
            if (!Object.isNullOrUndefined(oldToken)) {
                window.localStorage.removeItem(Utils.Constants.Misc_OAuthTokenKey);
                config.headers['OAuthOldToken'] = oldToken.access_token;
            }

            return this.__transport.postUrlEncoded<IBearerTokenResponse>('/tokens', {
                grant_type: 'password',
                username: email,
                password: password
            }, config).then(opr => {
                window.localStorage.setItem(Utils.Constants.Misc_OAuthTokenKey, JSON.stringify(opr));
                return <Utils.Operation<void>>{
                    Succeeded: true
                };
            });
        }
        signout(): ng.IPromise<void> {
            var tokenObj: IBearerTokenResponse = JSON.parse(window.localStorage.getItem(Utils.Constants.Misc_OAuthTokenKey));
            if (!Object.isNullOrUndefined(tokenObj)) {
                return this.__transport.post<void>('/api/accounts/users/logons/invalidate', {
                    Token: tokenObj.access_token
                }).finally( () => {
                    window.localStorage.removeItem(Utils.Constants.Misc_OAuthTokenKey);
                    window.location.href = '/account/index';
                });
            }
        }


        
        constructor(private __transport: Utils.Services.DomainTransport, private $q: ng.IQService) {

        }
    }

    export class Profile {

    }

    export class Dashboard {

    }
}