import { Constants } from './const';

export class LocalStorage {
    public static getUserPermissions(): any {
        return JSON.parse(localStorage[Constants.STORAGE_USER_PERMISSIONS]);
    };

    public static getStoreUserAccessPages(): any {
        return JSON.parse(localStorage[Constants.STORAGE_USER_ACCESS_PAGES]);
    };

    public static getActionPermisstions(): any[] {
        return this.getUserPermissions()
            .map(perms => perms.actions)
            .map(function (actions: any[]) {
                return actions.map(action => action.actionId);
            }).reduce((pre, cur) => pre.concat(cur));
    };
}
