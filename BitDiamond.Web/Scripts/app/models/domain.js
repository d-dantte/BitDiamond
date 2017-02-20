//     This code was generated by a Reinforced.Typings tool. 
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
var Pollux;
(function (Pollux) {
    var Models;
    (function (Models) {
        var Gender;
        (function (Gender) {
            Gender[Gender["Female"] = 0] = "Female";
            Gender[Gender["Male"] = 1] = "Male";
            Gender[Gender["Other"] = 2] = "Other";
        })(Gender = Models.Gender || (Models.Gender = {}));
        var Access;
        (function (Access) {
            Access[Access["Public"] = 0] = "Public";
            Access[Access["Secret"] = 1] = "Secret";
        })(Access = Models.Access || (Models.Access = {}));
        var CredentialStatus;
        (function (CredentialStatus) {
            CredentialStatus[CredentialStatus["Active"] = 0] = "Active";
            CredentialStatus[CredentialStatus["Inactive"] = 1] = "Inactive";
        })(CredentialStatus = Models.CredentialStatus || (Models.CredentialStatus = {}));
        var Effect;
        (function (Effect) {
            Effect[Effect["Deny"] = 0] = "Deny";
            Effect[Effect["Grant"] = 1] = "Grant";
        })(Effect = Models.Effect || (Models.Effect = {}));
        var CombinationMethod;
        (function (CombinationMethod) {
            CombinationMethod[CombinationMethod["All"] = 0] = "All";
            CombinationMethod[CombinationMethod["Any"] = 1] = "Any";
        })(CombinationMethod = Models.CombinationMethod || (Models.CombinationMethod = {}));
    })(Models = Pollux.Models || (Pollux.Models = {}));
})(Pollux || (Pollux = {}));
var BitDiamond;
(function (BitDiamond) {
    var Models;
    (function (Models) {
        var AccountStatus;
        (function (AccountStatus) {
            AccountStatus[AccountStatus["Active"] = 0] = "Active";
            AccountStatus[AccountStatus["InActive"] = 1] = "InActive";
            AccountStatus[AccountStatus["Blocked"] = 2] = "Blocked";
        })(AccountStatus = Models.AccountStatus || (Models.AccountStatus = {}));
        var BlockChainTransactionStatus;
        (function (BlockChainTransactionStatus) {
            BlockChainTransactionStatus[BlockChainTransactionStatus["Unverified"] = 0] = "Unverified";
            BlockChainTransactionStatus[BlockChainTransactionStatus["Invalid"] = 1] = "Invalid";
            BlockChainTransactionStatus[BlockChainTransactionStatus["Valid"] = 2] = "Valid";
        })(BlockChainTransactionStatus = Models.BlockChainTransactionStatus || (Models.BlockChainTransactionStatus = {}));
        var NotificationType;
        (function (NotificationType) {
            NotificationType[NotificationType["Info"] = 0] = "Info";
            NotificationType[NotificationType["Error"] = 1] = "Error";
            NotificationType[NotificationType["Warning"] = 2] = "Warning";
            NotificationType[NotificationType["Success"] = 3] = "Success";
        })(NotificationType = Models.NotificationType || (Models.NotificationType = {}));
    })(Models = BitDiamond.Models || (BitDiamond.Models = {}));
})(BitDiamond || (BitDiamond = {}));
//# sourceMappingURL=domain.js.map