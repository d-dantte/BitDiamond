﻿using System;

namespace BitDiamond.Core.Utils
{
    public static class Constants
    {
        #region Settings
        public static readonly string Settings_DefaultContextVerificationExpirationTime = "System.ContextVerification.ValidPeriod";
        public static readonly string Settings_DefaultPasswordExpirationTime = "System.Credential.Password.ValidPeriod";
        public static readonly string Settings_MaxBitLevel = "System.BitLevel.MaxLevel";
        public static readonly string Settings_UpgradeCostVector = "system.BitLevel.UpgradeCostVector";
        #endregion

        #region Verification Contexts
        public static readonly string VerificationContext_UserActivation = "Context.UserActivation";
        #endregion

        #region Roles
        public static readonly string Roles_RootRole = "#root";
        public static readonly string Roles_AdminRole = "#admin";
        public static readonly string Roles_GuestRole = "#guest";
        public static readonly string Roles_BitMemberRole = "#bit-member";
        #endregion

        #region System Users
        public static readonly string SystemUsers_Root = "@root";
        public static readonly string SystemUsers_Guest = "@guest";
        #endregion

        #region UserData
        public static readonly string UserData_ProfileImage = "Profile.Image";
        #endregion

    }
}
